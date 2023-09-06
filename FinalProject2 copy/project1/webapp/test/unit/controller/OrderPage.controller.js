/*global QUnit*/

sap.ui.define([
	"project1/controller/OrderPage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("OrderPage Controller");

	QUnit.test("I should test the OrderPage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
