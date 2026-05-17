export class Preloader extends Phaser.Scene {
  constructor () {
    super('Preloader')
  }

  preload () {

    //Avatars
    //jx_classe_anim
    let avatars = ["guerrier", "mage", "archer", "pretre"] 
    for (let i = 0; i < 4; i++){ //Num Classe
      for (let j = 1; j <= 4; j++){ //Num Joueur
        
        let name = 'j' + j + '_' + avatars[i]

        this.load.spritesheet(name, 'assets/players/'+ avatars[i] +'_'+ j +'.png', {
          frameWidth: 16,
          frameHeight: 16,
        })

    }
  } 
 

    //Bouton partagé
    this.load.image('bt_retour', 'assets/button/retourButton.png')

    //Bouton du Receuil
    this.load.image('bt_recette', 'assets/button/recetteButton.png')
    this.load.image('bt_bestiaire', 'assets/button/bestiaireButton.png')
    this.load.image('bt_leftArrow', 'assets/button/leftArrowButton.png')
    this.load.image('bt_rightArrow', 'assets/button/rightArrowButton.png')
    this.load.image('pageNum', 'assets/button/pageNum.png')

    //Boutons de Lobby
    this.load.image('bt_quitter', 'assets/button/quitButton.png')
    this.load.image('bt_parametre', 'assets/button/parameterButton.png')
    this.load.image('bt_lancer_partie', 'assets/button/startGameButton.png')

    //Boutons de Game
    this.load.image('bt_parametre', 'assets/button/parameterButton.png')
    this.load.image('bt_boutique', 'assets/button/boutiqueButton.png')
    this.load.image('bt_receuil', 'assets/button/receuilButton.png')

    //Boutons de la Boutique
    this.load.image('bt_ingredient', 'assets/button/ingredientButton.png')
    this.load.image('bt_boost', 'assets/button/boostButton.png')

    //Boosts de la boutique
    this.load.image('dec_monster_vit', 'assets/boosts/dec_monster_vit.png')

    this.load.image('inc_player_atq', 'assets/boosts/inc_player_atq.png')
    this.load.image('inc_player_life', 'assets/boosts/inc_player_life.png')
    this.load.image('inc_player_def', 'assets/boosts/inc_player_def.png')

    this.load.image('heal_player', 'assets/boosts/heal_player.png')

    this.load.image('lvl_chaudron', 'assets/boosts/lvl_chaudron.png')
    this.load.image('lvl_planche', 'assets/boosts/lvl_planche.png')

    //Pour le tchat
    this.load.html('tchatTextInput', 'assets/htmlComponents/tchatTextInput.html')
    this.load.html('tchatTextOutput', 'assets/htmlComponents/tchatTextOutput.html')
    this.load.image('text_bubble', 'assets/button/textBubble.png')

    //TileMap
    this.load.image('tiles', 'assets/tileMaps/full_tileset.png')
    this.load.image('tilesMenu', 'assets/tileMaps/Tile-Sheet.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/tileMaps/tilemap_original.json')

    //SpriteSheet des outils
    this.load.spritesheet('marmite', 'assets/tools/marmite-Sheet.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    this.load.spritesheet('table', 'assets/tools/table_de_decoupe-Sheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    })

    this.load.spritesheet('coffre', 'assets/tools/coffre-Sheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    })


    this.load.image('logo', 'assets/divers/logo.png')

  }


  createAnims(){
    let avatars = ["guerrier", "mage", "archer", "pretre"] 
    for (let i = 0; i < 4; i++){ //Num Classe
      for (let j = 1; j <= 4; j++){ //Num Joueur
        
        let name = 'j' + j + '_' + avatars[i]

        this.anims.create({
          key: name+'_left',
          frames: this.anims.generateFrameNumbers(name, { start: 3, end: 4 }),
          frameRate: 10,
          repeat: -1
        })

        this.anims.create({
          key: name+'_right',
          frames: this.anims.generateFrameNumbers(name, { start: 5, end: 6 }),
          frameRate: 10,
          repeat: -1
        })

        this.anims.create({
          key: name+'_up',
          frames: this.anims.generateFrameNumbers(name, { start: 1, end: 2 }),
          frameRate: 10,
          repeat: -1
        })
        
        this.anims.create({
            key: name + '_down',
            frames: this.anims.generateFrameNumbers(name, { start: 7, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: name+'_idle',
            frames: [ { key: name, frame:  0} ],
            frameRate: 10,
            repeat: -1
            
        })
        
    }
  } 

  }   

  create () {

    this.createAnims();

    //this.scene.start('Game');
    //this.scene.start('GameUI');

    //this.scene.start('Start', { pseudo: '' })
    
    this.scene.start("Lobby",
        {
            joueur_courant : 3,
            code : 1234,
            pseudo : "Pseudo",
            serveur_url : "ws://172.22.232.58:8080/IllicoDraco/"
        }
    );

    /*
    this.scene.start('Boutique', {
        ingredients : [
            "j1_pretre","j2_pretre", "j3_pretre", "j4_pretre",
            "j1_mage","j2_mage", "j3_mage", "j4_mage",
            "j1_archer","j2_archer", "j3_archer", "j4_archer"],
        money : 1
    });

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
)*/
  }
}
