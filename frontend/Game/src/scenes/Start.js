import ASSETS from '../assets.js'
import { SERVER_URL } from './Preloader.js'

export class Start extends Phaser.Scene {

  constructor () {
    super('Start')
    this.pseudo
  }

  preload () {

    // Load the assets for the game - see ./src/assets.js

    this.load.image('creer', 'assets/button/BiggerButtonCreer.png', {
      frameWidth: 128,
      frameHeight: 64
    })

    this.load.image('join', 'assets/button/BiggerButtonRej.png', {
      frameWidth: 128,
      frameHeight: 64
    })

    this.load.image('recette', 'assets/button/BiggerButtonLivreRec.png', {
      frameWidth: 128,
      frameHeight: 64
    })

    this.load.image('bestiaire', 'assets/button/ButtonBestiaire.png', {
      frameWidth: 64,
      frameHeight: 32
    })

    this.load.image('options', 'assets/button/ButtonOptions.png', {
      frameWidth: 64,
      frameHeight: 32
    })

    this.pseudoChoisi = false

  }

  init (data) {
    this.pseudo = data.pseudo

    // Pas besoin de rerentrer le pseudo si on a quitté le lobby
    this.isTherePseudo = this.pseudo !== ''

    console.log(this.isTherePseudo)
  }

  create () {

    this.initVariables()
    this.initMap()

    this.time.addEvent({
      delay: 100, // 1 second
      callback: () => this.changetile(),
      loop: true // repeats forever
    })

    // Data
    this.width = this.game.config.width
    this.height = this.game.config.height
    this.middleX = this.width * 0.5

    // / Adding logo
    // this.add.rectangle(this.middleX, this.height*0.2, 128*2, 64*2, 0x888); // sera remplacé par le logo
    this.add.sprite(this.middleX, this.height * 0.2, 'logo').setScale(4)

    this.textInser = this.add.text(this.middleX, this.height * 0.5, 'Insérez votre pseudo : ', {
      fontSize: '32px',
      fill: '#FFF',
      align: 'center'
    }).setOrigin(0.5)

    let form = `<input type="text" name="pseudo" placeholder="Votre pseudo">`
    this.pseudoContainer = this.add.dom(this.middleX, this.height * 0.6).createFromHTML(form, 'form')

    this.keyEntree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    // container.addListener('')

    if (this.isTherePseudo) {
      this.textInser.visible = false
      this.pseudoContainer.visible = false
      this.addingButtons()
      this.createPopup()
    }

  }

  update () {

    if (this.keyEntree.isDown && !this.isTherePseudo) { // essayer de mettre un addListener sur une entrée classique ?
      this.isTherePseudo = true
      console.log('Entrée pressée.')

      // Nom récupéré. Eventuellement mettre un système de "pseudo déjà choisi ici?"
      this.pseudo = this.pseudoContainer.getChildByName('pseudo').value

      this.login()

      console.log('Nom choisi : ' + this.pseudo)

      // On cache la demande de pseudo
      this.textInser.visible = false
      this.pseudoContainer.visible = false

      // On fait apparaitre les autres éléments du menu
      this.addingButtons()
      this.createPopup()

    }
  }

  // Envoyer le pseudo au serveur pour ajout ou connection dans la base de donnée
  async login () {
    // On envoie le pseudo au serveur
    const url = new URL('login', SERVER_URL)
    url.searchParams.set('pseudo', this.pseudo)
    const response = await fetch(url)
    if (response.ok) return await response.json()
  }

  initVariables () {
    const tileScale = 2

    this.centreX = this.scale.width * 0.5
    this.centreY = this.scale.height * 0.5

    // list of tile ids in tiles.png
    // items nearer to the beginning of the array have a higher chance of being randomly chosen when using weighted()
    //  this.tiles = [50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 110, 110, 110, 110, 50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 110, 110, 110, 110, 36, 48, 60, 72, 84];
    this.tileSize = 16 // width and height of a tile in pixels

    // this.mapOffset = 10; // offset (in tiles) to move the map above the top of the screen
    // this.mapTop = -this.mapOffset * this.tileSize; // offset (in pixels) to move the map above the top of the screen
    this.mapHeight = Math.ceil(this.scale.height / this.tileSize) // + this.mapOffset + 1; // height of the tile map (in tiles)
    this.mapWidth = Math.ceil(this.scale.width / this.tileSize) // width of the tile map (in tiles)
    this.scrollSpeed = 0.5 // background scrolling speed (in pixels)
    this.scrollMovement = 0 // current scroll amount

    this.map // rference to tile map
    this.groundLayer // reference to ground layer of tile map
  }

  // create tile map data
  initMap () {
    const mapData = []

    for (let y = 0; y < this.mapHeight; y++) {
      const row = []

      for (let x = 0; x < this.mapWidth; x++) {
        // randomly choose a tile id from this.tiles
        // weightedPick favours items earlier in the array
        const tileIndex = (2 * x + 2 * y) % 6

        //const sprite1 = this.add.sprite(640, 360, 'ship');

        row.push(tileIndex)
      }

      mapData.push(row)
      // console.log(row);
      // MapData de la forme [[ 0, 2, 4, 0, 2, 4.. ], [2, 4, 0, 2..], [ 4, 0, 2, 4, ..], ..] --> indique à quelle case quel sprite on met
    }
    this.map = this.make.tilemap({ data: mapData, tileWidth: this.tileSize, tileHeight: this.tileSize })
    // console.log("Searching for " + ASSETS.spritesheet.tiles.key + " .\n");
    const tileset = this.map.addTilesetImage(ASSETS.spritesheet.tiles.key)
    // console.log("Found " + ASSETS.spritesheet.tiles.key + " .\n");
    this.groundLayer = this.map.createLayer(0, tileset, 0, this.mapTop).setScale(4)
  }

  // scroll the tile map
  updateMap () {

    this.changetile()
    // this.scrollMovement += this.scrollSpeed;
  }

  changetile () {
    let tile

    for (let y = this.mapHeight - 1; y > -1; y--) {
      // loop through map from left to right column
      for (let x = 0; x < this.mapWidth; x++) {
        tile = this.map.getTileAt(x, y)
        tile.index = (tile.index + 1) % 6

      }
    }
  }

  addingButtons () {

    //Sprites for buttons

    this.creer = this.add.sprite(this.middleX, this.height * 0.40, 'creer').setScale(2).setInteractive()            // Boutons
    this.join = this.add.sprite(this.middleX, this.height * 0.525, 'join').setScale(2).setInteractive()
    this.recette = this.add.sprite(this.middleX, this.height * 0.65, 'recette').setScale(2).setInteractive()
    this.bestiaire = this.add.sprite(this.middleX, this.height * 0.75, 'bestiaire').setScale(2).setInteractive()
    this.options = this.add.sprite(this.middleX, this.height * 0.85, 'options').setScale(2).setInteractive()

    // Détection des clics :
    //  Input Events

    this.creer.on('pointerdown', () => this.on_creer())

    this.join.on('pointerdown', () => this.on_join())

    this.recette.on('pointerdown', () => this.on_recette())

    this.bestiaire.on('pointerdown', () => this.on_bestiaire())

    this.options.on('pointerdown', () => this.on_options())

    this.createPopup()

  }

  // Précreer le popup de récupération de code
  createPopup () {

    this.popupBackground = this.add.rectangle(this.middleX, this.height * 0.6, 128 * 2, 64, 0x888) // sera remplacé par le logo
    let form = `
        <input type="text" name="gameCode" placeholder="Entrez le code de la partie">
        <input type="button" name="sendCodeButton" value=">" style="font-size: 16px">
        `
    this.gameCodeContainer = this.add.dom(this.middleX, this.height * 0.6).createFromHTML(form, 'form')

    this.gameCodeContainer.addListener('click')
    this.gameCodeContainer.on('click', (event) => this.send_code(event))

    this.switchCodePopPupVisibility(false)

  }

  // Envoi le code au server et démarre le lobby si la partie existe
  async send_code (event) {
    if (event.target.name === 'sendCodeButton') {
      let inputCode = this.gameCodeContainer.getChildByName('gameCode')
      if (inputCode.value !== '') {
        let code = inputCode.value

        let url = new URL('join', SERVER_URL)
        url.searchParams.set('code', code)
        url.searchParams.set('pseudo', this.pseudo)
        let response = await fetch(url)

        if (response.ok) {
          const { nbJoueurs, code } = await response.json()
          url = new URL('switch_class', SERVER_URL)
          url.searchParams.set('code', code)
          url.searchParams.set('num', nbJoueurs)
          url.searchParams.set('nouvelle_classe', 'guerrier')
          response = await fetch(url, { method: 'POST' })
          if (response.ok) {
            console.log(response)
            const start_class = await response.json()
            // Start le lobby avec le nombre de joueurs dans data
            this.scene.start('Lobby', {
              joueur_courant: nbJoueurs, // A VERIFIER
              code: code,
              pseudo: this.pseudo,
              start_class: start_class,
              serveur_url: SERVER_URL
            })
          }
        } else {
          inputCode.value = 'Code Invalide'
        }

      } else {
        this.switchCodePopPupVisibility(false)
        this.switchButtonMode(true)
      }
    }

  }

  switchCodePopPupVisibility (val) {
    this.popupBackground.setVisible(val)
    this.gameCodeContainer.setVisible(val)
  }

  async on_creer () {
    // ... actions sur le serveur pour créer un lobby
    console.log('Créer cliqué')
    const url = new URL('create', SERVER_URL)
    url.searchParams.set('pseudo', this.pseudo)
    console.log(url)
    const response = await fetch(url)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      // Start le lobby avec le code dans data et le nombre de joueur a 1
      this.scene.start('Lobby', {
        joueur_courant: 1,
        code: data.code,
        pseudo: this.pseudo,
        serveur_url: SERVER_URL,
        start_class: ['guerrier']
      })
    } else {
      console.log('Erreur a la création de la partie')
    }

  }

  on_join () {
    // ... actions sur le serveur pour rejoindre un lobby
    console.log('Rejoindre cliqué')
    this.switchCodePopPupVisibility(true)
    this.switchButtonMode(false)
  }

  async on_recette () {
    // ... ouvrir recette
    console.log('Recette cliqué')
  }

  async on_bestiaire () {
    // ... ouvrir bestiaire
    console.log('Bestiaire cliqué')
  }

  async on_options () {
    // ... ouvrir pannel options
    console.log('Options cliqué')

    const url = new URL('controles', SERVER_URL)
    url.searchParams.set('pseudo', this.pseudo)
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        haut: 'w',
        bas: 's',
        droite: 'd',
        gauche: 'q',
        attaquer: 'Space',
        interagir: 'f',
        prendre: 'e',
        boutique: 'b',
        recueil: 'r',
        chat: 't'
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      // Start le lobby avec le code dans data et le nombre de joueur a 1
      this.scene.launch('Parametre',
        {
          ...data,
          previousScene: this
        }
      )
    } else {
      console.log('Erreur au chargement des paramètres')
    }

  }

  switchButtonMode (val) {
    if (!val) {
      this.creer.disableInteractive()
      this.join.disableInteractive()
      this.recette.disableInteractive()
      this.bestiaire.disableInteractive()
      this.options.disableInteractive()
    } else {
      this.creer.setInteractive()
      this.join.setInteractive()
      this.recette.setInteractive()
      this.bestiaire.setInteractive()
      this.options.setInteractive()
    }
  }

}
