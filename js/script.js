var vetorID = [];
//função load, responsavel por carregar e criar os blocos

var cores = ["circulo", "triangulo", "quadrado", "x"];

function criaBloco() {
    
    var containers = document.querySelectorAll(".tubo");
    // busca todos os elementos tubo
    
    containers.forEach((element) => console.log("ok"));
    
    containers.forEach(function(container) {
        for (let i = 0; i < 4; i++) {
            var bloco = document.createElement("div");

            bloco.setAttribute("draggable", "true");
            
            var id = geraId();
            bloco.setAttribute("id", id);
            // puxa a funcao id
           
            let classe = parseInt(id / 4);
            bloco.setAttribute("class", "bloco "+cores[classe]);
            console.log(cores[classe]);

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

    containers.forEach(function(container) {

        container.innerHTML = "";

        // for (let i = 0; i < 4; i++) {
           
        //     // while (container.hasChildNodes()) {
        //     //     container.removeChild(container.firstChild);
        //     // } 

        //     container.innerHTML = "";
        // }
    });

    vetorID = [];

    criaBloco();
}