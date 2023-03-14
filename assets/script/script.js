let input = document.querySelector("#todo");
let addBtn = document.querySelector(".btn-warning");
let list = document.querySelector("ul");
let errorMsg = document.querySelector(".errorMsg");
let clearAll = document.querySelector(".btn-dark");
let countToDo = document.querySelector(".count");
let updateBtn = document.querySelector(".update");
//add button click event
addBtn.addEventListener("click", function (e) {
  //e.target = addBtn
  e.preventDefault();
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  li.classList.add("d-flex");
  li.classList.add("justify-content-between");
  li.classList.add("align-items-center");
  let span = document.createElement("span");
  span.classList.add("lead");
  span.textContent = input.value;

  let button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-danger");
  button.classList.add("delete");
  button.style.marginRight = "5px";
  button.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;

  let markBtn = document.createElement("button");
  markBtn.classList.add("btn");
  markBtn.classList.add("btn-info");
  markBtn.classList.add("mark-done");
  markBtn.style.marginRight = "5px";
  markBtn.style.color = "#fff";
  markBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

  let editBtn = document.createElement("button");
  editBtn.classList.add("btn");
  editBtn.classList.add("btn-primary");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  let btnWrapper = document.createElement("div");
  btnWrapper.append(button, markBtn, editBtn);

  li.append(span, btnWrapper);
  list.append(li);
  input.value = "";

  let deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function (e) {
      e.target.parentElement.parentElement.parentElement.remove();
      countToDo.textContent = list.children.length;
    });
  });

  let markBtns = document.querySelectorAll(".mark-done");
  markBtns.forEach((markBtn) => {
    markBtn.addEventListener("click", function (e) {
      let doneToDo =
        e.target.parentElement.parentElement.previousElementSibling;
      doneToDo.style.textDecoration = "line-through";
    });
  });

  let editBtns = document.querySelectorAll(".btn-primary");
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", function (e) {
      let toDoContent =
        e.target.parentElement.parentElement.previousElementSibling.textContent;
      input.value = toDoContent;
      input.focus();
      updateBtn.style.display = "block";
      addBtn.setAttribute("disabled", "");
      markBtns.forEach((markBtn) => {
        markBtn.setAttribute("disabled", "");
      });
      deleteBtns.forEach((deleteBtn) => {
        deleteBtn.setAttribute("disabled", "");
      });
      editBtns.forEach((editBtn) => {
        editBtn.setAttribute("disabled", "");
      });
      clearAll.setAttribute("disabled","");
      editBtn.parentElement.parentElement.classList.add("editing");
    });
  });

  //update button click event
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].classList.contains("editing")) {
        let updatedValue = input.value;
        list.children[i].children[0].textContent = updatedValue;
        list.children[i].classList.remove("editing");
      }
    }
    addBtn.removeAttribute("disabled");
    markBtns.forEach((markBtn) => {
        markBtn.removeAttribute("disabled");
    });
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.removeAttribute("disabled");
    });
    editBtns.forEach((editBtn) => {
        editBtn.removeAttribute("disabled");
    });
    input.value = "";
    if (updateBtn.style.display=="block") {
      console.log("hey there");
      updateBtn.style.display = "none";
    }
    clearAll.removeAttribute("disabled");
  });
 
  countToDo.textContent = list.children.length;
});

//input keyup event
input.addEventListener("keyup", function (e) {
  // e.target = input
  // getAttribute, setAttribute, removeAttribute
  if (updateBtn.style.display == "block") {
    addBtn.setAttribute("disabled", "");
    if (e.target.value.trim().length < 4) {
      errorMsg.style.display = "block";
      updateBtn.setAttribute("disabled", "");
    } else {
      errorMsg.style.display = "none";
      updateBtn.removeAttribute("disabled");
    }
  } else {
    if (e.target.value.trim().length < 4) {
      errorMsg.style.display = "block";
      addBtn.setAttribute("disabled", "");
      updateBtn.setAttribute("disabled", "");
    } else {
      errorMsg.style.display = "none";
      addBtn.removeAttribute("disabled");
      updateBtn.removeAttribute("disabled");
    }
  }
});

//clear all click event
clearAll.addEventListener("click", function () {
  list.innerHTML = "";
  countToDo.textContent = "0";
  addBtn.removeAttribute("disabled");
});
