sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // "sap/m/Table",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Dialog",
    "sap/ui/layout/form/SimpleForm"

  

  

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Button,Label,Input,Dialog,SimpleForm) {
        "use strict"; 

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
          


               let oPage=this.byId("page");
               
               let Buttonof=new Button({
                    text:"Open",
                    press:()=>{
                        oDialog.open();
                    }
               });
          let oDialog=new Dialog({
                title:"Student Data",
          });

          let simpleform=new SimpleForm({})

          let lablenames=["Id","Name","Email","PhoneNumber","JHG","jygyu","uygtf","iuytryf","iuytyytf","uygyt"]

           for(let i=0;i<lablenames.length;i++){
                let label=new Label({
                    text:lablenames[i],
                 });
                let  input=new Input({
                 placeholder:`Enter ${lablenames[i]}`
                });
             
                simpleform.addContent(label)
                simpleform.addContent(input)
               }
        let ButtonClose=new Button({
            text:"close",
            press:()=>{
                oDialog.close();
            }
         });
         oDialog.addContent(simpleform)
         oDialog.addContent(ButtonClose)
             oPage.addContent(Buttonof);
               
   
            }
       
        });
    });
