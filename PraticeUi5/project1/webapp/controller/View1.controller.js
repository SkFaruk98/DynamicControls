sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/layout/form/Form",
    "sap/ui/core/Title",
    "sap/ui/layout/form/ResponsiveGridLayout",
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/Button",



],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Form,Title,ResponsiveGridLayout,FormContainer,FormElement,Input,Button) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                let oModel=new sap.ui.model.json.JSONModel({
                    oLabels:[
                        {label:"id"},
                        {label:"Name"},
                        {label:"PhoneNumber"},
                        {label:"password"}
                    ],
                    oPersons:{id:0,Name:"",phoneNumber:0,password:""}
                })

                this.getView().setModel(oModel,"labelModel");
                  
                   const oPage=this.getView().byId("page");



            //        let oForm=new Form({
            //         editable:true,

            //         title:new Title({
            //             text:"Person Details",
            //              }),

            //         layout:new ResponsiveGridLayout({
            //             labelSpanXL:2,
            //             labelSpanL:7,
            //             labelSpanM:2,
            //             labelSpanS:12,
            //             adjustLabelSpan:true,
            //             emptySpanXL:4,
            //             emptySpanL:4,
            //             emptySpanM:4,
            //             emptySpanS:0,
            //             columnsL:3,
            //             columnsM:1,
            //             columnsXL:1
            //         }),

            //         formContainers:new FormContainer({
            //             formElements:{
            //             path: "labelModel>/oLabels",
            //             factory:(sLabindex,oLabtx)=>{
            //             return new FormElement({
            //                 label:oLabtx.getObject().label,
            //                 fields:new Input({
                               
            //                 })
            //             })
            //            }
            //          }

            //          })
            //        });
                     
            //        let oButtonOpen=new sap.m.Button({
            //         text:"Open Dialog",
            //         type:"Accept",
            //         press:()=>{
            //           oDialog.open();
            //         }
            //        });
                   
            //        let oDialog= new sap.m.Dialog({
            //            buttons:[new Button({text:"save"}),
            //                     new Button({text:"close",press:()=>{oDialog.close()}})]
                       
            //        })
            //         oDialog.addContent(oForm)
            //         oPage.addDependent(oDialog)
            //         oPage.addContent(oButtonOpen);
            // },
            // onSave:function(){
                  
            }
        });
    });
