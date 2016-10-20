# Predix UI Seed Tutorial : User Authentication

## Introduction
Web applications almost always involve information that is not for public consumption, and that should be access-controlled.  For this reason one of the most common features needed in a real-world web application is authentication.  Users of the application will need to login in order to access the information, and perform any further interaction.

This tutorial shows how to add authentication (login/logout) features to an instance of the Predix UI Seed, specifically the type involving a separate authentication site/service such as UAA.


### Pre-Requisites
Adding authentication for the Seed requires a running UAA service instance.  Please refer to this [link]() for information on setting up a UAA instance.  Once set up, note the URL to be used for the steps below.

### Steps

0. Install the Seed and have it running by following the steps in the README.
1. With the Seed running locally, access the '/secure' route (For example: https://localhost:5000/secure).  You should see a page that says the site cannot be reached.  This is because the route has not yet been defined.
2. Find the 'localConfig.json' file under the 'server' folder.  From this file locate the 3 configuration variables:
  - clientId
  - uaaURL
  - base64ClientCredential
3. Replace the values of these variables with the following:

  clientId
  For UAA-based authentication (which is what we are using here), use the value 'app_client_id'
  
  uaaURL
  The URL of an existing UAA service.  For information on how to set up
