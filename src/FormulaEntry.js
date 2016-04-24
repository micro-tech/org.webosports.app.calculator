/*jslint browser: true, debug: true, sloppy: true, stupid: true, todo: true, white: true */
/*global enyo, isNaN */


var 
	kind = require('enyo/kind'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Toolbar = require('onyx/Toolbar'),
	IconButton = require('onyx/IconButton'),
	Button = require('onyx/Button'),
	Parser = require('math-eval/parser'),
	logger = require('enyo/logger');


module.exports =kind({
    name: "FormulaEntry",
    kind: FittableRows,
    style: "heigt: 800px; background-color: #777; padding: 5px; color: white; border-radius: 16px;",
    components: [
		{kind: Toolbar, style: "height: 20%; margin-bottom: 5px;", components: [
			{name: "Result", style: "font-size: 2em; font-weight: bold; color: white;"}
	]},
	{kind: FittableColumns, style: "margin-bottom: 5px;", components: [
		{kind: Toolbar, style: "height: 48px; margin-left: 5px; margin-right: 5px; text-align: right;", fit: true, components: [
			{ name: "Formula", style: "font-size: 1em; color: white;"},
			{ kind: IconButton, src: "assets/Calc-backspace.png", style: "width: 32px; height: 32px", ontap: "backspaceTapped" }
		]}
	]},
	{kind: FittableRows, fit: true, style: " height: 600px; width: 500px;",
	defaultKind: kind(
		{kind: FittableColumns,	style: "height: 15.5%; margin: 0.5%;", defaultKind: kind(
			{kind: Button, classes: "function-button", style: "height: 81px; width: 24%; margin: 0.5%; border-radius: 8px; font-size: 1.8em; font-weight: bold;", ontap: "keyTapped", allowHtml: true})
	    }),
	    components: [
		{components: [
			/**{style: "visibility: hidden;"},*/
			{content: "\u221a", value: "sqrt("},
			{content: "("},
			{content: ")"},
			{content: "^", style: "margin-right: 0;"}
		]},
		{components: [
			{content: "ln", value: "ln("},
			{content: "log", value: "log("},
			{content: "x<sup>2</sup>", value: "^2"},
			{content: "/", style: "margin-right: 0;"}
		]},
		{
		    components: [
			{
			    content: "7",
			    classes: "number-button"
			},
			{
			    content: "8",
			    classes: "number-button"
			},
			{
			    content: "9",
			    classes: "number-button"
			},
			{
			    content: "*",
			    style: "margin-right: 0;"
			}]
		},
		{
		    components: [
			{
			    content: "4",
			    classes: "number-button"
			},
			{
			    content: "5",
			    classes: "number-button"
			},
			{
			    content: "6",
			    classes: "number-button"
			},
			{
			    content: "-",
			    style: "margin-right: 0;"
			}]
		},
		{
		    components: [
			{
			    content: "1",
			    classes: "number-button"
			},
			{
			    content: "2",
			    classes: "number-button"
			},
			{
			    content: "3",
			    classes: "number-button"
			},
			{
			    content: "+",
			    style: "margin-right: 0;"
			}]
		},
		{
		    components: [
			{
			    content: "C",
			    classes: "cancel-button",
			    ontap: "cancelTapped"
			},
			{
			    content: "0",
			    classes: "number-button"
			},
			{
			    content: ".",
			    classes: "number-button"
			},
			{
			    content: "=",
			    style: "margin-right: 0;",
			    ontap: "equalsTapped"
			}]
		}
	    ]
	}],
    //Action Handlers
    keyTapped: function (inSender) {
	this.formulaAppend(inSender.value || inSender.getContent());
    },
    formulaAppend: function (str) {
	this.$.Formula.setContent(this.$.Formula.getContent() + str);
    },
    equalsTapped: function () {
	this.$.Result.setContent(this.calculate(this.$.Formula.getContent()));
    },
    calculate: function (formula) {
	try {
	    return Parser.evaluate(formula);
	}
	catch (err) {
	    logger.log(err);
	    return "Invalid Input";
	}
    },
    cancelTapped: function () {
	this.$.Result.setContent("");
	this.$.Formula.setContent("");
    },
    backspaceTapped: function () {
	var formula = this.$.Formula;
	formula.setContent(formula.getContent().substr(0, formula.getContent().length - 1));
    }
});
