//To store the task content in an array called as tasklist
var state = {
  tasklist: [],
};
//DOM objects: to apply the logic to the UI
var taskContents = document.querySelector(".task_content");
var taskModal = document.querySelector(".task_modal_body");

//Dynamic Functionality for the task card/ call it as card template

var htmlTaskContent = ({ id, url, tasktitle, tasktype, taskdes }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task_card">
             <div class="card-header d-flex justify-content-end gap-2 task_card_header">
             <button type="button" class="btn btn-outline-info mr-2" name=${id} onclick="editTask.apply()">
             <i class="fas fa-pencil-alt" name=${id}></i>
           </button>
           <button
             type="button"
             class="btn btn-outline-danger mr-2"
             name=${id}
             onclick = "deleteTask.apply()"
           >
             <i class="fas fa-trash-alt" name=${id}></i>
           </button>
         </div>
         <div class="card-body">
           ${
             url
               ? `<img
             width="100%"
             src=${url}
             alt="card image cap"
             class="card-img-top md-3 rounded-lg"
           />`
               : `<img
           width="100%"
           src="data:image/jpeg;base64,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"
           alt="card image cap"
           class="card-img-top md-3 rounded-lg"
         />`
           }
           <h4 class="card-title data-gram_editor='false'">${tasktitle}</h4>
          <p class="task_des trim-3-lines text-muted ">
            ${taskdes}
          </p>
          <div class="tags text-white d-flex flex-wrap">
            <span class="badge bg-primary m-1">${tasktype}</span>
         </div>
         </div>
        <div class="card-footer" >
          <button
            class="btn btn-outline-primary float-right"
            data-bs-toggle="modal"
            data-bs-target="#openTaskModal"
            id=${id}
            onclick="openTask.apply()"
          >
            Open task
          </button>
        </div>
        </div>
    
    `;
//Task Modal template
var htmlTaskModal = ({ id, url, tasktitle, taskdes }) => {
  var date = new Date(parseInt(id));
  return `
    <div id=${id}>
    ${
      url
        ? `<img
      width="100%"
      src=${url}
      alt="card image cap"
      class="card-img-top md-3 rounded-lg"
    />`
        : `<img
    width="100%"
    src="data:image/jpeg;base64,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"
    alt="card image cap"
    class="card-img-top md-3 rounded-lg"
  />`
    }
   
  <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
  <h2 class="my-3">${tasktitle}</h2>
  <p class='lead'>${taskdes}</p>
    </div>
    `;
};

//Storing the task details into local storage
var updateLocalStorage = () => {
  state.tasklist = state.tasklist.filter((element)=>element!==null);
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.tasklist,
    })
  );
};

// To load the initial data from the local Storage and to append data to the tasklist
var loadInitialData = () => {
  var localStorageCopy = JSON.parse(localStorage.task);
  if (localStorageCopy) state.tasklist = localStorageCopy.tasks;
  state.tasklist = state.tasklist.filter((element)=>element!==null);
  state.tasklist.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};


var handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageURL").value,
    tasktitle: document.getElementById("task_title").value,
    tasktype: document.getElementById("type").value,
    taskdes: document.getElementById("task_description").value,
  };
  if (input.tasktitle === "" && input.taskdes === "" && input.tasktype === "") {
    return alert("Fill the mandotary fields..");
  }
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );
  state.tasklist.push({ ...input, id });
  updateLocalStorage();
};

var openTask = (e) => {
  if (!e) e = window.event;
  var gettask = state.tasklist.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlTaskModal(gettask);
};

//Delete a task
var deleteTask = (e)=>{
  if (!e) e = window.event;
  // unique tag ID
  var targetID = e.target.getAttribute("name");
  //Name of the tage used for the target
   var type = e.target.tagName;
  // console.log(type);

  //To delete the task of the given ID
  var removeTask = state.tasklist.filter(({id})=>id !== targetID);
  //console.log(removeTask);
 //Update the local storage and tasklist array
  state.tasklist = removeTask;
  updateLocalStorage();

  //Removing the cards from UI
 
  //If we hit on Button how the card get Deleted
  if(type == "BUTTON"){
    console.log(e.target.parentNode.parentNode.parentNode)
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    )

}

//if we hit on Icon how the card get Deleted
return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
  e.target.parentNode.parentNode.parentNode.parentNode
) 
}
//Edit a task
var editTask = (e)=>{
  if(!e) e = window.event;

  var targetID = e.target.id;

  var type = e.target.tagName;

  var parentNode;

  //Creating variable for each task card content to access the current one and update it .
  var tasktitle;
  var tasktype;
  var taskdes;
  var submitButton;
  console.log(type);

  //If the button is clicked then 3 state down and access the content of each task content
  if(type ==="BUTTON"){
    
    parentNode = e.target.parentNode.parentNode;
  }else{
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  //Accessing the each task content
  tasktitle = parentNode.childNodes[3].childNodes[3];
  taskdes = parentNode.childNodes[3].childNodes[5];
  tasktype = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];
  
 
  console.log(tasktitle);
  console.log(tasktype);
  console.log(taskdes);
  console.log(submitButton);

  //Making all task card content editable
  tasktitle.setAttribute("contenteditable","true");
  tasktype.setAttribute("contenteditable","true");
  taskdes.setAttribute("contenteditable","true");
  //Making a function for submit button to save the updated content in the local storage and tasklist array
  submitButton.setAttribute("onclick","saveEdit.apply()");

  //When we are clicking on save changes it should not pop the openModel content on the screen
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");

  submitButton.innerHTML = "Save Changes";

}
//Save the edited task
var saveEdit = (e)=>{
  if(!e) e = window.event;
  var targetID = e.target.id;
  
  var parentNode = e.target.parentNode.parentNode;
  var tasktitle;
  var tasktype;
  var taskdes;
  var submitButton;

  tasktitle = parentNode.childNodes[3].childNodes[3];
  taskdes = parentNode.childNodes[3].childNodes[5];
  tasktype = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];

  //Getting the updated content
   var updatedContent = {
    tasktitle:tasktitle.innerHTML,
    tasktype:tasktype.innerHTML,
    taskdes:taskdes.innerHTML,
   }

   //Updating the card content in the tasklist array
  var stateCopy = state.tasklist;
   stateCopy=stateCopy.map((task)=>
   task.id == targetID ?
   {
    id:task.id,
    tasktype:updatedContent.tasktype,
    taskdes:updatedContent.taskdes,
    tasktitle:updatedContent.tasktitle,
   }:task

    );

   //update on local storage
   state.tasklist = stateCopy;
   updateLocalStorage();

   //once we click on save changes we should not able to edit again
   tasktitle.setAttribute("contenteditable","false");
   tasktype.setAttribute("contenteditable","false");
   taskdes.setAttribute("contenteditable","false");

   //changing the button back to open task functionality
   submitButton.setAttribute("onclick","openTask.apply()");
   submitButton.setAttribute("data-bs-toggle","modal");
   submitButton.setAttribute("data-bs-target","#openTaskModal");
 

   submitButton.innerHTML = "Open Task";


}

//Search the card

const searchTask = (e)=>{
  if(!e) e = window.event;

  while(taskContents.firstChild){
    taskContents.removeChild(taskContents.firstChild);
  }
  //var newTasklist = state.tasklist.filter((element)=>element!==null);
  const resultData = state.tasklist.filter(({tasktitle})=>tasktitle.includes(e.target.value));
  console.log(resultData);
  resultData.map((cardData)=>{
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData));
})

}
