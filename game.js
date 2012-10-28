"use strict";

var Game = function(board) {
  this.board = board;
  this.width = board.width;
  this.height = board.height;
};

Game.prototype.get = function(x, y) {
  return this.board.get(x,y);
};

Game.prototype.set = function(x, y, value) {
  this.board.set(x,y, value);
};

Game.prototype.step = function() {
  var 
    current = this.board,
    width = current.width,
    height = current.height,
    i, j, neighbours, cell
  ;
  this.board = new Board(width, height);
  
  for (i = 0; i < width; i++) {
    for (j = 0; j < height; j++) {
      neighbours = current.neighbours(i,j);
      cell = current.get(i,j);
      if (neighbours === 3)
        this.board.set(i,j, 1);
      else if (neighbours === 2)
        this.board.set(i,j, cell);
      else 
        this.board.set(i,j, 0);
    }
  }
};
