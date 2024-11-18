let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let newgamebtn = document.querySelector("#newgamebtn");
let resetbtn = document.querySelector("#resetbtn");

let chanceText = true;

let boxes = [];

for (let i = 0; i <= 8; i++) {
  boxes[i] = document.querySelector(`#box${i}`);

  boxes[i].addEventListener("click", () => {
    console.log(`Box ${i} clicked`);
    if (boxes[i].innerText === "") {
      if (chanceText) {
        boxes[i].innerText = "X";
        chanceText = false;
      } else {
        boxes[i].innerText = "O";
        chanceText = true;
      }
      checkWinner();
    }
  });

  // console.log(boxes[i].innerText);
}

let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function checkWinner() {
//   for (let pattern of winPattern) {
//     console.log(pattern[0], pattern[1], pattern[2]);
//     console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
//   }
// }

let resetGame = () => {
  chanceText = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
  steps = 1;
};

let disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

let enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  steps = 1;
};

let showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner} Player`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

let steps = 1;
let checkWinner = () => {
  let noWinner = true;
  for (let pattern of winPattern) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log(`Player ${pos1Val} wins!`);
        showWinner(pos1Val);
        noWinner = false;
      }
    }
  }
  if (steps === 9 && noWinner === true) {
    msg.innerText = "Wow, It's a Draw!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
  }
  console.log(steps);
  steps++;
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
