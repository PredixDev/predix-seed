# Predix UI Seed

### IMPORTANT NOTE

On October 6, 2016 this project was switched to a new, simplified implementation that includes using Polymer instead of AngularJS and removes dependencies on micro-services.  For the previous implementation in AngularJS please refer to the 'develop-angular' and/or 'master-angular' branches.

## What is the Predix UI Seed?
The Predix UI Seed ("Seed") is a web application starter kit aimed to accelerate Predix application development.   It comes in the form of a simple web application, with code examples on features such as branding, theming, layout, navigation, responsiveness, organization of views, data presentation and micro-services integration, to name some.  These working code samples can be straightforwardly customized and adapted to specific application needs. Predix application projects can directly use, remove from or add to these features to achieve prototype or production state much faster than through building everything from scratch.  This speeds up application development, letting developers focus on functionality, instead of having to make boilerplate concerns work.

As its name indicates the Seed is built on [Polymer](http://www.polymer-project.org).  Based on the [Web Component API](https://developer.mozilla.org/en-US/docs/Web/Web_Components), Polymer is a component framework that prefers the browser's native capabilities over HTML and JavaScript enhancements, wherever possible.  And where there are differences in currently available features, polyfills are provided towards consistent cross-browser behavior.  By adopting the Polymer strategy the Seed ensures high consistency of application behavior across browsers, and the best chances of compatibility with future browser versions.

Most of the frontend components provided in the Seed are from [Predix UI Components](http://predixdev.github.io/predix-ui/), which are also built on Polymer.  These re-usable UI building blocks have been researched and designed to address the most common UI patterns.  Both built upon Polymer, the Seed and Px Components work together out-of-the-box.  Px Components can be used independently, or in combination with one another and with the Seed.  This achieves consistent behavior, look-and-feel, and high code re-use.

The backend of the Seed is now implemented as a NodeJS/Express web server.  It presently includes a minimal set of public modules and a couple of Predix-specific modules (for session and proxy concerns, for example).  Similar to the frontend, it is also straightforwardly customizable, even replaceable by another server application, if so desired.  [NodeJS](http://nodejs.org) is a server-side application framework based on JavaScript.  It enjoys strong growth and huge adoption in the server applications community.

The features offered by the Seed are from open-source component projects, many of which are actively discussed and contributed to.  This provides developers with available documentation and help in using such components for their projects.

## Getting Started

### Get the source code
Make a directory for your project.  Clone or download and extract the seed in that directory.
```
git clone https://github.com/PredixDev/predix-seed.git  
cd predix-seed  
```

### Install tools
If you don't have them already, you'll need node, bower and gulp to be installed globally on your machine.  

1. Install [node](https://nodejs.org/en/download/).  This includes npm - the node package manager.  
2. Install [bower](https://bower.io/) globally `npm install bower -g`  
3. Install [gulp](http://gulpjs.com/) globally `npm install gulp-cli -g`  

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
	---
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
  
## Support and Further Information

Ask questions and file tickets on <a href="https://www.predix.io/community" target="_blank">https://www.predix.io/community</a>.

# Copyright
Copyright &copy; 2015, 2016 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
