// let list="<ul>";
// list+="<li id>one</li>";
// list+="<li>two</li>";
// list+="<li>three</li>";
// list+="</ul>";
// document.getElementById("inlist").innerHTML=list;

// //print array in reverse
// let aFruit=["apple","banana","mango","pineapple","sapota"];
// for(let key=aFruit.length-1;key>=0;key--){
//        console.log(aFruit[key]);
// }
// //way-2
// let reFruit=aFruit.reverse();
//   for(let key in reFruit){
//     console.log(reFruit[key]);

// }

//Extract one word from String
// let aWish="Hello everyone this is javascript exam Good Luck";
// let newWish=aWish.split(" ");
// for(let key in newWish){
//    if(newWish[key]=="javascript"){
//         newWish.splice(key,1);
//        }
//     }
// let Str="";
// for(let x of newWish){
//     Str+=x+" "
// }
// console.log(Str);

//toFind Binary Number
// let x=11;
// let bin=[];
// while(x>0){
//      bin.push(x%2);
//      x=parseInt(x/2);
// }
// let revArr=bin.reverse();
// let str="";
// for(let value of revArr){
//     str+=value;
// }
// console.log(str);


// How to get a child element in the parent element in the javascript
// let par=document.getElementById("parent");
// let child=par.children[0].innerHTML;
// let child1=par.children[1].innerHTML;
// document.getElementById("display").innerHTML=child+" "+child1;

//Exveption Handling in javascript


//Errors
// 1.ReferenceError
try {
  let x=10;
  alet("kasdjfkdsf");
}
catch(err) {
  console.log(err.name);
  console.log(err.message);
}

//to validate a email
// let x="faruk16014@gmail.com";
// let y=/^[a-z0-9]+@[a-z.]+$/g;

// let z=y.test(x);
// console.log(z) 

// let x="how are you how";
// let y=x.match(/how/g);
// console.log(y)

//Regular Expression
// let a="z"
// let y=`In JavaScript, regular expressions are often used with the two string methods: search() and 

// The  method uses an expression to search for a match, and returns the position of the match.

// The method returns a modified string where the pattern is replaced`;
// let z=/^In|[0-9]|replaced$/g;
// console.log(z.test(y));


let x=10;  
{
    let x=20;
    console.log(x);
}
console.log(x);


function printNum ()
{
    console.log(1);
  printNum();
}