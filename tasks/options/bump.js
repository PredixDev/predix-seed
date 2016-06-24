/**
 * Configure bump tasks
 */
module.exports = {
    bump: {
        options:{
            files: ['bower.json', 'package.json'],
            updateConfigs: [],
            commitFiles: ['package.json', 'bower.json'],
            push: false
        }
    }
};
