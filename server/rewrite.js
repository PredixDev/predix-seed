var rewrite = require('express-urlrewrite');

module.exports = [
    rewrite(
    // rewrite font files
    '/type/*', '/bower_components/px-typography-design/type/$1'
)];