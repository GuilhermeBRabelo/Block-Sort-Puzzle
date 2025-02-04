//função load, responsavel por carregar e criar os blocos

function criaBloco() {

    var bttn = document.querySelector("#bttn");
    var containers = document.querySelectorAll(".tubo");

    containers.forEach(function(container) {
        for (var i = 0; i < 4; i++) {
            var bloco = document.createElement("div");

            bloco.addEventListener("click", alterarbox);
            // encontrar o evento que consiga mover os blocos para outros tubos
            
            // aqui eu chamo a função random e defino via condição aritmetica qual será a classe do bloco
            var imprime = geraId();
            console.log(imprime);

            if(imprime %2 == 0) {
                bloco.setAttribute("class", "bloco circulo");
            } else if (imprime %3 == 0) {
                bloco.setAttribute("class", "bloco quadrado");
            } else if (imprime %5 == 0) {
                bloco.setAttribute("class", "bloco triangulo");
            } else {
                bloco.setAttribute("class", "bloco x");
            }

            container.appendChild(bloco);
        }
    });

}

//função responsavel por criar a aleatoriedade do ID

function geraId() {
    var id = Math.floor(Math.random() * 18);
    return id;
}

//função responsável por mover os blocos

function alterarbox() {

    this.style.backgroundColor = "yellow";

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



