import Tchat from '../gameObjects/Tchat.js';

export class Lobby extends Phaser.Scene {


    constructor(joueur_courant = 1,code = 1234, pseudo = "Pseudo") {
        super('Lobby');

        this.joueur_courant = joueur_courant;
        this.pseudo = pseudo;
        this.code = code;

        this.joueurs;
        this.tchat;
        
    }

    preload() {
        this.load.image('j1_pretre', 'assets/blue_pretre_idle.png');
        this.load.image('j1_guerrier', 'assets/blue_guerrier_idle.png');
        this.load.image('j1_mage', 'assets/blue_mage_idle.png');
        this.load.image('j1_archer', 'assets/blue_archer_idle.png');

        this.load.image('j2_pretre', 'assets/red_pretre_idle.png');
        this.load.image('j2_guerrier', 'assets/red_guerrier_idle.png');
        this.load.image('j2_mage', 'assets/red_mage_idle.png');
        this.load.image('j2_archer', 'assets/red_archer_idle.png');

        this.load.image('j3_pretre', 'assets/green_pretre_idle.png');
        this.load.image('j3_guerrier', 'assets/green_guerrier_idle.png');
        this.load.image('j3_mage', 'assets/green_mage_idle.png');
        this.load.image('j3_archer', 'assets/green_archer_idle.png');

        this.load.image('j4_pretre', 'assets/yellow_pretre_idle.png');
        this.load.image('j4_guerrier', 'assets/yellow_guerrier_idle.png');
        this.load.image('j4_mage', 'assets/yellow_mage_idle.png');
        this.load.image('j4_archer', 'assets/yellow_archer_idle.png');

        this.load.image('bt_quitter', 'assets/button/ButtonTemplate.png');
        this.load.image('bt_parametre', 'assets/yellow_pretre_idle.png');
        this.load.image('bt_lancer_partie', 'assets/button/BiggerButtonTemplate.png');


        //Pour le tchat
        this.load.html('tchatTextInput', 'assets/htmlComponents/tchatTextInput.html');
        this.load.html('tchatTextOutput', 'assets/htmlComponents/tchatTextOutput.html');
        
    }

    create() {
        const zoom = 10;
        const joueur_classe = ['guerrier', 'mage', 'pretre', 'archer']

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
        */

        graphics.fillStyle(0xaaaaaa, 1);
        graphics.fillRect(1184, 32, 64, 64);

    
        /////////////////////////////////////

        //Affichage du titre et code
        this.add.text(0, 16, 'En attente de joueur ...', { fontSize: '32px', fill: '#000' }).setFixedSize(960, 32).setAlign('center');
        this.add.text(0, 58, 'code : ' + this.code, { fontSize: '24px', fill: '#000' }).setFixedSize(960, 24).setAlign('center');

        this.joueurs = [];
        for (var i = 0; i < 4; i++) {

            let x = 120 + 240*i;
            this.joueurs.push(this.add.sprite(x, 360, ("j" + (i+1) + "_" + joueur_classe[0])).setScale(zoom, zoom));
            this.joueurs[i].setState(0);
            this.joueurs[i].setName("j" + (i+1));

            
            if (i == (this.joueur_courant - 1)) {

                this.joueurs[i].setInteractive();
                this.joueurs[i].on('pointerdown', function (pointer)
                {
                    this.setState((this.state + 1)%4);
                    this.setTexture(this.name + "_" + joueur_classe[this.state]);

                });
            }
            
        }

        //Créer le bouton seulement si c'est le joueur 1 (lancer partie)
        if (this.joueur_courant == 1) {
            this.add.sprite(480, 656, 'bt_lancer_partie').setScale(3, 3)
                .setInteractive()
                .on('pointerdown', function (pointer)
                {
                    //TODO
                }
                );
        }

        //Créer les boutons paramètres et quitté
        this.add.sprite(1120, 656, 'bt_quitter').setScale(3, 3)
            .setInteractive()
            .on('pointerdown', function (pointer) {
                //TODO
            }
            );

        //Ajout du tchat /////////////////////////////////////////
        this.tchat = new Tchat(this, this.pseudo, 960, 128);
        /////////////////////////////////////////////////////////
 
    }

    update() {
       
    }
    
}
