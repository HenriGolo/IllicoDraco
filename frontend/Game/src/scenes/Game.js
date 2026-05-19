import Tchat from '../gameObjects/Tchat.js'
import Player from '../gameObjects/Player.js'
import IngredientsContainer from '../gameObjects/IngredientsContainer.js'
import { SERVER_URL, TIME, MONEY } from '../utils.js'
import Monster from '../entities/Monster.js'
import Coffre from '../gameObjects/Coffre.js'
import { QueueClient } from '../gameObjects/QueueClient.js'
import Chaudron from '../gameObjects/Chaudron.js'

const zoom = 3
let monsterDelay = 5000
let clientDelay = monsterDelay*5
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
    this.joueurs_classe = data.classes_info

    this.serveur_url = SERVER_URL
    this.duree = TIME
    this.money = MONEY
  }

  preload () {
  }

  create () {

    this.perdu = false;
    //Rediriger le handler de la web socket
     this.ws.onmessage = (event) => this.on_message(event)

    this.monstersData = []
    this.getMonsters()

    //TILE MAP

    tilemap = this.make.tilemap({ key: 'tilemap' })
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

    //INIT DES JOUEURS AVEC LES DONNEES DE JOUEUR DATA
    this.players = []
    for (let i = 0; i < this.joueurs_info.length; i++) {

      let p = new Player(
        this, 
        this.middleX + 16, this.middleY, i+1, 
        this.joueurs_classe[i], 
        100, 10, 3, 
        this.joueurs_info[i].controles)

      this.players.push(p)
      }

      this.player = this.players[this.joueur_courant -1]
      this.player.setWS(this.ws)

      this.cameras.main.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels)
      this.cameras.main.startFollow(this.player.getSprite(), true)
      this.cameras.main.setFollowOffset(
        -this.player.getWidth() / 2,
        -this.player.getHeight() / 2
      )
      
  
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
    this.ingredientsContainer.add_ingredient(this.middleX + 16, this.middleY, 'nugget')
    //console.log(this.ingredientsContainer.get_overlap_object())
    //////////////////////////////////////////////////////////////////////UI
    console.log('Creation passée')

    this.monsterObjects = []

    this.generateMonsterGroup()

    //Le joueur 1 s'occupe de génerer les monstres
    if (this.joueur_courant === 1) {
      this.spawnMonsterTimer = this.time.addEvent({ // Crée l'ajout de monstres tous les monsterDelay temps
        delay: monsterDelay,
        callback: this.create_ennemy_and_send,
        callbackScope: this,
        loop: true
      })

      this.time.addEvent({    // Réduit le temps de monsterDelay toutes les 30s
        delay: 30000,
        callback: this.updateMonsterSpawnDelay,
        callbackScope: this,
        loop: true

      })
  }


    this.clients = new QueueClient(this);
    console.log(this.clients.clientsQueue);
    this.clients.addNewClient();
    console.log(this.clients.clientsQueue);


    this.clientTimer = this.time.addEvent({    // Fait spawn un client dans la file 
      delay: clientDelay,
      callback: this.genClients,
      callbackScope: this,
      loop: true

    })

    this.time.addEvent({    // Modifie le temps de spawn des clients
      delay: 30000,
      callback: this.updateClientSpawnDelay,
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


    ///Création de la marmite
    this.chaudron = new Chaudron(this, this.marmite, this.ws, this.joueur_courant)

  }

  on_message(event) {
    const message = JSON.parse(event.data)
    //console.log({ message })

    if (message.num != this.joueur_courant) {
    switch (message.type) {
      case 'deplacement' :
        this.players[message.num-1].setPos(message.x, message.y)
        this.players[message.num-1].move(message.deltaX, message.deltaY)
        break
      case 'take_ingredient' :
        this.players[message.num-1].setCarriedObject(message.ramasse.key)
        this.ingredientsContainer.remove_object(message.ramasse.indice)
        break
      case 'drop_object' :
        this.ingredientsContainer.add_ingredient(message.x, message.y, message.ramasse.key)
        break
      case 'remplir_marmite' :
        this.chaudron.add_ingredient(message.produit)
        this.players[message.num -1].setCarriedObject('')
        
        break
      case 'start_chaudron' :
        this.chaudron.start_chaudron()
        break
      case 'create_ennemy' :
        this.createEnnemy(message.ennemi, message.x, message.y)
        break
      case 'damage_monster' :
        console.log("w>",message.attaque, message.indice)
        console.log(this.monsterObjects, this.monsterObjects.length)
        this.monsterObjects[message.indice].take_damage(message.attaque)
        if (this.monsterObjects[message.indice].isDead()) {
          this.remove_monster(message.indice)
        } 

        break
      
      default :
        console.log('Requête inconnue')
    }
    }
  }

  update () {

    this.player?.handleKey()
    if (this.interactText) {
      if (this.interactText) {
        this.interactText.setPosition(this.player?.getX(), this.player?.getY() - 20)
      }

      if (this.objetInteract) {
        const zone = this.objetInteract.hitZone

        if (!Phaser.Geom.Intersects.RectangleToRectangle(
          this.player?.getSprite().body,
          zone.body
        )) {

          this.objetInteract = null
          this.objectInteractLabel = ""
          if (this.interactText) this.interactText.setVisible(false)
          
          /*
            if (this.effect) {
            this.effect.destroy()
            this.effect = null
          }*/
        }
      }

    }
  }

  createInteractiveObjects () {

    const debug = false
    // Creation rectangles = zones d'interaction avec les 3 objets resp

    this.objectInteractLabel = ""

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

    this.bar = this.add.sprite(13 * 16 + 8, 41 * 16 + 8, 'bar') //this.add.rectangle(13 * 16 + 8, 41 * 16 + 8, 16, 16, 0xff0000)
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
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneCoffre, () => this.zoneInteract(this.coffre, "coffre"), null, this)
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneTable, () => this.zoneInteract(this.table, "table"))
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneMarmite, () => this.zoneInteract(this.marmite, "marmite"))
    this.physics.add.overlap(this.player?.getSprite(), this.hitZoneBar, () => this.zoneInteract(this.bar, "bar"))
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

  zoneInteract (objet, name) {
    //effect;

    if (this.objetInteract !== objet) {
      this.oldObjetInteract = this.objetInteract
      this.objetInteract = objet
      this.objectInteractLabel = name

      if (!this.interactText) {
        this.interactText = this.add.text(0, 0, `Appuyez sur E`, {
          fontSize: '20px',
          color: '#ffffff'
        }).setOrigin(0.5).setScale(0.5)
      }

      this.interactText.setVisible(true)
      /*
      if (!this.effect) {
        if (!this.effect) {
          this.effect = objet.preFX.addGlow(0xffffff, 100, 0)
        }
      }*/
    }
  }

  async getMonsters () {

    const url = new URL('monstres', SERVER_URL)
    const response = await fetch(url)
    if (response.ok) {
      let data = await response.json()
      this.monstersData = data
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

    
   get_overlap_monster () {

    for (let i = 0; i < this.monsterObjects.length; i++) {

      if (this.physics.world.overlap(this.player.getSprite(), this.monsterObjects[i].getImage())) {
        let monster = this.monsterObjects[i]

        return {monster : monster, indice : i} 
      }
    }

    return{monster : null, indice : -1} 
  }


  remove_monster(indice, kill = true){
    let monster = this.monsterObjects[indice]
    console.log("CUISINE",monster, indice)
    this.monsterObjects.splice(indice, 1)
    console.log(monster.getX(), monster.getY(), monster.getProduit().nom)
    if (kill){
      this.ingredientsContainer.add_ingredient(monster.getX(), monster.getY(), monster.getProduit().nom)
    }else{

    } 
    
    monster.die()

  } 

  create_ennemy_and_send() {

    let ennemi = this.get_random_monster()

    let x = Phaser.Math.Between(1, tilemap.width-1)*16
    let y = 24


    this.ws.send(JSON.stringify({
      type: 'create_ennemy',
      ennemi: ennemi,
      num: this.num,
      x: x,
      y: y 
    }))

    

    this.createEnnemy(ennemi, x, y)
  }

  get_random_monster() {
    if (this.monstersData.length) {
      let rand = Math.floor(Math.random()*this.monstersData.length)
      console.log(rand)
      return rand
    }
  }

  createEnnemy (chosenMonsterId, x, y) {

    //console.log( !this.monstersData ? "pas de monsterData defined" : "defined")

    if (this.monstersData.length) {
      //const chosenMonsterId = Phaser.Math.Between(0, this.monstersData.length-1)
      // listJson.filter({id} => id === indiceVoulu)[0]
      //console.log("Id de monstre choisi : ", chosenMonsterId, this.monstersData)

      console.log("--------- chosen monster ID : ", chosenMonsterId)
      console.log("--------- chosen monster ID : ", this.monstersData)
      const chosenMonster = this.monstersData[chosenMonsterId]

      console.log("--------- chosen monster : ", chosenMonster)

      const nom = chosenMonster.nom
      //console.log('Monstre spawn : ' + nom)

      const stats = chosenMonster.stats
      const produit = chosenMonster.produit
      

      const monsterSprite = this.monsters.getFirstDead(true, x, y, nom, 0, true)

      const monster = new Monster(this, nom, stats.vie, stats.defense, stats.attaque, x,y, stats.vitesse, monsterSprite, produit)
      console.log("Monstre de vitesse : ", monster.vitesse)
      let timer = this.time.addEvent({
        delay: 500,//monster.vitesse, //Phaser.Math.Between(10000, 20000) / 5,
        callback: () => this.moveMonster(monster),
        callbackScope: this,
        loop: true

      })

      monster.setTimer(timer)
      this.monsterObjects.push(monster)

      console.log('Enemy spawned at x: ' + x + ', y: ' + y)
      console.log('x: ' + this.player?.getWidth() + ' y: ' + this.player?.getHeight())
    }
  }

  getIngredientsContainer () {
    return this.ingredientsContainer
  }

  getChaudron () {
    return this.chaudron
  }

  getObjectInteract() {
    return this.objectInteractLabel
  }

  updateMonsterSpawnDelay () {
    monsterDelay -= 50
    this.spawnMonsterTimer.destroy()
    this.spawnMonsterTimer = this.time.addEvent({
      delay: monsterDelay,
      callback: this.create_ennemy_and_send,
      callbackScope: this,
      loop: true
    })
  }

  moveMonster(monster){ 
    //this.physics.moveTo(monster.image, monster.image.x, monster.image.y + 16, 50)
    monster.image.setY(monster.image.y + 16);
    monster.move(monster.image.x, monster.image.y);

    if (monster.image.y > 16*33){
      let id = this.monsterObjects.findIndex((m) => m === monster);
      this.remove_monster(id, false)
      this.perdu = true;
    }

    //console.log("Monstre se déplace vers :",  monster.image.x, monster.image.y )
  }

  genClients(){
    this.clients.addNewClient();
  }

  updateClientSpawnDelay () {
    clientDelay -= 50
    this.clientTimer.destroy()
    this.clientTimer = this.time.addEvent({
      delay: clientDelay,
      callback: this.genClients,
      callbackScope: this,
      loop: true
    })
  }

  interactClient(client){

  }

  //////////////////////////Envoi message////////////////////////////
  sendDropObject(object, x, y) {
        this.ws.send(JSON.stringify({
        type : "drop_object",
        ramasse : {key: object},
        x : x,
        y : y,
        num: this.num,
        }))
  }

}

////////////////////////////////
