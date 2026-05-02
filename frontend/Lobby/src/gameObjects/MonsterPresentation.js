//Classe pour afficher un monstre dans le bestiaire

const width = 300;
const height = 294;

export default class MonsterPresentation {

  constructor(scene, graphics, x = 0, y = 92, monster = null) {
        
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(x, y, width, height);

        console.log("ok");

  }

}