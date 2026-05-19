import Entity from '../entities/Entity.js'

export default class Player extends Entity {

  constructor (scene, x, y, num, classe, pv, def, atq, controles = {}) {
    super(scene, 'j' + num + '_' + classe, pv, def, atq, x, y)

    this.parent_scene = scene //Scene du jeu
    //this.name = 'j' + num + '_' + classe //Nom du sprite : jx_classe

    //Créer le sprite du joueur
    this.sprite = this.parent_scene.physics.add.sprite(x, y, this.name)
    this.sprite.body.setSize(16, 16, false)
    this.sprite.setCollideWorldBounds()

    this.carried_object = this.parent_scene.add.sprite(x, y - this.sprite.height, '')
    this.carried_object.setVisible(false)

    // Touche
    this.cursors = this.parent_scene.input.keyboard.createCursorKeys()
    const toKey = (key) => {
      console.log({ key })
      return key
    }


    console.log(Object.entries(controles)
        .map(([key, value]) =>
          key !== 'id' && [key, this.parent_scene.input.keyboard.addKey(toKey(value))]
        ))

    this.controles = Object.fromEntries(
      Object.entries(controles)
        .map(([key, value]) =>
          key === 'id' ? [] : [key, this.parent_scene.input.keyboard.addKey(toKey(value))]
        )
    )
    console.log({ controles })
  }

  // Gere les appuies touches du joueurs
  handleKey () {
    const isDown = (key) => this.controles[key].isDown
    const isJustDown = (key) => Phaser.Input.Keyboard.JustDown(this.controles[key])
    let dx = 0, dy = 0
    if (this.cursors.left.isDown || isDown('gauche')) dx -= 100
    if (this.cursors.right.isDown || isDown('droite')) dx += 100
    if (this.cursors.up.isDown || isDown('haut')) dy -= 100
    if (this.cursors.down.isDown || isDown('bas')) dy += 100
    this.move(dx, dy)

    // Prendre / Poser un objet
    if (isJustDown('prendre')) {
      let ic = this.parent_scene.getIngredientsContainer()
      let key = ic.get_overlap_object()
      console.log(key)
      if (key != null) {
        if (this.objectIsCarried()) {
          let old = this.getCarriedObject()
          ic.add_ingredient(this.getX(), this.getY(), old)
        }
        this.setCarriedObject(key)
      } else if (this.objectIsCarried()) {
        let old = this.getCarriedObject()
        ic.add_ingredient(this.getX(), this.getY(), old)
        this.setCarriedObject('')
      }
    } 

    

  }

  // Move and play the right animation
  move (x, y) {
    this.sprite.setVelocityX(x)
    this.sprite.setVelocityY(y)

    this.carried_object.setX(this.sprite.x)
    this.carried_object.setY(this.sprite.y - this.sprite.height)

    if (x < 0) {
      this.sprite.anims.play(this.name + '_left', true)
    } else if (x > 0) {
      this.sprite.anims.play(this.name + '_right', true)
    } else if (y < 0) {
      this.sprite.anims.play(this.name + '_down', true)
    } else if (y > 0) {
      this.sprite.anims.play(this.name + '_up', true)
    } else {
      this.sprite.anims.play(this.name + '_idle', true)
    }
    super.move(this.getX(), this.getY())

  }

  setCarriedObject (texture) {
    this.carried_object.setVisible(texture !== '')
    this.carried_object.setTexture(texture)

  }

  // Retourne null si aucun objet est porté sinon retourne la texture de l'objet
  getCarriedObject () {
    if (this.carried_object.visible) {
      return this.carried_object.texture.key
    }
    return null

  }

  // Est ce qu'un objet est tenu
  objectIsCarried () {
    return this.carried_object.visible
  }

  getSprite () {
    return this.sprite
  }

  getDepth () {
    return this.sprite.depth
  }

  getX () {
    return this.sprite.x
  }

  getY () {
    return this.sprite.y
  }

  getWidth () {
    return this.sprite.width
  }

  getHeight () {
    return this.sprite.height
  }

}
