console.log("Hello world")

let gameboard = {
    row:[
        ["","",""],
        ["","",""],
        ["","",""]
    ],
    lastPlayer:"none",
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
        if(symbol === 0){
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
        ]
    }
}
    

