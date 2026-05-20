export default class Client extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, texture, frame = null, requete = null) {
    super(scene, x, y, texture, frame)
    this.requete = requete

    // Ajouter le sprite à la scène
    scene.add.existing(this)

    // Ajouter le body physique
    scene.physics.add.existing(this)

    // Paramètres physiques (optionnel)
    // this.setCollideWorldBounds(true);
    // this.setBounce(0.2);
  }

  showRequete () {
    this.bulle = this.scene.add.sprite(this.x + 12, this.y - 18, 'bulle')
    this.showReq = this.scene.add.sprite(this.x + 12, this.y - 18, this.requete.nom)
  }

  hideRequete () {
    this.bulle?.destroy()
    this.showReq?.destroy()
  }

  getRequete () {
    return this.requete
  }
}
