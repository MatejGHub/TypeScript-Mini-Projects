let inputEl: HTMLInputElement = document.getElementById(
  "to-do-input"
) as HTMLInputElement;
let addBtn: HTMLButtonElement = document.getElementById(
  "to-do-add"
) as HTMLButtonElement;
let ul: HTMLUListElement = document.getElementById(
  "to-do-list"
) as HTMLUListElement;
let form: HTMLFormElement = document.getElementById(
  "to-do-form"
) as HTMLFormElement;

// Load the to-do list from local storage
window.onload = function () {
  todoList.forEach(function (item: any) {
    let li: HTMLLIElement = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
  });
};

// Initialize the to-do list array
let todoList = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList") as string)
  : [];

// Adds li elements to the ul
addBtn.addEventListener("click", function () {
  if (
    inputEl.value !== "" &&
    inputEl.value.length <= 100 &&
    inputEl.value.length >= 5
  ) {
    let li: HTMLLIElement = document.createElement("li");
    li.innerText = inputEl?.value;
    ul.appendChild(li);
    // Add the item to the to-do list array
    todoList.push(inputEl.value);
    // Update local storage
    localStorage.setItem("todoList", JSON.stringify(todoList));
    inputEl.value = "";
  }
});

// Targets li inside UL
ul.addEventListener("click", function (event) {
  let targetElement = event.target as HTMLLIElement;
  if (targetElement.tagName === "LI") {
    targetElement.classList.toggle("active");
  }
  // Removes li element and local storage item
  if (
    event.offsetX > targetElement.offsetWidth - 20 &&
    !targetElement.classList.contains("active")
  ) {
    let index = todoList.indexOf(targetElement.innerText);
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    targetElement.remove();
  }
});

// Prevents form from submitting
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
