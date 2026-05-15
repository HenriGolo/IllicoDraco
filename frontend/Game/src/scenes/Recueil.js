import RecipePresentation from '../gameObjects/RecipePresentation.js'
import MonsterPresentation from '../gameObjects/MonsterPresentation.js'
import Recipe from '../entities/Recipe.js'
import Monster from '../entities/Monster.js'

const zoom = 3
const nb_row_display = 2 //Nombre de ligne affiché par page
const nb_col_display = 4 //Nombre de col affiché par page

export class Recueil extends Phaser.Scene {

  constructor () {
    super('Recueil')

    this.recetteButton
    this.bestiaireButton

    this.total_monster //Nombre de monstre
    this.total_recipe //Nombre de recette

    this.monstersPres
    this.recipesPres

    this.curPageText

    this.curPage = 0
  }

  init (data =
  {
    recipes: [
      new Recipe('Mage Vert', ['j3_guerrier', 'j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
      new Recipe('Mage Vert', ['j3_archer', 'j3_pretre'], 'j3_mage', 'j1_mage'),
      new Recipe('Mage Rouge', ['j2_guerrier', 'j2_archer', 'j2_pretre'], 'j2_mage', 'j4_mage')
    ], monsters: [
      new Monster('Mage Vert', 'j3_mage', 'j3_mage'),
      new Monster('Mage Rouge', 'j2_mage', 'j3_mage'),
      new Monster('Mage Bleu', 'j1_mage', 'j3_mage'),
      new Monster('Mage Jaune', 'j4_mage', 'j3_mage'),
      new Monster('Guerrier Vert', 'j3_guerrier', 'j3_mage'),
      new Monster('Guerrier Rouge', 'j2_guerrier', 'j3_mage'),
      new Monster('Guerrier Bleu', 'j1_guerrier', 'j3_mage'),
      new Monster('Guerrier Jaune', 'j4_guerrier', 'j3_mage'),
      new Monster('Archer Vert', 'j3_archer', 'j3_mage'),
      new Monster('Archer Rouge', 'j2_archer', 'j3_mage'),
      new Monster('Archer Bleu', 'j1_archer', 'j3_mage'),
      new Monster('Archer Jaune', 'j4_archer', 'j3_mage'),
      new Monster('Pretre Vert', 'j3_pretre', 'j3_mage'),
      new Monster('Pretre Rouge', 'j2_pretre', 'j3_mage'),
      new Monster('Pretre Bleu', 'j1_pretre', 'j3_mage'),
      new Monster('Pretre Jaune', 'j4_pretre', 'j3_mage')
    ],
    dansRecette: true,
    previousScene: null
  }) {
    this.recipes = data.recipes
    this.monsters = data.monsters
    this.dansRecette = data.dansRecette
    this.previousScene = previousScene

    this.scene.pause(this.previousScene)
  }

  preload () {

  }

  create () {

    //Background pour l'organisation générale :
    var graphics = this.add.graphics()

    graphics.fillStyle(0x555555, 1)
    graphics.fillRect(0, 20 + 24 * 3, 1280, 720 - 24 * 3)

    //Bouton Retour
    this.add.sprite(10 + (24 * zoom) / 2, 10 + (24 * zoom) / 2, 'bt_retour').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.close_window())

    //Bouton Recette
    this.recetteButton = this.add.sprite(20 + (24 * zoom) / 2 * 3, 10 + (24 * zoom) / 2, 'bt_recette').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.switch_recette())

    //Bouton Bestaire
    this.bestiaireButton = this.add.sprite(30 + (24 * zoom) / 2 * 5, 10 + (24 * zoom) / 2, 'bt_bestiaire').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.switch_bestiaire())

    //Défilement entre les pages
    this.add.sprite(640, 10 + (24 * zoom) / 2, 'pageNum').setScale(zoom, zoom)

    this.curPageText = this.add.text(0, 32, '1', { fontSize: '32px', fill: '#fff' })
      .setFixedSize(1280, 44)
      .setAlign('center')

    this.add.sprite(640 - 24 * zoom, 10 + (24 * zoom) / 2, 'bt_leftArrow').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.nextPage(true))

    this.add.sprite(640 + 24 * zoom, 10 + (24 * zoom) / 2, 'bt_rightArrow').setScale(zoom, zoom)
      .setInteractive()
      .on('pointerdown', () => this.nextPage())

    //Set les monstres
    this.total_monster = this.monsters.length

    this.monstersPres = []
    for (var y = 0; y < nb_row_display; y++) {
      for (var x = 0; x < nb_col_display; x++) {
        this.monstersPres[x + (y * nb_col_display)] = new MonsterPresentation(
          this,
          (315) * x + (5 * (x + 1)) + 5,
          (y * 314) + 102
        )
      }
    }
    //Set les recettes
    this.total_recipe = this.recipes.length

    this.recipesPres = []
    for (var y = 0; y < nb_row_display; y++) {
      for (var x = 0; x < nb_col_display; x++) {
        this.recipesPres[x + (y * nb_col_display)] = new RecipePresentation(
          this,
          (315) * x + (5 * (x + 1)) + 5,
          (y * 314) + 102
        )
      }
    }

    if (this.dansRecette) {
      this.switch_recette()
    } else {
      this.switch_bestiaire()
    }
  }

  close_window () {

    this.scene.resume(this.previousScene)
    this.scene.stop(this)
  }

  switch_recette () {
    this.hideMonsterPage()
    this.curPage = 0
    this.recetteButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff)
    this.bestiaireButton.clearTint()
    this.dansRecette = true
    this.curPageText.setText('1')
    this.chargeRecipePage()

  }

  switch_bestiaire () {
    this.hideRecipePage()
    this.curPage = 0
    this.bestiaireButton.setTint(0xffffff, 0xffffff, 0xff0000, 0xffffff)
    this.recetteButton.clearTint()
    this.dansRecette = false
    this.curPageText.setText('1')
    this.chargeMonsterPage()
  }

  nextPage (left = false) {

    //Regarder si on peut changer de page
    if (left) {
      if (this.curPage > 0) this.curPage -= 1
    } else {
      if (this.dansRecette) {
        if (this.curPage + 1 < this.total_recipe / (nb_col_display * nb_row_display))
          this.curPage += 1
      } else {
        if (this.curPage + 1 < this.total_monster / (nb_col_display * nb_row_display))
          this.curPage += 1
      }
    }
    this.curPageText.setText(this.curPage + 1)

    //Charge la prochaine page de monstre / recette
    if (this.dansRecette) {
      this.chargeRecipePage()
    } else {
      this.chargeMonsterPage()
    }

  }

  //Charge la page courante de monstre
  chargeMonsterPage () {
    this.hideMonsterPage()
    var size = nb_col_display * nb_row_display
    var lim = Math.min(this.curPage * size + size, this.total_monster)
    for (var i = this.curPage * size; i < lim; i++) {
      this.monstersPres[i - (size * this.curPage)].change_monster(this.monsters[i])

    }
  }

  //Charge la page courante de recette
  chargeRecipePage () {

    this.hideRecipePage()
    var size = nb_col_display * nb_row_display
    var lim = Math.min(this.curPage * size + size, this.total_recipe)
    for (var i = this.curPage * size; i < lim; i++) {
      this.recipesPres[i - (size * this.curPage)].change_recipe(this.recipes[i])

    }

  }

  hideMonsterPage () {
    for (var i = 0; i < nb_col_display * nb_row_display; i++) {
      this.monstersPres[i].switch_visibility(false)
    }
  }

  hideRecipePage () {
    for (var i = 0; i < nb_col_display * nb_row_display; i++) {
      this.recipesPres[i].switch_visibility(false)
    }
  }

  update () {

  }

}
