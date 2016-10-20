# Predix UI Seed Tutorial : User Authentication

## IMPORTANT NOTE: THIS DOCUMENT IS INCOMPLETE AND BEING ACTIVELY EDITED; IT SHOULD NOT BE USED UNTIL THIS NOTE IS REMOVED

## Introduction
Web applications almost always involve information that is not for public consumption, and that should be access-controlled.  For this reason one of the most common features needed in a real-world web application is authentication.  Users of the application will need to login in order to access the information, and perform any further interaction.

This tutorial shows how to add authentication (login/logout) features to an instance of the Predix UI Seed, specifically the type involving a separate authentication site/service such as UAA.


### Pre-Requisites
Adding authentication for the Seed requires a running UAA service instance.  Please refer to this [link]() for information on setting up a UAA instance.  Once the service is set up, note its URL, to be used for the steps below.

For this tutorial, we are going to make a route within the Seed to be UAA-authenticated.  We will give the route the name '/secure'.

### Steps
0. Install the Seed and have it running by following the steps in the README.
1. With the Seed running locally, access the '/secure' route (For example: https://localhost:5000/secure).  You should see a page that says the site is unavailable ('cannot GET').  This is because the route has not been defined yet.

2. Find the 'localConfig.json' file under the 'server' folder.  From this file locate the 3 configuration variables:
  - clientId
  - uaaURL
  - base64ClientCredential
3. Replace the values of these variables with the following:

  ### clientId
  For UAA-based authentication (which is what we are using), use the value 'app_client_id'
  
  ### uaaURL
  The URL of an existing UAA service.  For information on how to set up UAA service, please refer to the link above in Pre-Requisites section
  
  ### base64ClientCredential
  This is a Base64 encoding of the string 'app_client_id:<secret>', where 'app_client_id' is the string used for the first configuration variable, and <secret> is a string value of your choosing.  
  
  In a Mac OS or Unix environment, you can get the value for base64ClientCredential by running this command (for example, using the literal 'secret' for the secret value:
    echo -n app_client_id:secret | base64
  In a Windows environment, the command 'certutil' can be used to generate the same value.  Please refer to this [link](https://technet.microsoft.com/en-us/library/cc732443\(v=ws.11\).aspx) to learn about the command.
  After running the command, copy the output (which should be a string) and paste it to the base64Credential variable in the configuration file.
  
