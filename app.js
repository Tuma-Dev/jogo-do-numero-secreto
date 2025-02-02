let listNumbersSorteados = []; // criando uma lista vazia.
let numeroLimite = 10;
let numberSecret = generateNumber();
let tentativas = 1;

// função para modificar os campos, com parametos de tag e texto
function displayText(tag, text) {
    let camp = document.querySelector(tag);
    camp.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate: 1.2});
}

function displayMessageInitial() {
    // puxando função e paramentos de cada compo
    displayText('h1', 'Jogo do Número Secreto');
    // let messageEscolhaDeNumeros = `Escolha um número entre 1 e ${numeroLimite}:`
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
    console.log(numberSecret);
}

// return para retornar para o codigo
function generateNumber() {
    let numberEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listNumbersSorteados.length;
    if(quantidadeDeElementosDaLista == numeroLimite) {
        listNumbersSorteados = [];
    }
    if(listNumbersSorteados.includes(numberEscolhido)) { //includes verifica se o elemento está na lista
        return generateNumber();
    } else {
        listNumbersSorteados.push(numberEscolhido);//push para colocar na lista no final da lista.
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
