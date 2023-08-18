function check(){
    let number1=document.getElementById("num1").value;
    let comp=document.getElementById("comp").value;
    let number2=document.getElementById("num2").value;
    let ans=document.getElementById("ans");
    
    if(comp=="=="){
        if(number1==number2)
           ans.innerHTML="true"
        else
          ans.innerHTML="false"
    }
    if(comp=="==="){
        if(number1===number2)
            ans.innerHTML="true";
        else
        ans.innerHTML="false";
        
    }
    if(comp=="!="){
        if(number1!=number2)
            ans.innerHTML="true";
        else
        ans.innerHTML="false";
        
    }
    if(comp=="!=="){
        if(number1!==number2)
            ans.innerHTML="true";
        else
        ans.innerHTML="false";
        
    }
    let x=number1;
    let y=number2;
    console.log(typeof x, typeof y);
}
