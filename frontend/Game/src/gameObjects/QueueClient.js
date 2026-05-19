import { SERVER_URL } from "../utils.js";
import Client from "./Client.js";

export class QueueClient {
  constructor(scene) {
    this.clientsGroup = scene.physics.add.group({
    classType: Client,
    runChildUpdate: true
});
    this.clientsQueue = [];
    this.clientsGroup.maxSize = 6;
    this.lastPosNotTaken = 0; // de 0 à clients.maxSize
    this.platData = null;
    
  }

  addNewClient() {
    // this.getRandomPlat();
    // const requete = this.platData; // requête du client
    const requete = "bonjour je suis une requete eheheh"
    const frameID = Phaser.Math.Between(0,3)*2; //0, 2, 4, 6 --> un des 4 clients au hasar
    

    const newClient = new Client(13*16+8 - this.lastPosNotTaken*16, 42*16 +8, frameID,  'client');
    const clientG = this.clientsGroup.add(newClient);
    clientG.setActive(true).setVisible(true);

    this.clientsQueue.push(newClient);

    this.lastPosNotTaken++;

    console.log("Nouveau client créé; Sprite "+frameID + "position :" + this.lastPosNotTaken -1 + "taken");
    console.log("Requête : \n");
    console.log(requete);

  }

  removeClient() {
    this.clientsGroup.shiftPosition(1133, 1654, 0);
    var c = this.clientsQueue.shift();
    c.killAndHide();
    return c;
    //return this.isEmpty() ? null : this.clients.shift();
  }

  peek() {
    return this.isEmpty() ? null : this.clientsQueue[0];
  }

  isEmpty() {
    return this.clientsQueue.length === 0;
  }

  size() {
    return this.clientsQueue.length;
  }

  print() {
    console.log(this.clientsQueue.join(" -> "));
  }

    async getRandomPlat () {

    const response = await fetch('http://' + SERVER_URL + '/illicodraco/plat_random')
    if (response.ok) {
      let data = await response.json()
      this.platData = data;
      console.log('Data des monstres reçu')
      console.log(data)
    } else {
      console.error('Erreur HTTP : ', response.status)
     
    }

    console.log(">>>>>>>>>>>>" + this.monstersData)

  }
}