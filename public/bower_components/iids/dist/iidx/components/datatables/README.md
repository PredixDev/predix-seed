###A Package Manager-optimized version of DataTables

Because the open source [DataTables|http://datatables.net/] project is huge and does not play well with package managers such as [Bower|http://bower.io], we host this optimized proxy version.  This
project includes DataTables as a bower "devDependency" and includes a grunt `build` task to build the distribution, which is
then checked into source control.

####Usage

If you change the version of the DataTables dependency in bower.json, you must also run grunt `build` and check in the
result.

Other DxComponents can then depend on this component via bower and get only the built distributable.