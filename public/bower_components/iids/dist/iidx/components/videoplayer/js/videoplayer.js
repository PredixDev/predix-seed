define([
  'jquery',
  'videojs'
],

function($) {
    'use strict';

    videojs.plugin('timetooltip', function(options) {
        var player = this;
        $( "#" + player.id() + " .vjs-progress-control").after($("<div class='vjs-tip'><div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div></div>"));

        $("#" + player.id() + " .vjs-progress-control").mousemove(function(event) {
            var width = $(event.currentTarget).width();
            var xloc = event.clientX - $(event.currentTarget).offset().left;
            var dur = player.duration();
            var t = parseInt(xloc / width * dur);
            var minutes = parseInt(t / 60);
            var seconds = t % 60;
            if (seconds.toString().length == 1) {
                seconds = "0" + t;
            }
            $( '#' + player.id() + ' .vjs-tip-inner').html(minutes + ":" + seconds);
            $('#' + player.id() + ' .vjs-tip').css("visibility", "visible");
            $('#' + player.id() + ' .vjs-tip').css("left", event.clientX - $(event.currentTarget).offset().left - $(".vjs-tip").width()/2);
        });

        $('#' + player.id() + ' .vjs-progress-control', '#' + player.id() + ' .vjs-play-control').mouseout(function(event) {
            $('#' + player.id() + ' .vjs-tip').css("visibility", "hidden");
        });
    });

    videojs.plugin('responsive', function(options) {
        var player = this;
        var aspRatio = options.width/options.height;
        var rsz = function() {
            var width = $(document.getElementById(player.id()).parentElement).width();

            // start removing controls to accomodate smaller sizes
            if (width < 325) {
                $("#" + player.id() + " .vjs-mute-control").hide();
            } else {
                $("#" + player.id() + " .vjs-mute-control").show();
            }

            if (width < 275) {
                $("#" + player.id() + " .vjs-volume-control").hide();
            } else {
                $("#" + player.id() + " .vjs-volume-control").show();
            }
            player.width(width).height(width / aspRatio);
        }

        $(window).resize($.proxy(rsz, this));
        rsz.apply();
    });
});