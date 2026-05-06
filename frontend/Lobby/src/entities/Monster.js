export default class Monster {

    constructor(name, image, produit, vie = 0, attaque = 0, defense = 0, vitesse = 0) {
        
        this.name = name;
        this.image = image;
        this.produit = produit;
        this.vie = vie;
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;

    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    getProduit() {
        return this.produit;
    }

    getVie() {
        return this.vie;
    }

    getAttaque() {
        return this.attaque;
    }

    getDefense() {
        return this.defense;
    }

    getVitesse() {
        return this.vitesse;
    }

}