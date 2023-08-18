let person = [
  {
    id: 1,
    name: "Faruk",
    location: "Guntur"
  },

  {
    id: 2,
    name: "Sai",
    location: "Vijaywada"
  },
  {
    id: 3,
    name: "Mani",
    location: "Guntur"
  },

  {
    id: 4,
    name: "Teja",
    location: "Chitoor"
  },

  {
    id: 5,
    name: "Sumanth",
    location: "Vijaywada"
  }
]

function tableh() {
  let html = `<table cellpadding=15px>`;
  html += "<tr><h3> <th>Id</th> <th>Name</th> <th>Location</th> </h3></tr>"

  person.forEach(oPerson=>{
    let Id = oPerson.id;
    let Name = oPerson.name;
    let loc = oPerson.location;
    html += `<tr> <td>${Id}</td> <td>${Name}</td> <td>${loc}</td> </tr>`;
  })
  html += `</table>`;
  document.getElementById("demo").innerHTML = html;
}
tableh();



function add() {
  let x = document.getElementById("n1").value;
  let y = document.getElementById("n2").value;
  let z = document.getElementById("n3").value;
  
  let obj={};
  let check=true;
  if (x == "" || y == "" || z == "") 
    alert("please enter the data");
  else {
    person.forEach(oPerson=>{
      if(oPerson.id!=x){
      obj = {
          'id': x,
          'name': y,
          'location': z
        }
      }
      else{
        alert("data already exist");
        check=false;
         stop();
      }
    })
    if(check==true)
    person.push(obj);
  }

  document.getElementById("n1").value  = "";
  document.getElementById("n2").value  = "";
  document.getElementById("n3").value = "";
  this.tableh()
}



function deleteRecord() {

  let getId = document.getElementById("delid").value;

  let Iindex = person.findIndex((findObject)=>
    findObject.id == getId
)
  if(Iindex==-1)
  alert("Data Not Found");
 else{
   person.splice(Iindex, 1);
  this.tableh();
}
}




function updateRecord(){

  let getId = document.getElementById("updid").value;
  let upname=document.getElementById("namup").value;
  let uploc=document.getElementById("locup").value;

  person.forEach((upObject)=>{
    if(upObject.id==getId){
      if(upname!="")
        upObject.name=upname;
      if(uploc!="")
        upObject.location=uploc;
    }
  });   

  document.getElementById("n1").value  = "";
  document.getElementById("n2").value  = "";
  document.getElementById("n3").value = "";
  this.tableh();
}








