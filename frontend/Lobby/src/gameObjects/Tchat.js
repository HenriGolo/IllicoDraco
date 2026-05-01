export default class Tchat {

  constructor(scene, pseudo, x, y, serveur_url) {

    this.serveur_url = serveur_url;
    this.pseudo = pseudo;
    // Affichage du tchat // 1120 332
    this.tchatOutput = scene.add.dom(x + 160, y + 204).createFromCache("tchatTextOutput");
    // Entrée texte // 1120 560
    this.tchatInput = scene.add.dom(x + 160, y + 432).createFromCache("tchatTextInput");

    this.tchatInput.addListener("click");
    this.tchatInput.on("click", (event) => this.send_enter_text(event));

    //Compteur de nouveau message
    this.compteurText = scene.add.text(x + 246 , y-10, "", { fontSize: '32px', fill: '#ff0000' }).setFixedSize(128, 32);
    this.compteur = 0;

    //Historique de la conversation
    this.historique = "";

    //this.ws = new WebSocket(serveur_url);
    this.ws = new WebSocket(`ws://localhost:8080/IllicoDraco/chat/${pseudo}`);
    console.log(this.ws);

    // géré par le serveur, pas besoin ici
    // this.ws.onopen = () => this.send_text(this.pseudo + " vient d'arriver dans la cuisine !");
    this.ws.onmessage = (e) => {
      console.log('onmessage', { e });
      const message = JSON.parse(e.data);
      this.add_text_to_tchat(`${message.from} : ${message.content}`);
    };
    // this.ws.onclose = () => this.send_text(this.pseudo + " vous a abandonné...");
    this.ws.onerror = () => this.add_text_to_tchat(this.pseudo + " : Une erreur s'est produite");

  }

  // récupère le texte entré et l'envoie au tchat
  send_enter_text(event) {
    console.log({ event });
    // TODO Envoyer le texte au serveur
    if (event.target.name === "sendToTchatButton") {
      let inputText = this.tchatInput.getChildByName("textField");
      if (inputText.value !== "") {
        let text = inputText.value;
        inputText.value = "";
        // Envoie du text
        this.send_text(text);
        // Ajout au tchat du joueur courant
        // DEBUG
        // this.add_text_to_tchat(`${this.pseudo} : ${text}`);
      }
    }
  }

  // Envoie le texte passé en paramètre au tchat via la websocket au serveur
  send_text(content, to = null) {
    console.log({ content, to });
    if (content !== "") {
      this.ws.send(JSON.stringify({ content, from: this.pseudo, to }));
    }
  }

  // Ajoute le texte sur le tchat
  add_text_to_tchat(text) {
    let textout = document.getElementById("tchat_output");
    this.historique += text + "\n";
    textout.innerText = this.historique;


    //Affiche des messages en attente si tchat invisible
    if (!this.tchatInput.visible) {
      this.compteur += 1;
      if (this.compteur > 99) {
        this.compteurText.setText("+99");
      } else {
        this.compteurText.setText(this.compteur);
      }
    }
  }

  switch_visibility () {
    this.tchatInput.setVisible(!this.tchatInput.visible);
    this.tchatOutput.setVisible(!this.tchatOutput.visible);

    //Efface le compteur
    if (this.tchatOutput.visible) {
      this.compteur = 0;
      this.compteurText.setText("");
    }
  }

}
