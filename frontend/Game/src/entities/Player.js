export default class Player {

    constructor(pseudo, sprite = null, objetPorte = null, vie = 50, attaque = 10, defense = 10, vitesse = 0) {
        
        this.pseudo = pseudo;
        this.sprite = sprite;
        this.objetPorte = objetPorte;
        this.vie = vie;
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;

    }

    getPseudo() {
        return this.pseudo;
    }

    getSprite() {
        return this.sprite;
    }

    getObjetPorte() {
        return this.objetPorte;
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