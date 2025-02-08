var cores = ["circulo", "triangulo", "quadrado", "x"];
var vetorID = [];
var pontua = 0;

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
        // verificaBlocos();
        mudarPontuação();
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
        // verificaBlocos();
        mudarPontuação();
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


// function verificaBlocos() {
//     const tubos = document.querySelectorAll(".tubo");


// }


//Função responsável por pontuar e modificar o score

function mudarPontuação() {
    var contador = document.querySelector("#contador");

    pontua++;
    
    contador.innerHTML = pontua;

}

//Função reset que irá apagar e criar novamente os quadrados via button
function reset() {
    var containers = document.querySelectorAll(".tubo");
    
    containers.forEach(function(container) {
        container.innerHTML = "";
    });
    
    vetorID = [];
    
    criaBloco();
}