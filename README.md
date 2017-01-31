# Predix UI Seed

## What is the Predix UI Seed?
The Predix UI Seed ("Seed") is a starter kit intended to accelerate Predix web application development.  It is an application template complete with frontend, server-side and deployment portions.  It uses [Polymer](http://www.polymer-project.org), [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), SASS style files and specific JavaScript libraries for the frontend.  For the backend, it uses [NodeJS](http://nodejs.org) and specific modules.  For build and deployment, it uses the [Gulp](http://gulpjs.com/) utility together with specific plug-ins for packaging an application that can be deployed locally or to a cloud container.

Through working code examples and extensive embedded comments the Seed provides directly-usable features such as layout, branding, theming, navigation, backend routing, responsiveness, organization of views, and micro-services integration, to name some.  The examples can be customized and adapted to specific needs in a straightforward manner.  The Seed also comes with look and feel that aligns with Predix UI Design.  All of these speed up application prototyping/development by enabling developers to focus on product functionality, instead of boilerplate concerns or simply getting an application started.

Polymer is a component framework that relies on the browser's native capabilities over HTML and JavaScript enhancements.  Where there are differences in currently available features, polyfills are provided towards consistent cross-browser behavior.  By adopting the Polymer strategy the Seed strives for high cross-browser compatibility, as well as compatibility with future versions.

Most of the frontend components provided in the Seed are from [Predix UI Components](http://www.predix-ui.com/), which are also built on Polymer.  These frontend building blocks have been researched and designed to address common UI component needs.  Predix UI Components can be used independently, or in combination with one another and with the Seed.  This achieves consistent behavior, look-and-feel, and high code re-use.

The backend of the Seed is implemented as a NodeJS/Express web server.  It presently includes a minimal set of public modules and a couple of Predix-specific modules (for session and proxy concerns, for example).  Similar to the frontend, it is also straightforwardly customizable, even replaceable by another server application, if so desired.  [NodeJS](http://nodejs.org) is a server-side application framework based on JavaScript.  It enjoys strong growth and huge adoption in the server applications community.

The features offered by the Seed are from open-source component projects, many of which are actively discussed and maintained.  This provides developers with available documentation and help in using such components for their projects.

These are the main branches for the Seed, each one intended for a specific purpose:

### Seed Branches

#### essential ####
Minimal version, just enough to start a web application prototype.  It contains basic server-side routing and essential frontend features such as branding, header, navigation, sample card and footer.

#### intermediate1 ####

#### intermediate2 ####

#### reference-app ####
Contains features found in the preceding branches, and working integration with Predix Time Series service.  Includes the necessary visualization components and frontend code to consume server-side time series data.  This is the showcase version of the Seed.

## Getting Started

### Get the source code
Make a directory for your project.  Clone or download and extract the seed in that directory.
```
git clone https://github.com/PredixDev/predix-seed.git <target directory>
cd <target directory>
```
(In the above git command the target directory has a default value of '**predix-seed**'.)

### Install tools
If you don't have them already, you'll need Node, Bower and Gulp to be installed globally on your machine.  

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
