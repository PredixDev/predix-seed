module.exports = {
    target: {
        files: {
            "public/stylesheets/main.min.css": [
                //'public/stylesheets/app.css',
                'public/stylesheets/**/*.css',
                '!public/stylesheets/main.min.css'
            ]
        }
    }
}
