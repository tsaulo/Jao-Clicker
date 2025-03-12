var streams = 0;
var agora;
const l = "fotocas/lobos sem fundo.png";
const ah = "fotocas/anti heroi sem fundo.png"
const p = "fotocas/pirata sem fundo.png"
const s = "fotocas/super sem fundo.png"


document.getElementById('streams').innerHTML = streams;


function clicar(numero){
    streams = streams + numero;
    document.getElementById('streams').innerHTML = streams;
}

function lobos(){
    document.getElementById("imagem").src = l;
}

function antiheroi(){
    document.getElementById("imagem").src = ah;
}

function pirata(){
    document.getElementById("imagem").src = p;
}

function superr(){
    document.getElementById("imagem").src = s;
}