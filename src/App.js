/*jslint browser: true, debug: true, sloppy: true, stupid: true, todo: true, white: true */
/*global enyo, isNaN */


var 
	kind = require('enyo/kind'),
	FittableRows = require('layout/FittableRows'),
	FittableColumns = require('layout/FittableColumns'),
	Signals = require('enyo/Signals'),
	Control = require('enyo/Control'),
	Button = require('onyx/Button'),
	AppMenu = require('enyo-luneos/AppMenu'),
//	AppMenu = require('webos-lib/AppMenu'),
	LunaService = require('enyo-webos/LunaService'),
	Cookie = require('enyo/Cookie'),
	Panels = require('layout/Panels'),
	logger = require('enyo/logger');
var
	About = require('./About'),
	StandardEntry = require('./StandardEntry'),
	FormulaEntry = require('./FormulaEntry'),
	StandardTests = require('./StandardTests');
	

module.exports = kind({
	name: "App",
	//style: "display: -webkit-flex; -webkit-flex-direction: column;  -webkit-justify-content: center",
	classes: "enyo-fit",
	palm: false,
	components: [
		{
			kind: Signals,
			ondeviceready: "deviceready",
			onbackbutton: "handleBackGesture",
			onCoreNaviDragStart: "handleCoreNaviDragStart",
			onCoreNaviDrag: "handleCoreNaviDrag",
			onCoreNaviDragFinish: "handleCoreNaviDragFinish"
		},
		{name: "tabletop", kind: Control, classes: "tabletop ",	components: [
			{kind: FittableColumns, useFlex: true, classes: "enyo-center", style: "height: 100%;", components: [		// center left to right
				{kind: FittableRows, useFlex: true, classes: "enyo-center", style: "height: 100%;",  components: [		// center top to bottom
					{name: "calculatorHost", kind: Panels,  classes: "calhost ", components: [
						{ name: "standardPanel", kind: StandardEntry },
						{ name: "formulaPanel", kind: FormulaEntry },
						{ name: "standardTestsPanel", kind: StandardTests }
					]},
	//				{kind: Button, caption: "Show App Menu", sytle: "height: 70px;", onclick: "openAppMenu"},
				]}				
			]},
			
		]}, // end tabletop
		{name: "menu", kind: AppMenu, style: "height: 102px; width: 200px; background-color: red;", components: [
			{ content: ("Traditional Style"), style: "height: 34px; width: 200px;", ontap: "selectTraditional" },
			{ content: ("Formula Style"), ontap: "selectFormulaEntry" },
			{ content: ("Tests"), ontap: "selectTestsPanel",
			name: "testsMenuEntry", showing: false },
			{ content: ("About"), ontap: "aboutMe" }
		]},
		{name: "aboutPopup", kind: About},
		{name: "GetDevModeStatus", kind: LunaService, service: "palm://org.webosports.service.devmode/", method: "getStatus", onComplete: "onGetDevModeStatusResponse"}


	],

	create: function () {
		this.inherited(arguments);
		console.log("UP AND RUNNING 0");
		this.log("Singals", Signals);
		this.log("Singals", this.Signals);
		this.log("Singals", Signals.onmenubutton);
		this.log("UP AND RUNNING");
		if (window.PalmSystem) {
			this.$.calculatorHost.setDraggable(false);
		}
		// Magic numbers, sorry.
		//	this.$.menu.setMaxHeight(34 * 3);
		var p = Cookie.getCookie("likePanel");
		if (p = "undefined"){
			p = "standardPanel";
		}
		if (p) {
			this.$.calculatorHost.selectPanelByName(p);
		}
		if (!window.PalmSystem) {
			this.log("Non-palm platform, service requests disabled.");
			return;
		}
		this.palm = true;
		//this.$.GetDevModeStatus.send({});
		
	},
	selectTraditional: function () {
		this.$.calculatorHost.selectPanelByName("standardPanel");
		Cookie.setCookie("likePanel", "standardPanel");
	},
	selectFormulaEntry: function () {
		this.$.calculatorHost.selectPanelByName("formulaPanel");
		Cookie.setCookie("likePanel", "formulaPanel");
	},
	selectTestsPanel: function () {
		this.$.calculatorHost.selectPanelByName("standardTestsPanel");
	},
	aboutMe: function () {
		this.$.aboutPopup.show();
	},
	/* Service response handlers */
	onGetDevModeStatusResponse: function (inSender, inResponse) {
		// Enable the Tests menu item if we are in developer mode
		if (inResponse.status === "enabled") {
			//this.$.menu.setMaxHeight(34 * 4);
			this.$.testsMenuEntry.setShowing(true);
		}
	},
		openAppMenu: function(inSender,inEvent) {
		//this.$.menu.open();
		
		this.log("menu showing", this, inSender, inEvent);
		this.$.menu.show();
		console.log("menu show", this);
	},
});
