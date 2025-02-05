//função load, responsavel por carregar e criar os blocos
var vetorID = [];

function criaBloco() {

    var bttn = document.querySelector("#bttn");
    var containers = document.querySelectorAll(".tubo");
    // busca todos os elementos tubo

    containers.forEach(function(container) {
        for (var i = 0; i < 4; i++) {
            containers.innerHTML = "";
            var bloco = document.createElement("div");

            bloco.setAttribute("draggable", "true");
            
            var vetorParte = geraId();

            if(vetorParte >= 1 && vetorParte <= 4) {
                bloco.setAttribute("class", "bloco circulo");
            } else if (vetorParte >= 5 && vetorParte <= 8) {
                bloco.setAttribute("class", "bloco quadrado");
            } else if (vetorParte >= 9 && vetorParte <= 12) {
                bloco.setAttribute("class", "bloco triangulo");
            } else{
                bloco.setAttribute("class", "bloco x");
            }

            container.appendChild(bloco);

            bloco = moverBlocos();

        }
    });
}

//função responsavel por criar a aleatoriedade do ID

function geraId() {
    let aleatorio;

    do {
        aleatorio = Math.floor(Math.random() * 16)+1;;
    }   while (vetorID.includes(aleatorio));

    vetorID.push(aleatorio);
        
    return aleatorio;
}

//função responsável por mover os blocos

function moverBlocos() {
    var columns = document.querySelectorAll(".tubo");
    // var columns = document.querySelectorAll("#tubo-vazio");
    document.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging")
    });

    document.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging")
    });

    columns.forEach((item) => {
        item.addEventListener("dragover", (e) => {
            const dragging = document.querySelector(".dragging");
            const applyAfter = getNewPosition(item, e.clientY);

            if(applyAfter) {
                applyAfter.insertAdjacentElement("afterend",dragging);
            } else {
                item.prepend(dragging);
            }
        });
    });

    // var columns = document.querySelectorAll(".tubo");
    var columns = document.querySelectorAll("#tubo-vazio");
    document.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging")
    });

    document.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging")
    });

    columns.forEach((item) => {
        item.addEventListener("dragover", (e) => {
            const dragging = document.querySelector(".dragging");
            const applyAfter = getNewPosition(item, e.clientY);

            if(applyAfter) {
                applyAfter.insertAdjacentElement("afterend",dragging);
            } else {
                item.prepend(dragging);
            }
        });
    });
}

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

//criar a função responsável por pontuar e modificar o score


//criar a função reset que irá apagar e criar novamente os quadrados via button

function reset() {
    var containers = document.querySelectorAll(".tubo");

    // responsavel por apagar os blocos de todos os tubos
    containers.forEach(function(container) {
        container.innerHTML = "";
    });

    criaBloco();
    // chama a função responsavel por cria os blocos
}