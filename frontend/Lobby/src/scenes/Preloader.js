export class Preloader extends Phaser.Scene {


    constructor() {
        super('Preloader');
    }

    preload() {

        //Avatars
        this.load.image('j1_pretre', 'assets/blue_pretre_idle.png');
        this.load.image('j1_guerrier', 'assets/blue_guerrier_idle.png');
        this.load.image('j1_mage', 'assets/blue_mage_idle.png');
        this.load.image('j1_archer', 'assets/blue_archer_idle.png');

        this.load.image('j2_pretre', 'assets/red_pretre_idle.png');
        this.load.image('j2_guerrier', 'assets/red_guerrier_idle.png');
        this.load.image('j2_mage', 'assets/red_mage_idle.png');
        this.load.image('j2_archer', 'assets/red_archer_idle.png');

        this.load.image('j3_pretre', 'assets/green_pretre_idle.png');
        this.load.image('j3_guerrier', 'assets/green_guerrier_idle.png');
        this.load.image('j3_mage', 'assets/green_mage_idle.png');
        this.load.image('j3_archer', 'assets/green_archer_idle.png');

        this.load.image('j4_pretre', 'assets/yellow_pretre_idle.png');
        this.load.image('j4_guerrier', 'assets/yellow_guerrier_idle.png');
        this.load.image('j4_mage', 'assets/yellow_mage_idle.png');
        this.load.image('j4_archer', 'assets/yellow_archer_idle.png');

        //Bouton partagé
        this.load.image('bt_retour', 'assets/button/retourButton.png');

        //Bouton du Receuil
        this.load.image('bt_recette', 'assets/button/recetteButton.png');
        this.load.image('bt_bestiaire', 'assets/button/bestiaireButton.png');

        //Boutons de Lobby
        this.load.image('bt_quitter', 'assets/button/quitButton.png');
        this.load.image('bt_parametre', 'assets/button/parameterButton.png');
        this.load.image('bt_lancer_partie', 'assets/button/startGameButton.png');

        //Boutons de Game
        this.load.image('bt_parametre', 'assets/button/parameterButton.png');
        this.load.image('bt_boutique', 'assets/button/boutiqueButton.png');
        this.load.image('bt_receuil', 'assets/button/receuilButton.png');

        //Pour le tchat
        this.load.html('tchatTextInput', 'assets/htmlComponents/tchatTextInput.html');
        this.load.html('tchatTextOutput', 'assets/htmlComponents/tchatTextOutput.html');
        this.load.image('text_bubble', 'assets/button/textBubble.png');

    }

    create() {
        this.scene.start('Receuil');
    }
}