let table = [
  "XXXXXX",
  "XXXXXX",
  "XXXXXX",
  "XXXXXX",
  "XXXXXX",
  "XXXXXX",
  "XXXXXX"
  ];


//FUNCAO PARA CRIAR TABALE COM BASE NA ARRAY TABLE   
const creatTable = () => {
for (let i = 0; i < table.length; i++) {
  let game = document.querySelector("#game");
  let column = document.createElement("div");
  column.setAttribute('id', `coluna${i}`)
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

const columns = document.querySelectorAll('.column')

let turn = 'turn1'

const changeTurn = (evt) => {
let selectedColumn = evt.currentTarget
console.log(selectedColumn)

for (let i = 5; i >= 0; i--) {
  // let primeiraCelula = colunaSelecionada.childNodes[5]
  // console.log(primeiraCelula)
  // let colunaChurros = colunaSelecionada[i]
  console.log(selectedColumn.childNodes[i])
  let celula = selectedColumn.childNodes[i]
  console.log(celula)
  
  if (turn === 'turn1') {
    // código para colocar o disco do jogador 1
    const disc1 = document.createElement('div')
    disc1.classList.add('disc1')
    if (celula.childElementCount === 0) {
      console.log(celula)
      celula.appendChild(disc1)
      turn = 'turn2'
    } 
  } else {
    //código para colocar o disco do jogador 2
    const disc2 = document.createElement('div')
    disc2.classList.add('disc2')
    if (celula.childElementCount === 0) {
      celula.appendChild(disc2)
      turn = 'turn1'
    }
  }
}
// let segundaCelula = colunaSelecionada.childNodes[1]
// let terceiraCelula = colunaSelecionada.childNodes[2]
// let quartaCelula = colunaSelecionada.childNodes[3]
// let penultimaCelula = colunaSelecionada.childNodes[4]
// let ultimaCelula = colunaSelecionada.childNodes[5]

// if (turn === 'turn1') {
//   // código para colocar o disco do jogador 1
//   const disc1 = document.createElement('div')
//   disc1.classList.add('disc1')
//   if (ultimaCelula.childElementCount === 0) {
//     ultimaCelula.appendChild(disc1)
//     turn = 'turn2'
//   } else if (penultimaCelula.childElementCount === 0) {
//     penultimaCelula.appendChild(disc1)
//     turn = 'turn2'
//   } else if (quartaCelula.childElementCount === 0) {
//     quartaCelula.appendChild(disc1)
//     turn = 'turn2'
//   } else  if (terceiraCelula.childElementCount === 0) {
//     terceiraCelula.appendChild(disc1)
//     turn = 'turn2'
//   } else  if (segundaCelula.childElementCount === 0) {
//     segundaCelula.appendChild(disc1)
//     turn = 'turn2'
//   } else if (primeiraCelula.childElementCount === 0) {
//     primeiraCelula.appendChild(disc1)
//     turn = 'turn2'
//   }
  
  
// } else {
//     //código para colocar o disco do jogador 2
//     const disc2 = document.createElement('div')
//     disc2.classList.add('disc2')
//     if (ultimaCelula.childElementCount === 0) {
//       ultimaCelula.appendChild(disc2)
//       turn = 'turn1'
//     } else if (penultimaCelula.childElementCount === 0) {
//       penultimaCelula.appendChild(disc2)
//       turn = 'turn1'
//     } else if (quartaCelula.childElementCount === 0) {
//       quartaCelula.appendChild(disc2)
//       turn = 'turn1'
//     } else  if (terceiraCelula.childElementCount === 0) {
//       terceiraCelula.appendChild(disc2)
//       turn = 'turn1'
//     } else  if (segundaCelula.childElementCount === 0) {
//       segundaCelula.appendChild(disc2)
//       turn = 'turn1'
//     } else if (primeiraCelula.childElementCount === 0) {
//       primeiraCelula.appendChild(disc2)
//       turn = 'turn1'
//     }

// }

}

for (let i = 0; columns.length; i++) {
  columns[i].addEventListener('click', changeTurn)
}