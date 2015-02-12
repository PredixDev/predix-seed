asset_server
============
This is the root repository of the Predix Asset platform.

This README is an overview based on the last previous release, targeted at readers external 
to the asset group.  As soon as clarity emerges, it will be updated for Asset Service MVP 1.0.

Predix Asset is a REST oriented server.  Consumers use HTTP POST, PUT, DELETE and GET across HTTPS to access resources and 
collections of resources in JSON format.  For the previous release these are the most 
important resources...

## Resources
* **Asset** - Assets have attributes, meters, a parent asset, and more.  
* **Meter** - These are bindings to sensor data.
* **Classification** - Type information primarily used in the creation of new assets and in business logic.  Classifications have a parent, resulting in trees.  These trees create an is-a relationship.
* **~~Part~~** - Not used in MVP 1.0.  More type information.  Parts can have a classification.  
* **~~Template~~** - Not used in MVP 1.0.  How trees of assets should look.  For example an engine specification.


## Important Concepts
**Asset Trees** - Besides attributes and meters, assets can have a single asset parent, resulting in trees.  
These trees create a has-a relationship.  For example, a workstation might have a chair and a computer as children.
In turn the computer might have a monitor and a keyboard as children.  This tree of five nodes 
represents the has-a relationship between assets.

## Example Resources
**Asset JSON**
```javascript
{
  "assetId": "555"
  , "description": "555 description"
  , "uri": "/asset/f37cc21f-23a5-4b9b-89f0-8e1229f90f4b"
  , "parent": "/asset/ae7cc21f-23a5-4b9b-89f0-8e1229f90384"
  , "meters": {}
  , "attributes": {
    "Serial Number": {
      "type": "string"
      , "value": ["1234"]
    },
    "Install Date": {
      "type": "date"
      , "value": ""
    },
    "Manufacture Date": {
      "type": "date"
      , "value": ""
    },
    "Customer Name": {
      "type": "string"
      , "value": ["HAL"]
    },
    "Customer Description": {
      "type": "string"
      , "value": ["HAL"]
    }
  }
}
```

**Classification JSON**
```javascript
{
"name": "TestClassification1"
  , "uri": "/classification/TestClassification1"
  , "obsolete": false
  , "attributes": {
    "Height": {
      , "name": "Height"
      , "type": "string"
      , "value": ["20"]
      , "uom": "Feet"
      , "required": false
      , "unique": false
      , "defaultValue": ""
    }
  },
  "description": "TestClassification"
}
```

## Important Queries

There are lots of possible queries.  These are a sampling

* For all root Classifications - `GET /classification?filter=showRootOnly=true`
* For Assets of a specific Classification - `GET /asset?filter=specification=/classification/<uuid>`
* For Assets based on Attribute value - `GET /asset?filter=<attributeName>=<value>`
* For an asset and related objects including children - `GET /asset/uuid?filter=dependencies=true`
* For children of the parent asset - `GET /asset?filter=parent=/asset/<uuid>`

# Our Asset Server
We now have an asset server running in our space.  Do cf apps to see the URL but currently
use http://asset-server.grc-apps.svc.ice.ge.com/services/asset to see assets.  Change the last term "asset" to "meter" or "classification" to see those objects.    
