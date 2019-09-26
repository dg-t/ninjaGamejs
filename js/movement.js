// variables
var arrayX = [], arrayY = [];
var activePlayer, passivePlayer;
var combat = false;
var cellContact;
var cell = $("div#gameBoard > div");

// Movements options
Player.prototype.moveOptions = function(playerPosition) {
  // delete class after player move
  $("div#gameBoard > div").removeClass("moveOptions");

  //arrays X and Y for movment
  arrayX = [];
  arrayY = [];
  //variables for find the position
  var up = playerPosition - 10;
  var down = playerPosition + 10;
  var left = playerPosition - 1;
  var right = playerPosition + 1;
  var blocked = false;
  var xMin = playerPosition - (playerPosition % 10);
  var xMax = xMin + 9;

  // Function to check class in specific div
  function checkClass() {
    $.each(classList, function(index, cssClass) {
      if (
        cssClass === "wall" ||
        cssClass === "kakashi" ||
        cssClass === "mightyGuy"
      ) {
        blocked = true;
      }
    });
  }

  // Define movement option up - down - left - right
  // move up to 3 cells
  while (up >= 0 && up >= playerPosition - 30) {
    blocked = false;
    var classList = $("div#" + up)
      .attr("class")
      .split(" ");

    checkClass();

    if (blocked === true) {
      break;
    } else {
      $("div#" + up).addClass("moveOptions");
      arrayY.push(up);
    }
    up -= 10;
  }

  //move down 3 cells
  while (down <= 99 && down <= playerPosition + 30) {
    blocked = false;
    var classList = $("div#" + down)
      .attr("class")
      .split(" ");

    checkClass();

    if (blocked === true) {
      break;
    } else {
      $("div#" + down).addClass("moveOptions");
      arrayY.push(down);
    }
    down += 10;
  }

  // move left 3 cells
  while (left >= xMin && left >= playerPosition - 3) {
    blocked = false;
    var classList = $("div#" + left)
      .attr("class")
      .split(" ");

    checkClass();

    if (blocked === true) {
      break;
    } else {
      $("div#" + left).addClass("moveOptions");
      arrayX.push(left);
    }
    left -= 1;
  }

  // move right 3 cells
  while (right <= xMax && right <= playerPosition + 3) {
    blocked = false;
    var classList = $("div#" + right)
      .attr("class")
      .split(" ");

    checkClass();

    if (blocked === true) {
      break;
    } else {
      $("div#" + right).addClass("moveOptions");
      arrayX.push(right);
    }
    right += 1;
  }

  return [arrayX, arrayY];
};

Player.prototype.moveCell = function(newPosition) {
  // variables for old and new positions
  var oldCell = document.getElementById(this.position);
  oldCell.classList.remove(this.name);
  var newCell = document.getElementById(newPosition);
  newCell.classList.add(this.name);

  // find weapons
  var findFrom = this.position;
  var findTo = newPosition;
  findWeapon(findFrom, findTo);

  this.position = newPosition;
  cellContact = [
    newPosition + 1,
    newPosition - 1,
    newPosition + 10,
    newPosition - 10
  ];

  switch (this.name) {
    case "kakashi":
      newCell.innerHTML =
        "<img src='img/" + this.image + "' height='55'></img>";
      break;
    case "mightyGuy":
      newCell.innerHTML =
        "<img src='img/" + this.image + "' height='55'></img>";
      break;
  }
  oldCell.innerHTML = "";

  // check if players are next
  $.each(cellContact, function(index, contact) {
    if ($("#" + contact).find("img").length) {
      combat = true;
    }
  });

  if (combat === false) {
    passivePlayer.activePlayer();
  } else {
    arrayX = [];
    arrayY = [];
    cell.removeClass("moveOptions");
    startCombat();
  }
};

// Decide active player
Player.prototype.activePlayer = function() {
  if (this.name === "kakashi") {
    activePlayer = player1;
    passivePlayer = player2;
  } else {
    activePlayer = player2;
    passivePlayer = player1;
  }
  if (combat === false) {
    activePlayer.moveOptions(this.position);
  }
};
// player start
player1.activePlayer();

// Find weapon function
function findWeapon(findFrom, findTo) {
  // Variables
  var searchCells = findTo - findFrom;
  var arraySearch = [];

  // check div between findFrom and findTo cells
  if (searchCells > 0) {
    // For right side
    if (searchCells <= 3) {
      for (i = findFrom; i <= findTo; i++) {
        if (jQuery.inArray(i, arrayX) >= 0) {
          arraySearch.push(i);
        }
      }
    } else {
      // for down
      for (i = findFrom; i <= findTo; i += 10) {
        if (jQuery.inArray(i, arrayY) >= 0) {
          arraySearch.push(i);
        }
      }
    }
  } else {
    // for left
    if (searchCells >= -3) {
      for (i = findFrom; i >= findTo; i--) {
        if (jQuery.inArray(i, arrayX) >= 0) {
          arraySearch.push(i);
        }
      }
    } else {
      // for up
      for (i = findFrom; i >= findTo; i -= 10) {
        if (jQuery.inArray(i, arrayY) >= 0) {
          arraySearch.push(i);
        }
      }
    }
  }
  // check if cells within findFrom and findTo have weapons
  for (j = 0; j <= arraySearch.length; j++) {
    var passedCells = $("div#" + arraySearch[j]);
    var newWeapon;
    var currentWeapon;

    // check classes from passing cell, assign newWeapon value and change player damage
    currentWeapon = activePlayer.weapon;
    if (passedCells.hasClass("shuriken")) {
      newWeapon = "shuriken";
      activePlayer.damage = 30;
    } else if (passedCells.hasClass("katana")) {
      newWeapon = "katana";
      activePlayer.damage = 35;
    } else if (passedCells.hasClass("sai")) {
      newWeapon = "sai";
      activePlayer.damage = 20;
    } else if (passedCells.hasClass("kunai")) {
      newWeapon = "kunai";
      activePlayer.damage = 15;
    } else {
      newWeapon = "";
    }

    // If player has a weapon and passes on a cell with another weapon, leave current weapon and take new weapomn
    if (newWeapon != "") {
      passedCells.removeClass(newWeapon);
      passedCells.addClass(currentWeapon);
      activePlayer.weapon = newWeapon;
    }
  }
}

// when clicking on possible movement cells
cell.on("click", function() {
  var newPosition = parseInt(this.id);
  if (
    jQuery.inArray(newPosition, arrayX) >= 0 ||
    jQuery.inArray(newPosition, arrayY) >= 0
  ) {
    cell.removeClass(activePlayer.name);
    activePlayer.moveCell(newPosition);
  }
});

