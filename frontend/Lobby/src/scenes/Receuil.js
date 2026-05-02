import RecipePresentation from '../gameObjects/RecipePresentation.js';
import Recipe from '../entities/Recipe.js';

    const zoom = 3;
    const nb_row_display = 2; //Nombre de ligne affiché par page 
    const nb_col_display = 4; //Nombre de col affiché par page

export class Receuil extends Phaser.Scene {

    constructor (recipes = [
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Vert", ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
        new Recipe("Mage Rouge", ['j2_guerrier', 'j2_archer', 'j2_pretre'], 'j2_mage', 'j4_mage')
    ], monsters = []) {
        super('Receuil');

        this.recetteButton;
        this.bestiaireButton;

        this.total_monster; //Nombre de monstre
        this.total_recipe; //Nombre de recette

        this.monstersPres;
        this.recipesPres;

        this.recipes = recipes;
        this.monsters = monsters;

        this.curPageText;

        this.curPage = 0;
        this.dansRecette = true;
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

        this.curPageText = this.add.text(0, 32, '1', { fontSize: '32px', fill: '#fff' })
        .setFixedSize(1280, 44)
        .setAlign('center');

        this.add.sprite(640 - 24*zoom, 10 + (24*zoom)/2, 'bt_leftArrow').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.nextPage(true));

        this.add.sprite(640 + 24*zoom, 10 + (24*zoom)/2, 'bt_rightArrow').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.nextPage());

        //Set les recettes
        this.total_monster = this.monsters.length;
        //Set les monstres
        this.total_recipe = this.recipes.length;

        this.recipesPres = [];
        for (var y = 0; y < nb_row_display; y ++) {
            for (var x = 0; x < nb_col_display; x++) {
                this.recipesPres[x+(y*nb_col_display)] = new RecipePresentation(
                    this,
                    (315)*x+(5*(x+1))+5,
                    (y*314) + 102
                )
            }
        }

        this.switch_recette();
    }

    close_window() {

    }

    switch_recette() {
        this.hideMonsterPage();
        this.curPage = 0;
        this.recetteButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff);
        this.bestiaireButton.clearTint();
        this.dansRecette = true;
        this.curPageText.setText("1");
        this.chargeRecipePage();

    }

    switch_bestaire() {
        this.hideRecipePage();
        this.curPage = 0;
        this.bestiaireButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff);
        this.recetteButton.clearTint();
        this.dansRecette = false;
        this.curPageText.setText("1");
        this.chargeMonsterPage();
    }

    nextPage(left = false) {

        //Regarder si on peut changer de page 
        if (left) {
            if (this.curPage > 0) this.curPage -= 1;
        } else {
            if (this.dansRecette) {
                if (this.curPage+1 < this.total_recipe/(nb_col_display*nb_row_display))
                    this.curPage += 1;
            } else {
                if (this.curPage+1 < this.total_monster/(nb_col_display*nb_row_display))
                    this.curPage += 1;
            }
        }
        this.curPageText.setText(this.curPage+1);

        //Charge la prochaine page de monstre / recette
        if (this.dansRecette) {
            this.chargeRecipePage();
        } else {
            this.chargeMonsterPage();
        }

    }

    //Charge la page courante de monstre
    chargeMonsterPage() {
        this.hideMonsterPage();
    }

    //Charge la page courante de recette
    chargeRecipePage() {
    
        this.hideRecipePage();
        var size = nb_col_display*nb_row_display;
        var lim = Math.min(this.curPage*size+size, this.total_recipe);
        for (var i = this.curPage*size; i < lim ;i++) {
            this.recipesPres[i-(size*this.curPage)].change_recipe(this.recipes[i]);

        }

    }


    hideMonsterPage() {
        //TODO
    }

    hideRecipePage() {
        for (var i = 0; i < nb_col_display*nb_row_display; i++) {
            this.recipesPres[i].switch_visibility(false);
        }
    }

    update() {
        
    }

}