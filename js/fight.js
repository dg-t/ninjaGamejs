
var kakashiA = $("#kakashiA");
var kakashiD = $("#kakashiD");
var mightyGuyA = $("#mightyGuyA");
var mightyGuyD = $("#mightyGuyD");


function startCombat() {
    if (activePlayer === player1) {
    kakashiA.removeAttr("disabled");
    kakashiD.removeAttr("disabled");
} else {
    mightyGuyA.removeAttr("disabled");
    mightyGuyD.removeAttr("disabled");
  }
}
