// Variables
var kakashiA = $("#kakashiA");
var kakashiD = $("#kakashiD");
var mightyGuyA = $("#mightyGuyA");
var mightyGuyD = $("#mightyGuyD");

// start fight
function startCombat() {
    if (activePlayer === player1) {
        diableButton();
        kakashiA.removeAttr("disabled");
        kakashiD.removeAttr("disabled");
    } else {
        diableButton();
        mightyGuyA.removeAttr("disabled");
        mightyGuyD.removeAttr("disabled");
    }
}

// disable all buttons
function diableButton() {
    var disableA = $(".attack");
    var disableD = $(".defend");

    disableA.attr("disabled", "disabled");
    disableD.attr("disabled", "disabled");
}

// Attack opponent
function attack() {
    if (passivePlayer.protected === true) {
        passivePlayer.life -= activePlayer.damage / 2;
        passivePlayer.protected = false;
    } else {
        passivePlayer.life -= activePlayer.damage;
    }

    if (passivePlayer.life < 0) { passivePlayer.life = 0; }
    //update life UI
    $("#" + passivePlayer.name + "Life").text(passivePlayer.life);

    if (passivePlayer.life === 0) {
        if (activePlayer.name === "kakashi") {
            activePlayer.name = "kakashi";
        } else {
            activePlayer.name = "mightyGuy";
        }
        $("#gameOver .modal-body p:nth-child(3)").text(activePlayer.name);
        var winnerImage = "img/" + activePlayer.image;
        $("#winner").css("background-image", "url(" + winnerImage + ")");
        $("#gameOver").modal();
        $("div#gameBoard > div").removeClass('moveOptions');
        diableButton();
    } else {
        passivePlayer.activePlayer();
        startCombat();
    }
};

// defend from opponent
function defend() {
    activePlayer.protected = true;
    passivePlayer.activePlayer();
    startCombat();
}