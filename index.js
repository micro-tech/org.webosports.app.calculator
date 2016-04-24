    window.Mojo = { relaunch: function (e) {} };
    window.PalmSystem && PalmSystem.stageReady && PalmSystem.stageReady();
    
    var ready = require('enyo/ready');
    
    var App = require('./src');
    
    ready(function () {
        new App().renderInto(document.body);
    });