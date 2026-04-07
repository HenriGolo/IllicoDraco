export class Tchat extends Phaser.GameObjects.Layer {

    constructor(scene, children) {
        super(scene, children);
        // ...
        this.add.existing(this);
    }

}