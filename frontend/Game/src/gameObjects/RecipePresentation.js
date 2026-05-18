import Recipe from '../entities/Recipe.js';

//Classe pour afficher une recette dans le livre des recettes
const zoom = 3
const width = 300
const height = 294

export default class RecipePresentation {

  constructor (scene, x = 0, y = 92) {
    this.scene = scene
    this.x = x
    this.y = y

    this.graphics = scene.add.graphics()
    this.graphics.lineStyle(4, 0xc1c1c1, 1.0)
    this.graphics.fillStyle(0x6b4b34, 1)

    this.graphics.fillRect(x, y, width, height)
    this.graphics.strokeRect(x, y, width, height)

    this.graphics.lineBetween(x, y + 110, x + width, y + 110)

    this.graphics.lineBetween(x, y + 178, x + width, y + 178)

    this.recipe_name = scene.add.text(x, y + 10, '', { fontSize: '32px', fill: '#FFF' })
      .setFixedSize(width, height)
      .setAlign('center')

    this.ingredients = []
    this.result = null
    this.tool = null

    this.graphics.setVisible(false)

  }


  change_recipe(recipe) {

    if (this.result != null) {
      this.result.destroy()
      this.tool.destroy()

      for (let i = 0; i < this.ingredients.length; i++) {
        this.ingredients[i].destroy()
      }
    }

    this.recipe_name.setText(recipe.getRecipeName())
    this.ingredients = []
    for (let i = 0; i < recipe.getNbIngredients(); i++) {
      this.ingredients[i] = this.scene.add.sprite(
        this.x + (((i + 1) * width) / (recipe.getNbIngredients())) - (width / (2 * recipe.getNbIngredients())),
        this.y + 144, recipe.getIngredients()[i])
        .setScale(zoom, zoom)
    }

    this.result = this.scene.add.sprite(this.x + (width / 2), this.y + 74, recipe.getResult())
      .setScale(zoom, zoom)

    this.tool = this.scene.add.sprite(this.x + (width / 2), this.y + 236, recipe.getTool()).setScale(zoom, zoom)

    this.switch_visibility(true)
  }

  switch_visibility (b) {
    this.graphics.setVisible(b)
    this.recipe_name.setVisible(b)

    if (this.result != null) {
      this.result.setVisible(b)
      this.tool.setVisible(b)
    }

    for (var i = 0; i < this.ingredients.length; i++) {
      this.ingredients[i].setVisible(b)
    }
  }

}
