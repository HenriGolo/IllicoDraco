import Tchat from '../gameObjects/Tchat.js'
import Player from '../gameObjects/Player.js'
import IngredientsContainer from '../gameObjects/IngredientsContainer.js'
import { SERVER_URL } from './Preloader.js'

const zoom = 3

export class GameUI extends Phaser.Scene {
  constructor (joueur_courant = 4, pseudo = 'Pseudo', serveur_url = SERVER_URL) {
    super({ key: 'GameUI' })

    this.serveur_url = serveur_url
    this.joueur_courant = joueur_courant
    this.pseudo = pseudo

    this.tchat
    this.infosText //Affichage des informations

  }

  create () {
    this.ui = this.add.layer()

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

    this.add.sprite(10 + (24 * zoom) / 2, 70 + (24 * zoom) / 2 * 3, 'bt_receuil').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.open_receuil())

    //Bouton Parametre
    this.add.sprite(1270 - (24 * zoom) / 2, 60 + (24 * zoom) / 2, 'bt_parametre').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.open_parameter())

    //Ajout du tchat
    this.tchat = new Tchat(this, this.pseudo, 960, 158, this.serveur_url)
    this.tchat.switch_visibility()

    //Initialiser les touches du jeu
    this.input.keyboard.on('keyup', (event) => this.handle_key(event))
  }

  open_boutique () {
    this.tchat.add_text_to_tchat('boutique')
    //TODO
  }

  open_receuil () {
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

  constructor (
    joueur_courant = 4,
    pseudo = 'Pseudo',
    serveur_url = SERVER_URL
  ) {
    super('Game')

    this.serveur_url = serveur_url
    this.joueur_courant = joueur_courant
    this.pseudo = pseudo

  }

  preload () {
  }

  create () {

    //TILE MAP

    const tilemap = this.make.tilemap({ key: 'tilemap' })
    tilemap.addTilesetImage('full_tileset', 'tiles')

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

    /*
    const controles_url = new URL('controles', this.serveur_url)
    fetch(controles_url)
      .then(response => response.json())
      .then(controles => {
        this.playerCur = new Player(this, this.middleX + 16, this.middleY, 1, 'mage', 100, 10, 3, controles)
      })*/

    //TO REMOVE
    this.playerCur = new Player(this, this.middleX + 16, this.middleY, 1, 'mage', 100, 50, 3, {
      gauche : "Q",
      bas : "S",
      droite : "D",
      haut : "Z",
      prendre : "E"
    })

    this.cameras.main.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels)
    this.cameras.main.startFollow(this.playerCur.getPlayer(), true)
    this.cameras.main.setFollowOffset(
      -this.playerCur.getWidth() / 2,
      -this.playerCur.getHeight() / 2
    )

    //Cacher le joueur ou monstre qui passe sous un tronc/arche
    caches.setDepth(this.playerCur.getDepth() + 1)

    // Collisions :

    obstacles.setCollisionByProperty({ collision: true })
    this.physics.add.collider(this.playerCur.getPlayer(), obstacles)

    this.physics.world.setBounds(0, 0, this.width, this.height)
    this.physics.world.setBoundsCollision()

    this.createInteractiveObjects()

    this.ingredientsContainer = new IngredientsContainer(this, this.playerCur)
    this.ingredientsContainer.add_ingredient(this.middleX + 32, this.middleY, 'slime_piece')
    this.ingredientsContainer.add_ingredient(this.middleX + 64, this.middleY, 'lait')

    console.log(this.ingredientsContainer.get_overlap_object())
    //////////////////////////////////////////////////////////////////////UI

  }

  update () {

    this.playerCur?.handleKey()

    if (this.interactText) {
      this.interactText.setPosition(this.playerCur.getX(), this.playerCur.getY() - 20)
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
        this.playerCur.getPlayer().body,
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

  createInteractiveObjects () {

    const debug = false

    // Creation rectangles = zones d'interaction avec les 3 objets resp

    this.hitZoneCoffre = this.add.rectangle(16, 35 * 16, 32, 64, 0x0000ff).setVisible(debug)
    this.hitZoneTable = this.add.rectangle(16, 39 * 16, 32, 64, 0x0000ff).setVisible(debug)
    this.hitZoneMarmite = this.add.rectangle(16 * 10, 37 * 16, 64, 64, 0x0000ff).setVisible(debug)
    this.hitZoneBar = this.add.rectangle(13 * 16 + 8, 40 * 16 + 8, 32, 16, 0x0000ff).setVisible(debug)

    this.playerCur.getPlayer().setAbove(this.hitZoneMarmite)
    this.playerCur.getPlayer().setAbove(this.hitZoneCoffre)
    this.playerCur.getPlayer().setAbove(this.hitZoneTable)

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

    this.physics.add.existing(this.hitZoneBar, 1)
    this.physics.add.existing(this.hitZoneCoffre, 1)
    this.physics.add.existing(this.hitZoneMarmite, 1)
    this.physics.add.existing(this.hitZoneTable, 1)

    // Attrib des this.hitZones à leur objet resp.

    this.bar.hitZone = this.hitZoneBar
    this.coffre.hitZone = this.hitZoneCoffre
    this.table.hitZone = this.hitZoneTable
    this.marmite.hitZone = this.hitZoneMarmite

    console.log(this.hitZoneCoffre.body.x) // must be true
    console.log(this.hitZoneMarmite.body.enable)  // must be true

    this.physics.add.overlap(this.playerCur.getPlayer(), this.hitZoneCoffre, () => this.zoneInteract(this.coffre), null, this)
    this.physics.add.overlap(this.playerCur.getPlayer(), this.hitZoneTable, () => this.zoneInteract(this.table))
    this.physics.add.overlap(this.playerCur.getPlayer(), this.hitZoneMarmite, () => this.zoneInteract(this.marmite))
    this.physics.add.overlap(this.playerCur.getPlayer(), this.hitZoneBar, () => this.zoneInteract(this.bar))

    // p-ê à rempalcer par var isOverlapping = this.physics.world.overlap(object1, object2); dans le update

    //const truc = this.marmite.preFX.addGlow(0xffffff, 100, 0, false);

    this.playerCur.getPlayer().setBounce(0.2)
    this.physics.add.collider(this.marmite, this.playerCur.getPlayer(), null, null, this)

    this.physics.add.collider(this.coffre, this.playerCur.getPlayer(), null, null, this)
    this.physics.add.collider(this.bar, this.playerCur.getPlayer(), null, null, this)
    this.physics.add.collider(this.table, this.playerCur.getPlayer(), null, null, this)

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
        this.effect = objet.preFX.addGlow(0xffffff, 100, 0)
      }
    }

  }

  getIngredientsContainer () {
    return this.ingredientsContainer
  }

}

////////////////////////////////
