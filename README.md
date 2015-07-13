#Predix Experience 2.0 Seed
Dashboard seed is a sample application that uses <a href="https://github.build.ge.com/pages/PXc/pxc-demos/" target="_blank">Px Web Components</a> and <a href="https://github.build.ge.com/pages/PXd/px-library-design/" target="_blank">Px UI Elements</a> inside an Angular application.  See the running <a href="http://predix-seed.grc-apps.svc.ice.ge.com/" target="_blank">demo</a>.
  	  
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
```

### Running the app
In the root directory, run:
```
grunt serve
```

### Deploying to Cloud Foundry
To create a dist build run the following command from inside of your projects root directory:
```unix
grunt dist
cf push <your-application-name>
```

You might want to revisit the dist/nginx.conf folder to check on nginx configuration

## Questions?
- Ask questions & file tickets on <a href="https://predix.ge.com/community/" target="_blank">predix.ge.com/community</a>

# Copyright
Copyright &copy; 2015 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
