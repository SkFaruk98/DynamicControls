/*global QUnit*/

sap.ui.define([
	"project1/controller/Faruk.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Faruk Controller");

	QUnit.test("I should test the Faruk controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
