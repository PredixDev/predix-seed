#Predix Experience Visualization 14.2E Seed
Clone or fork this project to start your own Predictivity application. Documentation and more info can be found at [predix.sw.ge.com](http://predix.sw.ge.com)
  	  
## To Run

### Install Dependencies

1. Play! 2.3.4: http://downloads.typesafe.com/typesafe-activator/1.2.10/typesafe-activator-1.2.10-minimal.zip
2. Node ^0.10.28: http://nodejs.org/download/
3. Python 2.7.5

### Setup your proxy settings
In `~/.activator/activatorconfig.txt` (NOTE: you may need to create this file), add the following:
```
-Dhttp.proxyHost=proxy-src.research.ge.com
-Dhttp.proxyPort=8080
-Dhttps.proxyHost=proxy-src.research.ge.com
-Dhttps.proxyPort=8080
-Dhttp.nonProxyHosts=*.swcoe.ge.com|localhost
```

npm config proxy 
```
npm config set proxy http://proxy-src.research.ge.com:8080
npm config set https-proxy http://proxy-src.research.ge.com:8080
npm config set registry http://registry.npmjs.org
npm config set strict-ssl false
 ```

### Running the app
In the root directory, run:
```
activator run
```
Then use the credentials **demo/demo** to log in.

## Troubleshooting

### I can't log in.
You may be unable to connect to the demo kernel server. You can either start your own kernel 
server locally and change the app.conf settings accordingly, or disable the login page temporarily 
by commenting out these two lines in app/controllers/ApplicationController.java.
```
@With(SessionManager.class) // these annotations enable authentication for the class
@Security.Authenticated(Secured.class)
```

## Tutorial

This application gives you a great starting point right out of the box, which includes the following:
- Session Management
- User Authentication
- Proxy Web Service
- Internationalization Support
- Distributed Caching
- JavaScript minification

### Play configuration
The build system underneath your application in [SBT](http://www.scala-sbt.org/), which is 
configured in the build.sbt file.  This file is where your application's dependencies are
specified, including predix-v-runtime (the V server library).

The conf directory contains several other important application configuration files.
- The app.conf file contains all of the application's runtime settings.
- The routes file contains HTTP request verbs and paths mapped to controller methods.
- The messages.en file is used to externalize all application strings.

### Java Controllers
The app/controllers directory contains the application's business logic, which includes the 
following controllers by default:
- Authentication.java is used by the Visualization code for authentication and session 
management (if authentication is enabled).
- ApplicationController.java is used by the Visualization code for widget rendering and 
the proxy web service.  Check out the upload method for an example of how to do a file 
upload.

### Scala Views
The app/views directory contains the main entry points to the application, which include:
- app.scala.html - This file is the main view that includes all application client-side dependencies. 
(styles, scripts, etc.)
- loginapp.scala.html - This file is login view that is used when authentication is enabled.

### Angular Configuration
Visualization projects use the AngularJS framework with RequireJS which allows Play to load, 
minify and concatenate all JavaScript files without using any extra tools.

[RequireJS](http://requirejs.org/) is used to load the Angular files which are a modified 
version of the files created by the Yeoman Angular community generator.

The public/scripts/app.js file is the main entry point to the AngularJS application, 
which does the following:
- Dynamically injects all AngularJS modules using RequireJS.
- Defines client-side routing for the application.
- Defines the MainCtrl.
- Defines all datasources for the application.

The public/scripts/routes.js file defines all the routes for the application.

### Adding a Page
To add a new page to the application use the following steps:
- Add a new controller file into the public/scripts/controllers directory.
- Add the new controller file reference to the controller directory's main.js.
- Add a new view file into the public/views directory.
- Add the new page to the stateProvider in routes.js.
- Add the new page to the tabs in the MainCtrl in app.js.

### Angular Views and Controllers
Each page in the application has a controller and view with a one-to-one relationship that handle 
the visual representation of the application's model and its business logic.

#### Views
The views for the application are located in the public/views directory.  The templates are 
injected into the ng-view directive located in app.scala.html file.
  
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
The configuration [RequireJS](http://requirejs.org/) uses during development mode to load your 
scripts is in the config.js file.

#### Optimizer
The configuration that Play uses to compress and run your scripts during production mode thru 
the [r.js optimizer](http://requirejs.org/docs/optimization.html#basics) is located in the 
build.js file.

To create a dist build run the following command from inside of your projects root directory:
```
activator dist
```

## Questions?
- Ask questions on [AnswerHub](https://answers.sw.ge.com/spaces/53/experience.html)
- File tickets for [support](https://gesoftware.service-now.com/Predix/)

# Copyright
Copyright &copy; 2014 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
