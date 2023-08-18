//Question 1
//if two values are equal and same type return true;

// let x=Equalof(23,23)
// function Equalof(a,b){
//     return a===b;
// }
// console.log(x);



//Question 2
//take value as argument and return its type

// function typeofvalue(value){
//     return typeof value;
// }
// console.log(typeofvalue(234));



//Question 3
//take String as argument and return by removing first 3 charater

// function firstThreeChar(a){   
//     if(typeof a==="string"){
//     //Way-1
//     // return  a.slice(3);

//     //Way-2
//     return  a.substring(3);
//     }
//     else
//     return "it is not a string";
// }
// console.log(firstThreeChar("2343434"));



//Question 4
//write a function to take two agruments and return how many times that a occurs in b

// function repeatofAinB(a,b){
//    let arrStr= b.split("");
//     let count=0;
//      arrStr.forEach(char => {
//             if(char==a)
//                 count++;
//      });
//      return count;
// }
// console.log (repeatofAinB("b","what are you doing bro bob is a boy"));



//Question 5
//return x if x divisible by y else return nearest possible divisble of y 
// function divisbleOfXbyY(num1,num2){
//     if(num1%num2==0){
//         return num1;
//     }
//     else{
//         let num=Math.round(num1/num2);

//         if((num>(num1/num2))
//         num-=1;

//         return num*num2+num2;
//     }
// }
// console.log(divisbleOfXbyY(7,3));



//Question 6
//cal number of days in between two dates in function
// function noOfDays(a,b){
//     let msA=a.getTime();
//     let msB=b.getTime();
//     let difms=0;
//     if(msA>msB)
//       difms=msA-msB;
//       else
//       difms=msB-msA;

//       let days=difms/(1000*(60*60*24));
//     return days;
// }
// console.log(noOfDays(new Date("2020-06-11"),new Date("2020-06-01")));





//Question 7
//No of Elements in array (length)

// function noOfElements(array){
//      //  way-1
//      //  return array.length;
//      //way-2
//     let count=0;
//     array.forEach(element => {
//         count++;
//     });
//     return count;
// }
// console.log(noOfElements([2,3,5,7,8]));





// Question 8
// function largArrStr(a){
//     let largArr=[];
//     let arrlen=0;
//     let count=0;
//     a.forEach(strele => {

//         for(let charStr of strele){
//             count++;
//         }
//         console.log(count)
//         if(arrlen<count){
//             largArr=strele;
//             arrlen=count;
//         }
//         count=0;
//     });
//     return largArr;
// }
// console.log(largArrStr(["hi","what","brother","see","me"]))




// function merageArray(array1,array2){
//       let array = array1.concat(array2);
//       let len=array.length-1;
//       while(len>=0){
//         let inner=len-1;
//         while(inner>=0){
//              if(array[len]==array[inner]){
//                 console.log(array[inner]);
//                 array.splice(inner,1);
//              }
//             inner--;
//         }
//         len--;
//       }
//       array.sort((a,b)=>{return (a-b)});
//       return array;
// }
// console.log (merageArray([1,2,2,3,3,4],[5,6,6,7,8]))




//Question 10
// function addProp(array1,array2){
//     let newObject={};
//     for(let key in array1){
//         newObject[array1[key]]=array2[key];
//     }
//     return newObject;
// }
// console.log(addProp(['a','b','c'],[1,2,3]));




//Question 11
// function keyOfObject(objectof){
//     let arrOfProp=[];
//     for(let property in objectof){
//         arrOfProp.push(property);
//     }
//     return arrOfProp;
// }
// console.log(keyOfObject({a:1,b:2,c:3}))




//Question 12
// function changeValOfObjProp(obj,num){
//     for(let prop in obj){
//         obj[prop]=obj[prop]*2;
//     }
//     return obj;
// }
// console.log(changeValOfObjProp({a:1,b:2,c:3},2))




// Question 13
// function getPropFromObj(obj){
//    for(let prop in obj){
//     if(prop=="country"){
//        return obj[prop];
//     }
//    }
// }
// console.log(getPropFromObj({continent:"Asis",country:"Sweden" }))





//Question 14

// function productOftwoArray(array1,array2){
//     let prodArray=[];
//     for(let key in array1){
//         prodArray.push(array1[key]*array2[key])
//     }
//     return prodArray;
// }
// console.log(productOftwoArray([3,45,23,78,34,1],[4,2,34,4,12,1]))




//Question 15
// function fibonacci(num){
//     let output=[];
//     let n1=0;
//     let n2=1;
//     let sum=0;
//     while(num>0){
//         output.push(n1);
//         sum=n1+n2;
//         n1=n2;
//         n2=sum;
//         num--;
//     }
//     return output;
// }
// let ans=fibonacci(8);
// console.log(...ans)




//Question16
// class Person{
//     constructor(name,age,country){
//         this.name=name;
//         this.age=age;
//         this.country=country
//     }
//     display(){
//         return "name="+this.name+" "+"age="+this.age+" "+"country="+this.country;
//     }
// }

// let x=new Person("faruk",23,"India");
// let y=new Person("Naveen",23,"India");
// console.log(x.display(12))
// console.log(y.display())





//Question 17

// class Animal{
//     constructor(species,sound){
//       this.species=species;
//       this.sound=sound;
//     }

//       animalSound(){
//              return "species="+this.species+" "+"sound="+this.sound;
//       }
// }

// class Dog extends Animal
// {
//     constructor(species,sound,color){
//         super(species,sound);
//         this.color=color
//     }
//     animalSound(){
//         return "species="+this.species+" "+"sound="+this.sound+" "+"color="+this.color;
//     }

// }
// let dog=new Dog("Lab","Bow","brown");
// console.log(dog.animalSound())

let array=[2,4,5,6,8,9,2,5,6,9];
let arrLength=array.length;
for(let i=0;i<arrLength;i++)
{
      for(let j=1;j<arrLength;j++)
      {
               if(array[i]==array[j])
                array.splice(j,1);
       }
 }
console.log(array);
