const zoom = 3
const nb_row = 4
const nb_col = 8

export default class Coffre {

    constructor (scene) {

        this.parent_scene = scene
        this.content = [
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j1_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j3_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j4_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            'j2_pretre',
            ]
        this.curPage = 0

        //Bouton Retour
        this.retour_bt = this.parent_scene.add.sprite(10 + (24 * zoom) / 2, 10 + (24 * zoom) / 2, 'bt_retour').setScale(zoom, zoom)
        .on('pointerdown', () => this.close())

        //Défilement entre les pages
        this.background = this.parent_scene.add.sprite(640, 10 + (24 * zoom) / 2, 'pageNum').setScale(zoom, zoom)

        this.curPageText = this.parent_scene.add.text(0, 32, '1', { fontSize: '32px', fill: '#fff' })
        .setFixedSize(1280, 44)
        .setAlign('center')

        this.leftArrow = this.parent_scene.add.sprite(640 - 24 * zoom, 10 + (24 * zoom) / 2, 'bt_leftArrow').setScale(zoom, zoom)
        .on('pointerdown', () => this.nextPage(true))

        this.rightArrow = this.parent_scene.add.sprite(640 + 24 * zoom, 10 + (24 * zoom) / 2, 'bt_rightArrow').setScale(zoom, zoom)
        .on('pointerdown', () => this.nextPage())

        
        this.componentGroup = this.parent_scene.add.group([
            this.retour_bt, this.background, 
            this.curPageText, this.rightArrow,
            this.leftArrow])

        this.cases = []
        for (let i = 0; i < nb_row; i++) {
            for (let j = 0; j < nb_col; j++) {
                this.cases.push(this.parent_scene.add.sprite(
                    130 + 16*(zoom**2)* j,  180 + 16*(zoom**2)* i, 'champi').setScale(zoom**2, zoom**2)
                    .on('pointerdown', () => this.get_ingredient(i*nb_row + j)))    

            }
        }

        this.open()
        
    }

    setIngredient(content) {
        this.content = content
        this.curPage = 0
        this.curPageText.setText(this.curPage+1)
    }


    get_ingredient(i) {
        
    }

    nextPage(left) {
        
        if (left) {
            this.curPage = Math.max(this.curPage-1, 0)
        } else {
            this.curPage = Math.min(this.curPage+1, Math.floor(this.content.length/(nb_col*nb_row)))
        }

        this.curPageText.setText(this.curPage+1)
        this.maj_case()

       
    }

    maj_case() {
        let size = (nb_col*nb_row)
        let end = Math.min(this.curPage*size + size, this.content.length)

        for(let i = 0; i < size; i++){
            this.cases[i].disableInteractive()
            this.cases[i].setVisible(false)
        }

        for (let i = this.curPage*size; i < end; i++) {
            this.cases[i - (size * this.curPage)].setTexture(this.content[i])
            this.cases[i - (size * this.curPage)].setInteractive()
            this.cases[i - (size * this.curPage)].setVisible(true)

        }
    }

    open() {
        this.retour_bt.setInteractive()
        this.leftArrow.setInteractive()
        this.rightArrow.setInteractive()
        this.componentGroup.setVisible(true)

        for (let i = 0; i < this.cases.length; i++) {
                this.cases[i].setInteractive()
                this.cases[i].setVisible(true)
        }

        this.maj_case()

    }

    close() {
        this.retour_bt.disableInteractive()
        this.leftArrow.disableInteractive()
        this.rightArrow.disableInteractive()
        this.componentGroup.setVisible(false)

        for (let i = 0; i < this.cases.length; i++) {
                this.cases[i].disableInteractive()
                this.cases[i].setVisible(false)
        }


    }

}