/*global QUnit*/

sap.ui.define([
	"project1/controller/Project1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Project1 Controller");

	QUnit.test("I should test the Project1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
