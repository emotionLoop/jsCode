(function( window, $ ) {
  'use strict';

  $( document ).ready( function() {
    // Remove no-js
    $('html').removeClass( 'no-js' );

    // Add retina class
    if ( window.devicePixelRatio >= 1.5 ) {
      $('html').addClass( 'retina' );
    }

    // Retina support
    if ( $('html').hasClass('retina') ) {
      $('img').each( function( index, element ) {
        if ( ! $(element).attr('src') ) {
          return false;
        }

        // Have the possibility for images to not have the script try and load a retina option
        if ( $(element).hasClass('no-retina') ) {
          return false;
        }

        var newImageSRC = $(element).attr( 'src' ).replace( /(.+)(\.\w{3,4})$/, "$1@2x$2" );

        $.ajax({
          url: newImageSRC,
          type: "HEAD",
          success: function() {
            $(element).attr( 'src', newImageSRC );
          }
        });
      });
    }

    // Show/Hide sharing options
    $( document ).on( 'click.app', '.share-options, .share-close', toggleSharing );

    // Show/Hide badge options
    $( document ).on( 'click.app', '.show-badge, .badge-close', toggleBadges );
  });

  // Show loading
  window.showLoading = function() {
    $( '.main-loading' ).addClass( 'show' );
  };

  // Hide loading
  window.hideLoading = function() {
    $( '.main-loading' ).removeClass( 'show' );
  };

  // Set Sharing Options URL
  window.setSharingOptionsURL = function( slug ) {
    var $container = $( '.sharing-options' );

    var fullURL = '';

    if ( ! window.location.origin ) {
      fullURL = window.location.protocol + '//' + window.location.hostname + ( window.location.port ? ':' + window.location.port: '' ) + '/' + slug;
    } else {
      fullURL = window.location.origin + '/' + slug;
    }

    $container.find( 'input' ).val( fullURL );

    // Loop through the sharing options, replace [URL] with the url
    $container.find( 'ul li a' ).each( function() {
      var $this = $( this );

      var sharingURL = $this.data( 'url' ).replace( /\[URL\]/, fullURL );

      $this.attr( 'href', sharingURL );
    });
  };

  // Set Badge Options URL
  window.setBadgeOptionsURL = function( slug ) {
    var $container = $( '.badge-options' );

    var fullURL = '';

    if ( ! window.location.origin ) {
      fullURL = window.location.protocol + '//' + window.location.hostname + ( window.location.port ? ':' + window.location.port: '' ) + '/' + slug;
    } else {
      fullURL = window.location.origin + '/' + slug;
    }

    // Loop through the sharing options, replace [URL] with the url, [SLUG] with the initial slug
    $container.find( 'input, textarea' ).each( function() {
      var $this = $( this );

      var badgeContent = $this.data( 'content' ).replace( /\[URL\]/g, fullURL );
      badgeContent = badgeContent.replace( /\[SLUG\]/g, slug );

      $this.val( badgeContent );
    });

    var $sampleImage = $container.find( '.sample-image' );
    var sampleImageSRC = $sampleImage.data( 'src' ).replace( /\[SLUG\]/g, slug );
    $sampleImage.attr( 'src', sampleImageSRC );
  };

  // Toggle Sharing
  function toggleSharing( event ) {
    /*jshint validthis: true */
    event.preventDefault();

    var $this = $( this );
    var $container = $( '.sharing-options' );

    $container.toggleClass( 'show' );

    // If we're showing the sharing options, scroll to them
    if ( $container.hasClass('show') ) {
      $( 'html, body' ).animate({
        scrollTop: 500
      }, 'fast' );
      $( '.overlay' ).show();
    } else {
      $( '.overlay' ).hide();
    }

    // Support for older browsers
    return false;
  }

  // Toggle Badges
  function toggleBadges( event ) {
    /*jshint validthis: true */
    event.preventDefault();

    var $this = $( this );
    var $container = $( '.badge-options' );

    $container.toggleClass( 'show' );

    // If we're showing the badge options, scroll to them
    if ( $container.hasClass('show') ) {
      $( 'html, body' ).animate({
        scrollTop: 500
      }, 'fast' );
      $( '.overlay' ).show();
    } else {
      $( '.overlay' ).hide();
    }

    // Support for older browsers
    return false;
  }
})( window, jQuery );
