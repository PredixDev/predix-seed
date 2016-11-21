# Tutorial : User Authentication with UAA

## Introduction
Web applications almost always involve controlling access to information and features.  For this reason one commonly needed feature is that of authentication.  Requiring login for an application's restricted portions is part of the overall access control mechanism through which a web application is made secure.

This tutorial shows how to add authentication to an instance of the Predix UI Seed.  Specifically, we use the UAA authentication service that has its own user interface.  With an unauthenticated browser session, accessing any restricted page of the application should cause the user to be redirected to the UAA login page.  Upon successful login the user is redirected back to the application.  From there the user is able to access the application's restricted pages and information.  This authenticated session lasts until the user logs out.  

We first show how to restrict access to specific routes or pages of the application.  Then we show how to make such routes or pages require authentication.  Finally, we show how to require authentication for all routes and pages of the application.

If you prefer a video version of this tutorial instead, one is available [**here**](http://www.youtube.com?).

### Pre-Requisites
This tutorial requires a running UAA service instance.  Please refer to this [**UAA tutorial**](https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=1544&tag=1605&journey=Build%20a%20basic%20application&resources=1580,1569,1523,1544,1547,1549,1556,1553,1570) for information on creating an instance and a set of valid credentials.  Once the instance is available, save its URL for use in the configuration steps below.

This tutorial also requires knowledge of and practical experience with the Predix UI Seed (this project).  You should have been able to install, minimally configure, and deploy the Seed prior to performing this tutorial.  Please refer to the README document of this project for this requirement. 

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
  For UAA-based authentication (which is what we use here), use the literal value '*app_client_id*'
  
  #### uaaURL
  This is the URL of an existing UAA service, mentioned in the **Pre-Requisites** section above.  With the service running and a set of credentials in hand (user and password), use the service URL as the value for this variable.
  
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


5. Access the */secure* route again, as in step 1 of the previous section.  Notice that the browser now returns a page that says  *Unauthorized*, instead of not being able to find the page (as in the previous section).  This is because that route has now been defined, as an authenticated route (other routes that have also been defined are */login*, */callback*, */predix-api* and */logout*).  At this point authentication is in place, and your browser session is in an unauthenticated state.  Consequently, accessing such routes results in "Unauthorized" (with the exception of */login*, which redirects to the authentication service's page).

6. Access the */login* route.  Notice that the browser is redirected to the UAA login page.

7. Enter valid credentials in the login page and click on Submit.  Upon successful login, the browser is redirected to the */secure* route, which now shows the text **This is a sample secure route**.  At this point, the browser session is now in the authenticated state, and access to such route is now authorized.  We have just shown how to integrate UAA with authentication-requiring routes/pages in an instance of the Seed.

8. Access the */logout* route.  This will put the browser session back to the unauthenticated state.

9. Access the */secure* route once more.  Notice that we get the *Unauthorized* result again, because the browser session is now back to being unauthenticated.  Accessing the other routes mentioned in step 2 of this section (except */login*) should now return *Unauthorized* as well.  We have just shown how authentication enables access to specific routes or pages, and how the user is given the chance to authenticate when accessing a route while in an unauthenticated state.

### Authenticating All Routes
The previous sections show how authentication can be added to specific routes in the application.  Oftentimes, all defined need to be accessible only after authentication.  To achieve this, follow these steps:

Comment out this line in *server/app.js*:

   ```
    app.use(express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../public')));
   ```

In the same file insert this code inside the *if(uaaIsConfigured) {...}* block, as the last route definition:

   ```
    app.get('/', passport.authenticate('main', {
  	  noredirect: false // redirect a user to the authentication page
      }),
      express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../public'))
    );
   ```

Restart the application.

Access any route, including the default route '*/*'.  Notice that the browser is redirected to the authentication page.  If the route is defined, the browser is redirected to it after successful login by the user.

### Deploying to the Cloud
The previous steps showed how authentication is enabled in a local instance of the Predix UI Seed application.  Ultimately, we want the authentication feature to be part of deployments to the Cloud.  To achieve this, perform these steps:

In the *manifest.yml* file (or your designated manifest file), enable services by uncommenting the *services* section, and enter the name of the UAA instance that will be used.  For example:

   ```
    services
    - my-uaa-service
   ```

In the same file, enter the values for **clientId** and **base64ClientCredential** that were used in the previous sections.  For Example:

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

## Conclusion

This document has shown how to add Authentication to an instance of the Seed, and apply the feature to specific, and later, all routes.  It has also shown how to apply the feature in both local and cloud deployments.  For any questions or issues with this document and/or feature, please submit a github issue to this project.
