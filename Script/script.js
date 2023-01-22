let message ={from:"", to:"", text:"", type:"", time:""} 

function serverStatus(){
    if (/*resposta do servidor 400 */){
        return true;
    }
}

function errorLogin{
    while (serverStatus()){
        alert('Este nome já está em uso. Insira outro nome, por favor!');
        login()
    }
}

function startChat(){
    setInterval(statusLogin, 5000);
    setInterval(getMessage, 3000);
}


function statusLogin(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {message:from});
}

function refreshPage(){
    window.location.reload();
}

function getMessage(){
    msg = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    msg.then(showMessage);
    msg.catch(refreshPage);
}


function login(){
    const userName = prompt("Qual o seu nome?");
    login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {message:from});
    login.then(startChat);
    login.catch(errorLogin);
}

login();



function showMessage(){
    let answer = document.querySelector('p');

    switch (type){
        case 'publicMessage':
            const publicMessage = answer.innerHTML =`<li class="text publicMessage">
                                                         <span>${time} ${from} para Todos: ${text}</span>
                                                    </li>`;
            return publicMessage;
        case 'privateMessage':
            const privateMessage = answer.innerHTML =`<li class="text privateMessage"> 
                                                          <span>${time} ${from} reservadamente para ${to}: ${text}</span>
                                                      </li>`;
            return privateMessage;
        case 'systemMessage':
            if (/*condição para entrar na sala e é o usuário*/){
                const systemMessage =  `<li class="text notificationMessage">
                                                <span>${time} ${from} entra na sala...</span>
                                        </li>`;
            } else if (/*condição para entrar na sala e NÂO é o usuário*/){
                const systemMessage =  `<li class="text notificationMessage">
                                                <span>${time} ${to} entra na sala...</span>
                                        </li>`;
            } else{
                const systemMessage =  `<li class="text notificationMessage">
                                                <span>${time} ${to} saiu na sala...</span>
                                        </li>`;
            }

            return systemMessage;
    }

    
} 



function messageTo(){

}

function sendMessage(){
   
    const typedMessage = document.querySelector('input').value;

    messageTo(); //definir para quem mandar
    
    const typedText = ('https://mock-api.driven.com.br/api/v6/uol/messages', text:typedMessage);
    typedText.then(/*precisa de uma função*/);
    typedText.catch(/*precisa de uma função*/);

    showMessage();
}

