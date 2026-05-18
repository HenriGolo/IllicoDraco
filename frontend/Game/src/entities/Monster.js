import Entity from '../entities/Entity.js'

export default class Monster extends Entity {

  constructor (scene, name, vie = 0, defense = 0, attaque = 0, init_x, init_y, vitesse = 0, image, produit) {

    super(scene, name, vie, defense, attaque, init_x, init_y)

    this.name = name
    this.image = image
    this.produit = produit
    this.vie = vie
    this.attaque = attaque
    this.defense = defense
    this.vitesse = vitesse

  }

  getName () {
    return this.name
  }

  getImage () {
    return this.image
  }

  getProduit () {
    return this.produit
  }

  getVie () {
    return this.vie
  }

  getAttaque () {
    return this.attaque
  }

  getDefense () {
    return this.defense
  }

  getVitesse () {
    return this.vitesse
  }

}
