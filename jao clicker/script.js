var streams = 0;
var numero = 1;
var modificadorC = 1;
var sps = 0; 
var modificadorS = 1;

document.addEventListener("DOMContentLoaded", () => {
    atualizarInterface();
    updateLoja();
    document.getElementById('sps').innerHTML = sps;
    
    // Aumenta os streams automaticamente com base no SPS a cada 1 segundo
    setInterval(aumentarStreamsPorSegundo, 1000); // A cada 1 segundo
});

// LOJA
const loboloja = document.getElementById('loboloja');

let loja = [
    { id: 1, nome: 'Vinho Barato', inicio: 13, preco: 13, quantidade: 0, sps: 1 },
    { id: 2, nome: 'Lobo', inicio: 311, preco: 178, quantidade: 0, sps: 5 },  
    { id: 3, nome: 'Cruz', inicio: 2013, preco: 2013, quantidade: 0, sps: 10 },  
];

// Atualiza a interface
function atualizarInterface() {
    document.getElementById('streams').innerText = parseFloat(streams.toFixed(2));
    document.getElementById('sps').innerText = parseFloat(sps.toFixed(2));
}

// Função para clicar e aumentar os streams
function clicar() {
    streams = (streams + numero) * modificadorC;
    atualizarInterface();
    updateLoja();  // Atualiza a loja após clicar
}

// COMPRAS
function comprar(itemID) {
    const item = loja.find(i => i.id === itemID);

    if (!item) {
        console.error(`Item com ID ${itemID} não encontrado.`);
        return;
    }

    if (streams >= item.preco) {
        streams -= item.preco; // Deduz o preço dos streams
        item.quantidade++; // Aumenta a quantidade comprada
        item.preco = Math.round(item.inicio * Math.pow(1.2, item.quantidade)); // Atualiza o preço

        // Atualiza os streams por segundo com base no item comprado
        sps = sps + (item.sps * modificadorS); // Adiciona o SPS do item comprado

        console.log(`Comprado: ${item.nome} - Novo preço: ${item.preco} - Streams restantes: ${streams}`);
        atualizarInterface(); // Atualiza os streams
        updateLoja(); // Atualiza a loja
    } else {
        console.warn("Streams insuficientes!");
    }
}

// Atualiza a loja (botões)
function updateLoja() {
    loboloja.innerHTML = ''; // Limpa a loja

    loja.forEach(item => {
        const botao = document.createElement('button');
        botao.className = 'itemDaLoja';
        botao.textContent = `${item.nome} - ${item.preco} streams (Qtd: ${item.quantidade})`;

        // Habilita o botão se tiver streams suficientes
        botao.disabled = streams < item.preco;

        // Quando o botão é clicado, chama a função comprar
        botao.addEventListener('click', () => comprar(item.id));

        loboloja.appendChild(botao);
    });
}

// Função para aumentar os streams por segundo
function aumentarStreamsPorSegundo() {
    streams += sps; // Aumenta os streams de acordo com os SPS acumulados
    atualizarInterface(); // Atualiza a interface para mostrar o novo valor de streams
}

// SKINS
const l = "fotocas/lobos sem fundo.png";
const ah = "fotocas/anti heroi sem fundo.png";
const p = "fotocas/pirata sem fundo.png";
const s = "fotocas/super sem fundo.png";

function lobos() {
    document.getElementById("imagem").src = l;

}

function antiheroi() {
    document.getElementById("imagem").src = ah;
}

function pirata() {
    document.getElementById("imagem").src = p;
}

function superr() {
    document.getElementById("imagem").src = s;
}
