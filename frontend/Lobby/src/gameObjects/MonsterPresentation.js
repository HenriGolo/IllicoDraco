//Classe pour afficher un monstre dans le bestiaire

const zoom = 3;
const width = 300;
const height = 294;

export default class MonsterPresentation {

   constructor(scene, x = 0, y = 92){
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(4, 0xc1c1c1, 1.0);
        this.graphics.fillStyle(0x6b4b34, 1);

        this.graphics.fillRect(x, y, width, height);
        this.graphics.strokeRect(x, y, width, height);

        //this.graphics.lineBetween(x, y + 110, x + width, y + 110);

        //this.graphics.lineBetween(x, y + 178, x + width, y + 178);

        this.monster_name = scene.add.text(x, y+10, "", { fontSize: '32px', fill: '#FFF' })
          .setFixedSize(width, height)
          .setAlign('center');

        this.monster_img = null;
        this.produit_img = null;

        this.monster_info = scene.add.text(x + 50, y + 120,  "" ,{ fontSize: '16px', fill: '#FFF' });
        this.text_produit = scene.add.text(x + 20, y + 235,  "Produit :" ,{ fontSize: '32px', fill: '#FFF' });
       
       this.graphics.setVisible(false);

  }


  change_monster(monster) {
    
    if (this.monster_img != null) {
      this.monster_img.destroy();

    }

    this.monster_name.setText(monster.getName());    
    this.monster_info.setText("- vie : " + monster.getVie() +
      "\n- attaque : " + monster.getAttaque() + 
      "\n- defense : " + monster.getDefense() +
      "\n- vitesse : " + monster.getVitesse());

    this.monster_img =  this.scene.add.sprite( this.x+(width/2),  this.y+84, monster.getImage())
      .setScale(zoom, zoom);

    this.produit_img =  this.scene.add.sprite( this.x+250,  this.y+250, monster.getProduit())
      .setScale(zoom, zoom);

    this.switch_visibility(true);
  }

  switch_visibility(b) {
    this.graphics.setVisible(b);
    this.monster_name.setVisible(b);
    this.monster_info.setVisible(b);
    this.text_produit.setVisible(b);

    if (this.monster_img != null) {
      this.monster_img.setVisible(b);
      this.produit_img.setVisible(b);
    }
  }

}