let table = [
    "XXXXXXX",
    "XXXXXXX",
    "XXXXXXX",
    "XXXXXXX",
    "XXXXXXX",
    "XXXXXXX"];

 //FUNCAO PARA CRIAR TABALE COM BASE NA ARRAY TABLE   
const creatTable = () => {
  for (let i = 0; i < table.length; i++) {
    let game = document.querySelector("#game");
    let row = document.createElement("div");
    row.classList.add("row");
    game.append(row);
    for (let j = 0; j < table[i].length; j++) {
      let column = document.createElement("div");
      column.classList.add("column");
      row.append(column);
    }
  }
};

creatTable()


let turn = 'turn1'

const changeTurn = (evt) => {

  if (turn === 'turn1') {
      // código para colocar o disco do jogador 1
      const disc1 = document.createElement('div')
      disc1.classList.add('disc1')
      document.body.appendChild(disc1)

      // mudar para o turno 2
      turn = 'turn2'
  } else {
      //código para colocar o disco do jogador 2
      const disc2 = document.createElement('div')
      disc2.classList.add('disc2')
      document.body.appendChild(disc2)

      // mudar para o turno 1
      turn = 'turn1'
  }

}

document.addEventListener('click', changeTurn)
