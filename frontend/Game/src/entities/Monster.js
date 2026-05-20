import Entity from '../entities/Entity.js'

export default class Monster extends Entity {

  constructor (scene, name, vie = 0, defense = 0, attaque = 0, init_x, init_y, vitesse = 0, image, produit) {

    super(scene, name, vie, defense, attaque, init_x, init_y)

    this.image = image
    this.produit = produit
    this.vitesse = vitesse
    this.timer = null
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

  getTimer () {
    return this.timer
  }

  setTimer (timer) {
    this.timer = timer
  }

  getX () {
    return this.image.x
  }

  getY () {
    return this.image.y
  }

  die () {
    super.die()
    this.image.destroy()
    if (this.timer != null) {
      this.timer.destroy()
    }
  }
}
