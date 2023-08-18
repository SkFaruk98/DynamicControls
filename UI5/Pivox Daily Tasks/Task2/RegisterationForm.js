//validation
function validate(){
    let nam=document.getElementById("nm").value;
    let namemg=document.getElementById("nammg");

    let  dateob=document.getElementById("dob").value;
    let  dateobmg=document.getElementById("bodmg");

    let genderM=document.getElementById("ml").checked;
    let genderFM=document.getElementById("fml").checked;
    let gendermg=document.getElementById("genmg");

    let Email=document.getElementById("em").value;
    let Emailmg=document.getElementById("mailmg");

    let mobileNo=parseInt(document.getElementById("num").value);
    let mobileNomg=document.getElementById("mobilemg");

    let passwd=document.getElementById("pass").value;
    let passwdmg=document.getElementById("passmg");

    let repasswd=document.getElementById("repass").value;
    let repasswdmg=document.getElementById("repassmg");

    let course=document.getElementById("cor").value;
    let coursemsg=document.getElementById("coursemg");

    let branch=document.getElementById("br").value;
    let branchmsg=document.getElementById("branchmg");

    let sems=document.getElementById("sem").value;
    let semsmsg=document.getElementById("semestermg");
    
 
//Name validation 
         if(nam==""){
            namemg.innerHTML="*plese enter the name";
         }
          
       else  if(nam.charAt(0).match("[0-9]")){
             namemg.innerHTML="<td>*Dont start with Numbers</td>"
             return false
         } 
//Date validation
       else if(dateob==""){
            dateobmg.innerHTML="Enter the DOB";
        }

//Gender validation
        if(genderM==false && genderFM==false){
            gendermg.innerHTML="*Select The Gender";
        }
//Mail validation
      else if(Email==""){
            Emailmg.innerHTML="*Enter the Email"

        }
//MobileNo validation
       else if(isNaN(mobileNo)){
            mobileNomg.innerHTML="*Enter the Mobile Number";
          
        }
       if(mobileNo<6000000000 || mobileNo>9999999999){
            mobileNomg.innerHTML="*Check the  Number";
            return false;
        }
//password validation
       if(passwd==""){
        passwdmg.innerHTML="*Enter the password";
        return false;
       }
       if(passwd.length<6){
        passwdmg.innerHTML="*Minimum 6 characters";
        return false;
       }
       let capital=passwd.match(/[A-Z]/);
       let numinpass=passwd.match(/[0-9]/);
   
       if(capital==null||numinpass==null){
        passwdmg.innerHTML=`<td style="font size:small;"> *min 1Up Alph 1 Num, 1 spl char</td>`;
        return false;
       }
       
//Repassword validation
       if(repasswd==""){
        repasswdmg.innerHTML="*Type the Repassword";
        return false;
       }
       if(passwd!=repasswd){
        repasswdmg.innerHTML="*Password not Match";
        return false;
       }
//Course validation
       if(course==""){
        coursemsg.innerHTML="*Select the Course";
        return false;
       }
//Branch validation
      if(branch==""){
        branchmsg.innerHTML="*Select the Branch";
        return false;
      }
//Sem validation
     if(sems==""){
        semsmsg.innerHTML="*Select the Semester";
        return false;
     }

    return true;
}

//VAlidation Messages
//For Name
function filldata(disablemessage){
    if(disablemessage=="namemg")
    document.getElementById("nammg").innerHTML="";

    else if(disablemessage=="bodmsg")
    document.getElementById("bodmg").innerHTML="";

    else if(disablemessage=="gendermg")
    document.getElementById("genmg").innerHTML="";

    else if(disablemessage=="emailmg")
    document.getElementById("mailmg").innerHTML="";

    else if(disablemessage=="MobileNomsg")
    document.getElementById("mobilemg").innerHTML="";

    else if(disablemessage=="passmsge")
    document.getElementById("passmg").innerHTML="";

    else if(disablemessage=="repassmgs")
    document.getElementById("repassmg").innerHTML="";

    else if(disablemessage=="selectcourse")
    document.getElementById("coursemg").innerHTML="";

    else if(disablemessage=="branchmsge")
    document.getElementById("branchmg").innerHTML="";

    else if(disablemessage=="semsMessage")
    document.getElementById("semestermg").innerHTML="";
}

function dataof(){
    let number = 10;
        let numbers= parseInt(document.getElementById("num").value);

    let nameofthe="faruk16014@gmail.com";
    let x1=nameofthe.match(/[^@.com]/s);
    console.log(...x1)
  
    }



    