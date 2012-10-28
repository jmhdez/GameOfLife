
module('Board');

test('initialize with random state', function() {
  var board = new Board(5, 4);
  equal(board.state.length, 20);
});

test('initialize with known state', function() {
  var board = new Board(3, 2, '011001');
  equal(board.state.length, 6);
  equal(board.state[0], 0);
  equal(board.state[1], 1);
  equal(board.state[2], 1);
  equal(board.state[3], 0);
  equal(board.state[4], 0);
  equal(board.state[5], 1);
});

test('throws on invalid known state', function() {
  raises(function() {
    new Board(2, 2, '00');
  });
});

test('get value at x, y', function() {
  var b = new Board(3, 2, '001' + 
                          '100');
  equal(b.get(0,0), 0);
  equal(b.get(1,2), 0);
  equal(b.get(2,0), 1);
  equal(b.get(0,1), 1);
});

test('world is a toroid to get values at out of range index ', function() {
  var b = new Board(3, 2, '100' +
                          '100');
  equal(b.get(-1,-1), 0);
  equal(b.get(3,0), 1);
  equal(b.get(3,1), 1);
});

test('set value at x, y', function() {
  var b = new Board(3, 2, '000000');
  b.set(0,0,1);
  equal(b.get(0,0), 1);
});

test('get neighbours', function() {
  var b = new Board(4, 4, '0000' +
                          '1100' +
                          '1000' +
                          '0000');
  equal(b.neighbours(0,0), 2);
  equal(b.neighbours(1,1), 2);
  equal(b.neighbours(3,3), 1);
  equal(b.neighbours(2,2), 1);
});

module("Game");

test('is initialized with a board', function() {
  var board = new Board(3, 3, '000' + 
                              '010' +
                              '011');
  var game = new Game(board);
  equal(game.get(0,0), 0);
  equal(game.get(1,1), 1);
  equal(game.get(2,2), 1);
  equal(game.get(0,2), 0);
});

test('a life cell with less than 2 neighbours dies in the next generation', function() {
  var b = new Board(3, 3, '000' + 
                          '010' +
                          '010');
  var g = new Game(b);
  
  g.step();
  equal(g.get(1,1), 0);
  equal(g.get(1,2), 0);
  equal(g.get(2,2), 0);
}); 

test('a life cell with more than 3 neighbours dies in the next generation', function() {
  var b = new Board(3, 3, '010' + 
                          '110' +
                          '101');
  var g = new Game(b);
  
  g.step();
  equal(g.get(1,1), 0);
});

test('a life cell with 2 neighbours is still alive in the next generation', function() {
  var b = new Board(3, 3, '000' + 
                          '010' +
                          '011');
  var g = new Game(b);
  
  g.step();
  equal(g.get(1,1), 1);
  equal(g.get(1,2), 1);
  equal(g.get(2,2), 1);
}); 

test('a life cell with 3 neighbours is still alive in the next generation', function() {
  var b = new Board(3, 3, '010' + 
                          '010' +
                          '110');
  var g = new Game(b);
  
  g.step();
  equal(g.get(1,1), 1);
});

test('an empty cell with exactly 3 neighbours becomes alive in the next generation', function() {
  var b = new Board(3, 3, '010' + 
                          '000' +
                          '101');
  var g = new Game(b);
  
  g.step();
  equal(g.get(1,1), 1);
});