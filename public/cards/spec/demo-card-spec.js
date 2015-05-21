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

        iit('sample test', function(){
            waits(5);
            runs(function() {
                var demoCard = $testContainer.get(0).querySelector('demo-card');
                console.log($(demoCard));
                console.log($(demoCard).text());
                expect($(demoCard).text()).toContain('Home');
            });
        });
    });

});
