import { Lobby } from './scenes/Lobby.js';
import { Game, GameUI } from './scenes/Game.js';
import { Recueil } from './scenes/Recueil.js';
import { Preloader } from './scenes/Preloader.js';
import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#ffffff',
    pixelArt: true,
    scene: [
        Preloader,
        Recueil,
        Game,
        GameUI,
        Lobby,
        Start
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
     dom: {
        createContainer: true
    }
}

new Phaser.Game(config);
            