sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/layout/form/Form",
    "sap/ui/layout/form/ResponsiveGridLayout",
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/Button",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Form,ResponsiveGridLayout,FormContainer,FormElement,Input,Button,History,MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("project1.controller.View2", {
            onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("View2").attachPatternMatched(this.onfindArguments,this);   
            this.oPage=this.byId("page");

            },
            onfindArguments:function(oEvent){
                 let oArgument=oEvent.getParameter("arguments");
                 this.getView().getModel("studentModel").setProperty("/id",oArgument.sId)
                 this.percCalculate()
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
                    new Button({ text: "close", press: () => { this.onClose(); } })]
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
              //For Opening Dialog after Clicking + button for Education 
              onOpenEdu: function () {

                this.getView().getModel("studentModel").setProperty("/create", true)

                let formPath = "labelModel>/oLabelsEdu"
                let InputPath = `labelModel>/oPersonEdu/`;
                let saveFunction = "Edu";
                this.formFunction(formPath, saveFunction, InputPath);
            },
            onSaveEdu: function (oEvent) {
                let createof = this.getView().getModel("studentModel").getProperty("/create");

                if (createof) {

                    let sId =  parseInt(this.getView().getModel("studentModel").getProperty("/id"))
                    let aEducation = this.getView().getModel("studentModel").getProperty("/education");
                    let oPersonNewEducation = this.getView().getModel("labelModel").getProperty("/oPersonEdu");
                    let opnew=oPersonNewEducation
                    if(opnew.course!="" && opnew.institution!="" && opnew.YearOfPass!="" && opnew.Aggregation!=""){
                    aEducation.push({
                        id:sId,
                        course: oPersonNewEducation.course,
                        institution: oPersonNewEducation.institution,
                        YearOfPass: oPersonNewEducation.YearOfPass,
                        Aggregation: oPersonNewEducation.Aggregation
                    });
                    this.getView().getModel("studentModel").setProperty("/education", aEducation);
                    opnew.course = ""; opnew.institution = ""; opnew.YearOfPass = ""; opnew.Aggregation = "";
                    this.getView().getModel("labelModel").setProperty("/oPersonEdu", opnew);
                    this.percCalculate();
                    this.oDialog.close();
                    }
                    else
                    MessageBox.show("Please fill the Data")    
                }

                //if Create is False on Update
                else {
                    let indexof = this.getView().byId("stuEdu").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2];
                    let oUpdateEdu = this.getView().getModel("labelModel").getProperty("/oPersonEduUpdate");
                    let oDuplicateEducation=this.getView().getModel("studentModel").getProperty("/aDuplicateEducation/"+indexof);
                    let aEducation= this.getView().getModel("studentModel").getProperty("/education");
                 
                    for(let i=0;i<aEducation.length;i++){
                        let findof=  this.objectCompare(oDuplicateEducation,aEducation[i]);
                        if(findof==true){
                            this.getView().getModel("studentModel").setProperty("/education/"+i,{...oUpdateEdu});
                            break;
                        }
                    }

                    this.percCalculate();
                    this.oDialog.close()
                }
            },

              //For Opening the Dialog aftering clicking on on Update button
            onUpdateEdu: function () {
                this.getView().getModel("studentModel").setProperty("/create", false)

                let oSelectEdu = this.getView().byId("stuEdu").getSelectedItem().getBindingContext("studentModel").getObject()

                this.getView().getModel("labelModel").setProperty("/oPersonEduUpdate",{...oSelectEdu})
                let formPath = "labelModel>/oLabelsEdu"
                let InputPath = `labelModel>/oPersonEduUpdate/`;
                let saveFunction = "Edu";
                this.formFunction(formPath, saveFunction, InputPath);
            },

             //For select and Delete of Record in Education after clicking on - button
             onDeleteEdu: function () {
                let aEducation=this.getView().getModel("studentModel").getProperty("/education");
                let oSelectedEdu = this.getView().byId("stuEdu").getSelectedItems();
               
                oSelectedEdu.forEach(oEdu => {
                    let oSelectedEdu = oEdu.getBindingContext("studentModel").getObject()
                    for(let i=0;i<aEducation.length;i++){
                        let findof=  this.objectCompare(oSelectedEdu,aEducation[i]);
                        if(findof==true){
                            aEducation.splice(i,1)
                            this.getView().getModel("studentModel").setProperty("/education",aEducation);
                            break;
                        }
                    }
                });
                this.percCalculate();
                this.byId("stuEdu").setMode("None");
                this.byId("stuEdu").setMode("MultiSelect");
                MessageToast.show("Deleted Successful",{duration:1500});
            },

               //For Opening Dialog after Clicking + button for Employment 
               onOpenEmp: function () {
                this.getView().getModel("studentModel").setProperty("/create", true)
                let formPath = "labelModel>/oLabelsEmp"
                let InputPath = `labelModel>/oPersonEmp/`;
                let saveFunction = "Emp";
                this.formFunction(formPath, saveFunction, InputPath);
            },

             //For Saving and Updating of Details of Employment 
             onSaveEmp: function () {
                let createof = this.getView().getModel("studentModel").getProperty("/create");
               
                //Create is true on Create Emp
                if (createof) {
                    let oNewEmployment = this.getView().getModel("labelModel").getProperty("/oPersonEmp");
                    let idOf =  parseInt(this.getView().getModel("studentModel").getProperty("/id"))
                    let aEmployement = this.getView().getModel("studentModel").getProperty("/employment");
                    if(oNewEmployment.Company!="" && oNewEmployment.Role!="" && oNewEmployment.YearOfJoin!="" && oNewEmployment.YearOfEnd!="" && oNewEmployment.PhoneNumber!=""){
                    aEmployement.push({
                        id:idOf,
                        Company: oNewEmployment.Company,
                        Role: oNewEmployment.Role,
                        YearOfJoin: oNewEmployment.YearOfJoin,
                        YearOfEnd: oNewEmployment.YearOfEnd,
                        PhoneNumber: oNewEmployment.PhoneNumber
                    })
                    this.getView().getModel("studentModel").setProperty("/employment", aEmployement);
                    oNewEmployment.Company = ""; oNewEmployment.Role = "", oNewEmployment.YearOfJoin = ""; oNewEmployment.YearOfEnd = ""; oNewEmployment.PhoneNumber = "";
                    this.getView().getModel("labelModel").getProperty("/oPersonEmp", oNewEmployment)
                    this.percCalculate();
                    this.oDialog.close();
                    }
                else
                MessageBox.show("Please fill the Data")
            }
               
             //Create is False on Update Emp
                else {
                    let indexof = this.getView().byId("stuEmp").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2];
                    let oUpdateEmp = this.getView().getModel("labelModel").getProperty("/oPersonEmpUpdate");
                    let oDuplicateEmployment=this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment/"+indexof);
                    let aEmployment= this.getView().getModel("studentModel").getProperty("/employment");
                 
                    for(let i=0;i<aEmployment.length;i++){
                        let findof=  this.objectCompare(oDuplicateEmployment,aEmployment[i]);
                        if(findof==true){
                            this.getView().getModel("studentModel").setProperty("/employment/"+i,{...oUpdateEmp});
                            break;
                        }
                    }
                    this.percCalculate();
                    this.oDialog.close();
                }
             
            },

              //For Opening the Dialog aftering clicking on on Update button Employemnt
              onUpdateEmp: function () {
                this.getView().getModel("studentModel").setProperty("/create", false)
                
                let oSelectEdu = this.getView().byId("stuEmp").getSelectedItem().getBindingContext("studentModel").getObject();
                this.getView().getModel("labelModel").setProperty("/oPersonEmpUpdate", {...oSelectEdu});
                let formPath = "labelModel>/oLabelsEmp"
                let InputPath = `labelModel>/oPersonEmpUpdate/`;
                let saveFunction = "Emp";
                this.formFunction(formPath, saveFunction, InputPath);

            },

             //For select and Delete of Record in Employment after clicking on - button
             onDeleteEmp: function () {
                let aEmployment=this.getView().getModel("studentModel").getProperty("/employment");
                let oSelectedEmp = this.getView().byId("stuEmp").getSelectedItems();
               
                oSelectedEmp.forEach(oEmp => {
                    let oSelectedEmpof = oEmp.getBindingContext("studentModel").getObject()
                    for(let i=0;i<aEmployment.length;i++){
                        let findof=  this.objectCompare(oSelectedEmpof,aEmployment[i]);
                        if(findof==true){
                            aEmployment.splice(i,1)
                            this.getView().getModel("studentModel").setProperty("/employment",aEmployment);
                            break;
                        }
                    }
                });
                this.percCalculate();
                this.byId("stuEmp").setMode("None");
                this.byId("stuEmp").setMode("MultiSelect");
                MessageToast.show("Deleted Successful",{duration:1500});
            },
            onSelectOfEdu: function () {
                this.byId("lessBut1").setEnabled(true);
                this.byId("editBut1").setEnabled(true);

            },
            onSelectOfEmp: function () {
                this.byId("lessBut2").setEnabled(true);
                this.byId("editBut2").setEnabled(true);
            },
            percCalculate: function () {
                this.getView().getModel("studentModel").setProperty("/aDuplicateEducation",[]);
                this.getView().getModel("studentModel").setProperty("/aDuplicateEmployment",[]);
                this.getView().getModel("studentModel").setProperty("/oStu",{})
                
                
                let aPersons = this.getView().getModel("studentModel").getProperty("/persons")
                let aEducation = this.getView().getModel("studentModel").getProperty("/education")
                let aEmployment = this.getView().getModel("studentModel").getProperty("/employment")
                let sId =  parseInt(this.getView().getModel("studentModel").getProperty("/id"))
                let aDuplicateEducationOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEducation");
                let aDuplicateEmploymentOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment");
                // let aDuplicateEmployment = this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment");
        
                    let marks=0;
                aEducation.forEach(oEdu=>{
                        if(oEdu.id==sId){
                        aDuplicateEducationOf.push(oEdu);
                        marks+=parseInt(oEdu.Aggregation)
                       }
                    });
                    
                    let totalMarks=  aDuplicateEducationOf.length==0?0: Math.floor(marks/aDuplicateEducationOf.length);
                    let yearofExp=0;
                aEmployment.forEach(oEmp=>{
                        if(oEmp.id==sId){
                        aDuplicateEmploymentOf.push(oEmp);
                        if(oEmp.YearOfEnd!="-")
                            yearofExp+=parseInt(oEmp.YearOfEnd)-parseInt(oEmp.YearOfJoin);
                        else
                        yearofExp+=new Date().getFullYear()-parseInt(oEmp.YearOfJoin)
                        
                        }
                    })
                aPersons.find(oPerson => {
                        if (oPerson.id == sId) {
                            oPerson.totalmarks=totalMarks
                            oPerson.experience=yearofExp
                             this.getView().getModel("studentModel").setProperty("/oStu",oPerson);
                        }});
                    this.getView().getModel("studentModel").setProperty("/aDuplicateEducation",aDuplicateEducationOf);
                    this.getView().getModel("studentModel").setProperty("/aDuplicateEmployment",aDuplicateEmploymentOf);
              
            },
            
            onNavBack:function(){
                let oHistory=History.getInstance();
                let oPreviousHash=oHistory.getPreviousHash();
                if(oPreviousHash!=undefined)
                  window.history.go(-1);
                else{
                let oRouter=this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1");
                }
            },
            onClose:function(){
                this.getView().getModel("labelModel").setProperty("/oPersonEdu",{course:"",institution:"",YearOfPass:"",Aggregation:""});
                this.getView().getModel("labelModel").setProperty("/oPersonEmp",{Company:"",Role:"",YearOfJoin:"",YearOfEnd:"",PhoneNumber:""});
                this.oDialog.close();
            },

             
        });
    });