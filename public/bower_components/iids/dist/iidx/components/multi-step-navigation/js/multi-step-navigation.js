define([
  'jquery',
  'twitter-bootstrap-wizard',
  'ge-bootstrap'
],

function($) {
  'use strict';

  /* MULTI-STEP-NAVIGATION PUBLIC CLASS DEFINITION
  * ==================================== */

  var MultiStepNavigation = function(element, options) {
    this.init('multiStepNavigation', element, options);
  };

  MultiStepNavigation.prototype = {
    constructor: MultiStepNavigation,

    init: function(type, element, options) {
      // Liftoff!
      this.type = type;
      this.$element = $(element);
      $('.multi-step-nav').bootstrapWizard({

        onNext: function(tab, navigation, index) {
          $('.multi-step-nav li:eq('+(index-1)+')').addClass('completed').find('i').removeClass('icon-circle-blank').addClass('icon-ok-circle');
        },
        onPrevious: function(tab, navigation, index) {
          $('.multi-step-nav li:eq('+(index)+')').removeClass('completed').find('i').removeClass('icon-ok-sign').addClass('icon-circle-blank');
        },
        onTabShow: function(tab, navigation, index) {
          var $total = navigation.find('li').length;
          var $current = index+1;

          // if last tab, hide the next btn and show the finish btn
          if($current >= $total) {
            $('.multi-step-nav').find('.pager .next').hide();
            $('.multi-step-nav').find('.pager .finish').show().removeClass('disabled');
          } else {
            $('.multi-step-nav').find('.pager .next').show();
            $('.multi-step-nav').find('.pager .finish').hide();
          }
        }


      });

      $('.multi-step-nav .finish').click(function() {
        //show all tabs as completed and inactive
        $('li').removeClass('active').find('i').removeClass('icon-ok-circle').addClass('icon-ok-sign');
        $('.multi-step-nav').find('.pager .previous').hide();
      });

      $('.multi-step-nav a').click(function(event) {
        event.preventDefault();
      });


    }
  };

  /* MULTI-STEP-NAVIGATION PLUGIN DEFINITION
  * ============================== */

  $.fn.multiStepNavigation = function(option) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('multiStepNavigation'),
          options = typeof option === 'object' && option;

      if (!data) $this.data( 'multiStepNavigation', ( data = new MultiStepNavigation(this, options) ) );
      if (typeof option === 'string') data[option]();
    });
  };

  $.fn.multiStepNavigation.Constructor = MultiStepNavigation;

  $(function () {
    $('.multi-step-navigation').each(function() {
      $(this).multiStepNavigation();
    });
  });

});
