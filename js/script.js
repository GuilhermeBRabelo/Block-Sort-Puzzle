var cores = ["circulo", "triangulo", "quadrado", "x"];
var vetorID = [];

//função responsavel por criar os blocos
function criaBloco() {
    var containers = document.querySelectorAll(".tubo");
    var tuboVazio = document.querySelector("#tubo-vazio");
    
    tuboVazio.innerHTML = "";
    
    containers.forEach(function(container) {
        for (let i = 0; i < 4; i++) {
            var bloco = document.createElement("div");

            bloco.setAttribute("draggable", "true");
            
            var id = geraId();
            bloco.setAttribute("id", id);
           
            let classe = parseInt(id / 4);
            bloco.setAttribute("class", "bloco "+cores[classe]);

            container.appendChild(bloco);

            bloco = moverBlocos();
        }
    });
}

//função responsavel por criar a aleatoriedade do ID
function geraId() {
    let aleatorio;

    do {
        aleatorio = Math.floor(Math.random() * 16);
    }   while (vetorID.includes(aleatorio));

    vetorID.push(aleatorio);
        
    return aleatorio;
}

//função responsável por mover os blocos
function moverBlocos() {
    var container = document.querySelectorAll(".tubo");

    document.addEventListener("dragstart", function(e) {
        e.target.classList.add("dragging");
    });
    
    document.addEventListener("dragend", function(e) {
        e.target.classList.remove("dragging");
        verificaBlocos();
    });
    
    container.forEach(function(item) {
        item.addEventListener("dragover", function(e) {
            const dragging = document.querySelector(".dragging");
            const applyAfter = getNewPosition(item, e.clientY);
    
            if (applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                item.prepend(dragging);
            }
        });
    });

    // repete a função para o container-vazio trabalhar
    
    var containerVazio = document.querySelectorAll("#tubo-vazio");
    document.addEventListener("dragstart", function(e) {
        e.target.classList.add("dragging");
    });
    
    document.addEventListener("dragend", function(e) {
        e.target.classList.remove("dragging");
        verificaBlocos();
    });
    
    containerVazio.forEach(function(item) {
        item.addEventListener("dragover", function(e) {
            const dragging = document.querySelector(".dragging");
            const applyAfter = getNewPosition(item, e.clientY);
    
            if (applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                item.prepend(dragging);
            }
        });
    });
}

// Função para calcular a nova posição ao mover o bloco
function getNewPosition(column,posY){
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result;

    for (let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if(posY >= boxCenterY)
        result = refer_card;
    }

    return result;
}














// Função para verificar se todas as colunas estão corretas
function verificaBlocos() {
    var tubos = document.querySelectorAll(".tubo");

    // Percorre os tubos
    for (var i = 0; i < tubos.length; i++) {
        var blocos = tubos[i].querySelectorAll(".bloco");

        // Percorre os blocos e verifica sequências de 4 blocos consecutivos
        for (var j = 0; j < blocos.length - 3; j++) {
            var cores = [blocos[j], blocos[j + 1], blocos[j + 2], blocos[j + 3]].map(function(bloco) {
                return bloco.classList[1];  // Pega a cor de cada bloco
            });

            // Verifica se todos os blocos têm a mesma cor
            if (cores.every(function(cor) { return cor === cores[0]; })) {
                console.log("Encontrados 4 blocos da mesma cor!");
                
                // Chama verificarVitoria se encontrar a sequência
                verificarVitoria();
                return;  // Interrompe a função após encontrar a sequência
            }
        }
    }
}


function verificarVitoria() {
    var tubos = document.querySelectorAll(".tubo");

    // Percorre os tubos (colunas)
    for (var i = 0; i < tubos.length; i++) {
        var blocos = tubos[i].querySelectorAll(".bloco");

        // Se a coluna não tiver exatamente 4 blocos, não pode haver vitória
        if (blocos.length !== 4) {
            alert("Você não ganhou!");
            return;  // Encerra a função imediatamente
        }

        var cor = blocos[0].classList[1];  // Pega a cor do primeiro bloco

        // Verifica se todos os blocos da coluna têm a mesma cor
        if (!Array.from(blocos).every(function(bloco) {
            return bloco.classList[1] === cor;  // Verifica se todos têm a mesma cor
        })) {
            alert("Você não ganhou!");
            return;  // Encerra a função imediatamente se a condição não for atendida
        }
    }

    // Se todas as colunas forem válidas, o jogador ganhou
    alert("Você ganhou!");
}






















//Função responsável por pontuar e modificar o score

//Função reset que irá apagar e criar novamente os quadrados via button
function reset() {
    var containers = document.querySelectorAll(".tubo");
    
    containers.forEach(function(container) {
        container.innerHTML = "";
    });
    
    vetorID = [];
    
    criaBloco();
}