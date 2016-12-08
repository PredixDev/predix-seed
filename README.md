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

### UAA configuration

By default this app can be unrestricted accessed in both local dev environment and in CF, while note that UAA features are already available out of the box,
you can enable UAA authentication (protect the app with Predix login form) easily.

In local dev you enable UAA by filling the following required fields in `server/localConfig.json` file:
 - clientId: Your predix-uaa client id
 - uaaURL: Your predix-uaa service instance's url
 - base64ClientCredential: You can build this string with bash command `echo -n <client-id>:<client-secret> | base64`
 
In CF environment you can enable UAA simply by filling the following required fields in `manifest.yml` file, and re-push the app:
  - Add your UAA service instance's name under the `services` section, or manually bind with `cf bs <my-app> <my-uaa>`
  - Fill in `clientId` field in `env` section 
  - Fill in `base64ClientCredential` field in `env` section 

### Livereload

Download Chrome extension [livereload](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei) and enjoy it
