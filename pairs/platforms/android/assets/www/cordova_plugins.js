cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.google.cordova.admob/www/AdMob.js",
        "id": "com.google.cordova.admob.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    },
    {
        "file": "plugins/com.connectivity.monitor/www/connectivity.js",
        "id": "com.connectivity.monitor.connectivity",
        "clobbers": [
            "window.connectivity"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.google.cordova.admob": "2.6.3",
    "com.connectivity.monitor": "1.0.2",
    "android.support.v4": "21.0.1",
    "com.rjfun.cordova.extension": "1.0.6",
    "com.google.playservices": "19.0.0"
}
// BOTTOM OF METADATA
});