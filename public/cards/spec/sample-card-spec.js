define([], function() {
    'use strict';
    describe('Sample Card', function(){

        var $testContainer;

        beforeEach(function() {

            setFixtures(sandbox({
                id: 'test-container'
            }));

            //fake widget container
            $testContainer = $('#test-container');
            $testContainer.append('<sample-card></sample-card>');
        });

        it('should display context', function(){
            waits(5);
            runs(function() {
                var stubContext = {
                    name: 'Stub Context Name on Sample Card'
                };
                var sampleCard = $testContainer.get(0).querySelector('sample-card');
                sampleCard.context = stubContext;
                expect($(sampleCard).text()).toContain(stubContext.name);
            });
        });

    });

});
