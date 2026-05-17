export class Parametre extends Phaser.Scene {

  constructor () {
    super('Parametre')
    this.selected = -1

  }

  init (data) {

    this.keys = []

    this.keys[0] = data.haut
    this.keys[1] = data.bas
    this.keys[2] = data.gauche
    this.keys[3] = data.droite
    this.keys[4] = data.attaquer
    this.keys[5] = data.interagir
    this.keys[6] = data.prendre
    this.keys[7] = data.boutique
    this.keys[8] = data.recueil
    this.keys[9] = data.chat

    this.id = data.id
    this.previousScene = data.previousScene

    this.serveur_url = data.serveur_url

    this.pseudo = data.pseudo

    this.scene.pause(this.previousScene)
  }

  create () {

    var graphics = this.add.graphics()

    graphics.fillStyle(0x000000, 0.8)
    graphics.fillRect(0, 0, 1280, 720)

    //Bouton Retour
    this.add.sprite(46, 46, 'bt_retour').setScale(3, 3)
      .setInteractive()
      .on('pointerdown', () => this.close_window())

    this.touchesTitres = ['haut', 'bas', 'gauche', 'droite', 'attaquer', 'interagir', 'prendre / poser', 'boutique', 'recueil', 'chat']

    this.keyText = []

    for (let i = 0; i < this.touchesTitres.length; i++) {
      this.add.rectangle(510, (i * 52) + 100, 310, 42, 0x6b4b34)
      this.add.text(360, (i * 52) + 84, this.touchesTitres[i], { fontSize: '32px', fill: '#ffffff' })
        .setFixedSize(300, 32)
        .setAlign('left')

      this.add.rectangle(770, (i * 52) + 100, 180, 42, 0x6b4b34)
        .setInteractive()
        .on('pointerdown', () => this.select(i))

      this.keyText[i] = this.add.text(680, (i * 52) + 84, this.keys[i], { fontSize: '32px', fill: '#ffffff' })
        .setFixedSize(180, 32)
        .setAlign('center')
    }

    this.input.keyboard.on('keydown',
      (event) => this.change_key(event.code)
    )

  }

  //Permet de selectionner le controle a changer
  select (indice) {

    if (this.selected != -1) {
      this.keyText[this.selected].setColor('#ffffff')
    }

    this.keyText[indice].setColor('#ff0000')
    this.selected = indice
  }

  //change la touche associé a l'indice selectionné courant
  change_key (new_key) {

    if (this.selected != -1) {
      this.keyText[this.selected].setColor('#ffffff')

      for (let i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === new_key) {
          this.keyText[i].setText(':(')
          this.keys[i] = ''
        }
      }

      this.keyText[this.selected].setText(new_key)
      this.keys[this.selected] = new_key
      this.selected = -1
    }

  }

  async close_window () {
    //Si aucune touche a ""
    //Sauvegarder les touches
    //Retour a la fenetre précédente

    const url = new URL('controles', this.serveur_url)
    url.searchParams.set('pseudo', this.pseudo)
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        //pseudo: 'pseudo',
        toucheHaut: this.keys[0],
        toucheBas: this.keys[1],
        toucheDroite: this.keys[3],
        toucheGauche: this.keys[2],
        attaquer: this.keys[4],
        interagir: this.keys[5],
        prendreOuPoser: this.keys[6],
        accessBoutique: this.keys[8],
        bestiaireOuLivreRecette: this.keys[7],
        chat: this.keys[9],
        id: this.id
      })
    })

    console.log(response)

    this.scene.resume(this.previousScene)
    this.scene.stop(this)
  }

}
