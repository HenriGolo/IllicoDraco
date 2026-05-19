
export default class Chaudron {
    constructor(scene, sprite, ws, num) {
        this.content = [];
        this.sprite = sprite
        this.full = false
        this.ws = ws
        this.num = this.num
        this.scene = scene



    }

    //Retourne l'info de si le truc a été ajouté dans le  chaudron
    add_ingredient (ingredient) {
        
        if (!this.full) {
            this.content.push(ingredient)


            if (this.content.length === 1) {
                this.sprite.anims.play('marmite_niveau1', true)
            } else if (this.content.length === 2) {
                this.sprite.anims.play('marmite_niveau2', true)
            } else {
                this.sprite.anims.play('marmite_niveau3', true)
                this.full = true
            }

            return true
        }

        return false
        
    }

    end_preparation(plat) {
        this.sprite.anims.play('marmite_empty', true)
        this.full = false
        this.content = []
        this.scene.getIngredientsContainer().add_ingredient(this.sprite.x, this.sprite.y, plat)
    }

    start_chaudron() {
        this.full = true
        this.sprite.anims.play('marmite_enPrepa', true)
    }
    ////////////////////////////////////////:

    send_ingredient (ingredient) {
        this.ws.send(JSON.stringify({
        type : "remplir_marmite",
        produit : ingredient,
        num: this.num,
        }))
    }

    send_start_chaudron() {

        if (this.content.length != 0) {
            this.start_chaudron()

            this.ws.send(JSON.stringify({
            type : "start_chaudron",
            num: this.num
            }))
        }
        
    }
}