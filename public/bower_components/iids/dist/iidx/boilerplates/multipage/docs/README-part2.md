## The CSS/LESS <a id="the-css"></a>
### The CSS
The CSS for the IIDS is based on [Twitter Bootstrap](http://twitter.github.com/bootstrap/), a popular framework for writing responsive web apps. Out of the box the IIDS comes with two themes, **classic** and **inversion**. For this tutorial we'll be using the classic theme. Take a look at the `www/css` folder and you should see two subfolders, `app` and `themes`. The `themes` folder contains all of the CSS for the IIDS in both minified and unminified files. We've included the unminifed CSS to help you debug and explore but we recommend that you don't serve unminified code in a production environment. Also you should never edit any of the CSS in the `themes` folder. Instead we recommend that you override styles in your own CSS files. The `app` folder contains CSS specific to our app and it's in this folder that you'll be placing all of your CSS files. In this case we only have one file, `style.css` but it's very possible that you'll need to split your CSS into multiple files. For guidance on how to organize and structure your CSS we recommend the [SMACSS](http://smacss.com/) architecture. SMACSS is part of a new school of CSS design patterns often refered to as [OOCSS.](https://github.com/stubbornella/oocss/wiki/faq) If you've never heard of or used OOCSS definitely take a moment and read through some of the material. It just might change your life :)

### The LESS
In this release we've included the LESS files that go into the making of the IIDS. Open up the `www/less` folder and you should see three subfolders, `app`, `libs` and `themes`, as well as two standalone files `base.less` and `base.responsive.less`. If you plan to use LESS in your project definitely spend some time exploring the contents of these folders. There are many useful mixins and variables which you can repurpose in your own scripts. Similar to the rules governing the CSS folders, you shouldn't edit any of the LESS files that come with the IIDS. Instead you can override them by creating your own LESS files in the `app` folder.

## Compiling with Grunt <a id="compiling"></a>
For this sample project we're using [grunt.js](http://gruntjs.com/) to compile everything down to a production ready package. Grunt is a wonderful tool written in [Node.js](http://nodejs.org/) which has many of the same features of Rake or ANT.

### Setup
There are a few dependencies you'll need to install before using grunt. If you don't already have Node.js and npm setup you can [download them from the Node.js website.](http://nodejs.org/) NPM is included in the Node.js installer so you shouldn't need to install it separately.

After you've installed both Node and npm it's time to install grunt. NPM makes this extermely easy, just type `npm install -g grunt`

Once you have grunt installed take a moment to read through the [documentation.](https://github.com/gruntjs/grunt/blob/master/docs/toc.md) Unfortunately covering the full range of what grunt can do is outside the scope of this article but you should be able to follow along with the docs and our example gruntfile to get up to speed.

#### grunt.js
This is our **gruntfile** and it drives our entire build process. If you've ever worked with ANT, Rake, Make, Cake, *ake before the idea of a build file should be pretty familiar. In a nutshell we'll use this file to outline a number of build tasks which we then execute from the command line.

#### options.js
This file contains configuration options for r.js, the require.js compiler. Rather than put them all into the gruntfile I've separated them into their own file which is required in grunt.js (look for the line `var opts = require('./options')`). There are a ton of configuration options available for r.js, for a full list [checkout this example build file.](https://github.com/jrburke/r.js/blob/master/build/example.build.js) We've given you everything you need to get up and running but definitely explore the [r.js documentation](http://requirejs.org/docs/optimization.html) and the [multipage-shim example project.](https://github.com/requirejs/example-multipage-shim)

#### package.json
The `package.json` file is used by npm and grunt to identify important information about our project and its dependencies. 

``` js
{
  "name": "multipage-demo",
  "author": "General Electric",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "grunt-contrib-mincss":       "0.3.x",
    "grunt-contrib-requirejs":    "0.3.x",
    "grunt-contrib-clean":        "0.3.x"
  }
}
```
For a comprehensive and interactive list of package.json properties [checkout this helpful cheatsheet.](http://package.json.jit.su/) For our purposes we primarily care about the `devDependencies` section which lists all of the files we'll need to accomplish our grunt tasks. To install these dependencies just type `npm install`. If you get a page full of errors telling you to run the command as administrator then you might want update the permissions on your `/usr/local` folder.

```
sudo chown -R $USER /usr/local
```

For a fuller explanation on this process [see this article](http://howtonode.org/introduction-to-npm) by Isaac Schlueter, creator of NPM.

Also note that if you're trying to use NPM and you're on a GE proxy you might need to add the proxy information to your profile. Typically I do this in bash by creating a `.bash_profile` file in my user's directory and adding the following lines:

```
HTTP_PROXY="http://some-GE-proxy.com:80"
export HTTP_PROXY
```
You'll need to restart your session and npm should now pickup on this ENV variable and route its requests properly.

#### node_modules
If all went well with `npm install` you should now have a folder called `node_modules`. This is where npm stores its downloaded packages. You should avoid adding anything to this folder directly as it's primarily for npm.

### Building
Open up `grunt.js`, our *gruntfile*, and take a look around. We've gone ahead and created three tasks to get you started: `clean`, `requirejs` and `mincss`. These tasks are all part of the [grunt-contrib](https://github.com/gruntjs/grunt-contrib) library, a collection of common grunt tasks housed under one roof. If you were following along then you've already installed the necessary files to run these tasks. If not then now is a good time to run `npm install` from the root of the project. If you're impatient and you've got everything installed type `grunt` into the command line from the root of your project.

Hopefully if all goes well you'll have a shiny new directory called `www-release`. Checkout `www-release/css/app/style.css` to see how it has minified our CSS. Also take a look at `www-release/js/app/main1.js` to see how r.js has combined and minified our page specific js. This last part might be a little confusing but it's important to understand so let's dig into the specifics.

### r.js
*This section is rather advanced and tricky. You might need to read through it a few times and experiment with the sample project. Don't get discouraged! This topic isn't easy to grasp but it's well worth the effort.*

Let's examine the structure of our app. Each page is driven by a model, located in the `js/models` folder. Each model extends an object known as `BasicModel` which is located in `js/models/basicModel.js`. If we want to categorize our models we could say that `BasicModel` is **common** to the entire application and `models/model1.js` and `models/model2.js` are **page-specific**. To effectively use r.js we want to separate the common code from the page-specific code. We'll then compile and concatenate all of the common code into one file, `common.js`, and we'll compile any page specific code into the `main.js` file for that page (`main1.js` for `page1.html` and `main2.js` for `page2.html`). The name `common.js` plays a double role in the world of require.js and r.js so it's easy to get tripped up here.

Take a look at `www/js/common.js`. You'll see it contains all of the configuration options for require.js. It's important that these configuration options get loaded before any other files that require.js uses. And it's also important that this file get loaded on every page. If you refer back to `www/page1.html` you'll notice we're doing this down at the bottom.

``` html
<script src="js/vendor/require-jquery.js"></script>
<script type="text/javascript">
// Load common code that includes config,
// then load the app logic for this page.
require(['./js/common'], function (common) {
  //js/common sets the baseUrl to be js/ so
  //can just ask for 'app/main1' here instead
  //of 'js/app/main1'
  require(['app/main1']);
});
</script>
```

So if we were to take all of the code that is common to our application, for instance `BasicModel`, and we wanted to toss it into one file that gets loaded on every single page then `common.js` would be a good place.

Now take a look at `www-release/js/common.js. Although the code is minified you can see that it contains all of our configuration options. Do a find for "basicModel" and you'll see something familiar.

``` js
define("app/models/basicModel",[],function(){function e(e,t){this.title=e,this.percentComplete=t}return e.prototype.getTitle=function(){return this.title},e.prototype.getPercentComplete=function(){return this.percentComplete},e})
```
That's `BasicModel` minified and combined into the `common.js` file in our release dir. How did it get there? Remember we created another file called `options.js` which configures r.js. Take a look at `options.js` now. We pass `options.js` to the grunt task which drives r.js. You'll notice in `options.js` there's a `modules` property which details which code is common and which is page-specific. Here you can see that the `common` module includes `app/models/basicModel`. Meanwhile the page-specific modules only include the main files for each page. Since each main file is full of `require` calls, r.js will walk through the list of dependencies and minify/concat them all into each page's main file. This way we can *significantly* cut down on the number of HTTP requests we're using for each page. Play around with the module settings in `options.js` to get a feel for how all of this works. Create a new .js file and add it to the include section of the `common` module. Or try removing the `BasicModel` from your common layer to see how everything blows up. This is one of those concepts that you'll get only through interacting with it so break it, bend it and rearrange the bits till it all makes sense.

## Conclusion <a id="the-end"></a>
Well if you've made it this far you've hopefully understood how to setup your first IIDS project. You can use this project as a boilerplate or a helpful guide to refer back to.

Finally here's a list of useful links to further your exploration into the IIDS and other GE Design Systems. Feel free to reach out to the team on the GE Colab page for the IIDS and let us know your thoughts. Thanks!

- [GE Software Design Hub](http://gesdh.com)
- [IIDS on DevCloud](https://devcloud.swcoe.ge.com/devspace/display/IIDS/Home)
- [GE Colab](http://colab.ge.com/dashboard/canvas/v/4fff01e6eed5552d77000457)