    const zoom = 3;
    const nb_row_display = 2; //Nombre de ligne affiché par page 
    const nb_col_display = 4; //Nombre de col affiché par page

export class Boutique extends Phaser.Scene {

    //ingredients liste des noms de sprites des ingredients boutique
    constructor () {
        super('Boutique');

        this.curPage = 0;
        this.dansIngredient = true;

    }

    init(data) {
        this.ingredients = data.ingredients;
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

        /*
        //Bouton Recette
        this.recetteButton = this.add.sprite(20 + (24*zoom)/2*3, 10 + (24*zoom)/2, 'bt_recette').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.switch_recette());

        //Bouton Bestaire
        this.bestiaireButton = this.add.sprite(30 + (24*zoom)/2*5, 10 + (24*zoom)/2, 'bt_bestiaire').setScale(zoom, zoom)
            .setInteractive()
            .on('pointerdown', () => this.switch_bestaire());
        */

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

        //Creation des sprites
        this.ingredients_button = []
        let row = 0;
        let col = 0;

        let ecart = 32*(zoom**2);
        for (let ing = 0; ing < this.ingredients.length; ing++) {
            
            let ingreRectangle = this.add.rectangle((ecart*col)+190,(ecart*row)+270, 18*zoom**2, 24*zoom**2, 0xffffff)
            .setInteractive()
            .on('pointerdown', () => this.buy_ingredient(this.ingredients[ing]));
            let ingreSprite = this.add.sprite((ecart*col)+190,(ecart*row)+250, this.ingredients[ing]).setScale(zoom*zoom);
            let ingrePrice = this.add.text((ecart*col)+110,(ecart*row)+330, '00000 Or', { fontSize: '32px', fill: '#000' })
                .setFixedSize(18*zoom**2, 32).setAlign('center');

            this.ingredients_button[ing] = this.add.group([ingreSprite,ingreRectangle, ingrePrice]);

            this.ingredients_button[ing].setVisible(false);
            col ++;
            if (col >= nb_col_display) {
                row = (row + 1) % nb_row_display;
                col = 0;
            }
        }

     
        this.switch_ingredient();

       
        
    }

    buy_ingredient(ingredient) {
        //TODO
        console.log(ingredient);
    }

    nextPage(left = false) {

        if (this.dansIngredient) {
            this.switch_ingredient_visibility(false);
        } else {
        }

         //Regarder si on peut changer de page 
        if (left) {
            if (this.curPage > 0) this.curPage -= 1;
        } else {
            if (this.dansIngredient) {
                if (this.curPage+1 < this.ingredients_button.length/(nb_col_display*nb_row_display))
                    this.curPage += 1;
            } else {
                /*
                if (this.curPage+1 < this.total_monster/(nb_col_display*nb_row_display))
                    this.curPage += 1;
                */
            }
        }
        this.curPageText.setText(this.curPage+1);

        if (this.dansIngredient) {
            this.switch_ingredient_visibility(true);
        } else {
        }
        
    }

    switch_boost() {
        /*
        this.hideMonsterPage();
        this.curPage = 0;
        this.recetteButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff);
        this.bestiaireButton.clearTint();
        this.dansRecette = true;
        this.curPageText.setText("1");
        this.chargeRecipePage();
        */

    }

    switch_ingredient() {
        this.curPage = 0;
        this.dansIngredient = true;
        this.curPageText.setText("1");
        this.switch_ingredient_visibility(true);
        /*
        this.hideRecipePage();
        
        this.bestiaireButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff);
        this.recetteButton.clearTint();

        */
    }

    switch_ingredient_visibility(val) {

        let begin = this.curPage * (nb_row_display* nb_col_display)
        let end = Math.min(begin+(nb_row_display*nb_col_display), begin + this.ingredients_button.length-begin)

        for (let i = begin; i < end; i++) {
            this.ingredients_button[i].setVisible(val);
        }


    }

    close_window() {

    }


    update() {
        
    }

}