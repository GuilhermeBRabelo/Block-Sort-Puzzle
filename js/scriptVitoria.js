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
    var a = parseInt(localStorage.getItem("pontos1") || "");
    var b = parseInt(localStorage.getItem("pontos2") || "");
    var c = parseInt(localStorage.getItem("pontos3") || "");
    var p = parseInt(localStorage.getItem("pontos") || "");

    var Aux;

    if(p < a){
        Aux = a;
        a = p;
        p = Aux; 
    }

    if(p < b){
        Aux = b;
        b = p;
        p = Aux;
    }

    if(p < c){
        Aux = c;
        c = p;
        p = Aux;
    }

    localStorage.setItem("pontos1", a);
    localStorage.setItem("pontos2", b);
    localStorage.setItem("pontos3", c);
}