// Variables
var kakashiA = $("#kakashiA");
var kakashiD = $("#kakashiD");
var mightyGuyA = $("#mightyGuyA");
var mightyGuyD = $("#mightyGuyD");


function startCombat() {
    if (activePlayer === player1) {
        kakashiA.removeAttr("disabled");
        kakashiD.removeAttr("disabled");
        mightyGuyA.attr("disabled", "disabled");
        mightyGuyD.attr("disabled", "disabled");
    } else {
        mightyGuyA.removeAttr("disabled");
        mightyGuyD.removeAttr("disabled");
        kakashiA.attr("disabled", "disabled");
        kakashiD.attr("disabled", "disabled");
    }
}

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
        $("#winner").attr("src", "img/" + activePlayer.image);
        $("#gameOver").modal();
        $("div#gameBoard > div").removeClass('moveOptions');
        kakashiA.attr("disabled", "disabled");
        kakashiD.attr("disabled", "disabled");
        mightyGuyA.attr("disabled", "disabled");
        mightyGuyD.attr("disabled", "disabled");
    } else {
        passivePlayer.activePlayer();
        startCombat();
    }
};

function defend() {
    activePlayer.protected = true;
    passivePlayer.activePlayer();
    startCombat();
}