/**
 * This file is an example of what your
 * modules should look like. Use it as a skeleton
 * or remove it when you begin development.
 *
 * To better understand AMD modules visit:
 * http://requirejs.org
 */

require(['jquery', 'jqueryui-sortable-amd', 'iids'], function($) {
  // Kickoff jQuery UI sortable
  $('.row').sortable({
    handle:          '.module-header',
    helper:          'clone',
    items:           '.draggable',
    forceHelperSize: true,
    revert:          200,
    tolerance:       'pointer'
  });
});
