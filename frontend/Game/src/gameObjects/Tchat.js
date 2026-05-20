import { httpToWs } from '../../../utils.js'

export default class Tchat {

  constructor (scene, pseudo, x, y, serveur_url) {

    this.serveur_url = httpToWs(serveur_url)
    this.pseudo = pseudo
    // Affichage du tchat // 1120 332
    this.tchatOutput = scene.add.dom(x + 160, y + 204).createFromCache('tchatTextOutput')
    // Entrée texte // 1120 560
    this.tchatInput = scene.add.dom(x + 160, y + 432).createFromCache('tchatTextInput')
    this.tchatInput.addListener('click')
    this.tchatInput.on('click', (event) => event.target.name === 'sendToTchatButton' && this.send_enter_text())
    this.tchatInput.addListener('keydown')
    this.tchatInput.on('keydown', (event) => event.key === 'Enter' && this.tchatOutput.visible && this.send_enter_text())

    this.chatLimit = 99

    //Compteur de nouveau message
    this.bubble = scene.add.sprite(x + 276, y + 11, 'text_bubble').setScale(3, 3)
      .setVisible(false)
    this.compteurText = scene.add.text(x + 228, y - 10, '', { fontSize: '32px', fill: '#ff0000' })
      .setFixedSize(96, 32)
      .setAlign('center')
    this.compteur = 0

    //Historique de la conversation
    this.historique = ''

    //this.ws = new WebSocket(serveur_url);
    const url = new URL(`chat/${pseudo}`, this.serveur_url)
    this.ws = new WebSocket(url)

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.add_text_to_tchat(message.system
        ? message.content
        : `${message.from} : ${message.content}`)
    }
    this.ws.onerror = () => this.add_text_to_tchat(this.pseudo + ' : Une erreur s\'est produite')
  }

  // récupère le texte entré et l'envoie au tchat
  send_enter_text () {
    let inputText = this.tchatInput.getChildByName('textField')
    if (inputText.value !== '') {
      let text = inputText.value
      inputText.value = '' // reset HTML
      this.send_text(text)
    }
  }

  // Envoie le texte passé en paramètre au tchat via la websocket au serveur
  send_text (content, to = null) {
    if (content !== '') {
      this.ws.send(JSON.stringify({ content, from: this.pseudo, to }))
    }
  }

  // Ajoute le texte sur le tchat
  add_text_to_tchat (text) {
    let textout = document.getElementById('tchat_output')
    this.historique += text + '\n'
    textout.innerText = this.historique

    //Affiche des messages en attente si tchat invisible
    if (!this.tchatInput.visible) {
      this.compteur += 1
      this.bubble.setVisible(true)
      this.compteurText.setText(this.compteur > this.chatLimit ? `+${this.chatLimit}` : this.compteur)
    }
  }

  switch_visibility () {
    this.tchatInput.setVisible(!this.tchatInput.visible)
    this.tchatOutput.setVisible(!this.tchatOutput.visible)

    //Efface le compteur
    if (this.tchatOutput.visible) {
      this.compteur = 0
      this.bubble.setVisible(false)
      this.compteurText.setText('')
    }
  }

  quitChat () {
    this.ws.close()
  }
}
