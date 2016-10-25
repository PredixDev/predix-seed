# Tutorial : User Authentication with UAA

## Introduction
Real-world web applications almost always involve controlling access to information.  For this reason one of the most needed features in a web application is authentication.  Authenticating users makes the application more secure by allowing only authorized users access specific features and information.

This tutorial shows how to add authentication to an instance of the Predix UI Seed.  Specifically, we use the UAA service that has its own login page, to which the unauthenticated user is directed.  Upon successful login, the user is redirected back to the Seed application.  From there the user is able to further interact with the application until they de-authenticate their session by logging  out.

For this tutorial, we first show how to make specific routes or pages of the application require authentication.  Then we show how to make all routes/pages require authentication.

If you prefer a video, a tutorial of the same topic can be seen [**here**](http://www.youtube.com?).

### Pre-Requisites
This tutorial requires a running UAA service instance.  Please refer to this [**document**](https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=1544&tag=1605&journey=Build%20a%20basic%20application&resources=1580,1569,1523,1544,1547,1549,1556,1553,1570) for information on creating an instance and a set of valid credentials.  Once the service instance is available, save its URL for use in the configuration steps below.


## Steps
### Configure for Authentication
0. Install the Seed and have it running locally by following the steps in the **README** document of this project.
1. With the Seed running locally, access the */secure* route ( For example: *https://localhost:5000/secure* ).  You should see a page that says the site is unavailable ( browser shows page that says *cannot GET /secure* ).  This is because the route has not been defined yet.

2. Find the *localConfig.json* file under the *server* folder.  From this file locate the 3 configuration variables:
  - **clientId**
  - **uaaURL**
  - **base64ClientCredential**
3. Replace the values of these variables with the following:

  #### clientId
  For UAA-based authentication (which is what we are using), use the literal value '*app_client_id*'
  
  #### uaaURL
  This is the URL of an existing UAA service, mentioned in the **Pre-Requisites** section above.  With the service running and a set of credentials (user and password) in hand, use the service URL as the value for this variable.
  
  #### base64ClientCredential
  This is a [**Base64**](https://en.wikipedia.org/wiki/Base64) encoding of the string '*app_client_id*:*\<secret\>*', where '*app_client_id*' is the literal string used for the first configuration variable, and '*\<secret\>*' is a string value of your choosing.  
  
  In a Mac OS or Unix environment, you can get this value by running the following command sequence (for example, using the string literal '*secret*' for the secret value):
  ```
    echo -n app_client_id:secret | base64
  ```
  In a Windows environment, [**certutil**](https://technet.microsoft.com/en-us/library/cc732443\(v=ws.11\).aspx) utility can be used to generate the same value.
  
  After running the above command sequence in your chosen environment, copy the output string into the variable.

  Here is an example of all three configuration variables in *server/localConfig.json* populated with their respective values :
  
  ```
    ...
    "clientId": "app_client_id",
    "uaaURL": "https://162665f2-e477-488a-93d1-bb33ccb3d568.predix-uaa.run.aws-usw02-pr.ice.predix.io",
    "base64ClientCredential": "YXBwX2NsaWVudF9pZDpzZWNyZXQ=",
    ...
  ```

### Verify Authentication
4. With the configurations in place, restart the local application.


5. Access the */secure* route again, as in step 1 of the previous section.  Notice that the browser now returns a page that says  *Unauthorized*, instead of not being able to find the page (as in the previous section).  This is because that route has now been defined, as an authenticated route (other routes that have also been defined are */login*, */callback*, */predix-api* and */logout*).  At this point authentication is in place, and the browser session is in an unauthenticated state.  Consequently, accessing such routes results in "Unauthorized" (with the exception of */login*, which redirects to the authentication service's page).

6. Access the */login* route.  Notice that the browser is redirected to the login page of the authentication service.

7. Enter valid credentials in the login page and submit.  Upon successful login, the browser is redirected to the */secure* route, which now shows the text **This is a sample secure route**.  At this point, the browser session is now in the authenticated state, and access to such route is now authorized.

8. Access the */logout* route.  This will put the browser session back to the unauthenticated state.

9. Access the */secure* route once more.  Notice that we get the *Unauthorized* result again, because the browser session back to being unauthenticated, because of the previous step.  Accessing the other routes mentioned in step 2 of this section (except */login*) should now return *Unauthorized* as well.

This shows authentication working to enable/prevent access to routes, and how the user is given the chance to authenticate when accessing a route while in an unauthenticated state.

### Authenticating All Routes
The previous sections show how authentication can be added to specific routes in the application.  Oftentimes, all routes need to be accessible only after authentication.  To achieve this, follow these steps:

Comment out this line in *server/app.js*:

   ```
    app.use(express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../dist')));
   ```

In the same file insert this code inside the *if(uaaIsConfigured) {...}* block, as the last route definition:

   ```
    app.get('/', passport.authenticate('main', {
  	  noredirect: false // redirect a user to the authentication page
      }),
      express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../dist'))
    );
   ```

Restart the application.

Access any route, including the default route '*/*'.  Notice that the browser is redirected to the authentication page.  If the route is defined, the browser is redirected to it after successful login by the user.

### Including Authentication in Cloud Deployment
The steps above show how authentication is enabled in a local instance of the Predix UI Seed application.  Ultimately, we want the authentication feature to be part of deployments to the Cloud.  To achieve this, perform these steps:

In the *manifest.yml* file, enable services by uncommenting the *services* section, and enter the name of the UAA instance that will be used.  For example:

   ```
    services
    - my-uaa-service
   ```

In the same file, enter the values for **clientId** and **base64ClientCredential** that were used (in the previous sections above).  For Example:

   ```
    env:
      clientId: app_client_id
      base64ClientCredential: YXBwX2NsaWVudF9pZDpzZWNyZXQ=
   ```

From the command terminal, and in the main folder of the application, run

   ```
    gulp dist
   ```
    
to include the configuration in the distribution package for the application.  

Deploy to the Cloud as usual.  

Perform the same steps above to verify that authentication is working.

## Troubleshooting


## Conclusion

This document has shown how to add Authentication to an instance of the Seed, and apply the feature to both specific and all routes.  It has also shown how to apply the feature in both local and cloud deployments.  For any questions or issues with this document and/or feature, please submit a github issue to this project.
