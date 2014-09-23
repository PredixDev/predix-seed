'use strict';
!function(window, document, undefined) {

    var monochromePalette = {
        'black': '#141414',
        'grayDarkest': '#2b2b2b',
        'grayDarker': '#414141',
        'grayDark': '#575757',
        'gray': '#868686',
        'grayLight': '#bcbcbc',
        'grayLighter': '#d4d4d4',
        'grayLightest': '#e9e9e9',
        'offwhite': '#f5f5f5',
        'white': '#fff'
    };

    var accentPalette = {
        'cyan': '#005CB9',
        'orange': '#ff9821',
        'green': '#46ad00',
        'purple': '#8669ff',
        'red': '#de2533',
        'yellow': '#ffed45',
        'cyanLight': '#3693f8',
        'orangeLight': '#ffbb66',
        'greenLight': '#75d835',
        'purpleLight': '#9c97ff',
        'redLight': '#ff5c5c',
        'yellowLight': '#fff98d',
        'cyanDark': '#00366e',
        'orangeDark': '#e55c00',
        'greenDark': '#1d5f11',
        'purpleDark': '#595194',
        'redDark': '#b61225',
        'yellowDark': '#ffcf45',
        'blue': '#005bb8',
        'blueLight': '#3693f8',
        'blueDark': '#00366e'
    };

  var typography = {
    'sansFontFamily': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'serifFontFamily': 'Georgia, serif',
    'monoFontFamily': 'Inconsolata, Consolas, monospace',
    'brandFontFamily': '"ge-inspira", "Helvetica Neue", Helvetica, Arial, sans-serif',
    'baseFontSize': '14px',
    'baseLineHeight': '20px',
    'textColor': monochromePalette.grayDarker
  };

  var brandkit = {
    'accentPalette': accentPalette,
    'monochromePalette': monochromePalette,
    'typography': typography
  };

  if (typeof define === 'function' && define.amd)
    define(function() { return brandkit; });
  else
    window.brandKit = brandkit;

}(window, document);
