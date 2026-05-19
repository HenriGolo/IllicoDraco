import Entity from '../entities/Entity.js'

export default class Player extends Entity {

  constructor (scene, x, y, num, classe, pv, def, atq, controles = {}) {
    super(scene, 'j' + num + '_' + classe, pv, def, atq, x, y)

    this.ws = null
    this.num = num

    this.parent_scene = scene //Scene du jeu
    //this.name = 'j' + num + '_' + classe //Nom du sprite : jx_classe

    //Créer le sprite du joueur
    this.sprite = this.parent_scene.physics.add.sprite(x, y, this.name)
    this.sprite.body.setSize(16, 16, false)
    this.sprite.setCollideWorldBounds()

    this.carried_object = this.parent_scene.add.sprite(x, y - this.sprite.height, '')
    this.carried_object.setVisible(false)

    this.is_moving = false

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
    //Envoie des déplacements
    if (this.ws !== null) {
      this.sendDeltaXY(dx, dy)
    }
    this.move(dx, dy)

    // Prendre / Poser un objet
    if (isJustDown('prendre')) {
      let ic = this.parent_scene.getIngredientsContainer()
      let object = ic.get_overlap_object()
      if (object.key != null) { // on veut prendre un objet
        if (this.objectIsCarried()) { ///Un objet est porté
          let old = this.getCarriedObject()
          ic.add_ingredient(this.getX(), this.getY(), old)
          this.parent_scene.sendDropObject(old, this.getX(), this.getY())
        }
        this.setCarriedObject(object.key)
        this.sendCarriedObject(object)

      } else if (this.objectIsCarried()) { //Un objet  est porté et on ne veut pas prendre d'objet
        let old = this.getCarriedObject()
        ic.add_ingredient(this.getX(), this.getY(), old)
        this.parent_scene.sendDropObject(old, this.getX(), this.getY())
        this.setCarriedObject('')
        this.sendCarriedObject({ key: '', indice: -1 })
      }
    }

    if (isJustDown('interagir')) {

      let objectInteract = this.parent_scene.getObjectInteract()
      if (this.objectIsCarried()) {

        console.log(objectInteract)

        switch (objectInteract) {
          case 'marmite' : //Lejoueur interagit avec la marmite
          {
            if (this.parent_scene.getChaudron().add_ingredient(this.getCarriedObject())) {
              console.log('Ajouté avec succès')
              this.parent_scene.getChaudron().send_ingredient(this.getCarriedObject())
              this.setCarriedObject('')

            }
            break
          }
          case 'bar' : {// Le joueur interagit avec le bar 

            console.log("Interaction avec le bar")

            var objetPorte = this.getCarriedObject()
            var queue = this.parent_scene.getClientQueue()
            var client = queue.peek()
            var objetVouluClient = client.getRequete()

            console.log("Client veut :", objetVouluClient, ", je porte :", objetPorte)
            
            if (objetPorte === objetVouluClient.nom){
              console.log("Client satisfait!! +", objetVouluClient.prix)
              queue.removeClient()
              this.parent_scene.money += objetVouluClient.prix
            } else {
              console.log("wtf bro")
              queue.removeClient()
            }

            break
          }
          default:
            console.log('Rien a faire...')

        }
      } else { //On ne porte rien
        switch (objectInteract) {
          case 'marmite' : //Lejoueur interagit avec la marmite
          {
            this.parent_scene.getChaudron().send_start_chaudron()
           
            break
          }

          default :
            console.log('Rien a faire...')
        }

      }

    } if (isJustDown('attaquer')) {
      let data = this.parent_scene.get_overlap_monster()
      console.log("Monster Attaque : ", data.monster)
      if (data.monster != null){
        this.attaquer_monstre(data.monster, data.indice)
      } 
        
    }

  } 



  attaquer_monstre(monstre, indice){
    //Attaquer le monstre
    monstre.take_damage(this.getAtq())

    //Si le monstre est mort le tuer
    if (monstre.isDead()) {
      this.parent_scene.remove_monster(indice)
    } 

    this.ws.send(JSON.stringify({
      type: 'damage_monster',
      attaque: this.getAtq(),
      indice: indice,
      num: this.num,
    }))
  }

  setWS (ws) {
    this.ws = ws
  }

  sendCarriedObject (object) {
    //console.log('Object' + object)

    this.ws.send(JSON.stringify({
      type: 'take_ingredient',
      ramasse: object,
      num: this.num,
    }))
  }

  sendDeltaXY (x, y) {
    //console.log(x, y)
    if (x === 0 && y === 0) {
      if (this.is_moving) {
        this.is_moving = false
        this.ws.send(JSON.stringify({
          type: 'deplacement',
          deltaX: x,
          deltaY: y,
          x: this.getX(),
          y: this.getY(),
          num: this.num,
        }))
      }
    } else {
      this.is_moving = true
      this.ws.send(JSON.stringify({
        type: 'deplacement',
        deltaX: x,
        deltaY: y,
        x: this.getX(),
        y: this.getY(),
        num: this.num,
      }))
    }

  }

  setPos (x, y) {
    this.sprite.setX(x)
    this.sprite.setY(y)
    super.move(x, y)
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
    console.log('Objet ramassé : ' + texture)
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
