export class Parametre extends Phaser.Scene {


    constructor() {
        super('Parametre');
        this.selected = -1;

    }

    init(data) {

    }


    create() {

        this.touchesTitres = ["haut", "bas", "gauche", "droite", "attaquer", "interagir", "prendre / poser", "boutique", "recueil", "chat"]

        this.keyHandler = [];

        for (let i = 0; i < this.touchesTitres.length; i++) {
            this.add.rectangle(610,(i*52)+100,310,42,0x6b4b34);
            this.add.text(460, (i*52)+84, this.touchesTitres[i], { fontSize: '32px', fill: '#ffffff' })
            .setFixedSize(300, 32)
            .setAlign('left');

            this.add.rectangle(800,(i*52)+100,42,42,0x6b4b34)
            .setInteractive()
            .on('pointerdown', () => this.select(i));
        }

        

    }

    //Permet de selectionner le controle a changer
    select(indice) {
        console.log(indice);
        this.selected = indice;
    }

    //change la touche associé a l'indice selectionné courant
    change_key(new_key) {

    }

}


