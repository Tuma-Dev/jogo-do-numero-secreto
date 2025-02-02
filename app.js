let listNumbersSorteados = [];
let numeroLimite = 10;
let numberSecret = generateNumber();
let tentativas = 1;

function displayText(tag, text) {
    let camp = document.querySelector(tag);
    camp.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate: 1.2});
}

function displayMessageInitial() {
    displayText('h1', 'Jogo do Número Secreto');
    displayText('p', 'Escolha um número entre 1 e 10:');
}

displayMessageInitial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numberSecret) {
        displayText('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let messagesTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        displayText('p', messagesTentativas);
        document.getElementById('chute').setAttribute('disabled', true)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute > numberSecret) {
        displayText('p', 'O número secreto é menor.');
    } else {
        displayText('p', 'O número secreto é maior.');
    }
    tentativas++;
    clearCamp();
    // console.log(numberSecret);
}

function generateNumber() {
    let numberEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listNumbersSorteados.length;
    if(quantidadeDeElementosDaLista == numeroLimite) {
        listNumbersSorteados = [];
    }
    if(listNumbersSorteados.includes(numberEscolhido)) {
        return generateNumber();
    } else {
        listNumbersSorteados.push(numberEscolhido);
        console.log(listNumbersSorteados);
        return numberEscolhido;
    }
}

function clearCamp() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numberSecret = generateNumber();
    clearCamp();
    tentativas = 1;
    displayMessageInitial();
    document.getElementById('chute').removeAttribute('disabled')
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
