define([], function() {
    'use strict';
    describe('Sample Card', function(){

        var sampleCard;
        var stubContext = {
            name: 'Stub Context Name on Sample Card'
        };

        function webComponentWait(fn) {
            waits(0);
            runs(fn);
        }

        beforeEach(function() {
            // create a new sandbox
            setFixtures(sandbox({
                id: 'test-container'
            }));
            var $testContainer = $('#test-container');

            // append the web component to test
            $testContainer.append('<sample-card></sample-card>');

            // once the web component is rendered, initialize it
            webComponentWait(function() {
                sampleCard = $testContainer.get(0).querySelector('sample-card');
                sampleCard.context = stubContext;
            });
        });

        afterEach(function(){
            $('#test-container').remove();
        });

        it('should display the context name', function(){
            expect($(sampleCard).text()).toContain(stubContext.name);
        });

        it('should initialize the temperature to 65', function(){
            var currentTemp = sampleCard.querySelector('#temp');
            expect($(currentTemp).text()).toContain('Current Temperature:65F');
        });

        describe('sets the current temperature', function() {

            it('from the deck getData(temperature)', function() {
                window.deck = {
                    getData: function() {
                        return new Promise(function(resolve, reject) {
                            resolve(100);
                        });
                    }
                };
                var currentTemp = sampleCard.querySelector('#temp');
                var tempB4 = $(currentTemp).text();
                sampleCard.getMoreTemperatureData();
                waitsFor(function() {
                    var newCurrentTemp = $(currentTemp).text();
                    return newCurrentTemp !== tempB4;
                }, 50);
                runs(function() {
                    expect($(currentTemp).text()).toContain('Current Temperature:100F');
                });
            });

            it('handles the error', function() {
                window.deck = {
                    getData: function() {
                        return new Promise(function(resolve, reject) {
                            reject('error');
                        });
                    }
                };
                var currentTemp = sampleCard.querySelector('#temp');
                var tempB4 = $(currentTemp).text();
                sampleCard.getMoreTemperatureData();
                waitsFor(function() {
                    var newCurrentTemp = $(currentTemp).text();
                    return newCurrentTemp !== tempB4;
                }, 50);
                runs(function() {
                    expect($(currentTemp).text()).toContain('Current Temperature:ERRORF');
                });
            });
        });
    });

});
