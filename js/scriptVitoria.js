function placar() {
    var first = document.getElementById("pontuacao1");
    var second = document.getElementById("pontuacao2");
    var third = document.getElementById("pontuacao3");

    comparar();

    first.innerHTML = localStorage.getItem("pontos1");
    second.innerHTML = localStorage.getItem("pontos2");
    third.innerHTML = localStorage.getItem("pontos3");
}

function comparar() {
    var a = parseInt(localStorage.getItem("pontos1")) || 0;
    var b = parseInt(localStorage.getItem("pontos2")) || 0;
    var c = parseInt(localStorage.getItem("pontos3")) || 0;
    var p = parseInt(localStorage.getItem("pontos")) || 0;
    var aux;

    if (p > c) {
        aux = c;
        c = p;
        p = aux;
    }

    if (c > b) {
        aux = b;
        c = b;
        b = aux;
    }

    if (b > a) {
        aux = a;
        b = a;
        a = aux;
    }
    

    localStorage.setItem("pontos1", a);
    localStorage.setItem("pontos2", b);
    localStorage.setItem("pontos3", c);
}