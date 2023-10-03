let table = [
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
];

let player1;
let player2;
let win;
let time;
let turn = "turn1";
let player1WinCount = 0;
let player2WinCount = 0;

const game = document.querySelector("#game");
const timerContainer = document.getElementById("timerContainer");
const columns = document.querySelectorAll(".column");
const btnQuit = document.getElementById("quit");
const divPlayer = document.getElementById("player");
const btnRestart = document.getElementById("restart");
const showInfos = document.getElementById("showInfos");
const buttons = document.getElementsByClassName("buttons")[0];

//FUNCAO PARA CRIAR TABALE COM BASE NA ARRAY TABLE
const createTable = () => {
  btnRestart.classList.remove("hidden");
  btnQuit.classList.remove("hidden");
  timerContainer.classList.remove("hidden");

  document.getElementById("game").innerHTML = "";
  document.getElementById("timerContainer").innerHTML = "";
  for (let i = 0; i < 7; i++) {
    let column = document.createElement("div");
    column.setAttribute("id", i);
    column.classList.add("column");
    game.append(column);
    column.addEventListener("click", changeTurn);
    for (let j = 0; j < table.length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      column.append(cell);
    }
  }
  const timer = document.createElement("div");
  timer.setAttribute("id", "timer");
  setTimeout(function () {
    return timerContainer.appendChild(timer);
  }, 1000);
  player1Turn();
  playCounter(0);
};

//funcao reiniciar table
const restartTable = () => {
  let game = document.getElementById("game");
  game.innerHTML = "";
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      table[i][j] = "X";
    }
  }
};
let timerID;
function timer() {
  let sec = 0;
  let min = 0;
  let hr = 0;
  timerID = setInterval(function () {
    let timer =
      (hr < 10 ? "0" + hr : hr) +
      ":" +
      (min < 10 ? "0" + min : min) +
      ":" +
      (sec < 10 ? "0" + sec : sec);
    document.getElementById("timer").innerHTML = timer;

    if (sec === 59) {
      min++;
      sec = 0;
    }
    if (min === 60) {
      hr++;
      min = 0;
    }
    sec++;
  }, 1000);
}
const stopTimer = () => {
  clearInterval(timerID);
};

//chamada mensagem de vitoria
const finalMsg = (player) => {
  if (player === "alertEmpate") {
    const alert = document.createElement("div");
    alert.classList.add(player);
    const message = document.createElement("p");
    message.innerText = "Go to the next turn!";
    alert.appendChild(message);
    const image = document.createElement("div");
    image.setAttribute("class", `${player}-img`);
    alert.appendChild(image);
    game.appendChild(alert);
  } else if (player === "alertPlayer1") {
    const alert = document.createElement("div");
    alert.classList.add(player);
    const message = document.createElement("p");
    message.innerText = "Congratulations, You save the princess Zelda!";
    alert.appendChild(message);
    const image = document.createElement("div");
    image.setAttribute("class", `${player}-img`);
    alert.appendChild(image);
    game.appendChild(alert);
  } else if (player === "alertPlayer2") {
    const alert = document.createElement("div");
    alert.classList.add(player);
    const message = document.createElement("p");
    message.innerText = "Oh no!!! The vilain catch the princess...";
    alert.appendChild(message);
    const image = document.createElement("div");
    image.setAttribute("class", `${player}-img`);
    alert.appendChild(image);
    game.appendChild(alert);
  }
  timerAfterVictory();
};

// vitória horizontal
const horizontalVictory = (arr) => {
  const edgeX = arr[0].length - 3;

  // iterar em cada linha
  for (let i = 0; i < arr.length; i++) {
    // iterar em cada célula da linha em questão
    for (let j = 0; j < edgeX; j++) {
      let cell = arr[i][j];

      if (cell === "V") {
        // Checar se as próximas 3 células à direita têm o mesmo valor V
        if (
          cell === arr[i][j + 1] &&
          cell === arr[i][j + 2] &&
          cell === arr[i][j + 3]
        ) {
          finalMsg("alertPlayer1");
          stopTimer();
          win = "player1";
          playCounter(1);
          break;
        }
      } else if (cell === "P") {
        // Checar se as próximas 3 células à direita têm o mesmo valor P
        if (
          cell === arr[i][j + 1] &&
          cell === arr[i][j + 2] &&
          cell === arr[i][j + 3]
        ) {
          const alert = document.createElement("div");
          finalMsg("alertPlayer2");
          stopTimer();
          win = "player2";
          playCounter(2);
          break;
        }
      }
    }
  }
};

// vitória vertical
const verticalVictroy = (arr) => {
  const edgeY = arr.length - 3;

  for (let i = 0; i < edgeY; i++) {
    // iterar em cada célula na linha em questão
    for (let j = 0; j < arr[0].length; j++) {
      cell = arr[i][j];

      if (cell === "V") {
        // Checar se as próximas 3 células à baixo têm o mesmo valor
        if (
          cell === arr[i + 1][j] &&
          cell === arr[i + 2][j] &&
          cell === arr[i + 3][j]
        ) {
          finalMsg("alertPlayer1");
          stopTimer();
          playCounter(1);
          win = player1;
          break;
        }
      } else if (cell === "P") {
        // Checar se as próximas 3 células à baixo têm o mesmo valor
        if (
          cell === arr[i + 1][j] &&
          cell === arr[i + 2][j] &&
          cell === arr[i + 3][j]
        ) {
          finalMsg("alertPlayer2");
          stopTimer();
          playCounter(2);
          win = player2;
          break;
        }
      }
    }
  }
};

//vitoria diagonal
const diagonalWin = (player) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        player === table[i][j] &&
        player === table[i + 1][j + 1] &&
        player === table[i + 2][j + 2] &&
        player === table[i + 3][j + 3]
      ) {
        if (player === "V") {
          finalMsg("alertPlayer1");
          stopTimer();
          win = "player1";
          playCounter(1);
        } else {
          finalMsg("alertPlayer2");
          stopTimer();
          win = "player2";
          playCounter(2);
        }
      }
    }
  }
  for (let i = 5; i > 2; i--) {
    for (let j = 0; j < 4; j++) {
      if (
        player === table[i][j] &&
        player === table[i - 1][j + 1] &&
        player === table[i - 2][j + 2] &&
        player === table[i - 3][j + 3]
      ) {
        if (player === "V") {
          finalMsg("alertPlayer1");
          stopTimer();
          playCounter(1);
        } else {
          finalMsg("alertPlayer2");
          stopTimer();
          playCounter(2);
        }
      }
    }
  }
};

// empate
const draw = (arr) => {
  let cont = 0;
  for (let i = 0; i < arr[0].length; i++) {
    if (arr[0][i] !== "X") {
      cont++;
    }
  }
  if (cont === 7) {
    finalMsg("alertEmpate");
    stopTimer();
  }
};

const registerPosition = (id, player) => {
  for (let i = 5; i >= 0; i--)
    if (table[i][id] === "X") {
      table[i][id] = player;
      break;
    }
};

// FUNÇÃO DE MUDANÇA DE TURNO E COLOCAÇÃO DOS DISCOS
const changeTurn = (evt) => {
  // selecionar a coluna
  let selectedColumn = evt.currentTarget;
  // selecionar última célula vazia da coluna
  let celula;
  for (let i = 0; i < selectedColumn.childNodes.length; i++) {
    if (selectedColumn.childNodes[i].childElementCount === 0) {
      celula = selectedColumn.childNodes[i];
    }
  }
  if (turn === "turn1") {
    // turno do jogador 1
    // colocar o disco do jogador 1
    const disc1 = document.createElement("div");
    disc1.classList.add("disc1");
    celula.appendChild(disc1);
    turn = "turn2";
    registerPosition(Number(selectedColumn.id), "V");
    diagonalWin("V");
    horizontalVictory(table);
    verticalVictroy(table);
    draw(table);
    if (win === undefined) {
      player2Turn();
    }
  } else {
    // turno do jogador 2
    // colocar o disco do jogador 2

    const disc2 = document.createElement("div");
    disc2.classList.add("disc2");
    celula.appendChild(disc2);
    turn = "turn1";
    registerPosition(Number(selectedColumn.id), "P");
    diagonalWin("P");
    horizontalVictory(table);
    verticalVictroy(table);
    draw(table);
    if (win === undefined) {
      player1Turn();
    }
  }
};

function timer() {
  let sec = 0;
  let min = 0;
  let hr = 0;
  timerID = setInterval(function () {
    let timer =
      (hr < 10 ? "0" + hr : hr) +
      ":" +
      (min < 10 ? "0" + min : min) +
      ":" +
      (sec < 10 ? "0" + sec : sec);
    document.getElementById("timer").innerHTML = timer;
    if (sec === 59) {
      min++;
      sec = 0;
    }
    if (min === 60) {
      hr++;
      min = 0;
    }
    sec++;
  }, 1000);
}

const toStart = () => {
  let inputsNames = document.querySelectorAll(".input");
  if (inputsNames[0].value !== "" && inputsNames[1].value !== "") {
    player1 = inputsNames[0].value;
    player2 = inputsNames[1].value;
  } else if (inputsNames[0].value !== "" && inputsNames[1].value === "") {
    player1 = inputsNames[0].value;
    player2 = "Player 2";
  } else if (inputsNames[0].value === "" && inputsNames[1].value !== "") {
    player1 = "Player 1";
    player2 = inputsNames[1].value;
  } else {
    player1 = "Player 1";
    player2 = "Player 2";
  }
  turn = "turn1";
  restartTable();
  createTable();
  stopTimer();
  timer();
  win = undefined;
};

const toRestar = () => {
  turn = "turn1";
  restartTable();
  createTable();
  stopTimer();
  timer();
  win = undefined;
};

const getNames = () => {
  const form = document.createElement("form");
  form.classList.add("form");
  game.append(form);

  const divInput1 = document.createElement("div");
  divInput1.classList.add("div-input");
  form.appendChild(divInput1);
  const imgPlayer1 = document.createElement("img");
  imgPlayer1.src = "./img/link.png";
  imgPlayer1.classList.add("img1");
  divInput1.appendChild(imgPlayer1);
  const inputPlayer1 = document.createElement("input");
  inputPlayer1.setAttribute("type", "text");
  inputPlayer1.setAttribute("placeholder", "Player 1");
  inputPlayer1.setAttribute("maxlength", "10");
  inputPlayer1.classList.add("input");
  divInput1.appendChild(inputPlayer1);

  const versus = document.createElement("p");
  versus.classList.add("versus");
  versus.innerText = "VS";
  form.appendChild(versus);

  const divInput2 = document.createElement("div");
  divInput2.classList.add("div-input");
  form.appendChild(divInput2);
  const imgPlayer2 = document.createElement("img");
  imgPlayer2.src = "./img/vilain.png";
  imgPlayer2.classList.add("img2");
  divInput2.appendChild(imgPlayer2);
  const inputPlayer2 = document.createElement("input");
  inputPlayer2.setAttribute("type", "text");
  inputPlayer2.setAttribute("placeholder", "Player 2");
  inputPlayer2.setAttribute("maxlength", "10");
  inputPlayer2.classList.add("input");
  divInput2.appendChild(inputPlayer2);

  const btnStart = document.createElement("button");
  btnStart.innerText = "Start Game";
  btnStart.classList.add("btnStart");
  form.appendChild(btnStart);
  btnStart.addEventListener("click", toStart);
};
getNames();

const player1Turn = () => {
  divPlayer.innerHTML = " ";
  divPlayer.classList.remove("div-player2");
  divPlayer.classList.add("div-player1");

  const pPlayer1 = document.createElement("p");
  pPlayer1.innerText = player1;
  pPlayer1.classList.add("p-player1");
  divPlayer.appendChild(pPlayer1);

  const imgPlayer1 = document.createElement("img");
  imgPlayer1.src = "./img/link.png";
  imgPlayer1.classList.add("img-div");
  divPlayer.appendChild(imgPlayer1);
};

const player2Turn = () => {
  divPlayer.innerHTML = " ";
  divPlayer.classList.remove("div-player1");
  divPlayer.classList.add("div-player2");

  const pPlayer2 = document.createElement("p");
  pPlayer2.innerText = player2;
  pPlayer2.classList.add("p-player2");
  divPlayer.appendChild(pPlayer2);

  const imgPlayer2 = document.createElement("img");
  imgPlayer2.src = "./img/vilain.png";
  imgPlayer2.classList.add("img-div");
  divPlayer.appendChild(imgPlayer2);
};
let containerP1 = document.querySelector("#player1count");
let containerP2 = document.querySelector("#player2count");

const playCounter = (player) => {
  if (player === 1) {
    player1WinCount++;
  } else if (player === 2) {
    player2WinCount++;
  }

  let countPlayer1 = document.createElement("div");
  countPlayer1.classList.add("playCount");
  countPlayer1.innerHTML = "";
  let namePlayer1 = document.createElement("p");
  countPlayer1.appendChild(namePlayer1);
  namePlayer1.innerText = player1;
  let winsPlayer1 = document.createElement("p");
  countPlayer1.appendChild(winsPlayer1);
  winsPlayer1.innerText = player1WinCount;
  containerP1.innerHTML = "";

  let countPlayer2 = document.createElement("div");
  countPlayer2.classList.add("playCount");
  countPlayer2.innerHTML = "";
  let namePlayer2 = document.createElement("p");
  countPlayer2.appendChild(namePlayer2);
  namePlayer2.innerText = player2;
  let winsPlayer2 = document.createElement("p");
  countPlayer2.appendChild(winsPlayer2);
  winsPlayer2.innerText = player1WinCount;
  containerP2.innerHTML = "";

  containerP1.append(countPlayer1);
  containerP2.append(countPlayer2);
};

const toQuit = () => {
  game.innerHTML = "";
  divPlayer.classList.remove("div-player1");
  divPlayer.classList.remove("div-player2");
  divPlayer.innerHTML = "";
  containerP1.innerHTML = "";
  containerP2.innerHTML = "";
  btnRestart.classList.add("hidden");
  btnQuit.classList.add("hidden");

  stopTimer();
  timerContainer.innerHTML = "";

  const letsGo = document.createElement("p");
  letsGo.innerText = "Let's Go!";
  timerContainer.appendChild(letsGo);

  player1WinCount = 0;
  player2WinCount = 0;

  clearTimeout(time);

  getNames();
};

const timerAfterVictory = () => {
  time = setTimeout(toRestar, 4000);
};

btnRestart.addEventListener("click", toRestar);
btnQuit.addEventListener("click", toQuit);
