let boxs = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resrt-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]

]
const resetGame = () => {
    turn0 = true;
    enableboxs();
    msgContainer.classList.add("hide");
};
boxs.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = "122";
        if (turn0) {
            box.innerText = "O";
            turn0 = false;

        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});
const disableboxs = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};
const enableboxs = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    msg.innerText = 'Congratulation, Winner';
    msgContainer.classList.remove("hide");
    disableboxs();

};
const checkWinner = () => {
    for (let Pattern of winpattern) {
        let pos1val = boxs[Pattern[0]].innerText;
        let pos2val = boxs[Pattern[1]].innerText;
        let pos3val = boxs[Pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
};
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);