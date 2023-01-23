let user;

let input = document.querySelector('input');

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

function startChat(answer){
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
    msg.then(addToScreen);
    msg.catch(refreshPage);
}


function login(){
    const user = prompt("Digite o seu nome:");
    login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    login.then(startChat);
    login.catch(errorLogin);
}

login();

///////////////////////////////////////////////////////////////////////////////////


function pedirMensagens() {
    const request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    request.then(addToScreen);
   
}


function addToScreen(answer) {
    const messages = answer.data;
    const chat = document.querySelector('.messages');
    chat.innerHTML = '';
    let msg;

    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type == 'status') {
            msg = `<li class="join">
        <span class="time">(${messages[i].time})</span>
        <span class="message"><span class="user">${messages[i].from}</span>
        ${messages[i].text}</span></li>`;
            chat.innerHTML = chat.innerHTML + msg;
        } else if (messages[i].type == 'message') {
            msg = `<li class="message">
            <span class="time">(${messages[i].time})</span>
            <span class="user">${messages[i].from}</span>
            para<span class="user">todos:</span>
            ${messages[i].text}
        </li>`
            chat.innerHTML = chat.innerHTML + msg;
            
        } else if (messages[i].type == 'private_message') {
            msg = `<li class="message">
            <span class="time">(${messages[i].time})</span>
            <span class="user">${messages[i].from}</span>
            para<span class="user">${messages[i].to}:</span>
            ${messages[i].text}
        </li>`
            chat.innerHTML = chat.innerHTML + msg;
        }
    }

    scrollMessage();
}

function clickEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const messageToSend = {
        from: user,
        to: "Todos",
        text: input.value,
        type: "message"
    };
  
    const sendMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageToSend);
    sendMessage.then(sent);
    sendMessage.catch(notSent);
}

function sent(answer) {
    input.value = '';   
}
function notSent(answer) {
        alert('Mensagem não enviada');
}


function scrollMessage(){
    const scrolling = document.querySelectorAll(".messages");
    const ultimoIndice = scrolling.length - 1;
    scrolling[ultimoIndice].scrollIntoView();
}
