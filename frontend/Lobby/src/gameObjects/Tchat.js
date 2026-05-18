import { httpToWs } from '../../../Game/src/utils'

export default class Tchat {

  constructor (scene, pseudo, x, y, serveur_url) {

    this.serveur_url = httpToWs(serveur_url)
    this.pseudo = 'browser'//pseudo;
    // Affichage du tchat // 1120 332
    this.tchatOutput = scene.add.dom(x + 160, y + 204).createFromCache('tchatTextOutput')
    // Entrée texte // 1120 560
    this.tchatInput = scene.add.dom(x + 160, y + 432).createFromCache('tchatTextInput')

    this.tchatInput.addListener('click')
    this.tchatInput.on('click', (event) => this.send_enter_text(event))

    this.ws = new WebSocket(this.serveur_url)
    console.log(this.ws)

    // géré par le serveur, pas besoin ici
    // this.ws.onopen = () => this.send_text(this.pseudo + " vient d'arriver dans la cuisine !");
    this.ws.onmessage = (e) => {
      console.log('onmessage', { e })
      const message = JSON.parse(e.data)
      this.add_text_to_tchat(message.system ? message.content : `${message.from} : ${message.content}`)
    }
    // this.ws.onclose = () => this.send_text(this.pseudo + " vous a abandonné...");
    this.ws.onerror = () => this.add_text_to_tchat(this.pseudo + ' : Une erreur s\'est produite')

  }

  // récupère le texte entré et l'envoie au tchat
  send_enter_text (event) {
    console.log({ event })
    if (event.target.name === 'sendToTchatButton') {
      let inputText = this.tchatInput.getChildByName('textField')
      if (inputText.value !== '') {
        let text = inputText.value
        inputText.value = ''
        // Envoie du text
        this.send_text(text)
        // Ajout au tchat du joueur courant
        // DEBUG
        // this.add_text_to_tchat(`${this.pseudo} : ${text}`);
      }
    }
  }

  // Envoie le texte passé en paramètre au tchat via la websocket au serveur
  send_text (content, to = null) {
    console.log({ content, to })
    if (content !== '') {
      this.ws.send(JSON.stringify({ content, to }))
    }
  }

  // Ajoute le texte sur le tchat
  add_text_to_tchat (text) {
    let textout = document.getElementById('tchat_output')
    let newText = textout.innerText + text + '\n'
    textout.innerText = newText
  }

}
