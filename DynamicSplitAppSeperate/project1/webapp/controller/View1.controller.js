sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/layout/form/Form",
    "sap/ui/core/Title",
    "sap/ui/layout/form/ResponsiveGridLayout",
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/Button",
    "sap/ui/model/FilterOperator",
    "project1/formatter/formatter",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Form, Title, ResponsiveGridLayout, FormContainer, FormElement, Input, Button, FilterOperator
                ,formatter) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            formatter:formatter,
            onInit: function () {
                //Model-1
                const sModel = new sap.ui.model.json.JSONModel({
                    create: false,

          persons: [
                  {id: 1, name: "Shaik Faruk", totalmarks: 0, experience: 0},
                  {id: 2, name: "Naveen", totalmarks: 0, experience: 0}],
          education:[
                  { id: 1, course: "SSC", institution: "Basara", YearOfPass: "2016", Aggregation: "86" },
                  { id: 1, course: "Diploma", institution: "MBTS", YearOfPass: "2019", Aggregation: "80" },
                  { id: 1, course: "B.tech", institution: "KHIT", YearOfPass: "2022", Aggregation: "69" },
                  { id: 2, course: "SSC", institution: "Basara", YearOfPass: "2016", Aggregation: "76" },
                  { id: 2, course: "Diploma", institution: "MBTS", YearOfPass: "2019", Aggregation: "70" },
                  { id: 2, course: "B.tech", institution: "KHIT", YearOfPass: "2022", Aggregation: "79" } 
                  ],
          employment: [
                  { id: 1, Company: "Pivox Labs", Role: "Junior Software Developer", YearOfJoin: 2022, YearOfEnd: "-", PhoneNumber: 8523860089},
                  { id: 2, Company: "Infosys", Role: "Junior Software Developer", YearOfJoin: 2019, YearOfEnd: 2022, PhoneNumber: 8523860089},
                  { id: 2, Company: "Pivox", Role: "Senior Software Developer", YearOfJoin: 2023, YearOfEnd: "-", PhoneNumber: 8523860089}  ],      
          aDuplicateEducation:[],
          aDuplicateEmployment:[]
       
                      })
                this.getView().setModel(sModel, "studentModel");

                //Model-2
                let oModel = new sap.ui.model.json.JSONModel({
                    oLabels: [
                        { label: "id" },
                        { label: "name" }],
                    oLabelsEdu: [
                        { label: "course" },
                        { label: "institution" },
                        { label: "YearOfPass" },
                        { label: "Aggregation" }
                    ],
                    oLabelsEmp: [
                        { label: "Company" },
                        { label: "Role" },
                        { label: "YearOfJoin" },
                        { label: "YearOfEnd" },
                        { label: "PhoneNumber" }
                    ],
                    Buttonof: false,
                    oPersonsNew: [{ id: "", name: "" }],
                    oPersonsUpdate: { id: "", name: "" },

                    oPersonEdu: { course: "", institution: "", YearOfPass: "", Aggregation: "" },
                    oPersonEduUpdate: { course: "", institution: "", YearOfPass: "", Aggregation: "" },

                    oPersonEmp: { Company: "", Role: "", YearOfJoin: "", YearOfEnd: "", PhoneNumber: "" },
                    oPersonEmpUpdate: { Company: "", Role: "", YearOfJoin: "", YearOfEnd: "", PhoneNumber: "" }
                })

                this.getView().setModel(oModel, "labelModel");

                this.oPage = this.byId("page");

            },
            objectCompare:function(object1,object2){
                let ini=true;
                 for(let key in object1){
                    if(object1[key]!=object2[key])
                    ini=false;
                 }
                 return ini;
            },
            formFunction: function (formpath, saveFunction, InputPath) {
                let oForm = new Form({
                    editable: true,
                    layout: new ResponsiveGridLayout({
                        labelSpanXL: 2,
                        labelSpanL: 7,
                        labelSpanM: 2,
                        labelSpanS: 12,
                        adjustLabelSpan: true,
                        emptySpanXL: 4,
                        emptySpanL: 4,
                        emptySpanM: 4,
                        emptySpanS: 0,
                        columnsL: 3,
                        columnsM: 1,
                        columnsXL: 1
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

            //Operations on Master page
            //For Opening Dialog on Click Create Button
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
            onSaveEdu: function () {
                let createof = this.getView().getModel("studentModel").getProperty("/create");

                if (createof) {

                    let IdOf = this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getObject().id;
                    let aEducation = this.getView().getModel("studentModel").getProperty("/education");
                    let oPersonNewEducation = this.getView().getModel("labelModel").getProperty("/oPersonEdu");
                    aEducation.push({
                        id:IdOf,
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
                            this.getView().getModel("studentModel").setProperty("/education/"+i,{oUpdateEdu});
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
                            this.getView().getModel("studentModel").setProperty("/education/"+i,oUpdateEmp);
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
                let sId = this.byId('sel').getSelectedItem().getBindingContext('studentModel').getObject().id;
                let aDuplicateEducationOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEducation");
                let aDuplicateEmploymentOf = this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment");
                // let aDuplicateEmployment = this.getView().getModel("studentModel").getProperty("/aDuplicateEmployment");
                aPersons.find(oPerson => {
                    if (oPerson.id == sId) {
                         this.getView().getModel("studentModel").setProperty("/oStu",oPerson);
                    }});
                    aEducation.forEach(oEdu=>{
                        if(oEdu.id==sId)
                        aDuplicateEducationOf.push(oEdu);
                    });
                    aEmployment.forEach(oEmp=>{
                        if(oEmp.id==sId)
                        aDuplicateEmploymentOf.push(oEmp);
                    })
                    this.getView().getModel("studentModel").setProperty("/aDuplicateEducation",aDuplicateEducationOf);
                    this.getView().getModel("studentModel").setProperty("/aDuplicateEmployment",aDuplicateEmploymentOf);
                    const sDetailsModel = new sap.ui.model.json.JSONModel({aDuplicateEducationOf,aDuplicateEmploymentOf})
                    this.getView().setModel(sDetailsModel,"detailsModel")
                    this.byId("stuEdu").setMode("None");
                    this.byId("stuEdu").setMode("MultiSelect");
                    this.byId("stuEmp").setMode("None");
                    this.byId("stuEmp").setMode("MultiSelect");
            },
            onSearch: function (oEvent) {
                let oGetValue = this.getView().byId('sel').getBinding('items')
                let oGetSearchVal = oEvent.getSource().getValue()
                let oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, oGetSearchVal)
                oGetValue.filter(oFilter)
            },

            //ClickEvent on StandListItem
            onClickItem: function (oEvent) {
                this.byId("detailPage").setVisible(true);
                let idof=oEvent.getParameter("listItem").getCustomData()[0].getValue();
                this.byId("splitapp").toDetail(this.createId(idof));
                this.getView().getModel("labelModel").setProperty("/Buttonof", true);
                this.percCalculate();
            },
            onSelectOfEdu: function () {
                this.byId("lessBut1").setEnabled(true);
                this.byId("editBut1").setEnabled(true);
            },
            onSelectOfEmp: function () {
                this.byId("lessBut2").setEnabled(true);
                this.byId("editBut2").setEnabled(true);
            }
        });
    });
