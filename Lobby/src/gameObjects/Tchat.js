export default class Tchat {

    constructor(scene, player_name, x, y) {
   

        var pseudo = player_name;
        //Affichage du tchat //1120 332
        const tchatOutput = scene.add.dom(x + 160, y + 204).createFromCache('tchatTextOutput');
        //Entrée texte //1120 560
        const tchatInput = scene.add.dom(x + 160, y + 432).createFromCache('tchatTextInput');

        tchatInput.addListener('click');
        tchatInput.on('click', function (event)
        {

            if (event.target.name === 'sendToTchatButton')
            {
                const inputText = tchatInput.getChildByName('textField');
                
                //  Have they entered anything?
                if (inputText.value !== '')
                {
                    let text = document.getElementById("tchat_output").innerText;
                    document.getElementById("tchat_output").innerText = 
                        text + "- " + pseudo + ":" + inputText.value +  "\n" ;
                    inputText.value = '';
                }
            }

        });
        
    }

}