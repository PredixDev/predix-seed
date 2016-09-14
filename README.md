## Predix Seed 2.0 - Polymer Seed App

# What is the Polymer Seed App?
The Polymer Seed App is a web application starter kit aimed to accelerate Predix development.   It provides fundamental code and examples on features such as branding, theming, layout, navigation, responsiveness, organization of views, data presentation and micro-services integration, to name some.  Predix web application projects can directly use or customize these pre-built features to achieve prototype or production state much faster than through building everything from scratch.  And while the seed app provides working examples on such features based on best practices, it also allows for their easy addition, omission or replacement.  This provides a framework that is both solid and flexible, and lets developers focus on implementing functionality, instead of having to make boilerplate concerns work.

As its name indicates the Polymer Seed App is built on [Polymer](http://www.polymer-project.org).  Based on web technology standards, Polymer aims to use native browser capabilities as much as possible over JavaScript implementations.  And where there are differences in what features browser brands currently offer, polyfills are provided towards consistent cross-browser behavior.  By adopting the Polymer strategy for the frontend the seed app ensures the highest consistency in application behavior across browsers, as well as compatibility with future standards.

Much of the frontend components provided in Polymer Seed App are from [Predix UI Components](http://predixdev.github.io/predix-ui/), which are also built on Polymer and web component technology.  These re-usable UI building blocks have been designed to provide for the most common user interface patterns.  Both built upon Polymer, the seed app and Px Components work together out-of-the-box.  Px Components can be used independently, or in combination with one another and with the Seed App.  This allows consistent behavior, look-and-feel, and high code re-use.

The backend of the Polymer Seed App is implemented as a NodeJS/Express web server.  It presently includes a minimal set of public modules and a couple of Predix-specific modules for session and proxy concerns.  Similar to the frontend the backend code base is also highly-customizable, even replaceable by another server application, if so desired.  [NodeJS](http://nodejs.org) is a server-side application framework based on JavaScript.  It enjoys strong growth and huge adoption in the Open-Source community.

## Getting Started

### Get the source code
Make a directory for your project.  Clone or download and extract the seed in that directory.
```
git clone https://github.com/PredixDev/predix-seed.git
```

### Install tools
If you don't have them already, you'll need node, bower and gulp to be installed globally on your machine.
1. Install [node](https://nodejs.org/en/download/).  This includes npm - the node package manager.
2. Install [bower](https://bower.io/) globally `npm install bower -g`
3. Install [gulp](http://gulpjs.com/) globally `npm install gulp -g`

### Install the dependencies
Change directory into the new project you just cloned, then install dependencies.
```
npm install
bower install
```

## Running the app locally
The default gulp task will start a local web server.  Just run this command:
```
gulp
```
Browse to http://localhost:5000.
Initially, the app will use mock data for the views service, asset service, and time series service.
Later you can connect your app to real instances of these services.

## Running in Predix Cloud
With a few commands you can build a distribution version of the app, and deploy it to the cloud.

### Create a dist version
Use gulp to create a distribution version of your app.
You will need to run this command during development every time before you cf push to make the latest dist.
```
gulp compile:all
```

### Deploy to the cloud
First make sure you're logged in to the Predix Cloud using the `cf login` command.
Then deploy your app using this command:
```
cf push my-seed-app
```
You can give the app any unique name you like.  "my-seed-app" is just an example.

## OPTIONAL: Setup Predix service instances
Once you're ready to actually start developing, you'll need to setup your own UAA and Views service.
_TODO: link to some tutorials?_

### UAA
1. Create a UAA instance following [these steps](https://www.predix.io/docs/?r=250183#XpKGAdQ7-Q0CoIStl).
	* Note: Make a note of the client secret; you will need it later.
2. Get the url of that UAA instance.  After you create an instance of UAA through the Predix.io console, click on the "Configure Service Instance" button.  On the login screen for the UAA dashboard, copy the URL from the first text box, and save that for later use.  You'll use that URL as the trusted issuer, when you create instances of other Predix services.

### Predix Asset
_TODO_

### Predix Time series
_TODO_

### Views
Create a Views instance following [these steps](https://www.predix.io/docs/?r=250183#yyKdebUl).  Use the UAA issuerId that you gathered above for your trusted issuer.
* Note: You must use underscores in your service instance name currently (my_view_service, NOT my-view-service)

### Redis
Create a Redis instance, which is used by Express for storing your session.
```
cf cs redis <plan> <instance_name>
```
_TODO: Explain how to modify app.js to use redis for session._

## Push to the cloud
Now that you have the required services created, we can configure our web app to use them.

1. Update manifest.yml

	Change the name field in your manifest.yml.  
	Uncomment the services section, and change the names to match your service instances.
	Uncommen the clientId and base64ClientCredential environment variables and enter the correct values for your UAA client.
	```
	---
	applications:
	  - name: polymer-predix-seed-sysint
	    memory: 64M
	    buildpack: nodejs_buildpack
	    command: node server/app.js
	#services:
	 # - <your-name>-secure-uaa-instance
	 # - <your-name>-timeseries-instance
	 # - <your-name>-asset-instance
	env:
	    node_env: cloud
	    uaa_service_label : predix-uaa
	    # Add these values for authentication in the cloud
	    #clientId: {Enter client ID, e.g. app-client-id, and place it here}
	    #base64ClientCredential: dWFhLWNsaWVudC1pZDp1YWEtY2xpZW50LWlkLXNlY3JldA==
	```

4. Push to the cloud.

	```
	cf push
	```

# Old stuff. Remove from README, and point to docs or tutorials?
All this views service config stuff doesn't belong here.

## Get Views service url and instance id
The cf env command for your app will provide you the details of the services your app is bound to.
```
cf env <your-app>
```
In VCAP_SERVICES, look for the "predix-views" section.  Write down the instanceId and uri.

## Set up UAA client
You are not able to see the login page because you have a fresh UAA instance which is not setup with an OAuth2 client.

1. Target your UAA and Log in as Admin
Follow [these steps](https://www.predix.io/docs/?r=913171#JA5oCs7).  You will need the UAA uri and client secret that you saved previously.

2. Create OAuth2 client

	First, you will need to generate a client secret and save it for later.
	```
	# example, for Mac
	openssl rand -base64 32
	```
	Next, we will continue using uaac to add a client for your application.  Use the interactive mode (-i) to add your client.
	```
	uaac client add <your-client> -i
	```
	At the prompts, specify:
	* client secret: the secret that you generated above
	* scope: openid scim.me
	* authorized grant types: refresh_token authorization_code
	* authorities: openid scim.me uaa.resource
	* autoapprove: openid scim.me
	* just hit return for any other options

	See [the documentation](https://www.predix.io/docs/?r=913171#uAyBrT9y) for more detailed information about creating clients and the UAA options.

3. Update nginx.conf with your client

	Change the $client_id in nginx.conf to the client name you just created.
	```
	set $client_id <your-client>;
	```
	Generate the UAA authorization header for your client by base64 encoding your client and client's secret.
	```
	base64 encode the following string: "<client-name>:<client secret>"
	```
	Finally, set the $uaa_authorization_header to Basic authentication with this header.
	```
	set $uaa_authorization_header  "Basic <your-auth-header>";
	```
4. cf push

	If you cf push again, you should now be successfully redirected to a login page, but you don't have anyone to log in as.

## Set up authorized user
Now that you can see the login page, let's set up a user that we can log in with.

1. Add a user

	Add a user to your UAA instance by providing a user name, email address, and password.
	```
	uaac user add rocket --emails rocket@example.com -p Gu@rdian5
	```

2. cf push

	Now when you cf push, you should be able to login as the user you set up above.  After you login, you should be redirected back to the seed application where you can see the blank page and dashboard.  But, when you select a context, you don't have any views displayed.


## Add views to your Views service instance
To add views and cards to your Views service, you can use the tool of your choice (for example, Postman) to hit your Views service endpoint with the proper headers.

### Make sure the Views service is up
Do a GET request to your views service url that we just found.

You should get a 200 OK response that has a started and uptime, which show that the service is up and running successfully.

### Give user permission to see views
The first thing we need to do is give our dummy user permission to see the views, which the following steps walk you through.  For more information on creating groups and scopes, see [the documentation](https://www.predix.io/docs/?r=913171#RulzoBew).

1. Create a group in your UAA instance for views
	```
	uaac group add views.zones.<your-views-instance-id>.user

	# example:
	uaac group add views.zones.1234567890.user
	```
2. Add the user(s) you created earlier to this group
	```
	uaac member add views.zones.<your-views-instance-id>.user <your-user>

	# example:
	uaac member add views.zones.1234567890.user rocket
	```
3. Update your client scope to include this group

	Use uaac to get your current client scope, and add the group you just created to this list.
	```
	uaac client get <your-client>
	uaac client update <your-client> --scope views.zones.<your-views-instance-id>.user,<other>,<scopes>

	# example:
	uaac client update my-client --scope openid,views.zones.123456790.user,scim.me
	```
4. Update your client autoapprove to include this group

	Use uaac to get your current client autoapprove, and add the group you just created to this list.
	```
	uaac client get <your-client>
	uaac client update <your-client> --autoapprove views.zones.<your-views-instance-id>.user,<other>,<autoapproves>

	# example:
	uaac client update <your-client> --autoapprove openid,scim.me,views.zones.<your-views-instance-id>.user
	```

### Understanding the headers

Do a GET request to /api/decks, with no headers specified.
```
<your-views-service-url>/api/decks
example: https://my-views-service.predix.io/api/decks
```

You should get a 500 response because you are missing two mandatory headers.

1. predix-zone-id header

	The predix-zone-id header is used for multi-tenancy; it specifies which views service instance is yours.

	Set the predix-zone-id header to your Views instance id that you pulled earlier from VCAP_SERVICES.

	```
	predix-zone-id : <your-views-instance-id>
	```

2. Authorization header

	The Authorization header requires a JWT token which includes information about the user and their roles.

	To get the JWT token, you will need to log in locally through your application.
	* Run your app and go to localhost:9000 in your browser
	* Sign in
	* In the terminal that you ran your app from, you will see the token printed out (this only happens in development mode).
	* Copy this token

	Set the Authorization header to your token.
	```
	Authorization : bearer <your-token>
	```

Repeat the request to /api/decks with both headers.  You should (finally) get back an empty array of data!

### Add the dummy data to your views service
We will just quickly tell you how to add the dummy data in the demo to your Views service instance.  For more information on the API, see the [documentation](https://www.predix.io/docs/?r=182801#IZkY1Ssd).

Note: You may also need to set Content-Type header to application/json for the POSTs below.

#### Add decks
Add the 3 decks that are in the seed app.

	POST /api/decks

	[
	  {
	    "title": "Overview"
	  },
	  {
	    "title": "Detail"
	  },
	  {
	    "title": "Datagrid View"
	  }
	]


#### Add cards
Add the 4 cards that are in the seed app.

	POST /api/cards

	[
	  {
	    "title": "datagrid card",
	    "slug": "datagrid-card"
	  },
	  {
	    "title": "widgets card",
	    "slug": "widgets-card"
	  },
	  {
	    "title": "gist card",
	    "slug": "gist-card"
	  },
	  {
	    "title": "time series card",
	    "slug": "time-series-card"
	  }
	]


#### Put the cards in the decks
Add the cards to the specified decks.  The ids may be different since the bulk creates are asynchronous, so you may need to change the ids accordingly.

Overview deck has widgets and gist card (ids may change)

	POST /decks/1/cards/add

	["2", "3"]


Detail deck has time series card (ids may change)

	POST /decks/2/cards/add

	["4"]


Datagrid View deck has datagrid card (ids may change)

	POST /decks/3/cards/add

	["1"]



#### Tag the decks
Tag the decks with appropriate tags so we can filter which contexts they will be displayed for.  In this simple example, the Parent Asset has the tag parent and the Child Asset has the tag child.

Overview deck is shown for the parent tag (ids may change)

	POST /api/decks/1/tags

	[{"value":"parent"}]


Detail deck is shown for the child tag (ids may change)

	POST /api/decks/2/tags

	[{"value":"child"}]


Datagrid View deck is shown for the parent tag (ids may change)

	POST /api/decks/3/tags

	[{"value":"parent"}]


### View the final result!
cf push again, and your application should now look just like the demo seed app.

## Questions?
- Ask questions and file tickets on <a href="https://www.predix.io/community" target="_blank">https://www.predix.io/community</a>.

# Copyright
Copyright &copy; 2015 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
