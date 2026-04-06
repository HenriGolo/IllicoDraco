export class Lobby extends Phaser.Scene {


    constructor(joueur_courant = 1, code = 666) {
        super('Lobby');

        this.joueur_courant = joueur_courant;
        this.code = code;

        this.joueurs;
        
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

        
    }

    create() {
        const zoom = 10;
        const joueur_classe = ['guerrier', 'mage', 'pretre', 'archer']

        //Background pour l'organisation générale :
        var graphics = this.add.graphics();
        graphics.fillStyle(0x555555, 1);
        graphics.fillRect(960, 0, 320, 720);

        /*
        graphics.fillStyle(0xccccff, 1);
        graphics.fillRect(0, 0, 240, 720);
        graphics.fillStyle(0xffcccc, 1);
        graphics.fillRect(240, 0, 240, 720);
        graphics.fillStyle(0xccffcc, 1);
        graphics.fillRect(480, 0, 240, 720);
        graphics.fillStyle(0xffffcc, 1);
        graphics.fillRect(720, 0, 240, 720);
        */
        /////////////////////////////////////

        //Affichage du titre et code
        this.add.text(0, 16, 'En attente de joueur ...', { fontSize: '32px', fill: '#000' }).setFixedSize(1280, 32).setAlign('center');
        this.add.text(0, 58, 'code : ' + this.code, { fontSize: '24px', fill: '#000' }).setFixedSize(1280, 24).setAlign('center');

        this.joueurs = [];
        for (var i = 0; i < 4; i++) {

            let x = 120 + 240*i;
            this.joueurs.push(this.add.sprite(x, 300, ("j" + (i+1) + "_" + joueur_classe[3])).setScale(zoom, zoom));
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
      
    }

    update() {
       
    }
    
}
