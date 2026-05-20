export default class IngredientsContainer {

  constructor (scene, player) {

    this.ingredients = []
    this.parent_scene = scene
    this.player = player
  }

  add_ingredient (x, y, key) {
    let ing = this.parent_scene.physics.add.sprite(x, y, key)
    //this.parent_scene.physics.add.overlap(this.player.getPlayer(),  ing ,() => this.overlap_with_player(ing));
    this.ingredients.push(ing)
  }

  //Renvoie null si le joueur ne touche rien sinon renvoie la clé de la texture de l'objet
  //Retire l'objet renvoyé de ingrédient
  get_overlap_object () {

    for (let i = 0; i < this.ingredients.length; i++) {

      if (this.parent_scene.physics.world.overlap(this.player.getSprite(), this.ingredients[i])) {
        let key = this.ingredients[i].texture.key

        this.ingredients[i].destroy()
        this.ingredients.splice(i, 1) //retire l'élément concerné

        return { key, indice: i }
      }
    }

    return { key: null, indice: -1 }
  }

  remove_object (indice) {
    if (indice != -1) {
      this.ingredients[indice].destroy()
      this.ingredients.splice(indice, 1) //retire l'élément concerné
    }
  }
}
