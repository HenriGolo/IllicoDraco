export default class Tchat {

    constructor(scene, player_name) {
   

        //Affichage du tchat
        const tchatOutput = scene.add.dom(200, 200).createFromCache('tchatTextOutput');
        //Entrée texte
        const tchatInput = scene.add.dom(1120, 560).createFromCache('tchatTextInput');

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
                    document.getElementById("tchat_output").innerText = text + inputText.value +  "\n" ;
                    inputText.value = '';
                }
            }

        });
        
    }

}