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

        //Monstres

        this.load.image('champi', 'assets/monsters/champi.png' );
        this.load.image('chelou_monster', 'assets/monsters/chelou_monster.png' );
        this.load.image('dragon_smaller', 'assets/monsters/dragon_smaller.png' );
        this.load.image('evil_carotte', 'assets/monsters/evil_carotte.png' );
        this.load.image('female_poussin', 'assets/monsters/female_poussin.png' );
        this.load.image('genie', 'assets/monsters/genie.png' );
        this.load.image('killer_chicken', 'assets/monsters/killer_chicken.png' );
        this.load.image('male_poussin', 'assets/monsters/male_poussin.png' );
        this.load.image('minotaure', 'assets/monsters/minotaure.png' );
        this.load.image('navet', 'assets/monsters/navet.png' );
        this.load.image('onigiri', 'assets/monsters/onigiri.png' );
        this.load.image('slime', 'assets/monsters/slime.png' );


        //Bouton partagé
        this.load.image('bt_retour', 'assets/button/retourButton.png');

        //Bouton du recueil
        this.load.image('bt_recette', 'assets/button/recetteButton.png');
        this.load.image('bt_bestiaire', 'assets/button/bestiaireButton.png');
        this.load.image('bt_leftArrow', 'assets/button/leftArrowButton.png');
        this.load.image('bt_rightArrow', 'assets/button/rightArrowButton.png');
        this.load.image('pageNum', 'assets/button/pageNum.png');

        //Boutons de Lobby
        this.load.image('bt_quitter', 'assets/button/quitButton.png');
        this.load.image('bt_parametre', 'assets/button/parameterButton.png');
        this.load.image('bt_lancer_partie', 'assets/button/startGameButton.png');

        //Boutons de Game
        this.load.image('bt_parametre', 'assets/button/parameterButton.png');
        this.load.image('bt_boutique', 'assets/button/boutiqueButton.png');
        this.load.image('bt_recueil', 'assets/button/recueilButton.png');

        //Pour le tchat
        this.load.html('tchatTextInput', 'assets/htmlComponents/tchatTextInput.html');
        this.load.html('tchatTextOutput', 'assets/htmlComponents/tchatTextOutput.html');
        this.load.image('text_bubble', 'assets/button/textBubble.png');


        //TileMap
        this.load.image('tiles', 'assets/tileMaps/full_tileset.png');
        this.load.image('tilesMenu', 'assets/tileMaps/Tile-Sheet.png');
        this.load.tilemapTiledJSON("tilemap", 'assets/tileMaps/tilemap_original.json');
       
        //SpriteSheet des outils
        this.load.spritesheet('marmite', 'assets/tools/marmite-Sheet.png', { 
        frameWidth: 64, 
        frameHeight: 64, 
        });

        this.load.spritesheet('table', 'assets/tools/table_de_decoupe-Sheet.png', { 
        frameWidth: 16, 
        frameHeight: 32, 
        });

        this.load.spritesheet('coffre', 'assets/tools/coffre-Sheet.png', { 
        frameWidth: 16, 
        frameHeight: 32, 
        });

         //PlayerTest
        this.load.spritesheet('player', 'assets/players/green_archer.png', { 
        frameWidth: 16, 
        frameHeight: 16, 
        });

    }

    create() {
        this.scene.start('Game');
        this.scene.start('GameUI');
        //this.scene.start('Start');
    }
}