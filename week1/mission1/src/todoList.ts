const input = document.getElementById("input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");



input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const task = input.value.trim();
        if (task) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = task;
            const completeButton = document.createElement("button");
            completeButton.textContent = "완료";
            li.append(span, completeButton);
            todoList.appendChild(li);
            input.value = "";
        }
    }
    
});    

todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON" && event.target.textContent === "완료") {
        const li = event.target.parentElement;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        li.append(deleteButton);
        doneList.appendChild(li);
        event.target.remove();
    }
});


doneList.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON" && event.target.textContent === "삭제") {
        const li = event.target.parentElement;
        li.remove();
    }
})
