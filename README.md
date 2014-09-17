#Predix Visualization 14.2E Seed
Clone or fork this project to start your own Predictivity application. Documentation and more info can be found at [predix.sw.ge.com](http://predix.sw.ge.com)

## To Run
In the root directory, run:
```
bower install
npm install
grunt update
activator run (play run for now due to activator bug)
```

Then use the credentials **demo/demo** to log in.


## Troubleshooting

### I can't log in.
You may be unable to connect to the demo kernel server. You can either start your own kernel server locally
and change the app.conf settings accordingly, or disable the login page temporarily by commenting out these two
lines in app/controllers/ApplicationController.java.
```
@With(SessionManager.class) // these annotations enable authentication for the class
@Security.Authenticated(Secured.class)
```

# Copyright
Copyright &copy; 2014 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
