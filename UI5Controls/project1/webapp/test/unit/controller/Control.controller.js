/*global QUnit*/

sap.ui.define([
	"project1/controller/Control.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Control Controller");

	QUnit.test("I should test the Control controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
