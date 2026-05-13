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
        this.load.image('bt_receuil', 'assets/button/receuilButton.png');

        //Boutons de la Boutique
        this.load.image('bt_ingredient', 'assets/button/ingredientButton.png');
        this.load.image('bt_boost', 'assets/button/boostButton.png');

        //Boosts de la boutique
        this.load.image('dec_monster_vit', 'assets/boosts/dec_monster_vit.png');

        this.load.image('inc_player_atq', 'assets/boosts/inc_player_atq.png');
        this.load.image('inc_player_life', 'assets/boosts/inc_player_life.png');
        this.load.image('inc_player_def', 'assets/boosts/inc_player_def.png');

        this.load.image('heal_player', 'assets/boosts/heal_player.png');

        this.load.image('lvl_chaudron', 'assets/boosts/lvl_chaudron.png');
        this.load.image('lvl_planche', 'assets/boosts/lvl_planche.png');

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
        //this.scene.start('Game');
        //this.scene.start('GameUI');
        //this.scene.start('Start');
        
        /*
        this.scene.start("Lobby",
            {
                joueur_courant : 1,
                code : 1234, 
                pseudo : "Pseudo", 
                serveur_url : "ws://localhost:8080/IllicoDraco/chat/"
            }
        );*/

            /*
            this.scene.start('Boutique', {
                ingredients : [
                    "j1_pretre","j2_pretre", "j3_pretre", "j4_pretre",
                    "j1_mage","j2_mage", "j3_mage", "j4_mage",
                    "j1_archer","j2_archer", "j3_archer", "j4_archer"],
                money : 1
            });*/

        this.scene.start('Parametre',
            {
                haut : "KeyZ",
                bas : "KeyS",
                droite : "KeyD",
                gauche : "KeyQ",
                attaquer : "Space",
                interagir : "KeyF",
                prendre : "KeyA",
                boutique : "KeyB",
                recueil : "KeyR",
                chat : "KeyT"
            }
        )
    }
}