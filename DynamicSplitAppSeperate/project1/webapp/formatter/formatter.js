sap.ui.define([], 
    
  function () {
"use strict";
return {
    calMarks:function(aEdu){
        let marks=0;
        aEdu.forEach(oEdu=>{
          marks+=Number(oEdu.Aggregation);
        })
        if(marks==0)
         return `Total Percentage: ${0}`
        else{
        let average=Math.floor(marks/aEdu.length);
        return `Total Percentage: ${average}`;
        }
    },

    calExperience:function(aEmp){
        let experience=0;
        aEmp.forEach(oEmp=>{
          if(oEmp.YearOfEnd!="-")
          experience+=Number(oEmp.YearOfEnd)- Number(oEmp.YearOfJoin);
          else
          experience+=new Date().getFullYear()-(oEmp.YearOfJoin)
        })
        return `Year of Exp: ${experience}`;
    }
  }

})