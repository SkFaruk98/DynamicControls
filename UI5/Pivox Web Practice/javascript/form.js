let x=()=>{
    let fn=document.getElementById("firstname").value;
    let ph=document.getElementById("phno").value;
    let me=document.getElementById("message");
    let me1=document.getElementById("message1");
    let count=0;
 if(fn==""){
   
    document.form.firstname.focus();
    me.style.color="red";
    me.style.marginLeft="80px";
    me.innerText="* Enter the name";
    return false;
 }
 if(fn.length<10){
     alert("enter the name properly")
     return false;
 }
if(ph<6000000000  || ph>9999999999){
   document.form.phno.value="";
   document.form.phno.focus();
   me1.style.color="red";
    me1.style.marginLeft="80px";
    me1.innerText="* Invalid Phn Number";
   return false;
}

 return true;
}
 
let n="what123";
for(let i=0;i<n.length;i++){
   let c=n.charAt(i);
   if(c>='0'&&c<='9'){
    alert("contains the number")
   }
}

