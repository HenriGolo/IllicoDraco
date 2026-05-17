export default class Player {

    constructor (scene, x, y, num, classe, parametre = null) {

        this.parent_scene = scene //Scene du jeu
        this.name = 'j'+num+'_'+classe //Nom du sprite : jx_classe
        
        //Créer le sprite du joueur
        this.player = this.parent_scene.physics.add.sprite(x, y, this.name)
        this.player.body.setSize(16, 16, false)
        this.player.setCollideWorldBounds()

        this.cursors = this.parent_scene.input.keyboard.createCursorKeys();

    }

    //Gere les appuies touches du joueurs
    handleKey() {

        if (this.cursors.left.isDown) {
            this.move(-100, 0)

        } else if (this.cursors.right.isDown) {
            this.move(100, 0)

        } else if (this.cursors.up.isDown) {
            this.move(0, -100)

        } else if (this.cursors.down.isDown) {
            this.move(0, 100)

        } else {
            this.move(0, 0)
        }

    }

    //Move and play the right animation
    move(x, y) {
        this.player.setVelocityX(x)
        this.player.setVelocityY(y)

        if (x < 0) {
            this.player.anims.play(this.name+'_left', true)
        } else if ( x > 0) {
            this.player.anims.play(this.name+'_right', true)
        } else if (y < 0) {
            this.player.anims.play(this.name+'_down', true)
        } else if (y > 0) {
            this.player.anims.play(this.name+'_up', true)
        } else {
            this.player.anims.play(this.name+'_idle', true)
        }

        
    }


    getPlayer(){
        return this.player
    }

    getDepth(){
        return this.player.depth
    }

    getX(){
        return this.player.x
    }

    getY(){
        return this.player.y
    }

    getWidth() {
        return this.player.width
    }

    getHeight() {
        return this.player.height
    }

}