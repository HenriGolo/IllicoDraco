import Entity from '../entities/Entity.js'

export default class Monster extends Entity {

  constructor (scene, name, vie = 0, defense = 0, attaque = 0, init_x, init_y, vitesse = 0, image, produit) {

    super(scene, name, vie, defense, attaque, init_x, init_y)

    this.image = image
    this.produit = produit
    this.vitesse = vitesse

  }

  getImage () {
    return this.image
  }

  getProduit () {
    return this.produit
  }

  getVitesse () {
    return this.vitesse
  }

}
