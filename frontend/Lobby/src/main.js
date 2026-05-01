import { Lobby } from './scenes/Lobby.js';
import { Game } from './scenes/Game.js';

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
        Game,
        Lobby
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
     dom: {
        createContainer: true
    }
}

new Phaser.Game(config);
            