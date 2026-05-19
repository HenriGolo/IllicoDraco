export default class Client extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame=null, requete = null) {
        super(scene, x, y, texture, frame);
        this.requete = requete;

        // Ajouter le sprite à la scène
        scene.add.existing(this);

        console.log("Added Client sprite to world")

        // Ajouter le body physique
        scene.physics.add.existing(this);

        console.log("Added Client body to world")

        // Paramètres physiques (optionnel)
        // this.setCollideWorldBounds(true);
        // this.setBounce(0.2);
    }

}