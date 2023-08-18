for(let num=2;num<101;num++)
{
     let count=0;
  for(let j=1;j<=num;j++)
 {
       if(num%j==0)
          count++;
  
  }
    if(count==2){
     console.log(num);
     }
  }