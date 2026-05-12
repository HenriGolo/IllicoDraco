import Tchat from '../gameObjects/Tchat.js';

const zoom = 10;
const joueur_classe = ['guerrier', 'mage', 'pretre', 'archer']

export class Lobby extends Phaser.Scene {


    constructor(joueur_courant = 4,code = 1234, pseudo = "Pseudo", serveur_url = "ws://localhost:8080/IllicoDraco/chat/") {
        super('Lobby');

        this.serveur_url = serveur_url;

        this.joueur_courant = joueur_courant;
        this.pseudo = pseudo;
        this.code = code;

        this.joueurs;
        this.tchat;
        
    }

    preload() {
    }

    create() {
        

        //Background pour l'organisation générale :
        var graphics = this.add.graphics();
        
        //Bandeau Tchat
        graphics.fillStyle(0x555555, 1);
        graphics.fillRect(960, 128, 320, 464);
 /*
        //Bandeau bas
        graphics.fillStyle(0x550055, 1);
        graphics.fillRect(0,592,1280, 128);

        //Bandeau haut
        graphics.fillStyle(0x00eeff, 1);
        graphics.fillRect(0,0,1280, 128);
       
        graphics.fillStyle(0xccccff, 1);
        graphics.fillRect(0, 0, 240, 720);
        graphics.fillStyle(0xffcccc, 1);
        graphics.fillRect(240, 0, 240, 720);
        graphics.fillStyle(0xccffcc, 1);
        graphics.fillRect(480, 0, 240, 720);
        graphics.fillStyle(0xffffcc, 1);
        graphics.fillRect(720, 0, 240, 720);
      

        graphics.fillStyle(0x000aaa, 1);
        graphics.fillRect(1184, 32, 64, 64);
          */
    
        /////////////////////////////////////

        //Affichage du titre et code
        this.add.text(0, 16, 'En attente de joueur ...', { fontSize: '32px', fill: '#000' }).setFixedSize(960, 32).setAlign('center');
        this.add.text(0, 58, 'code : ' + this.code, { fontSize: '24px', fill: '#000' }).setFixedSize(960, 24).setAlign('center');

        //Afficher les joueurs déjà connecté
        this.joueurs = [];
        for (var i = 0; i < this.joueur_courant; i++) {
            this.connect_player(i)
        }
 
        //Permettre au joueur de changer son perso
        this.joueurs[this.joueur_courant-1].setInteractive();
        this.joueurs[this.joueur_courant-1].on('pointerdown', function (pointer)
        {
            this.setState((this.state + 1)%4);
            this.setTexture(this.name + "_" + joueur_classe[this.state]);

        });
        
            
        //Créer le bouton seulement si c'est le joueur 1 (lancer partie)
        if (this.joueur_courant == 1) {
            this.add.sprite(480, 656, 'bt_lancer_partie').setScale(3, 3)
                .setInteractive()
                .on('pointerdown', () => this.start_game());
        }

        //Créer les boutons paramètres et quitter
        this.add.sprite(1120, 656, 'bt_quitter').setScale(3, 3)
            .setInteractive()
            .on('pointerdown', () => this.quit());

        this.add.sprite(1216, 64, 'bt_parametre').setScale(3, 3)
            .setInteractive()
            .on('pointerdown', () => this.parameter());

        //Ajout du tchat
        this.tchat = new Tchat(this, this.pseudo, 960, 128, this.serveur_url);
        
    }


    //Permet d'afficher le joueur numéro num (num entre 1 et 4)
    connect_player(num) {
        let x = 120 + 240*num;
        this.joueurs.push(this.add.sprite(x, 360, ("j" + (num+1) + "_" + joueur_classe[0])).setScale(zoom, zoom));
        this.joueurs[num].setState(0);
        this.joueurs[num].setName("j" + (num+1));
    }


    //Changer l'avatar d'un joueur pour le prochain
    switch_class(num) {
        let o = this.joueurs[num];
        o.setState((o.state + 1)%4);
        o.setTexture(o.name + "_" + joueur_classe[o.state]);
    }

    //Quitter le jeu
    quit () {
        //TODO QUITTER
        console.log(this.pseudo + " : Je pars");
    }

    //Lancer le jeu
    start_game () {
        //TODO START
        console.log (this.pseudo + " : Cuisinons !")
    }

    //Parametre
    parameter () {
        //TODO START
        console.log (this.pseudo + " : Parametre !")
    }

    update() {
       
    }
    
}
