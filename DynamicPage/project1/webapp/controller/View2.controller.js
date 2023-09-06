sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History) {
        "use strict";

        return Controller.extend("project1.controller.View2", {
            onInit: function () {
            //   this.getOwnerComponent().getRouter().getRoute("View2").attachRouterMatched("View2",(oEvent)=>{
            //     if(oEvent.getParameter("Name")!="View2"){
            //         return false;
            //     }
            //     debugger;
            //    })

               
            //Model2

             let iModel=new sap.ui.model.json.JSONModel({
                 img1:"sap/m/images/"

             })
            },
             
            onPress:function(){
                let oHistory=History.getInstance();
                let sPerviousHash = oHistory.getPreviousHash();
                if(sPerviousHash !== undefined){
                    window.history.go(-1);
                }
                else{
                    let oRouter=this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteView1",true)
                }

            },

            onNav:function(oEvent){
                let navOf=this.byId("navPage");
                let target=oEvent.getSource().data("target");
                if(target){
                    navOf.to(this.byId(target));
                }
                else
                navOf.back()
            }
        });
    });