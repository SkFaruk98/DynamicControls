sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/layout/form/Form",
    "sap/ui/layout/form/ResponsiveGridLayout",
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/Button",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Form, ResponsiveGridLayout, FormContainer, FormElement, Input, Button, FilterOperator
        ,MessageToast) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                 this.oPage=this.byId("page");
            },
            formFunction: function (formpath, saveFunction, InputPath) {
                let oForm = new Form({
                    editable: true,
                    layout: new ResponsiveGridLayout({
                
                    }),
                    formContainers: new FormContainer({
                        formElements: {
                            path: formpath,
                            factory: (sLabindex, oLabtx) => {
                                return new FormElement({
                                    label: oLabtx.getObject().label,
                                    fields: new Input({
                                        value: `{${InputPath + oLabtx.getObject().label}}`,
                                        editable: saveFunction == "update" && oLabtx.getObject().label == "id" ? false : true,
                                    })
                                })
                            }
                        }
                    })
                });

                this.oDialog = new sap.m.Dialog({
                    title: "Person Details",
                    buttons: [new Button({
                        text: "save", press: () => {
                            if (saveFunction == "create"|| saveFunction == "update" )
                                this.onSavePerson();
                            else if (saveFunction == "Edu")
                                this.onSaveEdu();
                            else if (saveFunction == "Emp")
                                this.onSaveEmp();
                        }
                    }),
                    new Button({ text: "close", press: () => {this.onClose() } })]
                });
                this.oDialog.addContent(oForm);
                this.oPage.addDependent(this.oDialog);
                this.oDialog.open();
            },
            objectCompare:function(object1,object2){
                let ini=true;
                 for(let key in object1){
                    if(object1[key]!=object2[key])
                    ini=false;
                 }
                 return ini;
            },
            onCreate: function () {
                this.getView().getModel("studentModel").setProperty("/create", true)
                let formPath = "labelModel>/oLabels"
                let InputPath = "labelModel>/oPersonsNew/";
                let saveFunction = "create";
                this.formFunction(formPath, saveFunction, InputPath);
            },
            //For Saving & Updating of of Person detail on clicking Save Button
            onSavePerson: function () {
                let createof = this.getView().getModel("studentModel").getProperty("/create");
                
                //if creatof is True for Save
                if (createof) {
                    let oPerson = this.getView().getModel("labelModel").getProperty("/oPersonsNew");
                    let aPersons = this.getView().getModel("studentModel").getProperty("/persons");
                    let findof = true;
                   
                    if(oPerson.id!=undefined && oPerson.name!=undefined){
                   let value= aPersons.find(operson => {
                        return operson.id == oPerson.id   
                    })
                    if(value!=undefined)
                    findof=false;

                    if (findof) {
                        aPersons.push({ id: oPerson.id, name: oPerson.name, experience: 0, totalmarks: 0 });
                        this.getView().getModel("studentModel").setProperty("/persons", aPersons);
                        oPerson.id = "";
                        oPerson.name = "";
                        this.getView().getModel("labelModel").setProperty("/oPersonsNew", oPerson);
                        this.oDialog.close();
                    }
                    else 
                        MessageBox.show(`Person With Id ${oPerson.id} is Already Exist`);
                }
                else 
                MessageBox.show("Please Fill The Data");

                }

                 //if creatof is False for Update
                else {
                    let oPersonUpdate = this.getView().getModel("labelModel").getProperty("/oPersonsUpdate");
                    let indexof = this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                    let oPerson = this.getView().getModel("studentModel").getProperty("/persons/" + indexof);
                    if (oPersonUpdate.name != "") {
                        this.getView().getModel("studentModel").setProperty("/persons/" + indexof, {...oPersonUpdate});
                        this.oDialog.close();
                    }
                    else
                        MessageBox.alert("Please fill the data");
                }
            },
            //For Opening of Dialog Box after Click on Update Button
            onUpdate: function () {
                this.getView().getModel("studentModel").setProperty("/create", false);

                let oPerson = this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getObject();
                this.getView().getModel("labelModel").setProperty("/oPersonsUpdate", {...oPerson})
                let formPath = "labelModel>/oLabels" ;
                let InputPath = `labelModel>/oPersonsUpdate/`;
                let saveFunction = "update";
                this.formFunction(formPath, saveFunction, InputPath);
                this.percCalculate();

            },
            //For Select and Clicking Delete Button 
            onDelete: function () {

                let aPersons = this.getView().getModel("studentModel").getProperty("/persons");
                let aEducation = this.getView().getModel("studentModel").getProperty("/education");
                let aEmployment = this.getView().getModel("studentModel").getProperty("/employment");
                let aSelectedPeronsPath= this.getView().byId("sel").getSelectedItems();
                let aObjects=[];
                aSelectedPeronsPath.forEach(oSelected=>{
                   let oPerson= oSelected.getBindingContext("studentModel").getObject();
                    aObjects.push(oPerson);
                })
                aObjects.forEach(oPerson=>{
                 let aDuplicateEducationOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEducation");
                 let aDuplicateEmploymentOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment");
                 let sId= oPerson.id;

                aEducation.forEach(oEdu=>{
                    if(oEdu.id==sId)
                    aDuplicateEducationOf.push(oEdu);
                });

                aEmployment.forEach(oEmp=>{
                    if(oEmp.id==sId)
                    aDuplicateEmploymentOf.push(oEmp);
                })

                aDuplicateEducationOf.forEach(oEdu => {
                    for(let i=0;i<aEducation.length;i++){
                        let findof=  this.objectCompare(oEdu,aEducation[i]);
                        if(findof==true){
                            aEducation.splice(i,1)
                            this.getView().getModel("studentModel").setProperty("/education",aEducation);
                            break;
                        }
                    }
                });

                aDuplicateEmploymentOf.forEach(oEmp => {
                    for(let i=0;i<aEmployment.length;i++){
                        let findof=  this.objectCompare(oEmp,aEmployment[i]);
                        if(findof==true){
                            aEmployment.splice(i,1)
                            this.getView().getModel("studentModel").setProperty("/employment",aEmployment);
                            break;
                        }
                    }
                });
                
                aPersons.forEach(((oPerson,index)=>{
                    if(oPerson.id==sId){
                        aPersons.splice(index,1)
                        this.getView().getModel("studentModel").setProperty("/persons", aPersons)
                    }
                }))
                this.getView().getModel("studentModel").setProperty("/aDuplicateEducation",aDuplicateEducationOf);
                this.getView().getModel("studentModel").setProperty("/aDuplicateEmployment",aDuplicateEmploymentOf);
            })
                this.byId("sel").setMode("None");
                this.byId("sel").setMode("MultiSelect");
                MessageToast.show("Deleted Successfully",{duration:1000});
               
            },
             onSearch: function (oEvent) {
                 let oGetValue = this.getView().byId('sel').getBinding('items');
                 let oGetSearchVal = oEvent.getSource().getValue();
                 let oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, oGetSearchVal);
                 oGetValue.filter(oFilter);
             },

            //ClickEvent on StandListItem
            onClickItem: function (oEvent) {
                let idOf=oEvent.getParameter("listItem").getBindingContext("studentModel").getObject().id;
                let oRouter=this.getOwnerComponent().getRouter();
                oRouter.navTo("View2",{
                    sId:idOf
                })
            },
            onSelect:function(oEvent){
             this.getView().getModel("labelModel").setProperty("/Buttonof", true);
            },
            onClose:function(){
                this.getView().getModel("labelModel").setProperty("/oPersonsNew",{id:"",name:""})
                this.oDialog.close();
            }
        });
    });
