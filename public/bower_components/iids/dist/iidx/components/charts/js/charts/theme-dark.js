define([
  'jquery',
  'brandkit'
], function ($, brandkit) {
  return {
    colors: $.map(brandkit.accentPalette, function(val, key) { return val; }),
    lang: {
      rangeSelectorZoom: ''
    },
    chart: {
      borderWidth: 0,
      plotBackgroundColor: null,
      backgroundColor: brandkit.monochromePalette.grayDarkest,
      plotShadow: false,
      plotBorderWidth: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      spacingBottom: 1,
      borderRadius: 0,
      style: {
        color: brandkit.monochromePalette.grayLighter,
        fontFamily: brandkit.typography.sansFontFamily,
        fontSize: brandkit.typography.baseFontSize
      }
    },
    title: {
      text: ' ', // an empty title makes the spacing correct
      x: 20,
      y: 20,
      align: 'left',
      margin: 40,
      style: {
        color: brandkit.monochromePalette.grayLighter,
        fontFamily: brandkit.typography.sansFontFamily,
        fontWeight: 'bold',
        fontSize: brandkit.typography.baseFontSize
      }
    },
    subtitle: {
      x: 20,
      y: 37,
      align: 'left',
      style: {
        color: brandkit.monochromePalette.grayLighter,
        fontFamily: brandkit.typography.sansFontFamily,
        fontWeight: 'normal',
        fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
      }
    },
    xAxis: {
      gridLineWidth: 0,
      tickWidth: 0,
      lineWidth: 0,
      offset: 10,
      labels: {
        style: {
          color: brandkit.monochromePalette.grayLighter,
          fontFamily: brandkit.typography.monoFontFamily,
          fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
        }
      },
      title: {
        margin: 20,
        style: {
          color: brandkit.monochromePalette.grayLighter,
          fontFamily: brandkit.typography.monoFontFamily,
          fontWeight: 'normal',
          fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
        }
      }
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: brandkit.monochromePalette.gray,
      lineWidth: 0,
      tickWidth: 0,
      offset: 10,
      labels: {
        align: 'right',
        style: {
          color: brandkit.monochromePalette.grayLighter,
          fontFamily: brandkit.typography.monoFontFamily,
          fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
        }
      },
      title: {
        margin: 20,
        style: {
          color: brandkit.monochromePalette.grayLighter,
          fontFamily: brandkit.typography.monoFontFamily,
          fontWeight: 'normal',
          fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
        }
      }
    },
    legend: {
      borderWidth: 0,
      align: 'right',
      verticalAlign: 'top',
      floating: true,
      y: 3,
      x: -20,
      itemStyle: {
         cursor: 'pointer',
         color: brandkit.monochromePalette.grayLighter,
         fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
      },
      itemHoverStyle: {
        color: brandkit.monochromePalette.grayLighter
      },
      style: {
        color: brandkit.monochromePalette.grayLighter,
        fontFamily: brandkit.typography.sansFontFamily,
        fontWeight: 'normal',
        fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
      }
    },
    labels: {
      style: {
        color: brandkit.monochromePalette.grayLighter,
        fontFamily: brandkit.typography.sansFontFamily,
        fontWeight: 'normal',
        fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(247, 248, 250, 0.90)',
      borderWidth: 1,
      borderColor: brandkit.monochromePalette.grayLighter,
      borderRadius: 3,
      shadow: false,
      style: {
        color: brandkit.monochromePalette.grayDarker,
        fontFamily: brandkit.typography.sansFontFamily,
        fontWeight: 'normal',
        fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px',
        padding: '15px'
      },
      headerFormat: '<span>{point.key}</span><br/>',
      pointFormat: '<span style="color:{series.color}">{series.name}: {point.y}</span><br/>'
    },
    plotOptions: {
      series: {
        animation: false,
        marker: {
          radius: 5
        },
        dataLabels: {
          style: {
            color: brandkit.monochromePalette.grayLighter,
            fontFamily: brandkit.typography.monoFontFamily,
            fontWeight: 'normal',
            fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
          }
        },
        shadow: false
      },
      area: {
        marker: {
          enabled: false
        }
      },
      bar: {
        borderWidth: 0,
      },
      column: {
        borderWidth: 0,
      },
      line: {
        marker: {
          enabled: false,
          lineWidth: 1,
          lineColor: brandkit.monochromePalette.white
        },
        lineWidth: 3
      },
      pie: {
        allowPointSelect: true,
        dataLabels: {
          softConnector: false,
          connectorColor: brandkit.monochromePalette.grayDarker,
          formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2, '.') +'%';
          }
        },
        tooltip: {
          headerFormat: '<span>{point.key}</span><br/>',
          pointFormat: '<span style="color:{point.color}">{point.percentage}</span><br/>',
          percentageDecimals: 2,
          percentageSuffix: '%'
        }
      },
      spline: {
        marker: {
          enabled: false
        }
      },
      scatter: {
        marker: {
          enabled: true
        }
      },
      candlestick: {
      }
    },
    navigation: {
      buttonOptions: {
        backgroundColor: {
          linearGradient: [0, 0, 0, 20],
          stops: [
            [0.4, '#606060'],
            [0.6, '#333333']
          ]
        },
        borderColor: brandkit.monochromePalette.black,
        symbolStroke: '#C0C0C0',
        hoverSymbolStroke: brandkit.monochromePalette.white
      }
    },
    exporting: {
      buttons: {
        exportButton: {
          symbolFill: '#55BE3B'
        },
        printButton: {
          symbolFill: '#7797BE'
        }
      }
    },
    rangeSelector: {
      inputEnabled: false,
      labelStyle: {
        fontFamily: brandkit.typography.sansFontFamily,
        color: brandkit.monochromePalette.grayDark,
      },
      buttonSpacing: 5,
      buttonTheme: {
        stroke: 'none',
        fill: brandkit.monochromePalette.grayDarkest,
        style: {
          color: brandkit.monochromePalette.grayLighter,
          fontFamily: brandkit.typography.sansFontFamily,
          fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
        },
        padding: 2,
        states: {
          hover: {
            stroke: 'none',
            fill: brandkit.monochromePalette.grayDarkest,
            style: {
              color: brandkit.monochromePalette.grayLighter,
              fontFamily: brandkit.typography.sansFontFamily,
              fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
            }
          },
          select: {
            stroke: 'none',
            fill: {
              linearGradient: [0, 17, 0, 18],
              stops: [
                [0, brandkit.monochromePalette.grayDarkest],
                [1, brandkit.accentPalette.blue]
              ]
            },
            style: {
              color: brandkit.monochromePalette.grayLighter,
              fontFamily: brandkit.typography.sansFontFamily,
              fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
            }
          }
        }
      }
    },
    navigator: {
      handles: {
        backgroundColor: brandkit.monochromePalette.white,
        borderColor: brandkit.monochromePalette.grayDarker
      },
      outlineColor: brandkit.monochromePalette.grayDarker,
      maskFill: 'rgba(255, 255, 255, 0.4)',
      series: {
        color: 'transparent',
        lineColor: brandkit.accentPalette.blue,
        lineWidth: 2
      },
      xAxis: {
        opposite: true,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          y: 15,
          align: 'center',
          style: {
            color: brandkit.monochromePalette.grayLighter,
            fontFamily: brandkit.typography.monoFontFamily,
            fontSize: '0.6em'
          }
        }
      },
      yAxis: {
        opposite: true,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          x: 15,
          style: {
            color: brandkit.monochromePalette.grayLighter,
            fontFamily: brandkit.typography.monoFontFamily,
            fontSize: parseInt(brandkit.typography.baseFontSize) - 1 + 'px'
          }
        }
      }
    },
    scrollbar: {
      barBackgroundColor: brandkit.monochromePalette.white,
      barBorderRadius: 0,
      barBorderColor: brandkit.monochromePalette.grayDarker,
      buttonBorderRadius: 0,
      buttonArrowColor: brandkit.monochromePalette.grayLight,
      buttonBackgroundColor: {
        linearGradient: [0, 0, 0, 16],
        stops: [
          [0, brandkit.monochromePalette.black],
          [1, brandkit.monochromePalette.grayDarker]
        ]
      },
      buttonBorderColor: brandkit.monochromePalette.grayDarkest,
      rifleColor: brandkit.monochromePalette.black,
      trackBackgroundColor: brandkit.monochromePalette.grayDarker,
      trackBorderWidth: 0
    },
    credits: {
      enabled: false
    }
  };
});