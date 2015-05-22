define([], function() {
    'use strict';
    describe('Demo Card', function(){

        var $testContainer;

        beforeEach(function() {

            setFixtures(sandbox({
                id: 'test-container'
            }));

            //fake widget container
            $testContainer = $('#test-container');
            $testContainer.append('<demo-card></demo-card>');
        });

        it('should display context', function(){
            waits(5);
            runs(function() {
                var stubContext = {
                    name: 'Stub Context Name'
                };
                var demoCard = $testContainer.get(0).querySelector('demo-card');
                demoCard.context = stubContext;
                expect($(demoCard).text()).toContain(stubContext.name);
            });
        });

        afterEach(function(){
            $('#test-container').remove();
        });
    });

});
