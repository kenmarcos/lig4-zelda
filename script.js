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
const creatTable = () => {
  for (let i = 0; i < 7; i++) {
    let column = document.createElement("div");
    column.setAttribute('id', `${i}`)
    column.classList.add("column");
    game.append(column);
    for (let j = 0; j < table.length; j++) {  
        let cell = document.createElement("div");
        cell.classList.add("cell");
        column.append(cell);
      
    }
  }
};

creatTable()

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
          const alert = document.createElement('div')
          alert.classList.add('alert')
          const message = document.createElement('p')
          message.innerText = 'Jogador 1 Venceu!'
          alert.appendChild(message)
          game.appendChild(alert)
        }
      } else if (cell === 'P') {
        // Checar se as próximas 3 células têm o mesmo valor P
        if(cell === arr[i][j+1] && cell === arr[i][j+2] && cell === arr[i][j+3]) {
          const alert = document.createElement('div')
          alert.classList.add('alert')
          const message = document.createElement('p')
          message.innerText = 'Jogador 2 Venceu!'
          alert.appendChild(message)
          game.appendChild(alert)
        }
      }
    }
  }
}
// vitória horizontal


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
          const alert = document.createElement('div')
          alert.classList.add('alert')
          const message = document.createElement('p')
          message.innerText = 'Jogador 1 Venceu!'
          alert.appendChild(message)
          game.appendChild(alert)
        }
      } else if (cell === 'P') {
        // Checar se as próximas 3 células têm o mesmo valor
        if(cell === arr[i+1][j] && cell === arr[i+2][j] && cell === arr[i+3][j]) {
          const alert = document.createElement('div')
          alert.classList.add('alert')
          const message = document.createElement('p')
          message.innerText = 'Jogador 2 Venceu!'
          alert.appendChild(message)
          game.appendChild(alert)
        }
      }
    }
  }
}
// vitória vertical

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

  } else { // turno do jogador 2
    // colocar o disco do jogador 2
    const disc2 = document.createElement('div')
    disc2.classList.add('disc2')
    celula.appendChild(disc2)
    turn = 'turn1'
    registerPosition(Number(selectedColumn.id), "P");

  }

  horizontalVictory(table)
  verticalVictroy(table)
}


for (let i = 0; columns.length; i++) {
  columns[i].addEventListener('click', changeTurn)
}