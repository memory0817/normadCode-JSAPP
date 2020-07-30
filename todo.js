const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

// function filterFn(todo) {
//     return todo.id === 1
// } cleanToDos의 익명함수와 같다. 재활용성이 없는 함수는 익명함수로 대체하는게 좋다.

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    // console.log(event.target.parentNode);
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        //console.log(toDo);
        //여기서 todo인자가 이해가 안갔는데 댓글에 따르면 그저 단순히 toDos라는 array안에 존재하는 어떤한 값들을 지칭하는 것이라고한다.
        //toDo.id라함은 그 값들의 id를 지칭하는 것이다.
        //console.log(toDo.id, li.id); //toDo.id는 number고 li.id는 string으로 인식돼어서 string을 숫자타입으로 변환해주어야한다.
        return toDo.id !== parseInt(li.id);
    });
    //console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos(); //push를 한 이후에 호출해야한다. 이 전에 호출해버리면 아무것도 push가 안된상태이기때문에 저장할게 없음.
    //그러나 확인해보면 object,object로 들어가있다. 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 한다.
    //ex. key:hello/value:true라고 저장해서 확인해보면 boolean타입이 아닌 string타입으로 가져옴
    //그래서 object를 string으로 가져와야한다. 그래서 JSON.stringify를 쓴다.
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //JSON은 'JavsScript Object Notation'의 준말임. 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능이다.
        //자바스크립트의 object를 string으로 변환해주기도 하고, string을 object로 변환해줄수도 있다.
        //JSON.parse를 해주기 전(loadedToDos)과 해준 후(parsedToDos)를 각각 console.log해서 확인해보는게 좋다.
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}


init();