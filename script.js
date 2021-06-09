let table = [
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],

];

let game = document.querySelector("#game");

//FUNCAO PARA CRIAR TABALE COM BASE NA ARRAY TABLE   
const createTable = () => {
  for (let i = 0; i < 7; i++) {
    let column = document.createElement("div");
    column.setAttribute('id', i)
    column.classList.add("column");
    game.append(column);
    column.addEventListener('click', changeTurn)
    for (let j = 0; j < table.length; j++) {  
      let cell = document.createElement("div");
      cell.classList.add("cell");
      column.append(cell);
    }
  }
  player1Turn()
}
//funcao reiniciar table
const restartTable = () =>{
  let game = document.getElementById('game');
  game.innerHTML = "";
}

//chamada mensagem de vitoria
const finalMsg = (player) => {
  const alert = document.createElement('div')
  alert.classList.add('alert')
  const message = document.createElement('p')
  if (player === undefined) {
    message.innerText = `Empate`
  } else {
    message.innerText = `${player} venceu!`
  }
  alert.appendChild(message)
  game.appendChild(alert)
}

// vitória horizontal
const horizontalVictory = (arr) => {
  const edgeX = arr[0].length - 3;

  // iterar em cada linha
  for(let i = 0; i < arr.length; i++){

    // iterar em cada célula da linha em questão
    for(let j = 0; j < edgeX; j++) {
      let cell = arr[i][j];
      
      if(cell === 'V') {
        // Checar se as próximas 3 células têm o mesmo valor V
        if(cell === arr[i][j+1] && cell === arr[i][j+2] && cell === arr[i][j+3]) {
          finalMsg("Jogador 1")
        }
      } else if (cell === 'P') {
        // Checar se as próximas 3 células têm o mesmo valor P
        if(cell === arr[i][j+1] && cell === arr[i][j+2] && cell === arr[i][j+3]) {
          const alert = document.createElement('div')
          finalMsg("Jogador 2")
        }
      }
    }
  }
}

// vitória vertical
const verticalVictroy = (arr) => {
  const edgeY = arr.length - 3

  for(let i = 0; i < edgeY; i++){

    // iterar cada célula na linha
    for(let j = 0; j < arr[0].length; j++) {
      cell = arr[i][j];
      
      if(cell === 'V') {
        // Checar se as próximas 3 células têm o mesmo valor
        if(cell === arr[i+1][j] && cell === arr[i+2][j] && cell === arr[i+3][j]) {
          finalMsg("Jogador 1")
        }
      } else if (cell === 'P') {
        // Checar se as próximas 3 células têm o mesmo valor
        if(cell === arr[i+1][j] && cell === arr[i+2][j] && cell === arr[i+3][j]) {
          finalMsg("Jogador 2")
        }
      }
    }
  }
}

//vitoria diagonal
const diagonalWin = (player) =>{
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 4; j++){
      if(player === table[i][j] && player === table[i+1][j+1] && player === table[i+2][j+2] && player === table[i+3][j+3]){
        if(player === "V"){
          finalMsg("Jogador 1")
        }else{
          finalMsg("Jogador 2")
        }
      }
    }
  }
  for(let i = 5; i > 2; i--){
    for(let j = 0; j < 4; j++){
      if(player === table[i][j] && player === table[i-1][j+1] && player === table[i-2][j+2] && player === table[i-3][j+3]){
        if(player === "V"){
          finalMsg("Jogador 1")
        }else{
          finalMsg("Jogador 2")
        }
      }
    }
  }
}

// empate
const draw = (arr) => {
  let cont = 0
  for (let i = 0; i < arr[0].length; i++) {
    if (arr[0][i] !== 'X') {
      cont++
    } 
  }
  if (cont === 7) {
    finalMsg()
  }
}

const registerPosition = (id, player) => {

  for (let i = 5; i >= 0; i--)
    if (table[i][id] === "X") {
      table[i][id] = player
      break;
    }
  console.log(table);
}

const columns = document.querySelectorAll('.column')
let turn = 'turn1'

// FUNÇÃO DE MUDANÇA DE TURNO E COLOCAÇÃO DOS DISCOS
const changeTurn = (evt) => {
  // selecionar a coluna
  
  let selectedColumn = evt.currentTarget

  // selecionar última célula vazia da coluna
  let celula
  for (let i = 0; i < selectedColumn.childNodes.length; i++) {
    if (selectedColumn.childNodes[i].childElementCount === 0) {
      celula = selectedColumn.childNodes[i]
    }
  }

  if (turn === 'turn1') { // turno do jogador 1
    // colocar o disco do jogador 1
    const disc1 = document.createElement('div')
    disc1.classList.add('disc1')
    celula.appendChild(disc1)
    turn = 'turn2'
    registerPosition(Number(selectedColumn.id), "V");
    diagonalWin("V")
    player2Turn()
  } else { // turno do jogador 2
    // colocar o disco do jogador 2
    const disc2 = document.createElement('div')
    disc2.classList.add('disc2')
    celula.appendChild(disc2)
    turn = 'turn1'
    registerPosition(Number(selectedColumn.id), "P");
    diagonalWin("P")
    player1Turn()
  }

  horizontalVictory(table)
  verticalVictroy(table)
  draw(table)
}

const btnStart = document.getElementById("start");
btnStart.addEventListener('click', restartTable);
btnStart.addEventListener('click', createTable);

const btnRestart = document.getElementById("restart");
btnRestart.addEventListener('click', restartTable);
btnRestart.addEventListener('click', createTable);


const getNames = () => {
  const form = document.createElement('form')
  form.classList.add('form')
  game.append(form)

  const divInput1 = document.createElement('div')
  divInput1.classList.add('div-input')
  form.appendChild(divInput1)
  const imgPlayer1 = document.createElement('img')
  imgPlayer1.src = 'https://picsum.photos/100'
  imgPlayer1.classList.add('img')
  divInput1.appendChild(imgPlayer1)
  const inputPlayer1 = document.createElement('input')
  inputPlayer1.setAttribute('type', 'text')
  inputPlayer1.setAttribute('placeholder', 'Player 1')
  inputPlayer1.classList.add('input')
  divInput1.appendChild(inputPlayer1)

  const divInput2 = document.createElement('div')
  divInput2.classList.add('div-input')
  form.appendChild(divInput2)
  const imgPlayer2 = document.createElement('img')
  imgPlayer2.src = 'https://picsum.photos/100'
  imgPlayer2.classList.add('img')
  divInput2.appendChild(imgPlayer2)
  const inputPlayer2 = document.createElement('input')
  inputPlayer2.setAttribute('type', 'text')
  inputPlayer2.setAttribute('placeholder', 'Player 2')
  inputPlayer2.classList.add('input')
  divInput2.appendChild(inputPlayer2)
}
getNames()

const divPlayer = document.getElementById('player')

const player1Turn = () => {
  divPlayer.innerHTML = " "
  let player1 = document.createElement('p')
  player1.innerText = 'Jogador 1'
  player1.classList.add('player1')
  divPlayer.appendChild(player1)
}

const player2Turn = () => {
  divPlayer.innerHTML = " "
  let player2 = document.createElement('p')
  player2.innerText = 'Jogador 2'
  player2.classList.add('player2')
  divPlayer.appendChild(player2)
}
