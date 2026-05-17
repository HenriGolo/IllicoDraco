import Tchat from '../gameObjects/Tchat.js'

const zoom = 10
const joueur_classe = ['guerrier', 'mage', 'pretre', 'archer']

export class Lobby extends Phaser.Scene {

  constructor () {
    super('Lobby')

    this.joueurs
    this.tchat

  }

  init (data) {

    this.serveur_url = data.serveur_url

    this.joueur_courant = data.joueur_courant
    this.pseudo = data.pseudo
    this.code = data.code
    this.nb_joueur = 0

    console.log('server_url : ' + this.serveur_url +
      '\npseudo : ' + this.pseudo +
      '\ncode : ' + this.code +
      '\njoueur_courant : ' + this.joueur_courant
    )
  }

  preload () {
  }

  create () {

    //Background pour l'organisation générale :
    var graphics = this.add.graphics()

    //Bandeau Tchat
    graphics.fillStyle(0x555555, 1)
    graphics.fillRect(960, 128, 320, 464)

    /////////////////////////////////////

    //Affichage du titre et code
    this.add.text(0, 16, 'En attente de joueur ...', {
      fontSize: '32px',
      fill: '#000'
    }).setFixedSize(960, 32).setAlign('center')
    this.add.text(0, 58, 'code : ' + this.code, {
      fontSize: '24px',
      fill: '#000'
    }).setFixedSize(960, 24).setAlign('center')

    //Afficher les joueurs déjà connecté
    this.joueurs = []
    for (var i = 0; i < this.joueur_courant; i++) {
      this.connect_player(i)
    }

    //Permettre au joueur de changer son perso
    this.joueurs[this.joueur_courant - 1].setInteractive()
    this.joueurs[this.joueur_courant - 1].on('pointerdown', function (pointer) {
      this.setState((this.state + 1) % 4)
      this.setTexture(this.name + '_' + joueur_classe[this.state])

    })

    //Créer le bouton seulement si c'est le joueur 1 (lancer partie)
    if (this.joueur_courant == 1) {
      this.add.sprite(480, 656, 'bt_lancer_partie').setScale(3, 3)
        .setInteractive()
        .on('pointerdown', () => this.start_game())
    }

    //Créer les boutons paramètres et quitter
    this.add.sprite(1120, 656, 'bt_quitter').setScale(3, 3)
      .setInteractive()
      .on('pointerdown', () => this.quit())

    this.add.sprite(1216, 64, 'bt_parametre').setScale(3, 3)
      .setInteractive()
      .on('pointerdown', () => this.parameter())

    //Ajout du tchat
    this.tchat = new Tchat(this, this.pseudo, 960, 128, this.serveur_url)


    //WebSocket pour la gestion des interactions du lobby
    const url = new URL(`?/${this.pseudo}`, this.serveur_url)
    this.ws = new WebSocket(url);
    console.log(this.ws)

    this.ws.onmessage = (event) => this.on_message(event)
    this.ws.onerror = () => console.log('Erreur dans le lobby')

    //TEST
    this.disconnect_player(2)
    this.connect_player(2)
    this.connect_player(3)  
    this.switch_class(3, "pretre")

  }

  //Gestion des messages de la webSocket
  on_message(event) {
    const message = JSON.parse(event.data)

    switch (message.type) {
      case "player_disconnect" : {
        this.disconnect_player(message.num) //num = 1,2,3 ou 4
        break;
      }
      case "player_join" : {
        this.connect_player(this.nb_joueur)
        break;
      }
      case "player_switch_class" : {
        this.switch_class((message.num-1), message.classe) //num = 1,2,3 ou 4, classe = 'mage', 'guerrier'...
        break;
      }
      default : {
        console.log("Requête inconnue")
      }

    }

  }

  //Permet d'afficher le joueur numéro num (num entre 0 et 3)
  connect_player (num) {
    this.nb_joueur += 1
    let x = 120 + 240 * num
    let joueur = this.add.sprite(x, 360, ('j' + (num + 1) + '_' + joueur_classe[0])).setScale(zoom, zoom)
    this.joueurs[num] = joueur
    this.joueurs[num].setState(0)
    this.joueurs[num].setName('j' + (num + 1))
  }

  //Deconnecte le player num et met l'affichage a jour (décale les joueurs en conséquence)
  //num entre 1 et 4
  disconnect_player(num) {
    
    if (num < this.joueur_courant) {
 
      this.joueurs[this.joueur_courant - 1].setActive(false)

      this.joueur_courant -= 1
      
      this.joueurs[this.joueur_courant - 1].setInteractive()
      this.joueurs[this.joueur_courant - 1].on('pointerdown', function (pointer) {
        this.setState((this.state + 1) % 4)
        this.setTexture(this.name + '_' + joueur_classe[this.state])

      })
    }

    this.nb_joueur -= 1
    this.joueurs[this.nb_joueur].destroy()

  }

  //Changer l'avatar d'un joueur 
  //num entre 0 et 3
  switch_class (num, classe) {
    let o = this.joueurs[num]
    o.setState(joueur_classe.findIndex((element) => element === classe ))
    o.setTexture(o.name + '_' + joueur_classe[o.state])
  }

  //Quitter le jeu
  quit () {
    console.log(this.pseudo + ' : Je pars')

    //TODO Envoyer un message de partie quitté
    this.tchat.quitChat()
    this.scene.start('Start', { pseudo: this.pseudo })
  }

  //Lancer le jeu
  start_game () {
    //TODO START
    console.log(this.pseudo + ' : Cuisinons !')
  }

  //Parametre
  async parameter () {

    console.log(this.pseudo + ' : Parametre !')

    this.scene.launch('Parametre',
      {
        haut: '',
        bas: '',
        droite: '',
        gauche: '',
        attaquer: '',
        interagir: '',
        prendre: '',
        boutique: '',
        recueil: '',
        chat: '',
        previousScene: this
      }
    )

    const response = await fetch(this.serveur_url + '/control?' + 'pseudo=' + this.pseudo)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      //Start le lobby avec le code dans data et le nombre de joueur a 1
      this.scene.launch('Parametre',
        {
          ...data,
          previousScene: this
        }
      )
    } else {
      console.log('Erreur au chargement des paramètres')
    }
  }

  update () {

  }

}
