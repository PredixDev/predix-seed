# Predix UI Scaffold

## What-is-this
This repository serves as an app scaffolding structure for any new Predix UI based project based off the [predix seed app](https://github.com/PredixDev/predix-seed), with the following improvements for production ready apps:

 * Use global BEM styles to avoid redundant styles from each HTML element
 * Build a single HTML bundle file for better page load performance while HTTP2 is not widely adopted
 * Minimal `dist` version files
 * *Chinese* specific app-shell brand elements and font-stack
 * etc...


## Where to start

```!bash
  git clone --branch feature/scaffold --single-branch --depth 1 git@github.build.ge.com:foundry-sh/px-seed.git px-your-app

  cd px-your-app && rm -rf .git
```

## Install the dependencies
Change directory into the new project you just cloned, then install dependencies.
```
npm install
bower install
```

## Running the app locally
The default gulp task will start a local web server.  Just run this command:
```
gulp
```
Browse to http://localhost:5000.
Initially, the app will use mock data for the views service, asset service, and time series service.
Later you can connect your app to real instances of these services.

## Running components docs locally
You can run locally seed app web components docs/demo easily with the following commands:

```
npm i -g polymer
polymer serve --root public
```

Then to view the component doc for, e.g. `px-vis`  locally:
http://localhost:8080/bower_components/px-vis/

You can check Polymer CLI for more options:

```
polymer help
```

## Running in Predix Cloud
With a few commands you can build a distribution version of the app, and deploy it to the cloud.

### Create a distribution version
Use gulp to create a distribution version of your app, which contains vulcanized files for more efficient serving.
You will need to run this command every time before you deploy to the Cloud.
```
gulp dist
```

## Running in Predix Cloud
With a few commands you can build a distribution version of the app, and deploy it to the cloud.

### Create a distribution version
Use gulp to create a distribution version of your app, which contains vulcanized files for more efficient serving.
You will need to run this command every time before you deploy to the Cloud.
```
gulp dist
```

## Push to the Cloud

### Pre-Requisites
Pushing (deploying) to a cloud environment requires knowledge of the commands involved and a valid user account with the environment.  GE uses Cloud Foundry for its cloud platform.  For information on Cloud Foundry, refer to this [link](http://docs.cloudfoundry.org/cf-cli/index.html).

### Steps
The simplest way to push the Seed application to a cloud environment is by modifying the default manifest file (manifest.yml) and using the **cf push** command, as follows:

1. Update manifest.yml

Change the name field in your manifest.yml.
Uncomment the services section, and change the names to match your service instances.
Uncomment the clientId and base64ClientCredential environment variables and enter the correct values for your UAA client.

```
—
applications:
  - name: predix-ui-seed
	memory: 64M
	buildpack: nodejs_buildpack
	command: node server/app.js
#services:
 # - <your-name>-secure-uaa-instance
 # - <your-name>-timeseries-instance
 # - <your-name>-asset-instance
env:
	node_env: cloud
	uaa_service_label : predix-uaa
	# Add these values for authentication in the cloud
	#clientId: {Enter client ID, e.g. app-client-id, and place it here}
	#base64ClientCredential: dWFhLWNsaWVudC1pZDp1YWEtY2xpZW50LWlkLXNlY3JldA==
```

2. Push to the cloud.

```
cf push
```

3. Access the cloud deployment of your Seed application

The output of the **cf push** command includes the URL to which your application was deployed.  Below is an example:

API endpoint:   https://api.endpoint.svc.ice.ge.com (API version: 2.62.0)
User:           john.doe@ge.com
Org:            predix-org
Space:          predix-space

Access your Seed application by loading the **API Endpoint** above in a web browser

## UAA configuration

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