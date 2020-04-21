import React from 'react';
import Board from './Board.js';
import './App.css';

class App extends React.Component{
  constructor(props){
      super(props)

      var cells = []
      for(let i = 0; i < 6; i++ ){
          cells.push(new Array(7).fill(0))
      }
      
      this.state = {
        player:false,
        cells:cells,
        winner:0}

        this.handleClick = this.handleClick.bind(this);

      }

      handleClick(row,col){

        if(this.state.winner)
            return;

        console.log("row: " + row + " | col: " + col)
        console.log(this.state.cells)
        var temp = [];
        for(let i = 0; i < 6; i++){
          temp.push(this.state.cells[i].slice())
        }
        temp[row][col] = 1;
        this.setState({cells:temp})

        this.setState({cells:temp, player: !this.state.player}, () => {
            if(this.checkVictory(newRow,col) > 0){
                console.log("win")
                this.setState({winner:this.state.player?2:1})
            }


        });

        temp[row][col] = this.state.player? 1 : 2;

        var newRow = this.findAvailableRow(col);
        temp[newRow][col] = this.state.player? 1 : 2;

        //

        temp[row][col] = this.state.player = 0;

    }

    findAvailableRow(col){
        for(var i = 0; i < 6; i++){
          if(this.state.cells[i][col] == 0){
            return i;
          } 
        }
        return -1;
      } 

      checkDiagonal(row,col){
        //find right and left tops
        var c = this.state.cells;
        var val = this.state.player? 2:1;
        var rR = row;
        var cR = col;
        while(rR < 5 && cR < 6){
            rR++; 
            cR++;
        }

        while( rR >= 3 && cR >= 3){
            if(c[rR][cR] == val && c[rR-1][cR-1] == val && c[rR-2][cR-2] == val && c[rR-3][cR-3] == val){
                return 1
            }
            rR--
            cR--
        }   

        var rL = row;
        var cL = col;

        while(rL < 5 && cL > 0){
            rL++
            cL--
        }

        while(rL >= 3 && cL <= 3){
            if(c[rL][cL] == val && c[rL-1][cL+1] == val && c[rL-2][cL+2] == val && c[rL-3][cL+3] == val){
                return 1
            }
            rL--
            cL++
        }
        return 0
    }
    checkHorizontal(row,col){
        var c = this.state.cells;
        var i = 6;
        var val = this.state.player? 2:1;

        while( i >= 3){
            if(c[row][i] == val && c[row][i-1] == val && c[row][i-2] == val && c[row][i-3] == val){
                return 1
            }
            i--
        }
        return 0
    }
    checkVertical(row,col){
        var c = this.state.cells;
        var i = row;
        var val = this.state.player? 2: 1;

        if(i >= 3){
            if(c[i][col] == val && c[i - 1][col] == val && c[i - 2][col] == val && c[i - 3][col] == val){
                return 1
        }
        }
        return 0

    }
    checkVictory(row,col){
        return this.checkVertical(row,col)   || this.checkHorizontal(row,col) ||   this.checkDiagonal(row,col)


    }

    restart(){
        var cells = [];
        for(let i = 0; i < 6; i++ ){
          cells.push(new Array(7).fill(0));
        }
        this.setState({ player : false, cells : cells, winner:0})
    }

  render(){
      return (
          <div className='App'>
            <>
              <h1>Connect Four</h1>

              <div className='Board'>
              <Board cells = {this.state.cells} handleClick = {this.handleClick}/>
              </div>

              <h1>{this.state.winner > 0 ?  this.state.winner == 1? "Black Wins":"Red Wins": this.state.player? "Black's Turn" : "Red's Turn"} </h1>

               <button onClick = { () => this.restart()}>Restart</button>
               </>
          </div>
      )
  }
}

export default App;