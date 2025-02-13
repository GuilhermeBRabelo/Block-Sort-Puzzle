var cores = ["circulo", "triangulo", "quadrado", "x"];
var vetorID = [];
var pontuacao = 0;

document.addEventListener("dragstart", function (e) {
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", function (e) {
    e.target.classList.remove("dragging");
    atualizarPontuacao();
    verificarPontuacao();
});


//Função responsavel por criar os blocos
function criaBloco() {
    var tuboVazio = document.querySelectorAll(".tubo");
    var containers = document.querySelectorAll(".create");

    tuboVazio.innerHTML = "";

    containers.forEach(function (container) {
        for (let i = 0; i < 4; i++) {
            var bloco = document.createElement("div");

            bloco.setAttribute("draggable", "true");

            var id = geraId();
            bloco.setAttribute("id", id);

            let classe = parseInt(id / 4);
            bloco.setAttribute("class", "bloco " + cores[classe]);

            container.appendChild(bloco);
        }
    });

    moverBlocos();
}


//Função responsavel por criar a aleatoriedade do ID
function geraId() {
    let aleatorio;

    do {
        aleatorio = Math.floor(Math.random() * 16);
    } while (vetorID.includes(aleatorio));

    vetorID.push(aleatorio);

    return aleatorio;
}


//Função responsável por mover os blocos
function moverBlocos() {
    var containers = document.querySelectorAll(".tubo");

    // Remove listeners antigos de dragover
    containers.forEach(function (container) {
        container.removeEventListener("dragover", handleDragover);
    });

    // Adiciona novos listeners de dragover
    containers.forEach(function (container) {
        container.addEventListener("dragover", handleDragover);
    });

    function handleDragover(e) {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(this, e.clientY);

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            this.prepend(dragging);
        }
    }
}


//Função para calcular a nova posição ao mover o bloco
function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".bloco:not(.dragging)");
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if (posY >= boxCenterY)
            result = refer_card;
    }

    return result;
}


//Função responsável verificação pela quantidade de blocos e cores
function verificarPontuacao() {
    const containers = document.querySelectorAll(".tubo");
    let completou = false;

    containers.forEach(function (container) {
        const blocos = container.querySelectorAll(".bloco");

        if (blocos.length === 4) { // Verifica se há exatamente 4 blocos no tubo
            const classes = Array.from(blocos).map(bloco => bloco.classList[1]);

            // Verifica se todos os blocos são da mesma cor
            if (new Set(classes).size === 1) {
                completou = true;
            }
        }
    });

    if (completou) {
        verificarVitoria();
    }
}


//Funcao responsável por estilizar a vitoria do jogador
function verificarVitoria() {
    const containers = document.querySelectorAll(".tubo");

    const coresCompletas = new Set();

    containers.forEach(container => {
        const blocos = container.querySelectorAll(".bloco");
        if (blocos.length === 4) { // Verifica se o tubo tem 4 blocos
            const classes = Array.from(blocos).map(bloco => bloco.classList[1]);
            // Verifica se todos os blocos do tubo são da mesma cor

            if (new Set(classes).size === 1) {
                coresCompletas.add(classes[0]); // Adiciona a cor ao conjunto
            }
        }
    });

    if (coresCompletas.size === 4) {
        alert("GANHOU PAPAI");
    }
}


//Função responsável por pontuar e modificar o score
function atualizarPontuacao() {
    var contador = document.querySelector("#contador");

    pontuacao += 10;
    contador.innerHTML = pontuacao;
}


//Função reset que irá apagar e criar novamente os quadrados via button
function reset() {
    var containers = document.querySelectorAll(".tubo");

    containers.forEach(function (container) {
        container.innerHTML = "";
    });

    vetorID = [];

    pontuacao = 0;
    document.querySelector("#contador").innerHTML = pontuacao;

    criaBloco();
}