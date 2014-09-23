var _ = require('lodash');
var parser = require('pegjs').buildParser(
  require('fs').readFileSync(__dirname+'/rjs.peg', 'utf8')
);

function getAST(textOrAST) {
  var tree = textOrAST;

  if (_.isString(textOrAST)) {
    tree = exports.parse(textOrAST);
  }

  return tree;
}

exports.parse = parser.parse;

exports.duplicates = function(tree, options) {
  options = _.extend({}, { exclude: false}, options);

  var bundles = getAST(tree).bundles;
  var nodes = {};

  if (options.exclude) {
    bundles = _.filter(bundles, function(bundle) {
      return _.indexOf(options.exclude, bundle.parent) === -1;
    });
  }

  _.each(bundles, function(bundle) {
    _.each(bundle.children, function(child) {
      nodes[child] = nodes[child] || [];
      nodes[child].push(bundle.parent);
    });
  });

  return _.reduce(nodes, function(memo, list, key) {
    if (list.length > 1) {
      memo[key] = list;
    }
    return memo;
  }, {});
}

exports.bundles = function(tree) {
  return _.map(getAST(tree).bundles, function(bundle) {
    return bundle.parent;
  });
}
