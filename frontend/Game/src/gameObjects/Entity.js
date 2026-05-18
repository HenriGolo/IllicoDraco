//SVP ne pas utiliser pour client
export default class Entity {

    //scene -> scene sur laquelle l'entité se trouve
    //name -> nom de l'entité
    //pv, def, atq -> point e vie, defense , attaque
    //init_x, init_y -> coordonnée initiale

    constructor(scene, name, pv, def, atq, init_x, init_y) {

        this.is_dead = false;
        this.name = name;
        this.pv = pv;
        this.max_pv = pv;
        this.def = def;
        this.atq = atq;

        this.lifeBar_back = scene.add.rectangle(init_x, init_y-11, 16, 4, 0xffffff)
        this.lifeBar = scene.add.rectangle(init_x, init_y-11, 16, 4, 0xff0000)

    }


    move(x, y) {
        this.lifeBar_back.setX(x)
        this.lifeBar_back.setY(y-11)

        this.lifeBar.setX(x)
        this.lifeBar.setY(y-11)
    }

    take_damage(amount) {

        let damage = amount - ((amount*this.def)/100)

        this.pv = this.pv - damage
        if (this.pv < 0) {
            this.pv = 0
            this.is_dead = true
        }
        this.lifeBar.setSize(3, 4)

        

    }

}