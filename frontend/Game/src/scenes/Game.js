import Tchat from '../gameObjects/Tchat.js'
import Player from '../gameObjects/Player.js'
import IngredientsContainer from '../gameObjects/IngredientsContainer.js'
import { SERVER_URL, TIME, MONEY } from '../utils.js'
import Monster from '../entities/Monster.js'
import Coffre from '../gameObjects/Coffre.js'

const zoom = 3
let monsterDelay = 2500
var tilemap

export class GameUI extends Phaser.Scene {
  constructor () {
    super({ key: 'GameUI' })

    this.tchat
    this.infosText //Affichage des informations
  }

  init (data) {
    this.serveur_url = data.serveur_url
    this.joueur_courant = data.joueur_courant
    this.pseudo = data.pseudo
    this.game = data.game
  }

  create () {

    this.graphics = this.add.graphics()
    //Barre d'informations
    this.graphics.lineStyle(4, 0xc1c1c1, 1.0)
    this.graphics.fillStyle(0x6b4b34, 1)
    this.graphics.fillRect(0, 0, 1280, 50)
    this.graphics.strokeRect(2, 2, 1276, 48)

    this.infosText = this.add.text(0, 16, 'Temps : XX | Argent : XX', { fontSize: '24px', fill: '#ffffff' })
      .setFixedSize(1280, 32)
      .setAlign('center')

    //Bouton Boutique / Receuil
    this.add.sprite(10 + (24 * zoom) / 2, 60 + (24 * zoom) / 2, 'bt_boutique').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.open_boutique())

    this.add.sprite(10 + (24 * zoom) / 2, 70 + (24 * zoom) / 2 * 3, 'bt_recueil').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.open_recueil())

    //Bouton Parametre
    this.add.sprite(1270 - (24 * zoom) / 2, 60 + (24 * zoom) / 2, 'bt_parametre').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.open_parameter())

    //Ajout du tchat
    this.tchat = new Tchat(this, this.pseudo, 960, 158, this.serveur_url)
    this.tchat.switch_visibility()

    //Initialiser les touches du jeu
    this.input.keyboard.on('keyup', (event) => this.handle_key(event))

    this.coffre = new Coffre(this)
  }

  open_boutique () {
    this.tchat.add_text_to_tchat('boutique')
    //TODO
  }

  open_recueil () {
    this.tchat.add_text_to_tchat('receuil')
    //TODO
  }

  open_parameter () {
    this.tchat.add_text_to_tchat('parameter')
    //TODO
  }

  handle_key (event) {

    switch (event.key) {
      case 't' : {
        this.tchat.switch_visibility()
        break
      }
    }

  }

}

export class Game extends Phaser.Scene {

  constructor () {
    super('Game')
  }

  init (data) {
    
    this.joueur_courant = data.joueur_courant
    this.pseudo = data.pseudo
    this.ws = data.ws
    this.joueurs_info = data.joueurs_info

    this.serveur_url = SERVER_URL
    this.duree = TIME
    this.money = MONEY
  }

  preload () {
  }

  create () {

    this.monstersData = []
    this.getMonsters()

    //TILE MAP

    const tilemap = this.make.tilemap({ key: 'tilemap' })
    tilemap.addTilesetImage('full_tileset', 'tiles')
    this.middleY = this.height * 0.5
    tilemap.createLayer('fond', 'full_tileset', 0, 0)
    tilemap.createLayer('over', 'full_tileset', 0, 0)
    const obstacles = tilemap.createLayer('obstacles', 'full_tileset', 0, 0)
    tilemap.createLayer('deco', 'full_tileset', 0, 0)
    const caches = tilemap.createLayer('caches', 'full_tileset', 0, 0)
    this.width = tilemap.widthInPixels
    this.height = tilemap.heightInPixels
    this.middleX = this.width * 0.5
    this.middleY = this.height * 0.5

    this.cameras.main.setZoom(4)
    this.cameras.main.centerOn(this.middleX, this.middleY)

    //INIT DU JOUEUR AVEC LES DONNEES DE JOUEUR DATA
    console.log(">>><<<")
      console.log(this.joueurs_info[this.joueur_courant-1].controles)
        this.player = new Player(this, this.middleX + 16, this.middleY, 1, 'mage', 100, 10, 3, this.joueurs_info[this.joueur_courant-1].controles)
        console.log({ player: this.player })
        /*/TO REMOVE
        this.player = new Player(this, this.middleX + 16, this.middleY, 1, 'mage', 100, 50, 3, {
          gauche: 'Q',
          bas: 'S',
          droite: 'D',
          haut: 'Z',
          prendre: 'E'
        })//*/
        this.cameras.main.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels)
        this.cameras.main.startFollow(this.player.getSprite(), true)
        this.cameras.main.setFollowOffset(
          -this.player.getWidth() / 2,
          -this.player.getHeight() / 2
        )
      
    //INIT DES AUTRES JOUEURS
      
    ////////////////////////////////////////////////////:::

    //Cacher le joueur ou monstre qui passe sous un tronc/arche
    caches.setDepth(this.player?.getDepth() + 1)

    // Collisions :
    obstacles.setCollisionByProperty({ collision: true })
    this.physics.add.collider(this.player?.getSprite(), obstacles)

    this.physics.world.setBounds(0, 0, this.width, this.height)
    this.physics.world.setBoundsCollision()
    this.player?.getSprite().setCollideWorldBounds()
    this.createInteractiveObjects()
    this.ingredientsContainer = new IngredientsContainer(this, this.player)
    this.ingredientsContainer.add_ingredient(this.middleX + 32, this.middleY, 'slime_piece')
    this.ingredientsContainer.add_ingredient(this.middleX + 64, this.middleY, 'lait')
    console.log(this.ingredientsContainer.get_overlap_object())
    //////////////////////////////////////////////////////////////////////UI
    console.log('Creation passée')

    this.monsterObjects = []

    this.generateMonsterGroup()

    this.spawnMonsterTimer = this.time.addEvent({ // Crée l'ajout de monstres tous les monsterDelay temps
      delay: monsterDelay,
      callback: this.createEnnemy,
      callbackScope: this,
      loop: true
    })

    this.time.addEvent({    // Réduit le temps de monsterDelay toutes les 30s
      delay: 30000,
      callback: this.updateMonsterSpawnDelay,
      callbackScope: this,
      loop: true

    })

    this.ui = this.scene.launch('GameUI',
      {
        joueur_courant: this.joueur_courant,
        pseudo: this.pseudo,
        serveur_url: SERVER_URL,
        game: this
      }
    )

  }

  update () {

    this.player?.handleKey()
    if (this.interactText) {
      if (this.interactText) {
        this.interactText.setPosition(this.player?.getX(), this.player?.getY() - 20)
      }

      // this.effect = this.marmite.preFX.addGlow(0xff00ff, 10, 0).setActive(false);

      // if (isOverlapping && this.effect.active === false ){
      //     this.effect.setActive(true);
      // }
      // else {
      //     if (this.effect != null) {
      //         console.log("not null");
      //         this.effect.outerStrength = 0;//.setActive(false);
      //         //this.marmite.preFX.remove(this.effect);
      //     }
      // }

      if (this.objetInteract) {
        const zone = this.objetInteract.hitZone

        if (!Phaser.Geom.Intersects.RectangleToRectangle(
          this.player?.getSprite().body,
          zone.body
        )) {

          this.objetInteract = null
          if (this.interactText) this.interactText.setVisible(false)
          if (this.effect) {
            this.effect.destroy()
            this.effect = null
          }
        }
      }

    }
  }

  createInteractiveObjects () {

    const debug = false
    // Creation rectangles = zones d'interaction avec les 3 objets resp

    this.hitZoneCoffre = this.add.rectangle(16, 35 * 16, 32, 64, 0x0000ff).setVisible(debug)
    this.hitZoneTable = this.add.rectangle(16, 39 * 16, 32, 64, 0x0000ff).setVisible(debug)
    this.hitZoneMarmite = this.add.rectangle(16 * 10, 37 * 16, 64, 64, 0x0000ff).setVisible(debug)
    this.hitZoneBar = this.add.rectangle(13 * 16 + 8, 40 * 16 + 8, 32, 16, 0x0000ff).setVisible(debug)
    this.hitZoneMarmite.setInteractive()
    this.player?.getSprite().setAbove(this.hitZoneMarmite)
    this.player?.getSprite().setAbove(this.hitZoneCoffre)
    this.player?.getSprite().setAbove(this.hitZoneTable)
    this.hitZoneMarmite.setInteractive()
    this.physics.world.enable(this.hitZoneMarmite)

    // Creation coffre :
    this.coffre = this.add.sprite(8, 35 * 16, 'coffre') //this.add.rectangle(8, 35*16, 16,32, 0xff0000);
    this.physics.add.existing(this.coffre, 1)

    // Creation table à découper :

    this.table = this.add.sprite(8, 39 * 16, 'table') //this.add.rectangle(8, 39*16, 16,32, 0xff0000).setInteractive();
    this.physics.add.existing(this.table, 1)
    // Création marmite

    //this.marmite = this.add.rectangle(10*16, 37*16, 32,32, 0xff0000).setInteractive(); // à remplacer
    this.marmite = this.add.sprite(10 * 16, 36 * 16 + 12, 'marmite').setScale(0.7).setInteractive()
    this.physics.add.existing(this.marmite, 1)
    this.marmite.body.setSize(32, 28, false)
    this.marmite.body.setOffset(6, 13)

    // Création bar ?

    this.bar = this.add.rectangle(13 * 16 + 8, 41 * 16 + 8, 16, 16, 0xff0000)
    this.physics.add.existing(this.bar, 1)
    // Set overlaps et collision :
    // objets réels : collision
    // zones : overlap

    this.click = false
    // Attrib des this.hitZones à leur objet resp.
    this.physics.add.existing(this.hitZoneBar, 1)
    this.physics.add.existing(this.hitZoneCoffre, 1)
    this.physics.add.existing(this.hitZoneMarmite, 1)
    this.physics.add.existing(this.hitZoneTable, 1)
    // Attrib des this.hitZones à leur objet resp.

    this.bar.hitZone = this.hitZoneBar
    this.coffre.hitZone = this.hitZoneCoffre
    this.table.hitZone = this.hitZoneTable
    this.marmite.hitZone = this.hitZoneMarmite
    // p-ê à rempalcer par var isOverlapping = this.physics.world.overlap(object1, object2); dans le update
    console.log(this.hitZoneCoffre.body.x) // must be true
    console.log(this.hitZoneMarmite.body.enable)  // must be true
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneCoffre, () => this.zoneInteract(this.coffre), null, this)
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneTable, () => this.zoneInteract(this.table))
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneMarmite, () => this.zoneInteract(this.marmite))
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneBar, () => this.zoneInteract(this.bar))
    // p-ê à rempalcer par var isOverlapping = this.physics.world.overlap(object1, object2); dans le update

    //const truc = this.marmite.preFX.addGlow(0xffffff, 100, 0, false);

    this.player?.getSprite().setBounce(0.2)
    this.physics.add.collider(this.marmite, this.player?.getSprite(), null, null, this)
    // Préparation des interactions :
    this.physics.add.collider(this.coffre, this.player?.getSprite(), null, null, this)
    this.physics.add.collider(this.bar, this.player?.getSprite(), null, null, this)
    this.physics.add.collider(this.table, this.player?.getSprite(), null, null, this)

    // Préparation des interactions :

    this.oldObjetInteract = null
    this.objetInteract = null
    this.interactKey = this.input.keyboard.addKey('F') // à modif selon options (mettre une var globale)
  }

  zoneInteract (objet) {
    //effect;

    if (this.objetInteract !== objet) {
      this.oldObjetInteract = this.objetInteract
      this.objetInteract = objet

      if (!this.interactText) {
        this.interactText = this.add.text(0, 0, `Appuyez sur E`, {
          fontSize: '20px',
          color: '#ffffff'
        }).setOrigin(0.5).setScale(0.5)
      }

      this.interactText.setVisible(true)
      if (!this.effect) {
        if (!this.effect) {
          this.effect = objet.preFX.addGlow(0xffffff, 100, 0)
        }
      }
    }
  }

  async getMonsters () {

    const response = await fetch('http://' + SERVER_URL + '/illicodraco/monsters')
    if (response.ok) {
      let data = await response.json()
      this.monstersData = data.monstersData
      console.log('Data des monstres reçu')
      console.log(data)
    } else {
      console.error('Erreur HTTP : ', response.status)

    }

    console.log('>>>>>>>>>>>>' + this.monstersData)

  }

  preloadMonstergroup () {
    //// En supposant que getMonsters() a bien load les données des monstres :
    // Monstre : { int id : .., String nom : .., Statistiques stats : { .. } , String path : .., Produit produit : .., float vitesse;  }
    // Statistique : {}
    // Produit

    for (const monster in this.monstersData) {
      this.load.image(monster.nom, monster.path)
    }

  }

  generateMonsterGroup () {

    this.monsters = this.physics.add.group([])

  }

  createEnnemy () {

    if (this.monstersData.length) {
      const chosenMonsterId = Phaser.Math.Between(0, this.monstersData.length)
      // listJson.filter({id} => id === indiceVoulu)[0]
      const chosenMonster = this.monstersData.filter(({ id }) => id === chosenMonsterId)[0]

      const nom = chosenMonster.name
      console.log('Monstre spawn : ' + nom)

      const stats = chosenMonster.stats
      const x = Phaser.Math.Between(0, tilemap.width * 16)
      const y = 16

      const monsterSprite = this.monsters.getFirstDead(true, x, y, nom, 0, true)

      const monster = new Monster(this, nom, stats.vie, stats.defense, stats.attaque, stats.vitesse, monsterSprite, stats.produit)
      monster.moveTimer = this.time.addEvent({
        delay: Phaser.Math.Between(10000, 20000) / stats.vitesse,
        callback: (monster) => {
          this.physics.moveTo(monster.sprite, monster.sprite.x, monster.sprite.y - 16, 50)
        },
        callbackScope: this,
        loop: true

      })
      this.monsterObjects.push(monster)

      console.log('Enemy spawned at x: ' + x + ', y: ' + y)
      console.log('x: ' + this.player?.getWidth() + ' y: ' + this.player?.getHeight())
    }
  }

  getIngredientsContainer () {
    return this.ingredientsContainer
  }

  updateMonsterSpawnDelay () {
    monsterDelay -= 50
    this.spawnMonsterTimer.destroy()
    this.spawnMonsterTimer = this.time.addEvent({
      delay: monsterDelay,
      callback: this.createEnnemy,
      callbackScope: this,
      loop: true
    })
  }
}

////////////////////////////////
