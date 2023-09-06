sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.Control", {
            onInit: function () {
                
            },
            onClickValueHelp:function(){
                let oView=this.getView();
                this.oDialog=new sap.m.SelectDialog({
                    confirm:(oEvent)=>{
                        this.SelectItem(oEvent);
                    },
                     items:{
                        path:'studentModel>/education',
                        factory:(oListInd,oListCxt)=>{
                            return new sap.m.StandardListItem({
                                title:oListCxt.getObject().course,
                            })
                        }
                     }
                })
                oView.addDependent(this.oDialog)
                this.oDialog.open();
             },
             SelectItem:function(oEvent){
              let sValue=oEvent.getParameter("selectedItem").getProperty("title");
              this.byId("input").setValue(sValue)
             }
        });
    });
