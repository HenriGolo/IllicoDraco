export default class Tchat {

    constructor(scene, pseudo, x, y) {
   

        this.pseudo = pseudo;
        //Affichage du tchat //1120 332
        this.tchatOutput = scene.add.dom(x + 160, y + 204).createFromCache('tchatTextOutput');
        //Entrée texte //1120 560
        this.tchatInput = scene.add.dom(x + 160, y + 432).createFromCache('tchatTextInput');

        this.tchatInput.addListener('click');
        this.tchatInput.on('click', (event) => this.send_text_to_tchat(event));
        
    }

    send_text_to_tchat(event) {

        //TODO Envoyer le texte au serveur
        if (event.target.name === 'sendToTchatButton')
            {
                let inputText = this.tchatInput.getChildByName('textField');
                if (inputText.value !== '')
                {
                    let text = document.getElementById("tchat_output").innerText;
                    text = text + this.pseudo + " : " + inputText.value +  "\n";
                    inputText.value = "";
                    //TODO Envoie du text

                    //Ajout au tchat du joueur courant
                    //DEBUG
                    this.add_text_to_tchat(text)
                }
            }
    }

    add_text_to_tchat(text) {
     
        //  Have they entered anything?
        document.getElementById("tchat_output").innerText = text;
                
            
    }

}