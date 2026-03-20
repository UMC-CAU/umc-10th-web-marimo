const input = document.getElementById("input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement; 
const doneList = document.getElementById("done-list") as HTMLUListElement;



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
    const target = event.target as HTMLElement;

    if (target.tagName === "BUTTON" && target.textContent === "완료") {
        const li = target.parentElement;
        if(li){
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            li.append(deleteButton);
            doneList.appendChild(li);
            target.remove();
        }
    }
});


doneList.addEventListener("click", function(event){
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON" && target.textContent === "삭제") {
        const li = target.parentElement;
        if(li){
            li.remove();
        }
    }
})
