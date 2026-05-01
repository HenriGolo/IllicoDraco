import Tchat from '../gameObjects/Tchat.js';

const zoom = 3;

export class Game extends Phaser.Scene {


    constructor(joueur_courant = 4, pseudo = "Pseudo", serveur_url = "ws://localhost:8080/IllicoDraco/chat/") {
        super('Game');

        this.serveur_url = serveur_url;
        this.joueur_courant = joueur_courant;
        this.pseudo = pseudo;

        this.tchat;
        this.infosText; //Affichage des informations

    }

    preload() {
    }

    create() {

        var graphics = this.add.graphics();

        //Barre d'informations
        graphics.lineStyle(4, 0xc1c1c1, 1.0);
        graphics.fillStyle(0x6b4b34, 1);
        graphics.fillRect(0, 0, 1280, 50);
        graphics.strokeRect(2, 2, 1276, 48);    

        this.infosText = this.add.text(0, 16, 'Temps : XX | Argent : XX', { fontSize: '24px', fill: '#ffffff' })
        .setFixedSize(1280, 32)
        .setAlign('center');

        //Bouton Boutique / Receuil
        this.add.sprite(10 + (24*zoom)/2, 60 + (24*zoom)/2, 'bt_boutique').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.open_boutique());

        this.add.sprite(10 + (24*zoom)/2, 70 + (24*zoom)/2*3, 'bt_receuil').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.open_receuil());

        //Bouton Parametre
        this.add.sprite(1270 - (24*zoom)/2, 60 + (24*zoom)/2, 'bt_parametre').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.open_parameter());

        //Ajout du tchat
        this.tchat = new Tchat(this, this.pseudo, 960, 158, this.serveur_url);
        this.tchat.switch_visibility();

        //Initialiser les touches du jeu
        this.input.keyboard.on('keyup', (event) => this.handle_key(event))
        
    }

    open_boutique() {
        this.tchat.add_text_to_tchat("boutique");
        //TODO
    }

    open_receuil() {
        this.tchat.add_text_to_tchat("receuil");
        //TODO
    }

    open_parameter() {
        this.tchat.add_text_to_tchat("parameter");
        //TODO
    }

    handle_key(event) {
       
       switch (event.key) {
        case 't' : {
            this.tchat.switch_visibility();
            break;
        }
       };

    }

    update() {
       
    }
    
}
