"use strict";

// Natural modulus
function mod(a, m) {
  var k = a % m;
  return k >= 0 ? k : k + m;
}

var Board = function(width, height, initial) {
  var i;
  
  this.width = width;
  this.height = height;
  this.state = [];

  if (typeof initial === 'undefined') {
    for (i = 0; i < width * height; i++) {
      this.state.push(Math.random() > .5 ? 1 : 0);
    }
  }
  else {
    if (width * height !== initial.length) {
      throw 'initial state must have length = width * height';
    }
    for (i = 0; i < initial.length; i++) {
      this.state.push(initial.charAt(i) == '0' ? 0 : 1);
    }    
  }
};

Board.prototype.get = function(x, y) {
  var normalizedX = mod(x, this.width),
      normalizedY = mod(y, this.height);

  return this.state[normalizedX + normalizedY * this.width];
}

Board.prototype.set = function(x, y, val) {
  var normalizedX = mod(x, this.width),
      normalizedY = mod(y, this.height);

  this.state[normalizedX + normalizedY * this.width] = val ? 1 : 0;
}

Board.prototype.neighbours = function(x, y) {
  var count = 0;
  for (var i = x-1; i <= x+1; i++) {
    for (var j = y-1; j <= y+1; j++) {
      count += this.get(i,j);
    }
  }
  count -= this.get(x,y);
  return count;
};

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
