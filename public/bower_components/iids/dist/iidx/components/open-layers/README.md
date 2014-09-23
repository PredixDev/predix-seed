###An OpenLayers Builder

Because the open source [OpenLayers|http://openlayers.org/] project is huge and does not include a distribution file, we must build it ourselves.  This
project includes OpenLayers as a [Bower|http://bower.io] "devDependency" and includes a grunt `build` task to build the distribution, which is
then checked into source control.

####Usage

If you change the version of the OpenLayers dependency in bower.json, you must also run grunt `build` and check in the
result.

Other DxComponents can then depend on this component via bower and get only the built distributable.