// This will be an automatically-generated variable based on the component
// name provided to the pxtestkit yeoman generator
var seed_app_1;

// This is the bootstrapping function that will run the base and custom tests
// upon the completion of web components construction by Polymer
document.addEventListener("WebComponentsReady", function() {
  runBaseTests();
  runCustomTests();
});

// This is a utility/wrapper function for the test() function of
// web-component-tester;  the developer can use this to specify tests
// through a configuration object instead of repeatedly writing the test
// case construction and assertion code patterns
/**
 *
 * testCase(options) :
 * Utility wrapper for web-component-tester's test() function to perform the
 * most common test cases.  Accepts a configuration object that determines
 * how test() will be called (e.g., synchronously/asynchronously, event string
 * to use, etc). Each call to testCase corresponds to exactly 1 call to test().
 *
 * options : test configuration object that accepts the following properties
 *
 *   description : optional
 *   The description for the test case
 *
 *   root : required
 *   The innermost HTML node which is ancestor to any and all nodes that are
 *   involved in the test case. root can be specified either as a CSS selector
 *   string or an HTMLElement.  For the former case, the element located by
 *   document.querySelector(root) will be used.
 *
 *   eventSource : optional
 *   The element from which the specified event will be dispatched.  eventSource
 *   can be specified either as a CSS selector string or an HTMLElement.  For
 *   the former case, the element located by root.querySelector(eventSource)
 *   will be used to dispatch the event from.  This means that if eventSource
 *   was specified as a CSS selector string, the event will be dispatched from
 *   and element that is a descendant of root.  For eventSource specified as
 *   an HTML element, the event source element can be any element in the DOM,
 *   and not necessarily a descendant of root.
 *
 *   eventChain: optional
 *   The eventChain is a collection/array of objects with the following
 *   structure: { eventSource, eventString, modifyFunction } that are processed
 *   in sequence by this function (testCase), to provide the simulation of tests
 *   that involve a series of interactions from the end user.
 *   At each stage of the series these steps are perfomed: an eventCallback is
 *   added as an event listener to eventSource for the eventString event,
 *   modifyFunction is called with rootElement as argument, then an event with
 *   eventString is dispatched from eventSource.  The eventCallback added
 *   earlier performs the same set of steps for the next stage.  If all stages
 *   (all elements of the eventChain array) have been processed, eventCallback
 *   finally calls assertFunction instead.
 *
 *   event : optional
 *   The event string for the event that will be dispatched from event source.
 *   Specifying the event string will run the test() function asynchronously
 *   (i.e., callback will have the 'done' parameter used by Mocha in
 *   asynchronous test cases).
 *
 *   modifyFunction : optional
 *   A function that will be called before the event is dispatched, for an
 *   asynchronous test.  The developer can use modifyFunction to perform
 *   anything such as modifying the DOM to set up the test.  modifyFunction is
 *   presently guaranteed to work only synchronously (i.e., no event or timer
 *   callbacks involved).
 *
 *   assertFunction :
 *   The assertion function that will used to test the case.  This function
 *   must return true or false.
**/

function testCase(options) {
  var testDescription, rootElement, eventSource, eventString, eventChain, modifyFunction, assertFunction;
  var isAsync = false;
  var eventStr, eventSrc, modFn, assertFn;
  function _failTest(message) {
    test(message, function() {
      assert.isTrue(false);
    });
  }
  if (typeof options === 'object') {
    testDescription = options['description'] || 'No test description provided';
    rootElement = options['root'] || document;
    eventSource = options['eventSource'] || '';
    eventString = options['event'] || '';
    modifyFunction = options['modifyFunction'];
    assertFunction = options['assertFunction'] || function() { return true; };
    eventChain = options['eventChain'] ||
      [{ 'eventSource': eventSource, 'eventString': eventString, 'modifyFunction': modifyFunction }];
  }
  // fail the test if options was not provided
  else {
    _failTest(testDescription + ' Invalid test spec');
    return;
  }

  function _deriveRoot() {
    if (typeof rootElement === 'string') {
      rootElement = document.querySelector(rootElement);
    }
  }

  // if test is asynchronous (i.e., eventString is non-blank or non-empty eventChain was provided)
  if (eventString !== '' || (eventChain instanceof Array && eventChain.length > 0)) {
    isAsync = true;
  }
  // at this point eventSource is guaranteed to be an HTML element
  if (isAsync) {
    if (eventChain === []) {
      eventChain = [{'eventSource': eventSource, 'eventString': eventString, 'modifyFunction': modifyFunction}];
    }
    test(testDescription, function(done) {
      thisDone = done;
      _deriveRoot();
      if (!(rootElement instanceof HTMLElement) && !(rootElement instanceof HTMLDocument)) {
        assert.isTrue(false);
        done();
        return;
      }

      // Add the interactions specified in the eventChain argument:
      // The interactions are added in reverse order of event dispatching
      // because of the general fact that event listeners are added before
      // corresponding events are dispatched.

      // Utility function that uses closure to generate callbacks for each event
      // Without closure the test infinite-loops on the 2nd event;
      function createCallback(eventSource, eventString, modifyFunction, rootElement) {
        return function() {
          if (modifyFunction instanceof Function) {
            modifyFunction(rootElement);
          }
          eventSource.dispatchEvent(new Event(eventString));
        }
      }
      // TODO: add validation on the eventChain structure and content types
      for (var ecLength = eventChain.length, ecIndex = ecLength-1; ecIndex >= 0; ecIndex--) {
        eventStr = eventChain[ecIndex].eventString;
        eventSrc = document.querySelector(eventChain[ecIndex].eventSource);
        if (ecIndex === (ecLength-1)) {
          eventSrc.addEventListener(eventStr, function() {
            assertFunction(rootElement);
            thisDone();
          });
        }
        else {
          modFn = eventChain[ecIndex].modifyFunction;
          var prevEventSrc = document.querySelector(eventChain[ecIndex+1].eventSource);
          var prevEventStr = eventChain[ecIndex+1].eventString;
          eventSrc.addEventListener(eventStr,
            createCallback(
              document.querySelector(eventChain[ecIndex+1].eventSource),
              eventChain[ecIndex+1].eventString,
              modFn,
              rootElement
            )
          );
        }
      }
      eventSrc.dispatchEvent(new Event(eventStr));
    })
  }
  else {
    test(testDescription, function() {
      _deriveRoot();
      if (!(rootElement instanceof HTMLElement) && !(rootElement instanceof HTMLDocument)) {
        assert.isTrue(false);
        return;
      }
      assert.isTrue(assertFunction(rootElement));
    })
  }
}

// Wrapper for base automation tests.  This function is automatically
// generated by the pxtestkit yeoman generator
function runBaseTests() {
  seed_app_1 = document.getElementById('seed_app_1');

  suite('Base Automation Tests for seed-app', function() {

    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
    test('seed-app fixture is created', function() {
      assert.isTrue(document.getElementById('seed_app_1') !== null);
    });

  });
};
