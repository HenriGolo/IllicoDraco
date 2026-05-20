import { SERVER_URL } from "../../../utils.js";
import Client from "./Client.js";

export class QueueClient {
  constructor(scene, ws) {
    this.parentScene = scene
    this.clientsGroup = scene.physics.add.group({
    classType: Client,
    runChildUpdate: true
});
    this.clientsQueue = [];
    this.clientsGroup.maxSize = 6;
    this.lastPosNotTaken = 0; // de 0 à clients.maxSize
    this.platData = null;
    this.ws = ws 
    
  }

  addNewClient() {
    this.getRandomPlat();
    console.log("getRandomPlat appelé")

  }

  getPrice() {
    return this.data.prix
  }

  removeClient() {

    if (this.clientsQueue.length > 0){

      this.clientsQueue[0].hideRequete();

      //this.clientsGroup.shiftPosition(1133, 1654, 0);
      var c = this.clientsQueue.shift();
      c?.destroy();
      this.lastPosNotTaken--;

      this.clientsQueue.forEach((client) => {
        console.log("will move one : ", client.x)
        client.x += 16
        console.log("moved one : ", client.x)
      })

      // Changer l'orientation du perso en tête de file :
      if (this.clientsQueue.length > 0) { 
        this.clientsQueue[0].setFrame(this.clientsQueue[0].frame +1);
        this.clientsQueue[0].showRequete();
      }

    } else {
      console.log("not enough clients")
    }

    //return c;
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


      const url = new URL('plat/random', SERVER_URL)
      const response = await fetch(url)
      if (response.ok) {
        let data = await response.json()
        
        console.log('------------ Data des PLATS reçu')
        console.log(data)

        this.ws.send(JSON.stringify({
        type: 'create_client',
        produit_complet: data,
        num: this.num
        }))

        this.create_client(data)
      } else {
        console.error('Erreur HTTP : ', response.status)
      
      }

      console.log("getRandomPlat a retourné son résultat")
    }

    create_client(data) {

        // Test 
        this.platData = data;
        const requete = this.platData; // requête du client
        //const requete = "bonjour je suis une requete eheheh"
        const frameID = Phaser.Math.Between(0,3)*2; //0, 2, 4, 6 --> un des 4 clients au hasar
        
        console.log("Requête : \n");
        console.log(requete);

        const newClient = new Client(this.parentScene, 13*16+8 - this.lastPosNotTaken*16, 42*16 +8, 'client', this.lastPosNotTaken === 0 ? frameID : frameID+1, requete);
        const clientG = this.clientsGroup.add(newClient);
        clientG.setActive(true).setVisible(true);

        this.clientsQueue.push(newClient);

        if (this.lastPosNotTaken === 0) {
          newClient.showRequete();
        }

        this.lastPosNotTaken++;

        console.log("Nouveau client créé; Sprite ", frameID, "position :", this.lastPosNotTaken -1, "taken");

    }
  
}
