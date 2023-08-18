sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.Project1", {
            onInit: function () {
                //model-1
               const oModel= new sap.ui.model.json.JSONModel({
                                                              person:{
                                                                name:"Faruk",
                                                                email:"faruk16014@gmail.com",
                                                                phoneNumber:"8523860089",
                                                                check:true,
                                                                date:"27-08-1999",
                                                                qualification:["B.tech","M.Tech","P.hd","B.com","M.Com","MCA"],
                                                              },
                                                              students:[
                                                                {
                                                                   id:1,
                                                                   name:"Faruk",
                                                                   location:"Guntur",
                                                                },
                                                                {
                                                                    id:2,
                                                                    name:"Teja",
                                                                    location:"Chitoor",
                                                                 
                                                                 },
                                                                 {
                                                                    id:3,
                                                                    name:"Venu",
                                                                    location:"Kurnool",
                                                                 }
                                                            ],
                                                            userDisplay:{
                                                                name:"",
                                                                email:"",
                                                                phoneNumber:"",
                                                                location:""
                                                            }
                                                    
                                                             
                                                            });

               this.getView().setModel(oModel,"personModel");
            
               //Model 2
               const newMod=new sap.ui.model.json.JSONModel({userData:[
                {name:"Faruk", email:"faruk16014@gmail.com", phoneNumber:8523860089,location:"Guntur"},
                {name:"Sai", email:"sai14@gmail.com", phoneNumber:7894561238,location:"Vijayawada"},
                {name:"Venugopal", email:"venu33@gmail.com", phoneNumber:9237864189,location:"Kurnool"}
               ]})

               this.getView().setModel(newMod,"mOfUser")
            
               
            },

            submit:function(){
                let aObj=this.getView().getModel("personModel").getProperty("/students");
                let v1=this.getView().byId("id").getValue();
                let v2=this.getView().byId("name").getValue();
                let v3=this.getView().byId("location").getValue();

                let newObj={id:v1,name:v2,location:v3};
                aObj.push(newObj);
                this.getView().getModel("personModel").setProperty("/students",sobj)

            },
            getmess:function(){
                   alert("what are you doing")
            },
            okbro: function(oEvent){
            let aObjects=this.getView().getModel("mOfUser").getProperty("/userData");
            let nam=oEvent.getParameter("listItem").getProperty("title");
            aObjects.forEach(odata => {
                  if(odata.name==nam){
                  
                    this.getView().getModel("mOfUser").setProperty("/oTemps",odata);
                  }
            });
            },

    
        DialogOpen:function(){

                this.getView().byId("d1").open();
            },
            c:function(){
                this.getView().byId("d1").close();
            },

        onClickFragDialog:function(){
          
            if(!this.Dialog){
                this.Dialog=this.loadFragment({
                    name:"project1.fragment.FragDialog"
            })
            }
            this.Dialog.then(function(oDialog){
                oDialog.open();
            })
          
        },

        setDefaultValues:function(){
            this.getView().byId("nameof").setValue("");
            this.getView().byId("emailof").setValue("");
            this.getView().byId("phoneNumberof").setValue("");
            this.getView().byId("locationof").setValue("");

            this.getView().byId("upinp").setValue("");
            this.getView().byId("delinp").setValue("");
       },

        onSave:function(){
            let nam=this.getView().byId("nameof").getValue();
            let email=this.getView().byId("emailof").getValue();
            let phn=parseInt(this.getView().byId("phoneNumberof").getValue());
            let loc=this.getView().byId("locationof").getValue();
         

            //way 1

            // this.getView().getModel("personModel").setProperty("/userDisplay/name",nam);
            // this.getView().getModel("personModel").setProperty("/userDisplay/email",email);
            // this.getView().getModel("personModel").setProperty("/userDisplay/phoneNumber",phn);
            // this.getView().getModel("personModel").setProperty("/userDisplay/location",loc);

            
            //way 2

            let oUser={name:nam,email:email,phoneNumber:phn,location:loc}
            let aUser=this.getView().getModel("mOfUser").getProperty("/userData");
            aUser.push(oUser);
            this.getView().getModel("mOfUser").setProperty("/userData",aUser);
            
            this.setDefaultValues();
            this.getView().byId("d1").close();

        },
        onDelete:function(){
            let aUser=this.getView().getModel("mOfUser").getProperty("/userData");
            let name=this.getView().byId("delinp").getValue();
            aUser.forEach((oStudent,index)=>{
                if(oStudent.name==name){
                    aUser.splice(index,1);
                }
            })
            this.getView().getModel("mOfUser").setProperty("/userData",aUser);
            
            this.setDefaultValues();
            this.getView().byId("d1").close();
        },
        onUpdate:function(){
            let aUser=this.getView().getModel("mOfUser").getProperty("/userData");
            let name=this.getView().byId("upinp").getValue();

            let nam=this.getView().byId("nameof").getValue();
            let email=this.getView().byId("emailof").getValue();
            let phn=this.getView().byId("phoneNumberof").getValue();
            let loc=this.getView().byId("locationof").getValue();

            aUser.forEach((oStudent,index)=>{
                if(oStudent.name==name){
                     if(nam!="")
                     oStudent.name=nam;
                     if(email!="")
                     oStudent.email=email;
                     if(phn!="")
                     oStudent.phoneNumber=phn;
                     if(loc!="")
                     oStudent.location=loc;
                }
            })
            this.getView().getModel("mOfUser").setProperty("/userData",aUser);
            
            this.setDefaultValues();
            this.getView().byId("d1").close();
        }

        });
    });
 