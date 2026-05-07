import { Lobby } from './scenes/Lobby.js';
import { Game, GameUI } from './scenes/Game.js';
import { Receuil } from './scenes/Receuil.js';
import { Preloader } from './scenes/Preloader.js';

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
        Receuil,
        Game,
        GameUI,
        Lobby
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
            