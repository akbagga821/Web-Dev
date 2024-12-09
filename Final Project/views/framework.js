let gameState = {
    game_array: [[.1, .2, .3], [.4, .5, .6], [.7, .8, .9]],
    turn: "X",
    win: false
}

function playerMove(e){
    let elem = document.querySelector("#gameBoard")
    rect = elem.getBoundingClientRect()
    x = (e.clientX-elem.getBoundingClientRect().x)/elem.getBoundingClientRect().width*90
    y = (e.clientY-elem.getBoundingClientRect().y)/elem.getBoundingClientRect().height*90
    x2 = (Math.floor(x/30))*30+15
    y2 = (Math.floor(y/30))*30+15
    if(y2 == 15){
        if(x2 == 15){
            gameState.game_array[0][0] = gameState.turn
        }
        if(x2 == 45){
            gameState.game_array[0][1] = gameState.turn
        }
        if(x2 == 75){
            gameState.game_array[0][2] = gameState.turn
        }
    }
    if(y2 == 45){
        if(x2 == 15){
            gameState.game_array[1][0] = gameState.turn
        }
        if(x2 == 45){
            gameState.game_array[1][1] = gameState.turn
        }
        if(x2 == 75){
            gameState.game_array[1][2] = gameState.turn
        }
    }
    if(y2 == 75){
        if(x2 == 15){
            gameState.game_array[2][0] = gameState.turn
        }
        if(x2 == 45){
            gameState.game_array[2][1] = gameState.turn
        }
        if(x2 == 75){
            gameState.game_array[2][2] = gameState.turn
        }
    }
    console.log(gameState.win)
    if(gameState.turn == "X"){
        gameClickX(x2, y2)
        gameState.turn = "O"
    }
    else if(gameState.turn == "O"){
        gameClickO(x2, y2)
        gameState.turn = "X"
    }
    checkWin()
}

function checkWin(){
    for(let i = 0; i < gameState.game_array.length; i++){
        if(gameState.game_array[i][0] == gameState.game_array[i][1] && gameState.game_array[i][1] == gameState.game_array[i][2]){
            gameState.win = true
            console.log("you won")
            reset()
        }
    }
    for(let j = 0; j < gameState.game_array.length; j++){
        if(gameState.game_array[0][j] == gameState.game_array[1][j] && gameState.game_array[1][j] == gameState.game_array[2][j]){
            gameState.win = true
            console.log("you won")
            reset()
        }
    }
    console.log(gameState.game_array[0][0], gameState.game_array[1][1], gameState.game_array[2][2])
    if(gameState.game_array[0][0] == gameState.game_array[1][1] && gameState.game_array[1][1] == gameState.game_array[2][2]){
        gameState.win = true
        console.log("you won")
        reset()
    }
    if(gameState.game_array[0][2] == gameState.game_array[1][1] && gameState.game_array[1][1] == gameState.game_array[2][0]){
        gameState.win = true
        console.log("you won")
        reset()
    }
}

let gameBoard = document.querySelector('#gameBoard')
gameBoard.addEventListener('click', playerMove )

function gameClickX(x2, y2){
    /*let elem = document.querySelector("#gameBoard")
    rect = elem.getBoundingClientRect()
    x = (e.clientX-elem.getBoundingClientRect().x)/elem.getBoundingClientRect().width*90
    y = (e.clientY-elem.getBoundingClientRect().y)/elem.getBoundingClientRect().height*90
    x2 = (Math.floor(x/30))*30+15
    y2 = (Math.floor(y/30))*30+15*/
    console.log(x2, y2)
    let x_mark = document.createElementNS("http://www.w3.org/2000/svg", "line");
    x_mark.setAttribute("class", "shapes")
    x_mark.setAttribute("id", "line")
    x_mark.setAttribute('x1',x2-10);
    x_mark.setAttribute('y1',y2-10);
    x_mark.setAttribute('x2',x2+10);
    x_mark.setAttribute('y2',y2+10);
    x_mark.setAttribute("stroke", "black")
    x_mark.setAttribute("stroke-width", 3)
    let x_mark2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    x_mark2.setAttribute("class", "shapes")
    x_mark2.setAttribute("id", "line2")
    x_mark2.setAttribute('x1',x2-10);
    x_mark2.setAttribute('y1',y2+10);
    x_mark2.setAttribute('x2',x2+10);
    x_mark2.setAttribute('y2',y2-10);
    x_mark2.setAttribute("stroke", "black")
    x_mark2.setAttribute("stroke-width", 3)

    gameBoard.appendChild(x_mark);
    gameBoard.appendChild(x_mark2);
}

function gameClickO(x2, y2){
    /*let elem = document.querySelector("#gameBoard")
    rect = elem.getBoundingClientRect()
    x = (e.clientX-elem.getBoundingClientRect().x)/elem.getBoundingClientRect().width*90
    y = (e.clientY-elem.getBoundingClientRect().y)/elem.getBoundingClientRect().height*90
    x2 = (Math.floor(x/30))*30+15
    y2 = (Math.floor(y/30))*30+15*/
    console.log(x2, y2)
    let c_mark = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c_mark.setAttribute("class", "shapes")
    c_mark.setAttribute("id", "circle")
    c_mark.setAttribute('cx',x2);
    c_mark.setAttribute('cy',y2);
    c_mark.setAttribute('r', 12);
    c_mark.setAttribute("stroke", "black")
    c_mark.setAttribute("stroke-width", 3)

    gameBoard.appendChild(c_mark);
}

//let gameB = document.getElementById("gameBoard")
//gameB.onclick = console.log("chicken");


function reset(){
    gameState.game_array = [["", "", ""], ["", "", ""], ["", "", ""]]
    gameState.turn = "X"
    gameState.win = false
    //sh = document.querySelector('.shapes')
    c = document.querySelector('#circle')
    l1 = document.querySelector('#line')
    l2 = document.querySelector('#line2')
    //sh.parentNode.removeChild(sh)
    //c.parentNode.removeChild(c)
    //l1.parentNode.removeChild(l1)
    //l2.parentNode.removeChild(l2)
    c.remove();
    l1.remove();
    l2.remove();
}