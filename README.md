# Predix UI Scaffold

### What-is-this
This repository serves as an app scaffolding structure for any new Predix UI based project based off the [predix seed app](https://github.com/PredixDev/predix-seed), with the following improvements for production ready apps:

 * Use global BEM styles to avoid redundant styles from each HTML element
 * Build a single HTML bundle file for better page load performance while HTTP2 is not widely adopted
 * Minimal `dist` version files
 * *Chinese* specific app-shell brand elements and font-stack
 * etc...


### How-to-use

```!bash
  git clone --branch feature/scaffold --single-branch --depth 1 git@github.build.ge.com:foundry-sh/px-seed.git px-your-app

  cd px-your-app && rm -rf .git
```

### Livereload

Download Chrome extension [livereload](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei) and enjoy it
