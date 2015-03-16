[![Build Status](http://alpha.menlo-ci.sw.ge.com:11112/job/predix-seed/badge/icon)](http://alpha.menlo-ci.sw.ge.com:11112/job/predix-seed/)

#Predix Experience 2.0 Seed
Clone or fork this project to start your own Predictivity application. Documentation and more info can be found at [predix.sw.ge.com](http://predix.sw.ge.com)

The predix-seed is a starter project that contains the following Predix components:
- [px-contextual-dashboard](https://github.sw.ge.com/Predix-Experience/px-contextual-dashboard)
- [px-oauth](https://github.sw.ge.com/Predix-Experience/px-oauth)
- [px-datasource](https://github.sw.ge.com/Predix-Experience/px-datasource)
- [px-time-series](https://github.sw.ge.com/PredixWidgetCatalog/px-time-series)
- [px-datagrid](https://github.sw.ge.com/PredixWidgetCatalog/px-datagrid)
- [px-tree-navigation](https://github.sw.ge.com/PredixWidgetCatalog/px-tree-navigation)
  	  
## To Run

### Install Framework

2. Node ^0.10.28: http://nodejs.org/download/

npm config proxy 
```
npm config set proxy http://proxy-src.research.ge.com:8080
npm config set https-proxy http://proxy-src.research.ge.com:8080
npm config set registry http://registry.npmjs.org
npm config set strict-ssl false
 ```

### Install Dependencies
```
npm install
npm install -g bower
npm install -g grunt-cli
bower install
grunt update
```

### Running the app
In the root directory, run:
```
grunt serve
```
Then use the credentials provided by the UAA server to log in. (Default username/password: marissa/koala)

## Tutorial

This application gives you a great starting point right out of the box, which includes the following:
- Contextual Dashboard
- Internationalization Support
- User Authentication
- Proxy
- Cloud Foundry Deploy Support

### Views
The public/ directory contains the main entry points to the application, which include:
- index.html - This file is the main view that includes all application client-side dependencies. 

### Angular Configuration
Visualization projects use the AngularJS framework with RequireJS which allows Grunt to
minify and concatenate all JavaScript files without using any extra tools.

[RequireJS](http://requirejs.org/) is used to load the Angular files which are a modified 
version of the files created by the Yeoman Angular community generator.

The public/scripts/app.js file is the main entry point to the AngularJS application, 
which does the following:
- Dynamically injects all AngularJS modules using RequireJS.
- Configures application's providers for widgets and contextual dashboard's view and metadata services.
- Defines client-side routing for the application.
- Defines the MainCtrl.
- Defines UAA configuration.

The public/scripts/routes.js file defines all the routes for the application.

### Adding a Page
To add a new page to the application use the following steps:
- Add a new controller file into the public/scripts/controllers directory.
- Add the new controller file reference to the controller directory's main.js.
- Add a new view file into the public/views directory.
- Add the new page to the stateProvider in routes.js.
- Add the new page to the tabs in the MainCtrl in app.js.
- Style the page by creating a page-specific directory under public/stylesheets with css file(s) there.

### Angular Views and Controllers
Each page in the application has a controller and view with a one-to-one relationship that handle 
the visual representation of the application's model and its business logic.

#### Views
The views for the application are located in the public/views directory.  The templates are 
injected into the ui-view directive located in index.html file.
  
#### Controllers
The Angular controllers for the application are located in the public/scripts/controllers 
directory and are in the form of RequireJS modules.  The controllers retrieve the 
datasources used on the page, create the widgets, and fetch the data from the datasources.

### Angular Directives, Services, Filters
The Angular directives, services, and filters are located in their corresponding folders under
public/scripts.  There are samples of each of these in their corresponding folders.  You can
either load them using the main.js file or require them where they are used (for example, in
the controller for the page they are on).

### RequireJS Configuration and Optimization
The configuration [RequireJS](http://requirejs.org/) used during development mode to load your 
scripts is in the config.js file.

#### Optimizer
Grunt will use RequireJS to compress your scripts during production mode thru 
the [r.js optimizer](http://requirejs.org/docs/optimization.html#basics). This can be configured in requirejs task of your Gruntfile.js.


### Authentication
This application uses [px-oauth](https://github.sw.ge.com/Predix-Experience/px-oauth) for handling [implicit grant oauth](http://oauthlib.readthedocs.org/en/latest/oauth2/grants/implicit.html). The endpoint to authorize against can be changed in your app.js

```
// Example UAA Configuration
$scope.site = 'https://predixuaa.grc-apps.svc.ice.ge.com';  // The location of your UAA server. The /oauth/token routes will be added by predix.oauth.
$scope.clientId = 'app';                                    // Your app id that you registered with Cloud Foundry.
$scope.redirectUri = $location.absUrl();                    // Where the UAA server should redirect the user on successful login. Typically, the last page the user was visiting.

```
The px-oauth directive will store the token in Session Storage and will pass it with each data source request in the `Authorization` header. The interceptor is registered with $http automatically.

### Deploying
To create a dist build run the following command from inside of your projects root directory:
```unix
grunt dist
cf push;
```

You might want to revisit the dist/nginx.conf folder to check on nginx configuration

### Contextual Dashboard
For details on how to use and configure the contextual dashboard, see the [px-contextual-dashboard README](https://github.sw.ge.com/Predix-Experience/px-contextual-dashboard).

## Questions?
- Ask questions on [AnswerHub](https://answers.sw.ge.com/spaces/53/experience.html)
- File tickets for [support](https://gesoftware.service-now.com/Predix/)

# Copyright
Copyright &copy; 2015 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
