# Predix UI Seed Tutorial : User Authentication

#### IMPORTANT NOTE: THIS DOCUMENT IS INCOMPLETE AND BEING ACTIVELY EDITED; IT SHOULD NOT BE USED UNTIL THIS NOTE IS REMOVED

## Introduction
Real-world web applications almost always involve information that is access-controlled.  For this reason one of the most common features needed in a web application is authentication.  Authenticating users adds security to the application, its features and the information it serves.

This tutorial shows how to add authentication to an instance of the Predix UI Seed.  Specifically, we use the UAA service that has its own page to which the user is directed to enter their credentials.  Upon successful login, the user is redirected again to the Seed application.  From there the user is able to further interact with the application until they de-authenticate their session by logging  out.

For this tutorial, we are going to first show how to make an initial set of routes or pages of the application require authentication.  Then we will show how to make all pages require authentication.

### Pre-Requisites
This tutorial requires a running UAA service instance.  Please refer to this [**document**](https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=1544&tag=1605&journey=Build%20a%20basic%20application&resources=1580,1569,1523,1544,1547,1549,1556,1553,1570) for information on setting up a UAA instance and a set of valid credentials.  Once the service is set up, save its URL for use in the configuration steps below.


### Steps
### Configure for Authentication
0. Install the Seed and have it running by following the steps in the **README** document of this project.
1. With the Seed running locally, access the */secure* route ( For example: *https://localhost:5000/secure* ).  You should see a page that says the site is unavailable ( browser shows page that says *cannot GET /secure* ).  This is because the route has not been defined yet.

2. Find the *localConfig.json* file under the *server* folder.  From this file locate the 3 configuration variables:
  - **clientId**
  - **uaaURL**
  - **base64ClientCredential**
3. Replace the values of these variables with the following:

  #### clientId
  For UAA-based authentication (which is what we are using), use the literal value '*app_client_id*'
  
  #### uaaURL
  This is the URL of an existing UAA service.  For information on how to set up UAA service, please refer to the link in the **Pre-Requisites** section.  With the service running and a set of credentials (user and password) in hand, use the service URL as the value for this variable.
  
  #### base64ClientCredential
  This is a [**Base64**](https://en.wikipedia.org/wiki/Base64) encoding of the string '*app_client_id*:*\<secret\>*', where '*app_client_id*' is the literal string used for the first configuration variable, and '*\<secret\>*' is a string value of your choosing.  
  
  In a Mac OS or Unix environment, you can get the value by running this command sequence (for example, using the string literal '*secret*' for the secret value):

    *echo -n app_client_id:secret | base64*

  In a Windows environment, [**certutil**](https://technet.microsoft.com/en-us/library/cc732443\(v=ws.11\).aspx) utility can be used to generate the same value.
  
  After running the above command in your chosen environment, use the output for the value of this variable in the configuration file.

  Here is an example of all three configuration variables in *server/localConfig.json* populated with their respective values :
  
```
    ...
    "clientId": "app_client_id",
    "uaaURL": "https://162665f2-e477-488a-93d1-bb33ccb3d568.predix-uaa.run.aws-usw02-pr.ice.predix.io",
    "base64ClientCredential": "YXBwX2NsaWVudF9pZDpzZWNyZXQ=",
    ...
```

### Verify the Authentication Feature
4. With the configurations in place, restart the local application.


5. Access the */secure* route again, as in step 1 of the previous section.  Notice that the browser now returns a page that says  *Unauthorized*, instead of being unable to find that page (as in the previous section).  This is because that route has now been defined, as an authenticated route (other routes that have also been defined are */login*, */callback*, */predix-api* and */logout*).  At this point the browser is in an unauthenticated state, and accessing such routes results in "Unauthorized" (with the exception of */login*, which redirects to the authentication service's page).

6. Access the */login* route.  Notice that the browser is redirected to the login page of the authentication service.

7. Enter valid credentials in the authentication page.  Upon successful login, the browser is redirected to the */secure* route, which now shows the text **This is a sample secure route**.  At this point, the browser is now in the authenticated state, and access to such route is now authorized ( in contrast with the 2nd step in this section ).

8. Access the */logout* route.  This will put the browser session back to the un-authenticated state.

9. Access the */secure* route.  Notice that we get the *Unauthorized* result again, because the browser session is now un-authenticated.  Accessing the other routes mentioned in step 2 of this section (except */login*) should now return *Unauthorized* as well.

### Adding Authentication to All Routes
The previous sections show how authentication can be added to selected routes in the application.  Oftentimes, all routes need to be accessible only after authentication.  To achieve this, follow these steps:

1. Comment out this line in *server/app.js*:

```
app.use(express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../dist')));
```

2. In the same file insert this code inside the *if(uaaIsConfigured) {...}* block, as the last route definition:

```
  app.get('/', passport.authenticate('main', {
  	noredirect: false // redirect a user to the authentication page
    }),
    express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../dist'))
  );
```

3. Restart the application.

4. Access any route, including the default route '*/*'.  Notice that the browser is redirected to the authentication page.  If the route is defined, the browser is redirected to it after successful login by the user.

### Including the Authentication Feature in Cloud Deployment
The steps above show how authentication is enabled in a local instance of the Predix UI Seed application.  Ultimately, we want the authentication feature to be part of the production deployment.  Follow these steps to implement such:

1. In the *manifest.yml* file, enable services by uncommenting the *services* section, and enter the name of the UAA instance that will be used.  For example:

```
  services
   - my-uaa-service
```

2. In the same file, enter the values for **clientId** and **base64ClientCredential** that were used (in the previous sections above).  For Example:

```
  env:
    clientId: app_client_id
    base64ClientCredential: YXBwX2NsaWVudF9pZDpzZWNyZXQ=
```

3. From the command terminal, and in the main folder of the application, run '**gulp dist**' to include the configuration in the distribution package for the application.  Deploy to the Cloud as normal.



