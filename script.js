let turn = 'turn1'

const changeTurn = (evt) => {


    if (turn === 'turn1') {
        // código para colocar o disco do jogador 1
        turn = 'turn2'
    } else {
        // código para colocar o disco do jogador 2
        turn = 'turn1'
    }

}



document.addEventListener('click', changeTurn)