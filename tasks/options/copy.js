module.exports = {
    dist: {
        files: [
            {
                cwd: 'public',
                expand: true,
                src: [
                    '**'
                ],
                dest: 'dist/www/'
            }
        ]
    }
}
