(function( window, $, hljs, sweetAlert ) {
  'use strict';

  $( document ).ready( function() {
    // Highlight the sample codes in each helper
    $('.sample-code').each( function() {
      var $this = $( this );
      var code = $this.html().replace( /^\r\n|\r|\n/, '' ).replace( /(&amp;)/g, '&' );
      var highlightedCode = hljs.highlight( 'javascript', code, true );

      $this.html( '<pre><code></code></pre>' );

      $this.find( 'code' ).html( highlightedCode.value );
    });

    // Show/Hide helpers
    $( document ).on( 'click.app', '.helper-open, .helper-close', toggleHelper );

    // Set sharing options URL
    window.setSharingOptionsURL( window.packageSlug );

    // Set badge options URL
    window.setBadgeOptionsURL( window.packageSlug );
  });

  //
  // Functions
  //

  // Toggle Helper
  function toggleHelper( event ) {
    event.preventDefault();

    var $this = $( this );
    var helperId = $this.data( 'helper' );

    var $container = $( '.helper[data-id="' + helperId + '"]' ).closest( '.package-setting-container' );

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

})( window, jQuery, hljs, sweetAlert );
