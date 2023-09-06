/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project1/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

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
          aDuplicateEmployment:[],
          id:"",
          any:["master","sai","mahesh"],
          
          operators:[
            {operator:"LT"},
            {operator:"GT"},
            {operator:"BT"},
            {operator:"EQ"},
            {operator:"Contains"},
            {operator:"NotContains"}],
                      })
                this.setModel(sModel, "studentModel");
                 
            }
        });
    }
);