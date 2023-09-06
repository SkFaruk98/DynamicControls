//Question 1
// let str="what are you doing";
// let count=0;
// for(let i=0;i<str.length;i++){
//     if(str.charAt(i).match("[aeiou]")){
//      count++;
//     }
// }
// console.log(count)

// //Question 2
// // concatenate two string except the first charater in it

// let fname="faruk";
// let lname="shaik"
// let fullname=fname.slice(1)+lname.slice(1);
// console.log(fullname)

// Question 3
// let date=new Date();
// console.log(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear());
// console.log(date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear());
// console.log(date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear());
// console.log(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());

// Question 4
// function isWeekend(){
//     let day=new Date().getDay();
//     let con=day==6||day==7? "yes":"no";
//     return con;
// }
// console.log(isWeekend());

// Question5
// for(let i=0;i<16;i++){
//     if(i%2==0)
//         console.log(`${i} even`)
//     else
//     console.log(`${i} odd`)
// }

 //Question 6
//  let num=[1,2,3,3,4,5,5,6];
//  num=num.sort();
//  let num1=num[0];
// let count=0;
// let unique=[];
//  for(let i=1;i<num.length;i++){
//            if(num[i]==num1)
//             count++;
//            else{
//             if(count==0){
//              unique.push(num1)
//             }
//             if(i==num.length-1){
//                 if(num[i]!=num[i-1])
//                      unique.push(num[i]);
//             }
//             num1=num[i];
//             count=0;
//            }
//  }
//  console.log(unique)


//   Question7
// let x=()=>{
//     return   Math.floor(Math.random()*(20-1))+1;
// }
// console.log(x());

//Question 8
let num=[20,30,40,35,32,43,204,202];
let evennum=num.filter((evenof)=>{
    return evenof%2==0;
})
let maxEven=Math.max.apply(1,evennum);
console.log(maxEven)


//Question 9
// let num=15;
// let factorsOfNum=[];
// for(let i=1;i<=num;i++){
//     if(num%i==0)
//        factorsOfNum.push(i);
// }
// console.log(factorsOfNum);