// //Question1
//print Prime Numbers in Array
//     let number=[12,13,33,29];
//  let primeNumber=[];
//  let nonPrimeNumber=[];
//  let count=0;
// for(let i=0;i<number.length;i++){
//      for(let j=1;j<=number[i];j++){
//         if(number[i]%j==0){
//            count++;
//         }
//      }
//      if(count==2){
//         primeNumber.push(number[i]);
//     }
//     else{
//     nonPrimeNumber.push(number[i]);
//     }
//  count=0;
// }
// console.log(primeNumber);



// //Question2
// //print Largest Numebr

let num=[1,4,5];
let largest=num[0];
for(let i=0;i<num.length;i++){
    if(largest<num[i]){
        largest=num[i];
    }
}
console.log(largest);



// //Question3
// //Print Sum of Numbers in Array
// let num1=[1,2,3,8]
// let sum=0;
// num1.forEach((sumof)=>{
//       sum+=sumof;
// });
// console.log(sum);




// //Question4
// //Print uniques values
// num=[3,4,5,11,2,3,5,11,7];
// len=num.length;
// for(let i=0;i<len;i++){
//     for(let j=i+1;j<len;j++){
//         if(num[i]==num[j]){
//             num.splice(j,1)
//         }
//     }
// }
// console.log(num)



// //Question 5
// //Factorail of number
// let num3=[3,1,5]
// let factorial=[];
// for(let i=0;i<num3.length;i++){
//     let x=1;
//      for(let j=1;j<=num3[i];j++){
//          x*=j;
//      }
//      factorial.push(x);
// }
// console.log(factorial)