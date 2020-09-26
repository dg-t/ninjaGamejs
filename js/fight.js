// start fight
class startCombat {
    constructor() {}

    adjustFight = () => {
        const kakashiA = $("#kakashiA");
        const kakashiD = $("#kakashiD");
        const mightyGuyA = $("#mightyGuyA");
        const mightyGuyD = $("#mightyGuyD");

        if (activePlayer === player1) {
            this.disabledButton();
            kakashiA.removeAttr("disabled");
            kakashiD.removeAttr("disabled");
        } else {
            this.disabledButton();
            mightyGuyA.removeAttr("disabled");
            mightyGuyD.removeAttr("disabled");
        }
    }

    // disable all buttons
    disabledButton = () => {
        const disableA = $(".attack");
        const disableD = $(".defend");

        disableA.attr("disabled", "disabled");
        disableD.attr("disabled", "disabled");
    }

    // Attack opponent
    attack() {
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
            const winnerImage = "img/" + activePlayer.image;
            $("#winner").css("background-image", "url(" + winnerImage + ")");
            $("#gameOver").modal();
            $("div#gameBoard > div").removeClass('moveOptions');
            this.disabledButton();
        } else {
            passivePlayer.activePlayer();
            startFight.adjustFight();
        }
    };

    // defend from opponent
    defend = () => {
        activePlayer.protected = true;
        passivePlayer.activePlayer();
        startFight.adjustFight();
    }

}

const startFight = new startCombat()