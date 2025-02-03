function criaBloco() {

    var bttn = document.querySelector("#bttn");
    var containers = document.querySelectorAll(".tubo");

    containers.forEach(function(container) {
        for (var i = 0; i < 4; i++) {
            var bloco = document.createElement("div");
            bloco.setAttribute("class", "blockCirculo");
            // o erro tá aqui

            container.appendChild(bloco);
        }
    });
}
