const body = document.querySelector("body");

const IMG_NUMBER = 6;

function paintImage(imgNumber) {
    const image = new Image(); //이미지 태그를 만들어주는 자바스크립트 내장함수다.
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();