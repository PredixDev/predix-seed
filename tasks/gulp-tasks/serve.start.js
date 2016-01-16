// -------------------------------------
//   Task: Serve
// -------------------------------------
module.exports = function (gulp, plugins) {
    return function () {
        plugins.browserSync.init({
            port: 5000,
            notify: false,
            socket: {
                domain: "localhost:5000"
            },
            server: {
                baseDir: "./public"
            }
        });
    };
};
