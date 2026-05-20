export default class Recipe {

  constructor (recipe_name, ingredients, result, tool) {

    this.recipe_name = recipe_name
    this.ingredients = ingredients
    this.result = result
    this.tool = tool
  }

  getRecipeName () {
    return this.recipe_name
  }

  getIngredients () {
    return this.ingredients
  }

  getResult () {
    return this.result
  }

  getTool () {
    return this.tool
  }

  getNbIngredients () {
    return this.ingredients.length
  }
}
