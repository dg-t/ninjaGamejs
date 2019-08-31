var board = document.getElementById("gameBoard");
var cells = 100;

function createBoard(cells) {
  for (i = 0; i < cells; i++) {
    var cellDiv = document.createElement("div");
    cellDiv.id = i;
    cellDiv.classList.add("cellGrid");
    board.appendChild(cellDiv);
  }
}

createBoard(cells);


