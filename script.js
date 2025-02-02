function criaBloco() {
    let containerTubos = document.querySelectorAll(".tubo");
    // recebendo a referencia de todos os tubos

    containerTubos.forEach(containerTubo => {
        for(var i = 0; i < 4; i++) {
            var bloco = document.createElement("div");

            bloco.setAttribute("class", "bloco");

            containerTubo.appendChild(bloco);

        }
    });

    
}