export default class Player {

  constructor (scene, x, y, num, classe, controles = {}) {

    this.parent_scene = scene // Scene du jeu
    this.name = 'j' + num + '_' + classe // Nom du sprite : jx_classe

    // Créer le sprite du joueur
    this.player = this.parent_scene.physics.add.sprite(x, y, this.name)
    this.player.body.setSize(16, 16, false)
    this.player.setCollideWorldBounds()

    this.carried_object = this.parent_scene.add.sprite(x, y - this.player.height, '')
    this.carried_object.setVisible(false)

    // Touche
    this.cursors = this.parent_scene.input.keyboard.createCursorKeys()
    const toKey = (key) => {
      console.log({ key })
      return key
    }
    this.controles = Object.fromEntries(
      Object.entries(controles)
        .map(([key, value]) =>
          key !== 'id' && [key, this.parent_scene.input.keyboard.addKey(toKey(value))]
        )
    )
    console.log({ controles })
  }

  // Gere les appuies touches du joueurs
  handleKey () {
    const isDown = (key) => Phaser.Input.Keyboard.JustDown(this.controles[key])
    let dx = 0, dy = 0
    if (this.cursors.left.isDown || isDown('gauche')) dx -= 100
    if (this.cursors.right.isDown || isDown('droite')) dx += 100
    if (this.cursors.up.isDown || isDown('haut')) dy -= 100
    if (this.cursors.down.isDown || isDown('bas')) dy += 100
    this.move(dx, dy)

    // Prendre / Poser un objet
    if (isDown('prendre')) {
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
    this.player.setVelocityX(x)
    this.player.setVelocityY(y)

    this.carried_object.setX(this.player.x)
    this.carried_object.setY(this.player.y - this.player.height)

    if (x < 0) {
      this.player.anims.play(this.name + '_left', true)
    } else if (x > 0) {
      this.player.anims.play(this.name + '_right', true)
    } else if (y < 0) {
      this.player.anims.play(this.name + '_down', true)
    } else if (y > 0) {
      this.player.anims.play(this.name + '_up', true)
    } else {
      this.player.anims.play(this.name + '_idle', true)
    }

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

  getPlayer () {
    return this.player
  }

  getDepth () {
    return this.player.depth
  }

  getX () {
    return this.player.x
  }

  getY () {
    return this.player.y
  }

  getWidth () {
    return this.player.width
  }

  getHeight () {
    return this.player.height
  }

}
