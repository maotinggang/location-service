#Change something for webpack

1.  Modified: log4js/lib/configuration.js
    class Configuration/tryLoading
    return require(modulePath)->return require('./appenders/file')

2.  Delete:express/lib/view.js
    function View
    var fn = require(mod).\_\_express

3.  path:ls-api/src/lib/compute.js
    require()
    'C:/node/ble.node'

4.  path:ls-api/src/lib/compute.js
    addon.ble()
    'C:/node/smartpos_x64.dll'

5.  Modified:ls-api/src/http/app.js
    app.use(express.static(path.resolve(\_\_dirname, '../../../ls-vue/dist'))) for development
    app.use(express.static(path.resolve(process.cwd(), './dist'))) for production
