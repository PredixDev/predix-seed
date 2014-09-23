# grunt-artifactory-artifact
Forked from grunt-nexus-artifact https://github.com/RallySoftware/grunt-nexus-artifact
Slightly enhanced error handling, added authentication and defaults to artifactory context paths
> Download artifacts from JFrog Artifactory artifact repository.
> Publish artifacts to a JFrog Artifactory artifact repository.
> Only works with Mac and Linux

## Why?
If you're using grunt for frontend development and Java for the backend, it is convenient to consolidate dependencies into one repository.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-artifactory-artifact --save-dev
```

or add the following to your package.json file:
```js
{
  "devDependencies": {
    "grunt-artifactory-artifact": "0.2.0"
  }
}
```

Once the plugin has been installed, enabled it inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-artifactory-artifact');
```

## Artifactory Fetch Task
_Run this task with the `grunt artifactory:target:fetch` command._

### Examples
```js
artifactory: {
  client: {
    url: 'http://artifactory.google.com:8080',
    repository: 'jslibraries',
    options: {
      fetch: [
        { id: 'com.google.js:jquery:tgz:1.8.0', path: 'public/lib/jquery' }
      ]
    }
  }
}
```

In grunt, options cascade. If all of your artifacts come from the same artifactory server, you can do the following:
```js
artifactory: {
  options: {
    url: 'http://artifactory.google.com:8080'
  },
  client: {
    options: {
      repository: 'jslibraries',
      fetch: [
        { id: 'com.google.js:jquery:tgz:1.8.0', path: 'public/lib/jquery' }
      ]
    }
  },
  build: {
    options: {
      repository: 'jstools',
      fetch: [
        { id: 'com.google.js:closure:tgz:0.1.0', path: 'tools/closure' }
      ]
    }
  }
}
```


### Options

There are a number of options available.

#### url
Type: `String`

This defines the url of your artifactory repository. This should be the base URL plus port. Ex: `http://your-artifactory-repository:8080`

#### repository
Type: `String`

This defines the name of the repository. _Since this task uses the REST API, the repository is not inferred_

#### fetch
Type: `Array{Object}`

This defines an array of artifactory artifacts to be retrieved from artifactory. Each artifact has config options:

##### group_id
Type: `String`

This defines the group_id of the artifact. Ex: `com.google.js`

##### name
Type: `String`

This defines the name of the artifact. Ex: `jquery`

##### ext
Type: `String`

This defines the extension of the artifact. Ex: `tgz`

##### classifier
Type: `String`

This defines the optional classifier to the artifact name. Ex: `javadoc`

##### version
Type: `String`

This defines the version of the artifact. Ex: `1.8.0`

##### id
Type: `String`

This is a shorthand for `group_id`, `name`, `ext`, `version` and optionally a `classifier`. This defines the id string of the artifact in the following format:
```{group_id}:{name}:{ext}:[{classifier}:]{version}```

Ex:
```
com.google.js:jquery:tgz:1.8.0
```

##### path
Type: `String`

This defines the path where the artifact will be extracted to. Ex: `public/lib/jquery`

## Artifactory package task
The package flag will run the `publish` config to package artifacts. It uses [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress) so the file configuration will be the same.
_Run this task with the `grunt artifactory:target:package` command._

## Artifactory publish task
The publish flag will run the publish config to package and push artifacts up to artifactory. It uses [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress) so the file configuration will be the same.
_Run this task with the `grunt artifactory:target:publish` command._

### Examples
```js
artifactory: {
  options: {
    url: 'http://artifactory.google.com:8080',
    repository: 'jslibraries',
    username: 'admin',
    password: 'admin123'
  },
  client: {
    files: [
      { src: ['builds/**/*'] }
    ],
    options: {
      publish: [{
          id: 'com.mycompany.js:built-artifact:tgz',
          version: 'my-version', 
          path: 'dist/'
      }]
    }
  }
}
```

In this example the `id` config is used, but the version is dropped. It can be specified in the `id` config or specified in the `version` config. This makes it easier to set the version dynamically.

### Options

The options listed here are new or repurposed for publish

#### path
Type `String`

This defines the temporary path for the compressed artifact.

#### files
Type `Array`



This parameter comes from `grunt-contrib-compress`. You can read about it at [github.com/gruntjs/grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress).
There are some differences from the config on `grunt-contrib-compress`. First of all, `ext` is used from the artifact, so it doesn't need to be specified. `mode` is currently not supported. It will auto-configure based on the extension.

# Release History
* 2013-08-08  v0.2.0  Added support for publishing artifacts

----

Original grunt-nexus-artifact contributed by Nicholas Boll of [Rally Software](http://rallysoftware.com)
Forked grunt-artifactory-artifact contributed by David R. Lee (http://www.twitter.com/david_r_lee)
