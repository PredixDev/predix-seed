var glob = require("glob");
var path = require("path");
var _ = require("lodash");

// options is optional
var options = {};

var decksPath = path.resolve(__dirname, "./sample-data/view-service/decks/*.json");
var cardsPath = path.resolve(__dirname, "./sample-data/view-service/cards/*.json");
var joinsPath = path.resolve(__dirname, "./sample-data/view-service/joins/*.json");

var decks = [];
var cards = [];
var joins = [];

var joinFiles = glob.sync(joinsPath, options);
_.each(joinFiles, function(joinFile) {
  var joinJSON = require(joinFile);
  joins.push(joinJSON);
});

var cardFiles = glob.sync(cardsPath, options);
_.each(cardFiles, function(cardFile) {
  var cardJSON = require(cardFile);
  cards.push(cardJSON);
});

var deckFiles = glob.sync(decksPath, options);
_.each(deckFiles, function(deckFile) {
  var deckJSON = require(deckFile);
  var matchingJoins = _.filter(joins, {
    "deckId": deckJSON["id"]
  });
  deckJSON.cards = [];
  _.each(matchingJoins, function(join) {
    var joinedCard = _.find(cards, {
      "id": join["cardId"]
    });
    deckJSON.cards.push(joinedCard);
  });
  var newTags = [];
  // flatten tags to be searchable with query string filter e.g.: "?tags=tagName"
  _.each(deckJSON.tags, function(tagObject) {
    return newTags.push(tagObject.value);
  }, '');
  deckJSON.tag = newTags.join(', ');
  decks.push(deckJSON);
});

module.exports = function() {
  return {
    decks: decks,
    cards: cards
  };
};
