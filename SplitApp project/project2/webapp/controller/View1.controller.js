sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("project2.controller.View1", {
            onInit: function () {

                const sModel=new sap.ui.model.json.JSONModel({
                    create:false,
                    edit:false,
                                    persons:[
                                        {id:1,name:"Shaik Faruk",totalmarks:0,experience:0,
                                        education:[
                                            {course:"SSC",institution:"Basara",yop:2016,aggregation:"86"},
                                            {course:"Diploma",institution:"MBTS",yop:2019,aggregation:"80"},
                                            {course:"B.tech",institution:"KHIT",yop:2022,aggregation:"69"}    
                                         ],
                                        employment:[{
                                            company:"Pivox Labs",
                                            role:"Junior Software Developer",
                                            yearOfJoin:2022,
                                            yearOfEnd:"-",
                                            phoneNumber:8523860089
                                        }]
                                    },
                                    {id:2,name:"Naveen",totalmarks:0,experience:0,
                                    education:[
                                        {course:"SSC",institution:"Basara",yop:2016,aggregation:"76"},
                                        {course:"Diploma",institution:"MBTS",yop:2019,aggregation:"70"},
                                        {course:"B.tech",institution:"KHIT",yop:2022,aggregation:"79"}
                                       
                                     ],
                                    employment:[
                                        {
                                        company:"Infosys",
                                        role:"Junior Software Developer",
                                        yearOfJoin:2019,
                                        yearOfEnd:2022,
                                        phoneNumber:8523860089
                                    },
                                    {
                                        company:"Pivox",
                                        role:"Senior Software Developer",
                                        yearOfJoin:2023,
                                        yearOfEnd:"-",
                                        phoneNumber:8523860089
                                    }
                                ]
                                },
                                ]
                })
                
                this.getView().setModel(sModel,"studentModel");
            },
            
            //Operations on Master page
            //For Opening Dialog on Click Create Button
            onCreate:function(){
                this.getView().getModel("studentModel").setProperty("/create",true)
                this.getView().getModel("studentModel").setProperty("/edit",false)
                this.getView().byId("idInp").setValue("")
                this.getView().byId("nameInp").setValue("");
                this.getView().byId("idInp").setEditable(true);
                this.getView().byId("savePerson").open();
            },
             //For Saving & Updating of of Person detail on clicking Save Button
            onSavePerson:function(){
                let createof=this.getView().getModel("studentModel").getProperty("/create");
                let editof=this.getView().getModel("studentModel").getProperty("/edit");

                if(createof){
              
                let findof=false;
                let id=this.getView().byId("idInp").getValue();
                let name=this.getView().byId("nameInp").getValue();
                
                let aPersons=this.getView().getModel("studentModel").getProperty("/persons");

                aPersons.find(value=>{
                    if(value.id==id){
                        findof=true;
                    }
                })

                if(id!=""&&name!=""){
                 if(findof==false){
                let oPersonNew={id:id,name:name,education:[],employment:[],experience:0,totalmarks:0};
                aPersons.push(oPersonNew);
                this.getView().getModel("studentModel").setProperty("/persons",aPersons);
           
                this.getView().byId("savePerson").close();
                 }
                 else
                 MessageBox.alert("This Data is Aleardy Exist")
                }
                else{
                  MessageBox.alert("Please Fill the Data");
                  }
                }
                if(editof){
                 let nam=this.getView().byId("nameInp").getValue();
                 let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                 let oPerson=this.getView().getModel("studentModel").getProperty("/persons/"+indexof);
                 if(nam!=""){
                 let newObj={id:oPerson.id,
                             name:nam,  
                             totalmarks:oPerson.totalmarks,
                             experience:oPerson.experience,
                             education:oPerson.education,
                             employment:oPerson.employment}
                 this.getView().getModel("studentModel").setProperty("/persons/"+indexof,newObj);
                 this.byId("stunam").setText("Name: "+nam);
                 this.getView().byId("savePerson").close();
                }
                else
                MessageBox.alert("Please fill the data")
            }
                 
            },
            //For Closing of Dialog Box of Create
            onClosePerson:function(){
                this.getView().byId("savePerson").close();
            },

            //For Opening of Dialog Box after Click on Update Button
            onUpdate:function(){
                this.getView().getModel("studentModel").setProperty("/edit",true)
                this.getView().getModel("studentModel").setProperty("/create",false)
               
                let idof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getObject();
                this.getView().byId("idInp").setValue(idof.id)
                this.getView().byId("nameInp").setValue(idof.name);
                this.getView().byId("idInp").setEditable(false);
                this.getView().byId("savePerson").open();
            },
            //For Select and Clicking Delete Button 
            onDelete:function(){
                let aPersons=this.getView().getModel("studentModel").getProperty("/persons");
                let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                let aEducation=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/education");
                let aEmployement=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/employment");
                aEmployement.splice(0,aEducation.length);
                aEducation.splice(0,aEducation.length);
                aPersons.splice(indexof,1);
                this.getView().byId("stuid").setText("Id:");
                this.getView().byId("stuper").setText("Total Percentage:");
                this.getView().byId("stunam").setText("Name:");
                this.getView().byId("stuyoe").setText("Year of Exp:");
                this.getView().getModel("studentModel").setProperty("/persons",aPersons)

            },
            
            //Operation in Detail Page

            //For Opening Dialog after Clicking + button for Education 
            onOpenEdu:function(){
                
                this.getView().getModel("studentModel").setProperty("/create",true)
                this.getView().getModel("studentModel").setProperty("/edit",false)
                       
                this.getView().byId("couInp").setValue("");
                this.getView().byId("InsInp").setValue("");
                this.getView().byId("yopInp").setValue("");
                this.getView().byId("AggInp").setValue("");
                this.getView().byId("saveEducation").open();
            },

            //For Saving and Updating of Details of Education 
            onSaveEdu:function(){
                let createof=this.getView().getModel("studentModel").getProperty("/create");
                let editof=this.getView().getModel("studentModel").getProperty("/edit");

                if(createof){

                  let vCourse= this.getView().byId("couInp").getValue();
                  let vInstitute= this.getView().byId("InsInp").getValue();
                  let vYop= this.getView().byId("yopInp").getValue();
                  let vAgg= this.getView().byId("AggInp").getValue();

                  if(vCourse!="" && vInstitute!="" && vYop!="" && vAgg!=""){

                  let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                  let aEducation=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/education");
                  aEducation.push({course:vCourse,institution:vInstitute,yop:vYop,aggregation:vAgg});
                  this.getView().getModel("studentModel").setProperty("/persons/"+indexof+"/education",aEducation)
                  this.percCalculate();   
                  this.getView().byId("saveEducation").close();

                   }
                   else{
                    MessageBox.alert("Please Fill the Data")
                   }
               }

              if(editof){
                  let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                  let indexofedu=this.getView().byId("stuEdu").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[3]
  
                  let vCourse= this.getView().byId("couInp").getValue();
                  let vInstitute= this.getView().byId("InsInp").getValue();
                  let vYop= this.getView().byId("yopInp").getValue();
                  let vAgg= this.getView().byId("AggInp").getValue();
                  
                  if(vCourse!="" && vInstitute!="" && vYop!="" && vAgg!=""){
                  let neObjEdu={course:vCourse,institution:vInstitute,yop:vYop,aggregation:vAgg};
                  this.getView().getModel("studentModel").setProperty("/persons/"+indexof+"/education/"+indexofedu,neObjEdu);
                  this.percCalculate();
  
                  this.getView().byId("saveEducation").close();
                  }
                  else
                  MessageBox.alert("Please Fill The Data")
               }
            },
            //For Closing of Dialog 
            onCloseEdu:function(){
                this.getView().byId("saveEducation").close()
            },
            
            //For Opening the Dialog aftering clicking on on Update button
            onUpdateEdu:function(){
                this.getView().getModel("studentModel").setProperty("/edit",true)
                this.getView().getModel("studentModel").setProperty("/create",false)

                let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                let indexofedu=this.getView().byId("stuEdu").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[3]
                let oPerEdu= this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/education/"+indexofedu);
                
                this.getView().byId("couInp").setValue(oPerEdu.course);
                this.getView().byId("InsInp").setValue(oPerEdu.institution);
                this.getView().byId("yopInp").setValue(oPerEdu.yop);
                this.getView().byId("AggInp").setValue(oPerEdu.aggregation);
                this.getView().byId("saveEducation").open();
            },
            
            //For select and Delete of Record in Education after clicking on - button
            onDeleteEdu:function(){
                let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                let indexofedu=this.getView().byId("stuEdu").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[3]
                let aEducation=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/education");
                aEducation.splice(indexofedu,1);
                this.getView().getModel("studentModel").setProperty("/persons/"+indexof+"/education",aEducation);
                
                this.percCalculate();
            },
            

             //For Opening Dialog after Clicking + button for Employment 
            onOpenEmp:function(){
                this.getView().getModel("studentModel").setProperty("/create",true)
                this.getView().getModel("studentModel").setProperty("/edit",false)

                this.byId("comInp").setValue("");
                this.byId("rolInp").setValue("");
                this.byId("yojInp").setValue("");
                this.byId("yoeInp").setValue("");
                this.byId("phnoInp").setValue("");
                this.byId("saveEmployement").open();
            },
            
            //For Saving and Updating of Details of Employment 
            onSaveEmp:function(){
                let createof=this.getView().getModel("studentModel").getProperty("/create");
                let editof=this.getView().getModel("studentModel").getProperty("/edit");

                if(createof){
                   let comName=  this.byId("comInp").getValue();
                   let rollof=  this.byId("rolInp").getValue();
                   let yoj=  this.byId("yojInp").getValue();
                   let yoe=  this.byId("yoeInp").getValue();
                   let phno=  this.byId("phnoInp").getValue();
                   
                   if(comName!="" && rollof!="" && yoj!="" && yoe!="" && phno!=""){
                   let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                   let aEmployement=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/employment");
                   aEmployement.push({company:comName,role:rollof,yearOfJoin:yoj,yearOfEnd:yoe,phoneNumber:phno})
                   this.getView().getModel("studentModel").setProperty("/persons/"+indexof+"/employment",aEmployement);
                   this.percCalculate();
    
                   this.byId("saveEmployement").close();
                   }
                   else
                   MessageBox.alert("Please Fill The Data")
                }

               if(editof){
                  let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                  let indexofedu=this.getView().byId("stuEmp").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[3]

                  let comName=  this.byId("comInp").getValue();
                  let rollof=  this.byId("rolInp").getValue();
                  let yoj=  this.byId("yojInp").getValue();
                  let yoe=  this.byId("yoeInp").getValue();
                  let phno=  this.byId("phnoInp").getValue();
                 
                  if(comName!="" && rollof!="" && yoj!="" && yoe!="" && phno!=""){
                  let oNewStuEmp={company:comName,role:rollof,yearOfJoin:yoj,yearOfEnd:yoe,phoneNumber:phno};
                  
                  this.getView().getModel("studentModel").setProperty("/persons/"+indexof+"/employment/"+indexofedu,oNewStuEmp);
                  this.percCalculate();

                  this.byId("saveEmployement").close();
                  }
                  else
                  MessageBox.alert("Please Fill The Data")

                }
            },
             //For Opening the Dialog aftering clicking on on Update button Employemnt
            onUpdateEmp:function(){
              this.getView().getModel("studentModel").setProperty("/edit",true)
              this.getView().getModel("studentModel").setProperty("/create",false)

                
                let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                let indexofedu=this.getView().byId("stuEmp").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[3]
                let oPerEmp= this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/employment/"+indexofedu);

                this.byId("comInp").setValue(oPerEmp.company);
                this.byId("rolInp").setValue(oPerEmp.role);
                this.byId("yojInp").setValue(oPerEmp.yearOfJoin);
                this.byId("yoeInp").setValue(oPerEmp.yearOfEnd);
                this.byId("phnoInp").setValue(oPerEmp.phoneNumber);
                
                this.byId("saveEmployement").open();
            },

              //For select and Delete of Record in Employment after clicking on - button
            onDeleteEmp:function(){
                let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                let indexofemp=this.getView().byId("stuEmp").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[3]
                let aEmployment=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/employment");
                aEmployment.splice(indexofemp,1);
                this.getView().getModel("studentModel").setProperty("/persons/"+indexof+"/employment",aEmployment);
                this.percCalculate();
            
            },
             //For Closing of Dialog 
            onCloseEmp:function(){
                this.byId("saveEmployement").close();
            },
            
            //For Updating total percentage and Experience
            percCalculate:function(){
                let aPersons = this.getView().getModel("studentModel").getProperty("/persons")
                let sName =this.byId('sel').getSelectedItem().getBindingContext('studentModel').getObject().name

                aPersons.forEach(oPerson => {
                   if (oPerson.name == sName) {
                       let iAggregate=0;
                       let iExp = (new Date().getFullYear());
                       let iExptotal=0;
                       oPerson.education.forEach(value1 => {
                           iAggregate += parseInt(value1.aggregation)
                       })
                       oPerson.employment.forEach(value2 => {
                           if(value2.yearOfEnd!="-")
                             iExptotal +=(value2.yearOfEnd)-(value2.yearOfJoin)
                           else
                             iExptotal+=iExp-(value2.yearOfJoin)
                       })  
                       
                       let indexof=this.getView().byId("sel").getSelectedItem().getBindingContext("studentModel").getPath().split("/")[2]
                       let aEducation=this.getView().getModel("studentModel").getProperty("/persons/"+indexof+"/education");
                       
                       if(aEducation.length=="")
                       oPerson.totalmarks=0;
                       else
                       oPerson.totalmarks = Math.round((parseInt(iAggregate) / ((oPerson.education).length)))
                    
                       oPerson.experience = (iExptotal);
                       this.getView().getModel("studentModel").setProperty("/oStu", oPerson)
                    }
                })
            },

            //ClickEvent on StandListItem
            onClickItem:function(){
                this.byId("detailPage").setVisible(true);
                this.byId("forDel").setEnabled(true);
                this.byId("forUp").setEnabled(true);
                this.percCalculate();
            },
            onSelectOfEdu:function(){
                this.byId("lessBut1").setEnabled(true);
                this.byId("editBut1").setEnabled(true);
            },
            onSelectOfEmp:function(){
                this.byId("lessBut2").setEnabled(true);
                this.byId("editBut2").setEnabled(true);
            }
            
           

        });
    });
