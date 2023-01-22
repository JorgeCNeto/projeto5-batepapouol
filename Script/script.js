let message ={from:"", to:"", text:"", type:""} 

function showMessage(){

}

function sendMessage(){
   
    const typedMessage = document.querySelector('input').value;

    const typedText = ('https://mock-api.driven.com.br/api/v6/uol/messages', text:typedMessage);
    typedText.then(/*precisa de uma função*/ */);
    typedText.catch(/*precisa de uma função*/);

    showMessage();
}

