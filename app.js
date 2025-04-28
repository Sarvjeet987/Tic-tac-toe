let boxs = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player O starts
let gameActive = true; // control clicking after game ends

const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turn0 = true;
  gameActive = true;
  enableboxs();
  msgContainer.classList.add("hide");
};

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameActive) return; // don't allow if game is over

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
  msg.innerText = `🎉 Congratulations! Player "${winner}" wins! 🎉`;
  msgContainer.classList.remove("hide");
  gameActive = false;
  disableboxs();
};

const checkWinner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxs[pattern[0]].innerText;
    let pos2val = boxs[pattern[1]].innerText;
    let pos3val = boxs[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return;
      }
    }
  }

  // Check for Draw
  let isDraw = [...boxs].every(box => box.innerText !== "");
  if (isDraw) {
    msg.innerText = "😐 It's a Draw!";
    msgContainer.classList.remove("hide");
    gameActive = false;
  }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
