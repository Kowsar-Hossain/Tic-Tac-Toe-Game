let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    boxEnabled();
    msgContainer.classList.add("hide");
}

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.classList.add("colorO");
            box.innerText = "O";
            turnO = false;
        } else {
            box.classList.add("colorX");
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        count++;
        let isWinner = checkWinnner();
        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was Draw . Try again !!`;
    msgContainer.classList.remove("hide");
    boxDisabled();
};

const boxDisabled = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}
const boxEnabled = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations !! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    boxDisabled();
}

function checkWinnner() {
    for (pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner");
                showWinner(pos1val);
                return true;
            }
        }
    }
}

newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);