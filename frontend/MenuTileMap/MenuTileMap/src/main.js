import { Start } from './scenes/Start.js';
import { Preloader } from './scenes/Preloader.js';
import { Main } from './scenes/Main.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [
        Main,
        Preloader,
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
    dom : {
        createContainer : true
    },
}

new Phaser.Game(config);
            