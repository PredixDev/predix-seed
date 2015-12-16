#Predix Experience 2.0 Seed
Dashboard Seed is an application that uses Px Web Components and <a href="https://github.com/PredixDev/px-library-design/" target="_blank">Px UI Elements</a> inside an Angular application.

## To Run the Dashboard Seed

### Get the source code
Make a directory for your project.  Clone or download and extract the seed in that directory.
```
git clone
```

### Install the dependencies
```
npm install
bower install
```

### Create a dist version
Use grunt to create a distribution version of your app, which will be located in the dist folder along with the nginx configuration files.  You will need to run this command during development every time before you cf push to make the latest dist.
```
grunt dist
```

## Setup services for your own development
Once you're ready to actually start developing, you'll need to setup your own UAA and Views service.

### UAA
1. Create a UAA instance following [these steps](https://www.predix.io/docs/?r=250183#XpKGAdQ7-Q0CoIStl).
	* Note: Make a note of the client secret; you will need it later.
2. Get the url of that UAA instance
	1. Locate any application you have running on cloud foundry.  If you don't have one, you'll have to push some app up there.
	2. Follow [these steps](https://www.predix.io/docs/?r=250183#sXp7cw5P-Q0CoIStl) to bind your dummy app to UAA.
	3. Save the uri and issuerId of your UAA instance.

### Views
Create a Views instance following [these steps](https://www.predix.io/docs/?r=250183#yyKdebUl).  Use the UAA issuerId that you gathered above for your trusted issuer.
* Note: You must use underscores in your service instance name currently (my_view_service, NOT my-view-service)

### Redis
Create a Redis instance, which is used by nginx for storing your session.
```
cf cs redis <plan> <instance_name>
``` 

## Push to the cloud
Now that you have the required services created, we can push to the cloud for the first time.

1. Update manifest.yml
	
	You'll need to change these fields in your manifest.yml before pushing to the cloud.
	```
	  - name: my-predix-seed # change this to your application name
	    services:
	            - your_redis_instance # change this to your redis service instance name
	            - your_view_service_instance # change this to your view service instance name
	    env:
	      UAA_SERVER_URL: https://your-uaa-instance.grc-apps.svc.ice.ge.com # change to your UAA instance url
	      REDIS: redis # change this to the name of the Redis service in your marketplace (when you do cf m).  It may be redis, or something else
	```
2. Update View service reference in nginx.conf

	You need to update nginx.conf (in the dist folder) wherever it has references to predix_seed_view_service to the name of your_view_service_instance, which is whatever you specified in step 1.

	```
	# for example, from
	proxy_set_header    predix-zone-id   "<%= ENV["vcap_service_predix_seed_view_service_instanceId"] %>";
	proxy_pass  "<%= ENV["vcap_service_predix_seed_view_service_uri"] %>";
	
	# to (assuming you changed your_view_service_instance to my_special_views_service in your manifest.yml)
	proxy_set_header    predix-zone-id   "<%= ENV["vcap_service_my_special_views_service_instanceId"] %>";
	proxy_pass  "<%= ENV["vcap_service_my_special_views_service_uri"] %>";
	```

3. Make a unique session_secret and set it in nginx.conf.
	
	```
	# example, for Mac
	openssl rand -base64 32
	```
	```
	set $session_secret <my-session-secret>;
	```
4. Push to the cloud. 

	```
	cf push
	```
	
    If your app is started successfully, go to the url that is printed out. You should see your app running, and it will redirect to a page with a message __"Uh oh. Something went amiss"__.  
    
    * Note: This is just the first time pushing your application to cloudfoundry. You will need to push a few more times before completing the setup. 
    
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

## Update grunt for local development

Node and grunt are great for development, but we will have to configure them separately.

All the settings you will need to touch are at the top of tasks/options/connect.js.

1. UAA

	Update the uaa object with:
	* clientId - your client
	* serverUrl - your UAA instance url (like https://my.uaa.instance.predix.io)
	* base64ClientCredential - the authorization header you used above ```(base64(<client-name>:<client secret>))```
		* do NOT include "Basic ", just the base 64 string

	```
	uaa: {
	    clientId: '<your-client>', 
	    serverUrl: '<your-server-url>', 
	    defaultClientRoute: '/about',
	    base64ClientCredential: '<your-client-credential>'
	},
	```

2. Views

	Update the view-service proxy object with:
	* url - your view service url, with /api$1 at the end of it (like http://my-view-service.predix.io/api$1)
	* instanceId - your view service instance id

	```
	proxy: {
	'/api/view-service(.*)': {
	  url: '<your-view-service-url>/api$1',
	  instanceId: '<your-view-service-instance>'
	}
```

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


