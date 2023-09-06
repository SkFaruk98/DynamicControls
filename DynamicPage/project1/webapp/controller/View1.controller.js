sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
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
                  { id: 2, course: "Diploma", institution: "MBTS", YearOfPass: "2019", Aggregation: "70" }
                
                  ],
          employment: [
                  { id: 1, Company: "Pivox Labs", Role: "Junior Software Developer", YearOfJoin: 2022, YearOfEnd: "-", PhoneNumber: 8523860089},
                  { id: 2, Company: "Infosys", Role: "Junior Software Developer", YearOfJoin: 2019, YearOfEnd: 2022, PhoneNumber: 8523860089},
                  { id: 2, Company: "Pivox", Role: "Senior Software Developer", YearOfJoin: 2023, YearOfEnd: "-", PhoneNumber: 8523860089}  ],      
          aDuplicateEducation:[],
          aDuplicateEmployment:[]
       
                      })
                this.getView().setModel(sModel, "studentModel");
            },
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

            },

            onSelectOfEdu:function(oEvent){
                let oEducation=oEvent.getParameter("listItem").getBindingContext("studentModel").getObject()
              let oRouter=this.getOwnerComponent().getRouter();
              oRouter.navTo("View2",{
                sid:oEducation.id,
                query:{
                    course:oEducation.course,
                    institution:oEducation.institution
                }
              })
            }
        });
    });
