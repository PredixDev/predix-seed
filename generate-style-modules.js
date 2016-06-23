var fs = require('fs');
var sass = require('node-sass');
var glob = require("glob");
var _ = require("lodash");
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var moduleImporter = require('sass-module-importer');

var parseSlug = function(filename) {
  var re = /([\w-\/-]+\/)([\w-]+)(?:[.](scss|sass))$/gmi;
  var m = re.exec(filename);
  return {
    'filename': filename,
    'path': m[1],
    'slug': m[2],
    'extension': m[3]
  }
}

var renderSass = function(filename) {
  return new Promise(function(resolve, reject) {
    // use node-sass to render the file to css
    sass.render({
      file: filename,
      outputStyle: 'expanded',
      importer: moduleImporter
    }, function(err, result) {
      if (err) {
        reject(err);
      } else {
        var parsed = parseSlug(filename);
        resolve(_.merge(parsed, result));
      }
    });
  });
};

var addCSSPrefix = function(parsedSass) {
  // console.log(parsedSass)
  return new Promise(function(resolve, reject) {
    postcss([autoprefixer])
      .process(parsedSass.css)
      .then(function(result) {
        result.warnings()
          .forEach(function(warn) {
            console.warn(warn.toString());
          });
        resolve(_.merge(parsedSass, result));
      })
      .catch(function(err) {
        console.log('err in postcss: ', err);
      });
  });
};

insertFile = function(result) {
  // console.log(Object.keys(result));
  // console.log(result.toString());
  var m = "<dom-module id='three-widgets-card-styles'><template><style>" +
    result.css +
    "</style></template></dom-module>";
  console.log(m)
}

glob("public/elements/**/*.scss", {}, function(err, files) {
  _.each(files, function(filename) {
    renderSass(filename)
      .then(function(result) {
        // success! Pass it on to addCSSPrefix
        addCSSPrefix(result)
          .then(function(results) {
            console.log(results);
            // success! Pass it on to addCSSPrefix
            insertFile(results);
          })
          .catch(function(err) {
            console.error(err);
          });
      })
      .catch(function(err) {
        console.error(err);
      });
  });
});
