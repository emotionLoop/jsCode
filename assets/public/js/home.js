(function( window, $, hljs, sweetAlert ) {
  'use strict';

  // Will store "global" app state
  var context = {
    currentStep: 0,
    saving: false,
    packageSaved: false
  };

  $( document ).ready( function() {
    // Highlight the sample codes in each helper
    $('.helper .sample-code').each( function() {
      var $this = $( this );
      var code = $this.html().replace( /^\r\n|\r|\n/, '' ).replace( /(&amp;)/g, '&' );
      var highlightedCode = hljs.highlight( 'javascript', code, true );

      $this.html( '<pre><code></code></pre>' );

      $this.find( 'code' ).html( highlightedCode.value );
    });

    // Show/Hide helpers
    $( document ).on( 'click.app', '.helper-open, .helper-close', toggleHelper );

    // Start package form
    $( document ).on( 'click.app', '.start-button', startPackageForm );

    // Submit package form
    $( document ).on( 'submit.app', '.generate-package-form', generatePackage );

    // Show form step
    $( document ).on( 'click.app', '.form-steps ul li a', function( event ) {
      event.preventDefault();

      var $this = $( this );
      context.currentStep = $this.parent().index();

      showNextStep( false );

      // Support for older browsers
      return false;
    });

    // Continue to next step
    $( document ).on( 'click.app', '.continue-button', showNextStep );

    // Go back to first step
    $( document ).on( 'click.app', '.back-button', function( event ) {
      event.preventDefault();

      context.currentStep = 0;

      showNextStep( false );

      // Support for older browsers
      return false;
    });

    // Bind preview (gather settings)
    $( document ).on( 'click.app', '.open-preview', function( event ) {
      event.preventDefault();

      var settingIds = [];

      // Loop through every checked radio input
      $( ':radio:checked' ).each( function() {
        settingIds.push( $(this).data('id') );
      });

      window.open( '/packages/preview/' + settingIds.join(','), '_new' );

      // Support for older browsers
      return false;
    });
  });

  //
  // Functions
  //

  // Start package form
  function startPackageForm( event ) {
    event.preventDefault();

    $( '.generate-package-container' ).addClass( 'show' );

    // Hide the button
    $( this ).hide();

    showNextStep( false );

    // Support for older browsers
    return false;
  }

  // Show next form step
  function showNextStep( event ) {
    if ( event ) {
      event.preventDefault();
    }

    // Validate form
    if ( ! validateCurrentStep() ) {
      return false;
    }

    // Increment current step if we're not at the last step
    if ( context.currentStep < 3 ) {
      ++context.currentStep;
    } else {
      // Otherwise generate the package
      return generatePackage();
    }

    // Hide all steps
    $( '.form-step-container' ).removeClass( 'show' );
    $( '.form-steps ul li a' ).removeClass( 'active' );

    // Show appropriate step
    $( '.form-step-container.step-' + context.currentStep ).addClass( 'show' );
    $( '.form-steps ul li a' ).eq( context.currentStep - 1 ).addClass( 'active' );

    $( 'html, body' ).animate({
      scrollTop: 700
    }, 'fast' );

    // Support for older browsers
    return false;
  }

  // Validate current step
  function validateCurrentStep() {
    // Nothing to validate when starting
    if ( context.currentStep === 0 ) {
      return true;
    }

    var foundErrors = false;

    //
    // Check if all the setting groups are chosen
    //

    // Loop through every radio input, see if every group has something chosen
    $( ':radio' ).each( function() {
      // If we already found an error, skip it
      if ( foundErrors ) {
        return false;
      }

      var $this = $( this );

      // See if there's any radio for the same group checked. If none is found, there's an error
      if ( $(':radio[name="' + $this.attr('name') + '"]:checked').length === 0 ) {
        sweetAlert( 'Oops...', 'Wait a minute, you have to select an option for the "' + $this.data('group') + '" group!', 'error' );
        foundErrors = true;
      }
    });

    if ( ! foundErrors ) {
      // When trying to go to step 3 without a saved package, validate and save it
      if ( context.currentStep === 2 && ! context.packageSaved ) {
        generatePackage();
      }
      return true;
    }

    return false;
  }

  // Toggle Helper
  function toggleHelper( event ) {
    event.preventDefault();

    var $this = $( this );
    var helperId = $this.data( 'helper' );

    var $container = $( '.helper[data-id="' + helperId + '"]' ).closest( '.setting-container' );

    $container.toggleClass( 'show' );

    // If we're showing the helper, scroll to it
    if ( $container.hasClass('show') ) {
      $( 'html, body' ).animate({
        scrollTop: 500
      }, 'fast' );
    }

    // If there's any helper visible, show the overlay
    if ( $('.helper:visible').length ) {
      $( '.overlay' ).show();
    } else {
      $( '.overlay' ).hide();
    }

    // Support for older browsers
    return false;
  }

  // Generate package (gather and prepare settings, validate)
  function generatePackage( event ) {
    if ( event ) {
      event.preventDefault();
    }

    // Check safety measure to avoid double posting
    if ( context.saving ) {
      return false;
    }

    var chosenSettings = {};

    // Loop through every checked radio input
    $( ':radio:checked' ).each( function() {
      var $this = $( this );

      chosenSettings[ $this.data('group') ] = $this.val();
    });

    window.showLoading();

    // Add safety measure to avoid double posting
    context.saving = true;

    createPackage( chosenSettings );

    // Support for older browsers
    return false;
  }

  // Create a package
  function createPackage( chosenSettings ) {
    $.ajax({
      url: '/packages',
      type: 'POST',
      dataType: 'json',
      data: {
        settings: JSON.stringify( chosenSettings ),
        email: $( '#package-email' ).val()
      }
    })
    .done( function( data, textStatus, jqXHR ) {
      sweetAlert( 'Alright!', 'The package was successfully created. Share it with the world!', 'success' );

      // Set the proper URL for the package & sharing options
      $( '.view-package' ).attr( 'href', '/' + data.slug );

      window.setSharingOptionsURL( data.slug );

      // Set package as saved
      context.packageSaved = true;

      showNextStep( false );
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
      sweetAlert( 'Oh, no!', 'There was a problem creating the package. Please check your internet connection.', 'error' );
    })
    .always( function() {
      context.saving = false;
      window.hideLoading();
    });
  }

})( window, jQuery, hljs, sweetAlert );
