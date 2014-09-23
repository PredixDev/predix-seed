var expect = require('chai').expect;
var analyzer = require('../index');

function fixture(name) {
  return require('fs').readFileSync(__dirname+'/fixtures/'+name+'.txt', 'utf8');
}

describe('rjs-build-analysis', function() {
  describe('parse', function() {
    it('should parse the build output', function() {
      var output = analyzer.parse(fixture('single-build'));
      
      expect(output).to.deep.equal({
        bundles: [
          {
            parent: 'ApplicationBootstrap.js', 
            children: [
              'common/cookie.js',
              'application/csrf.js',
              'application/EventBus.js',
              'vendor/moment.js'
            ]
          }
        ]
      });
    });

    it('should parse build output with multiple modules', function() {
      var output = analyzer.parse(fixture('multiple-build'));

      expect(output).to.deep.equal({
        bundles: [
          {
            parent: 'ApplicationBootstrap.js', 
            children: [
              'common/cookie.js',
              'application/csrf.js',
              'application/EventBus.js',
              'vendor/moment.js'
            ]
          },
          {
            parent: 'OtherApp.js',
            children: [
              'text!some-template.handlebars',
              'controller/SomeCtrl.js',
              'models/Some.js'
            ]
          }
        ]
      });
    });
  });

  describe('duplicates', function() {
    var expected = {
      'common/cookie.js': ['ApplicationBootstrap.js', 'OtherApp.js'],
      'another/duplicate.js': ['ApplicationBootstrap.js', 'OtherApp.js', 'YetOtherApp.js']
    };

    it('should check for duplicates across modules', function() {
      var output = analyzer.duplicates(fixture('duplicates-build'));
      expect(output).to.deep.equal(expected);
    });

   it('should accept an AST', function() {
     var output = analyzer.duplicates(analyzer.parse(fixture('duplicates-build')));
     expect(output).to.deep.equal(expected);
   });

   it('should exclude checking against certain modules', function() {
     var output = analyzer.duplicates(fixture('duplicates-build'), {
       exclude: ['OtherApp.js']
     });

     expect(output).to.deep.equal({
       'another/duplicate.js': ['ApplicationBootstrap.js', 'YetOtherApp.js']
     });
   });

  });

  describe('bundles', function() {
    it('should return an array of bundles', function() {
      var output = analyzer.bundles(fixture('multiple-build'));
      expect(output).to.deep.equal(['ApplicationBootstrap.js', 'OtherApp.js']);
    });
  });
});
