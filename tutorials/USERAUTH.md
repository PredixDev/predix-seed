# Predix UI Seed Tutorial : User Authentication

## IMPORTANT NOTE: THIS DOCUMENT IS INCOMPLETE AND BEING ACTIVELY EDITED; IT SHOULD NOT BE USED UNTIL THIS NOTE IS REMOVED

## Introduction
Real-world web applications almost always involve information that is access-controlled.  For this reason one of the most common features needed in a web application is authentication.  Users of an authenticated application will need to login in order to access the information, and perform any further interaction.

This tutorial shows how to add authentication to an instance of the Predix UI Seed.  Specifically, we use an authentication service that has its own page where the user is redirected to enter their credentials.  Upon successful login, the user is redirected again to the Seed.  From there the user is able to further interact with the application until they decide to log out.


### Pre-Requisites
This tutorial requires a running UAA service instance.  Please refer to this [link]() for information on setting up a UAA instance.  Once the service is set up, note its URL, to be used for the steps below.

For this tutorial, we are going to make a route within the Seed application to be gated by such authentication.  We will give the route the name '/secure'.

### Steps
0. Install the Seed and have it running by following the steps in the README document of this project.
1. With the Seed running locally, access the '/secure' route (For example: https://localhost:5000/secure).  You should see a page that says the site is unavailable ('cannot GET').  This is because the route has not been defined yet.

2. Find the 'localConfig.json' file under the 'server' folder.  From this file locate the 3 configuration variables:
  - **clientId**
  - **uaaURL**
  - **base64ClientCredential**
3. Replace the values of these variables with the following:

  ### clientId
  For UAA-based authentication (which is what we are using), use the literal value '*app_client_id*'
  
  ### uaaURL
  The URL of an existing UAA service.  For information on how to set up UAA service, please refer to the link above in Pre-Requisites section.  Once you have the service, use its URL for this configuration variable.
  
  ### base64ClientCredential
  This is a Base64 encoding of the string '*app_client_id*:**\<secret\>**', where '*app_client_id*' is the literal string used for the first configuration variable, and **\<secret\>** is a string value of your choosing.  
  
  In a Mac OS or Unix environment, you can get the value for **base64ClientCredential** by running this command sequence (for example, using the literal 'secret' for the secret value:


    *echo -n app_client_id:secret | base64*

  In a Windows environment, the command **certutil** can be used to generate the same value.  Please refer to this [link](https://technet.microsoft.com/en-us/library/cc732443\(v=ws.11\).aspx) to learn about thiscommand.
  After running the above command in your chosen environment, copy the output (which should be a string) and paste it to the **base64Credential** variable in the configuration file.

  Here is an example of all the configuration variables populated with values in **localConfig.json** :
  
```
    "clientId": "app_client_id",
    "uaaURL": "https://162665f2-e477-488a-93d1-bb33ccb3d568.predix-uaa.run.aws-usw02-pr.ice.predix.io",
    "base64ClientCredential": "YXBwX2NsaWVudF9pZDpzZWNyZXQ=",
```

4. Restart the local application and test the route


5. Include the authentication feature in the distribution package

  Adding the same configuration for the deployed version of the application is done by putting the same 3 values in the deployment manifest file.
  
  After the changes are made to the manifest file, run the gulp distribution task
  
6. Test the authenticated routes

7. Add authentication to the all routes in the application.

8. Test the authentication for the entire application

