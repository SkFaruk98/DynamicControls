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
        ) {
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
                    new Button({ text: "close", press: () => { this.oDialog.close() } })]
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

                // this.getView().byId("idInp").setEditable(true);
                let formPath = "labelModel>/oLabels"
                let InputPath = "labelModel>/oPersonsNew/";
                let saveFunction = "create";
                this.formFunction(formPath, saveFunction, InputPath);
            },
            //For Saving & Updating of of Person detail on clicking Save Button
            onSavePerson: function () {
                let createof = this.getView().getModel("studentModel").getProperty("/create");

                if (createof) {
                    this.byId("sel").setMode("None");
                    let oPerson = this.getView().getModel("labelModel").getProperty("/oPersonsNew");
                    let aPersons = this.getView().getModel("studentModel").getProperty("/persons");
                    let findof = true;
                    aPersons.find(operson => {
                        if (operson.id == oPerson.id)
                            findof = false;
                    })
                    if (findof) {
                        aPersons.push({ id: oPerson.id, name: oPerson.name, experience: 0, totalmarks: 0 });
                        this.getView().getModel("studentModel").setProperty("/persons", aPersons);
                        this.byId("sel").setMode("MultiSelect");
                        oPerson.id = "";
                        oPerson.name = "";
                        this.getView().getModel("labelModel").setProperty("/oPersonsNew", oPerson);
                        this.oDialog.close()
                    }
                    else {
                        MessageBox.alert("This ID Data Is Already Exist")
                    }

                }
                else {
                    let oPersonUpdate = this.getView().getModel("labelModel").getProperty("/oPersonsUpdate");
                    let indexof = this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                    let oPerson = this.getView().getModel("studentModel").getProperty("/persons/" + indexof);
                    if (oPersonUpdate.name != "") {
                        let newObj = {
                            id: oPersonUpdate.id,
                            name: oPersonUpdate.name,
                            totalmarks: oPerson.totalmarks,
                            experience: oPerson.experience,
                            education: oPerson.education,
                            employment: oPerson.employment
                        }
                        this.getView().getModel("studentModel").setProperty("/persons/" + indexof, newObj);
                        this.oDialog.close();
                    }
                    else
                        MessageBox.alert("Please fill the data")
                }

            },
            //For Closing of Dialog Box of CreateP
            onClosePerson: function () {
                this.getView().byId("savePerson").close();
            },

            //For Opening of Dialog Box after Click on Update Button
            onUpdate: function () {
                this.getView().getModel("studentModel").setProperty("/create", false)

                let oPerson = this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getObject();
                this.getView().getModel("labelModel").setProperty("/oPersonsUpdate", {...oPerson})
                let formPath = "labelModel>/oLabels"
                let InputPath = `labelModel>/oPersonsUpdate/`;
                let saveFunction = "update";
                this.formFunction(formPath, saveFunction, InputPath);
                this.percCalculate();

            },
            //For Select and Clicking Delete Button 
            onDelete: function () {

                let aPersons = this.getView().getModel("studentModel").getProperty("/persons")
                let aEducation = this.getView().getModel("studentModel").getProperty("/education")
                let aEmployment = this.getView().getModel("studentModel").getProperty("/employment")
                let aDuplicateEducationOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEducation");
                let aDuplicateEmploymentOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment");
                let sId = this.byId('sel').getSelectedItem().getBindingContext('studentModel').getObject().id;
                
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


            
                this.getView().byId("detailPage").setVisible(false)
                this.byId("sel").setMode("None");
                this.byId("sel").setMode("MultiSelect");
                this.getView().byId("stuid").setText("Id:");
                this.getView().byId("stuper").setText("Total Percentage:");
                this.getView().byId("stunam").setText("Name:");
                this.getView().byId("stuyoe").setText("Year of Exp:");
               

            },

            //Operation in Detail Page
            //For Opening Dialog after Clicking + button for Education 
            onOpenEdu: function () {

                this.getView().getModel("studentModel").setProperty("/create", true)

                let formPath = "labelModel>/oLabelsEdu"
                let InputPath = `labelModel>/oPersonEdu/`;
                let saveFunction = "Edu";
                this.formFunction(formPath, saveFunction, InputPath);
            },

            //For Saving and Updating of Details of Education 
            onSaveEdu: function (oEvent) {
                let createof = this.getView().getModel("studentModel").getProperty("/create");

                if (createof) {

                    let sId =  parseInt(this.getView().getModel("studentModel").getProperty("/id"))
                    let aEducation = this.getView().getModel("studentModel").getProperty("/education");
                    let oPersonNewEducation = this.getView().getModel("labelModel").getProperty("/oPersonEdu");
                    aEducation.push({
                        id:sId,
                        course: oPersonNewEducation.course,
                        institution: oPersonNewEducation.institution,
                        YearOfPass: oPersonNewEducation.YearOfPass,
                        Aggregation: oPersonNewEducation.Aggregation
                    });
                    this.getView().getModel("studentModel").setProperty("/education", aEducation);
                    oPersonNewEducation.course = ""; oPersonNewEducation.institution = ""; oPersonNewEducation.YearOfPass = ""; oPersonNewEducation.Aggregation = "";
                    this.getView().getModel("labelModel").setProperty("/oPersonEdu", oPersonNewEducation);
                    this.percCalculate();
                    this.oDialog.close();
                }
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
            //For Closing of Dialog 
            onCloseEdu: function () {
                this.getView().byId("saveEducation").close()
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

                if (createof) {
                    let oPersonNewEmployment = this.getView().getModel("labelModel").getProperty("/oPersonEmp");
                    let idOf = this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getObject().id;
                    let aEmployement = this.getView().getModel("studentModel").getProperty("/employment");
                    aEmployement.push({
                        id:idOf,
                        Company: oPersonNewEmployment.Company,
                        Role: oPersonNewEmployment.Role,
                        YearOfJoin: oPersonNewEmployment.YearOfJoin,
                        YearOfEnd: oPersonNewEmployment.YearOfEnd,
                        PhoneNumber: oPersonNewEmployment.PhoneNumber
                    })
                    this.getView().getModel("studentModel").setProperty("/employment", aEmployement);
                    oPersonNewEmployment.Company = ""; oPersonNewEmployment.Role = "", oPersonNewEmployment.YearOfJoin = ""; oPersonNewEmployment.YearOfEnd = ""; oPersonNewEmployment.PhoneNumber = "";
                    this.getView().getModel("labelModel").getProperty("/oPersonEmp", oPersonNewEmployment)
                    this.percCalculate();

                }

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
                }
                this.oDialog.close();
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
            },
            //For Closing of Dialog 
            onCloseEmp: function () {
                this.byId("saveEmployement").close();
            },

            //For Updating total percentage and Experience
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
                    let totalMarks=Math.floor(marks/aDuplicateEducationOf.length)
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
                    const sDetailsModel = new sap.ui.model.json.JSONModel({aDuplicateEducationOf,aDuplicateEmploymentOf})
                    this.getView().setModel(sDetailsModel,"detailsModel")
                  
            },
            onSearch: function (oEvent) {
                let oGetValue = this.getView().byId('sel').getBinding('items')
                let oGetSearchVal = oEvent.getSource().getValue()
                let oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, oGetSearchVal)
                oGetValue.filter(oFilter)
            },

            //ClickEvent on StandListItem
            onClickItem: function (oEvent) {
                let idOf=oEvent.getParameter("listItem").getBindingContext("studentModel").getObject().id;
                this.getView().getModel("studentModel").setProperty("/id",idOf);
                this.getView().getModel("labelModel").setProperty("/Buttonof", true);
                this.percCalculate();
                let oRouter=this.getOwnerComponent().getRouter();
                oRouter.navTo("View2")
            },
            onSelectOfEdu: function () {
                this.byId("lessBut1").setEnabled(true);
                this.byId("editBut1").setEnabled(true);

            },
            onSelectOfEmp: function () {
                this.byId("lessBut2").setEnabled(true);
                this.byId("editBut2").setEnabled(true);
            },
            onNavBack:function(){
              
                     
                        let oRouter=this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteView1")
                     
            }
        });
    });
