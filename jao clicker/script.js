var streams = 0;
var numero = 1;
var modificadorC = 1;
var sps = 0; 

document.addEventListener("DOMContentLoaded", () => {
    atualizarInterface();
    updateLoja();
    updateAprimoramentos();
    document.getElementById('sps').innerHTML = sps;
    
    // Aumenta os streams automaticamente com base no SPS a cada 1 segundo
    setInterval(aumentarStreamsPorSegundo, 1000);
    setInterval(updateLoja, 1000);
});

// LOJA
const loboloja = document.getElementById('loboloja');

let loja = [
    { id: 1, nome: 'Vinho Barato', inicio: 13, preco: 13, quantidade: 0, sps: 1, mult: 1 },
    { id: 2, nome: 'Lobo', inicio: 311, preco: 178, quantidade: 0, sps: 5, mult: 1 },  
    { id: 3, nome: 'Cruz', inicio: 2013, preco: 2013, quantidade: 0, sps: 10, mult: 1 },  
];

// APRIMORAMENTOS

const loboaprimoramento = document.getElementById('loboaprimoramento');

let aprimoramentos = [
    { id: 1, nome: 'App de Streaming', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Taca stream na lenda!', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 2, nome: 'Cigarro', desc: 'Aumenta a produção do Vinho Barato em 50%',
    quote: 'Você me ensina a fumar?', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 3, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },
];

// Atualiza a interface
function atualizarInterface() {
    document.getElementById('streams').innerText = parseFloat(streams.toFixed(2));
    document.getElementById('sps').innerText = parseFloat(sps.toFixed(2));
}

function calcSPS(){
    sps = 0;
    loja.forEach(item => {
        sps += item.sps * item.quantidade * item.mult;
    });
}

// Função para clicar e aumentar os streams
function clicar() {
    streams += numero * modificadorC;
    atualizarInterface();
    updateLoja();  // Atualiza a loja após clicar
    updateAprimoramentos();
}

function aprimorar(apriID){
    const apri = aprimoramentos.findIndex(a => a.id === apriID);
    
    if(apri !== -1 && streams >= aprimoramentos[apri].preco){
        const aprimoramento = aprimoramentos[apri];
        streams -= aprimoramento.preco;

        if(aprimoramento.tipo == "clique"){
            modificadorC *= aprimoramento.mod;
        } else if (aprimoramento.tipo == "mItem"){
            const itemAP = loja.find(i => i.id === aprimoramento.IDItem);
            if(itemAP){
                itemAP.mult *= aprimoramento.mod;
                calcSPS();
            }
        }
        aprimoramentos.splice(apri, 1);
        
        atualizarInterface();
        updateAprimoramentos();
    }
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
        sps += item.sps * item.mult; // Adiciona o SPS do item comprado

        console.log(`Comprado: ${item.nome} - Novo preço: ${item.preco} - Streams restantes: ${streams}`);
        atualizarInterface(); // Atualiza os streams
        updateLoja(); // Atualiza a loja
    } else {
        console.warn("Streams insuficientes!");
    }
}

function updateAprimoramentos(){
    loboaprimoramento.innerHTML = '';

    aprimoramentos.forEach(apri => {
        const botAp = document.createElement('button');
        botAp.className = 'algumAprimoramento';
        botAp.style.cursor = "pointer";
        botAp.textContent = `${apri.nome} - ${apri.preco} streams`;
        botAp.disabled = streams < apri.preco;

        botAp.addEventListener('click', () => aprimorar(apri.id));

        loboaprimoramento.appendChild(botAp);
        
    });
}

// Atualiza a loja (botões)
function updateLoja() {
    loboloja.innerHTML = ''; // Limpa a loja

    loja.forEach(item => {
        const botao = document.createElement('button');
        botao.className = 'itemDaLoja';
        botao.innerHTML = `
        <div style="font-size: x-large; font-weight: bold; text-align: right; margin-top:-5%; margin-right: -3%;">${item.quantidade}</div>
        <div style="font-size: medium; font-weight: normal; text-align: left; padding-top: 0%">${item.nome}<br/>${item.preco} streams</div>`;

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
    document.getElementById("pqp").style.backgroundImage="url(fotocas/LOBOS.png)";

}

function antiheroi() {
    document.getElementById("imagem").src = ah;
    document.getElementById("pqp").style.backgroundImage="url(fotocas/ANTIHEROI.png)";
}

function pirata() {
    document.getElementById("imagem").src = p;
    document.getElementById("pqp").style.backgroundImage="url(fotocas/PIRATA.png)";
}

function superr() {
    document.getElementById("imagem").src = s;
    document.getElementById("pqp").style.backgroundImage="url(fotocas/SUPER.png)";
}
