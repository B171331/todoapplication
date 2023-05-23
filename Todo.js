let todocontainer = document.getElementById("todocontainer");
let savebutton = document.getElementById("savetodoitem");



 function gettodofromlocalstorage() {
    let stringfiedtodo = localStorage.getItem("todoitems");
    let parsedtodo = JSON.parse(stringfiedtodo);

    if (parsedtodo === null) {
        return [];
    }
    else {
        return parsedtodo;
    }
 }

let todoitems = gettodofromlocalstorage();
let todoscount=todoitems.length;

savebutton.onclick = function() {
    localStorage.setItem("todoitems",JSON.stringify(todoitems));                 
}  

 

let addtodobutton = document.getElementById("addtodoitems");
addtodobutton.onclick= function() {
    addtodoitem();
}

function deletetodoelement(todoid) {
    let todoelement = document.getElementById(todoid);
    todocontainer.removeChild(todoelement);

    let indexelement=todoitems.findIndex(function(eachitem) {
        let deleteelementid = "todo"+eachitem.id;

        if (deleteelementid === todoid) {
            return true;
        }
        else {
            return false;
        }
    
    })
    todoitems.splice(indexelement,1);
    

}

function ontodostatuschange(checkboxid,labelid) {
    let checkboxelement = document.getElementById(checkboxid);
    let labelelementid = document.getElementById(labelid);
    
    labelelementid.classList.toggle("label-element"); 
   
}
function createtodoitems(todoitems) {

    let checkboxid = "mycheckbox"+todoitems.uniqueid;
    let labelid = "label"+todoitems.uniqueid;

    let todoid = "todo"+todoitems.uniqueid;


    let listcontainer = document.createElement("li");
    listcontainer.id=todoid;
    listcontainer.classList.add("d-flex","flex-row","mt-3");
    todocontainer.appendChild(listcontainer);

    let inputelement = document.createElement("input");
    inputelement.type="checkbox";
    inputelement.id=checkboxid;
    inputelement.classList.add("checkbox");
    listcontainer.appendChild(inputelement);
    inputelement.onclick= function() {
        ontodostatuschange(checkboxid,labelid);
    }

    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("label-container","d-flex","flex-row");
    listcontainer.appendChild(labelcontainer);

    let labelelement = document.createElement("label");
    labelelement.id=labelid;
    labelelement.setAttribute("for",checkboxid);
    labelelement.textContent=todoitems.text;
    labelcontainer.appendChild(labelelement);

    let deleteiconcontainer = document.createElement("div");
    deleteiconcontainer.classList.add("delete-container","ml-auto");
    labelcontainer.appendChild(deleteiconcontainer);

    let deleteicon = document.createElement("i");
    deleteicon.classList.add("far","fa-trash-alt","icon1");
    deleteicon.onclick=function() {
        deletetodoelement(todoid);    
    }
    deleteiconcontainer.appendChild(deleteicon); 

}
function addtodoitem() {

    let todoscount=todoitems.length;
    todoscount=todoscount+1;

    let inputvalue=document.getElementById("userinput");
    let todoitem=inputvalue.value;
    if (todoitem==="") {
        alert("enter valid text");
        return; 
    }
     
    let newtodo = {
        text:todoitem,
        uniqueid:todoscount
    }
    createtodoitems(newtodo);
    inputvalue.value=""
}

for (let eachitem of todoitems) {
    createtodoitems(eachitem);
}



