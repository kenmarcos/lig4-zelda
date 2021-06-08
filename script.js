let table = [
  ["X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X"],
  ["X","X","X","X","X","X","X"]
  ];

//FUNCAO PARA CRIAR TABALE COM BASE NA ARRAY TABLE   
const creatTable = () => {
  for (let i = 0; i < table.length; i++) {
    let game = document.querySelector("#game");
    let column = document.createElement("div");
    column.setAttribute('id', `${i}`)
    column.classList.add("column");
    game.append(column);
    for (let j = 0; j < table[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      column.append(cell);
    }
  }
};

creatTable()

const registerPosition = (id, player) =>{
  
  for(let i = 6; i >= 0; i--)
  if(table[i][id] === "X"){
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
}

for (let i = 0; columns.length; i++) {
  columns[i].addEventListener('click', changeTurn)
}