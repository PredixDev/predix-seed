#Predix Experience 2.0 Seed
Dashboard Seed is an application that uses Px Web Components and <a href="https://github.com/PredixDev/px-library-design/" target="_blank">Px UI Elements</a> inside an Angular application.

## To Run

### Install Framework

2. Node ^0.10.28: http://nodejs.org/download/

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

### Log in
The /dashboards (and default /) route is protected, so you'll need to login:
```
username: rocket
password: Gu@rdian5
```

### Deploying to Cloud Foundry
To create a `dist` build run the following command from inside your project's root directory:
```unix
grunt dist
cf push <your-application-name>
```

You might want to check your nginx configuration in the `dist/nginx.conf` folder.

## Questions?
- Ask questions and file tickets on <a href="https://predix.ge.com/community/" target="_blank">predix.ge.com/community</a>.

# Copyright
Copyright &copy; 2015 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
