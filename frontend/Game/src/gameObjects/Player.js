export default class Player {

    constructor (scene, x, y, num, classe, parametre = null) {

        this.parent_scene = scene //Scene du jeu
        this.name = 'j'+num+'_'+classe //Nom du sprite : jx_classe
        
        //Créer le sprite du joueur
        this.player = this.parent_scene.physics.add.sprite(x, y, this.name)
        this.player.body.setSize(16, 16, false)
        this.player.setCollideWorldBounds()

        this.carried_object = this.parent_scene.add.sprite(x, y-this.player.height, "")
        this.carried_object.setVisible(false)

        //Touche
        this.cursors = this.parent_scene.input.keyboard.createCursorKeys();
        this.prendreKey = this.parent_scene.input.keyboard.addKey("e")
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

        //Prendre / Poser un objet
        if (Phaser.Input.Keyboard.JustDown(this.prendreKey)) {
            let ic = this.parent_scene.getIngredientsContainer();
            let key = ic.get_overlap_object();
            console.log(key)
            if (key != null) {
                if (this.objectIsCarried()) {
                    let old = this.getCarriedObject()
                    ic.add_ingredient(this.getX(), this.getY(), old)
                }

                this.setCarriedObject(key);
            } else if (this.objectIsCarried()){
                let old = this.getCarriedObject()
                ic.add_ingredient(this.getX(), this.getY(), old)
                this.setCarriedObject("")
            }
        }

    }

    //Move and play the right animation
    move(x, y) {
        this.player.setVelocityX(x)
        this.player.setVelocityY(y)

        this.carried_object.setX(this.player.x)
        this.carried_object.setY(this.player.y-this.player.height)

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

    setCarriedObject(texture) {
        this.carried_object.setVisible(texture !== "")
        this.carried_object.setTexture(texture)
            
    }

    //Retourne null si aucun objet est porté sinon retourne la texture de l'objet
    getCarriedObject() {
        if (this.carried_object.visible){
            return this.carried_object.texture.key
        }
        return null
        
    }

    //Est ce qu'un objet est tenu
    objectIsCarried() {
        return this.carried_object.visible
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