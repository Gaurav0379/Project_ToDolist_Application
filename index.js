//To store the task content in an array called as tasklist
var state = {
    tasklist:[]
}
//DOM : to apply the logic to the UI
var taskContent = document.querySelector(".task_content");
var taskModal = document.querySelector(".task_modal_body");

//Dynamic Functionality for the task card/ call it as card template

var htmlTaskContent = ({id,url,tasktitle,taskdes,tasktype})=>`
    <div class='col-md-6 col-lg-4 mt-3 id=${id} key=${id}'>
        <div class='card shadow-sm task_card>
             <div class='card-header d-flex justify-content-end task_card_header'>
             <button type="button" class="btn btn-outline-info mr-2" name="${id}">
             <i class="fas fa-pencil-alt" name="${id}"></i>
           </button>
           <button
             type="button"
             class="btn btn-outline-danger mr-2"
             name="${id}"
           >
             <i class="fas fa-trash-alt" name="${id}"></i>
           </button>
         </div>
         <div class="card-body">
           ${ url && `<img
             width="90%"
             src=${url}
             alt="card image cap"
             class="card-img-top md-3 rounded-lg"
           />` }
           <h4 class="card-title data-gram_editor='true'">${tasktitle}</h4>
          <p class="task_des trim-3-lines text-muted data-gram_editor='true'">
            ${taskdes}
          </p>
          <div class="tags text-white d-flex flex-wrap">
            <span class="badge bg-primary m-1 data-gram_editor='true'"
              >${tasktype}</span
            >
             </div>
             <div class="card-footer">
          <button
            class="btn btn-outline-primary float-right"
            data-bs-toggle="modal"
            data-bs-target="#openTaskModal"
          >
            Open task
          </button>
        </div>
        </div>
    </div>
    `
