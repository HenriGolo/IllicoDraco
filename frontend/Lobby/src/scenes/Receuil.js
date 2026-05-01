    const zoom = 3;

export class Receuil extends Phaser.Scene {

    constructor () {
        super('Receuil');

        this.recetteButton;
        this.bestiaireButton;
    }

    preload() {

    }

    create() {

        //Background pour l'organisation générale :
        var graphics = this.add.graphics();
        
        //Bandeau Tchat
        graphics.fillStyle(0x555555, 1);
        graphics.fillRect(0, 20 + 24*3, 1280, 720 - 24*3);

        //Bouton Retour
        this.add.sprite(10 + (24*zoom)/2, 10 + (24*zoom)/2, 'bt_retour').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.close_window());

        //Bouton Recette
        this.recetteButton = this.add.sprite(20 + (24*zoom)/2*3, 10 + (24*zoom)/2, 'bt_recette').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.switch_recette());

        //Bouton Bestaire
        this.bestiaireButton = this.add.sprite(30 + (24*zoom)/2*5, 10 + (24*zoom)/2, 'bt_bestiaire').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.switch_bestaire());

        //Défilement entre les pages
        this.add.sprite(640, 10 + (24*zoom)/2, 'pageNum').setScale(zoom, zoom);

        this.add.sprite(640 - 24*zoom, 10 + (24*zoom)/2, 'bt_leftArrow').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.nextPage(true));

        this.add.sprite(640 + 24*zoom, 10 + (24*zoom)/2, 'bt_rightArrow').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.nextPage());

            

        this.switch_recette();
    }

    close_window() {

    }

    switch_recette() {
        this.recetteButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff);
        this.bestiaireButton.clearTint();

    }

    switch_bestaire() {
        this.bestiaireButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff);
        this.recetteButton.clearTint();
    }

    nextPage(left = false) {

    }

    update() {
        
    }

}