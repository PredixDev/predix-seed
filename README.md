# Predix Seed 2.0 - Polymer Seed

## What is the Polymer Seed?
The Polymer Seed ("Seed") is a web application starter kit aimed to accelerate Predix application development.   It provides fundamental code and examples on features such as branding, theming, layout, navigation, responsiveness, organization of views, data presentation and micro-services integration, to name some.  Predix application projects can directly use or customize these pre-built features to achieve prototype or production state much faster than through building everything from scratch.  And while the Seed provides working examples on such features, it also allows for their easy replacement, removal or customization.  This provides a framework that is both solid and flexible, and lets developers focus on implementing functionality, instead of having to make boilerplate concerns work.

As its name indicates the Polymer Seed is built on [Polymer](http://www.polymer-project.org).  Based on the [Web Component API](https://developer.mozilla.org/en-US/docs/Web/Web_Components), Polymer is a component framework that prefers the browser's native capabilities over HTML and JavaScript additions.  And where there are differences in available browser features, polyfills are provided towards consistent cross-browser behavior.  By adopting the Polymer strategy the Seed ensures the highest consistency of application behavior across browsers, and the best chances of compatibility with future browser versions.

Most of the frontend components provided in the Seed are from [Predix UI Components](http://predixdev.github.io/predix-ui/), which are also built on Polymer.  These re-usable UI building blocks have been researched and designed to address the most common UI patterns.  Both built upon Polymer, the Seed and Px Components work together out-of-the-box.  Px Components can be used independently, or in combination with one another and with the Seed.  This allows consistent behavior, look-and-feel, and high code re-use.

The backend of the Seed is now implemented as a NodeJS/Express web server.  It presently includes a minimal set of public modules and a couple of Predix-specific modules for session and proxy concerns.  Similar to the frontend, it is also highly-customizable, even replaceable by another server application, if so desired.  [NodeJS](http://nodejs.org) is a server-side application framework based on JavaScript.  It enjoys strong growth and huge adoption in the Open-Source community.

## Getting Started

### Get the source code
Make a directory for your project.  Clone or download and extract the seed in that directory.
```
git clone https://github.com/PredixDev/predix-seed.git  
cd predix-seed  
checkout polymer-only  
```

### Install tools
If you don't have them already, you'll need node, bower and gulp to be installed globally on your machine.
1. Install [node](https://nodejs.org/en/download/).  This includes npm - the node package manager.  
2. Install [bower](https://bower.io/) globally `npm install bower -g`  
3. Install [gulp](http://gulpjs.com/) globally `npm install gulp -g`  

### Install the dependencies
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

## Running in Predix Cloud
With a few commands you can build a distribution version of the app, and deploy it to the cloud.

### Create a dist version
Use gulp to create a distribution version of your app.
You will need to run this command during development every time before you cf push to make the latest dist.
```
gulp compile:all
```

### Deploy to the cloud
First make sure you're logged in to the Predix Cloud using the `cf login` command.
Then deploy your app using this command:
```
cf push my-seed-app
```
You can give the app any unique name you like.  "my-seed-app" is just an example.

## Push to the cloud
Now that you have the required services created, we can configure our web app to use them.

1. Update manifest.yml

	Change the name field in your manifest.yml.  
	Uncomment the services section, and change the names to match your service instances.
	Uncommen the clientId and base64ClientCredential environment variables and enter the correct values for your UAA client.
	```
	---
	applications:
	  - name: polymer-predix-seed-sysint
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

4. Push to the cloud.

	```
	cf push
	```

- Ask questions and file tickets on <a href="https://www.predix.io/community" target="_blank">https://www.predix.io/community</a>.

# Copyright
Copyright &copy; 2015 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
