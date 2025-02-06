let gameboard = {
    row:[
        ["","",""],
        ["","",""],
        ["","",""]
    ],
    lastPlayer:"none",
    timer:false,//the ending game timer
    play: function(row, column, symbol){
        if(row>2||row<0||column>2||column<0){
            console.log("Error");
            return;
        }
        if(this.row[row][column] === 0|| this.row[column] === 1){
            console.log("Already occupied !")
            return;
        }
        else{
            this.row[row][column] = symbol;
            this.lastPlayer = symbol;
        }
        console.log(this.row)
        this.checkRow(row, symbol)
        this.checkColumn(column, symbol)
        this.checkDiag(symbol)
        this.checkDiag2(symbol)
    },
    player1: function(row, column){
        this.play(row, column, 0);
    },
    player2:function(row, column){
        this.play(row,column, 1);
    },
    checkRow:function(rowIndex, symbol){
        for(let i = 0; i < 3; i++){
            if(this.row[rowIndex][i] !== symbol)
            {
                return;
            }  
        }
        this.printWinner(symbol);
        this.reset();
    },
    checkColumn:function(columnIndex, symbol){
        for(let i = 0; i < 3; i++){
            if(this.row[i][columnIndex] !== symbol){
                return;
            }
        }
        this.printWinner(symbol);
        this.reset();
    },
    checkDiag:function(symbol){
        for(let i = 0; i < 3; i++){
            if(this.row[i][i] !== symbol)
            {
                return;
            }
        }
        this.printWinner(symbol);
        this.reset();
    },
    checkDiag2:function(symbol){
        for(let i = 0; i < 3; i++){
            if(this.row[i][2 - i] !== symbol)
            {
                return;
            }
        }
        this.printWinner(symbol);
        this.reset();
    },
    printWinner:function(symbol){
        if(symbol === "O"){
            console.log(`the O won !`);
        }
        else{
            console.log(`the X won !`);
        }
    },
    reset:function(){
        this.row = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
        manipulations.clickable = false;
        let allBoxes = document.querySelectorAll(".symbol-field")
        gameboard.timer = true;
        manipulations.titleSelector.innerText = `${manipulations.playerPlaying} won !`;
        setTimeout(function(){
        allBoxes.forEach(function(cell){
            cell.innerText = "";
            manipulations.clickable = true;
            manipulations.playerPlaying = "X";
            manipulations.titleSelector.innerText = "Let's start !";
            gameboard.timer = false;
        })
        }, 2000);
    }
}
    
let manipulations = {
    playerPlaying:"X",
    board:document.querySelector(".board-wrapper"),
    cells:document.querySelectorAll(".cells"),
    titleSelector:document.querySelector(".title"),
    clickable:true,
    events:function(){
        this.cells.forEach(function(cell){
            cell.addEventListener("click", function(){
                let pElementInsideCell = this.querySelector("p");
                if(!manipulations.clickable){//If during reset cannot interact with cells
                    return;
                }
                if(pElementInsideCell.innerText !== "")
                {
                    console.log("nui huh")
                    manipulations.titleSelector.innerText = "This cell is already occupied, choose another one !"
                    return;
                }
                let dataRow = parseInt(this.dataset.row);
                let dataColumn = parseInt(this.dataset.column);
                pElementInsideCell.textContent = manipulations.playerPlaying;
                gameboard.play(dataRow,dataColumn, manipulations.playerPlaying)  
                if(manipulations.playerPlaying === "X"){
                    manipulations.playerPlaying = "O";
                }
                else{
                    manipulations.playerPlaying = "X"
                }
                if(!gameboard.timer)
                manipulations.titleSelector.innerText = `${manipulations.playerPlaying} turn`;
            })
        })
    },
    startGame:function(){
        this.events()
    }
}

manipulations.startGame();