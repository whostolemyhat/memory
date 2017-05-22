cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.connectivity.monitor.connectivity",
        "file": "plugins/com.connectivity.monitor/www/connectivity.js",
        "pluginId": "com.connectivity.monitor",
        "clobbers": [
            "window.connectivity"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.connectivity.monitor": "1.0.2",
    "com.google.playservices": "19.0.0",
    "cordova-plugin-extension": "1.2.9",
    "cordova-plugin-inappbrowser": "1.2.1"
};
// BOTTOM OF METADATA
});