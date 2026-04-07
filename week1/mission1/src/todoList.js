var input = document.getElementById("input");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        var task = input.value.trim();
        if (task) {
            var li = document.createElement("li");
            var span = document.createElement("span");
            span.textContent = task;
            var completeButton = document.createElement("button");
            completeButton.textContent = "완료";
            li.append(span, completeButton);
            todoList.appendChild(li);
            input.value = "";
        }
    }
});
todoList.addEventListener("click", function (event) {
    var target = event.target;
    if (target.tagName === "BUTTON" && target.textContent === "완료") {
        var li = target.parentElement;
        if (li) {
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            li.append(deleteButton);
            doneList.appendChild(li);
            target.remove();
        }
    }
});
doneList.addEventListener("click", function (event) {
    var target = event.target;
    if (target.tagName === "BUTTON" && target.textContent === "삭제") {
        var li = target.parentElement;
        if (li) {
            li.remove();
        }
    }
});
