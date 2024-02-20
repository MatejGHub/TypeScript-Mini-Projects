"use strict";
let inputEl = document.getElementById("to-do-input");
let addBtn = document.getElementById("to-do-add");
let ul = document.getElementById("to-do-list");
let form = document.getElementById("to-do-form");
// Load the to-do list from local storage
window.onload = function () {
    todoList.forEach(function (item) {
        let li = document.createElement("li");
        li.innerText = item;
        ul.appendChild(li);
    });
};
// Initialize the to-do list array
let todoList = localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
// Adds li elements to the ul
addBtn.addEventListener("click", function () {
    if (inputEl.value !== "" &&
        inputEl.value.length <= 100 &&
        inputEl.value.length >= 5) {
        let li = document.createElement("li");
        li.innerText = inputEl === null || inputEl === void 0 ? void 0 : inputEl.value;
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
    let targetElement = event.target;
    if (targetElement.tagName === "LI") {
        targetElement.classList.toggle("active");
    }
    // Removes li element and local storage item
    if (event.offsetX > targetElement.offsetWidth - 20 &&
        !targetElement.classList.contains("active")) {
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
