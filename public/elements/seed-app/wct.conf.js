module.exports = {
  verbose: true,
  plugins: {
    local: {
      browsers: ['chrome', 'firefox']
    },
    sauce: {
      disabled: true
    }
  },
  suites: [
    'test/seed-app-test-fixture.html'
  ]
};
