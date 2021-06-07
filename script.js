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

