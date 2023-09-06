sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller,History) {
    'use strict';
    return Controller.extend("project1.controller.View2",{
        onInit:function(){

        },
        onClickNavback:function(){
             let ohistory=History.getInstance();
             let oPrevioushash=ohistory.getpreviousHash();
             if(oPrevioushash!=undefined){
                window.history.go(-1);
             }
             else{
                let oRouter=this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteOrderPage")
             }
        }
    })
    
});