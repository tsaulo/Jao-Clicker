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
    { id: 1, nome: 'Álcool', inicio: 17, preco: 17, quantidade: 0, sps: 1, mult: 1, 
        quote: 'Quero dizer que esse álcool que me desce...' },
    { id: 2, nome: '..........', inicio: 178, preco: 178, quantidade: 0, sps: 5, mult: 1, quote: '?' },  
    { id: 3, nome: 'Cruz', inicio: 1313, preco: 1313, quantidade: 0, sps: 10, mult: 1, 
        quote: 'Porra, a gente se ama, isso é lindo demais!' }, 
    { id: 4, nome: 'Monstro', inicio: 4619, preco: 4619, quantidade: 0, sps: 50, mult: 1, 
        quote: 'Eu tenho fogo no olhar...' },
    { id: 5, nome: 'Arqueiro', inicio: 9102, preco: 9102, quantidade: 0, sps: 100, mult: 1, 
        quote: 'Sou um anti-herói em queda na mira de um arqueiro' },  
    { id: 6, nome: '............', inicio: 21119, preco: 21119, quantidade: 0, sps: 500, mult: 1, quote: '?' },  
    { id: 7, nome: 'Hotel', inicio: 77777, preco: 77777, quantidade: 0, sps: 1000, mult: 1, 
        quote: '7 bocas com 7 segredos no quarto 7 do Hotel San Diego.' },
    { id: 8, nome: 'Prédio', inicio: 101019, preco: 101019, quantidade: 0, sps: 5000, mult: 1, 
        quote: 'Uma noite no alto de um prédio...' },  
    { id: 9, nome: 'Navio', inicio: 500000, preco: 500000, quantidade: 0, sps: 10000, mult: 1, 
        quote: 'Eu sinto o vento trazendo algo novo!' },
    { id: 10, nome: 'Doce', inicio: 1000000, preco: 1000000, quantidade: 0, sps: 50000, mult: 1, 
        quote: 'Verde limão, várias cores...' },  
    { id: 11, nome: '...............', inicio: 5000000, preco: 5000000, quantidade: 0, sps: 100000, mult: 1, quote: '?' }, 
    { id: 12, nome: '...................', inicio: 10000000, preco: 10000000, quantidade: 0, sps: 500000, mult: 1, quote: '?' },
    { id: 13, nome: 'Gameboy', inicio: 50000000, preco: 50000000, quantidade: 0, sps: 1000000, mult: 1, 
        quote: 'Seu brinquedo, seu herói!' },  
    { id: 14, nome: 'Rádio', inicio: 100000000, preco: 100000000, quantidade: 0, sps: 5000000, mult: 1, 
        quote: 'Eu tenho um sonho... eu tenho um sonho...' },  
    { id: 15, nome: 'Locadora', inicio: 500000000, preco: 500000000, quantidade: 0, sps: 10000000, mult: 1, 
        quote: 'Virando a noite toda lá na Praça Sete' },
    { id: 16, nome: '..........', inicio: 1000000000, preco: 1000000000, quantidade: 0, sps: 50000000, mult: 1, quote: '?' },  
];

loja = loja.map(item => ({
    ...item,
    desc: `Aumenta o SPS em ${item.sps * item.mult}.`
}));

// APRIMORAMENTOS

const loboaprimoramento = document.getElementById('loboaprimoramento');

let aprimoramentos = [
    { id: 1, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 2, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 3, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 4, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 5, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 6, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 7, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 8, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 9, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 10, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 11, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 12, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 13, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 14, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 15, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 16, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 17, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 18, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 19, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 20, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 21, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
    quote: 'Nada do que você diz faz sentido algum...', preco: 100, tipo: "mItem", mod: 1.5, IDItem: 2 },

    { id: 22, nome: 'Cigarro', desc: 'Aumenta o poder do clique em 50%',
    quote: 'Você me ensina a fumar?', preco: 25, tipo: "clique", mod: 1.5 },

    { id: 23, nome: 'Ressaca', desc: 'Aumenta a produção do Álcool em 50%',
    quote: 'E de bar em bar, terminei no mar.', preco: 50, tipo: "mItem", mod: 1.5, IDItem: 1 },

    { id: 24, nome: 'Própria Caminhada', desc: 'Aumenta a produção do Lobo em 50%',
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

// Criar uma única div para os detalhes dos aprimoramentos
const detalhesApri = document.createElement('div');
detalhesApri.className = 'detalhes-aprimoramento';
detalhesApri.style.position = 'absolute';
detalhesApri.style.color = 'black';
detalhesApri.style.backgroundColor = 'white';
detalhesApri.style.width = 'max-content';
detalhesApri.style.cursor = 'auto';
detalhesApri.style.border = '1px solid black';
detalhesApri.style.padding = '10px';
detalhesApri.style.display = 'none';
detalhesApri.style.zIndex = '1000';
document.body.appendChild(detalhesApri);

function updateAprimoramentos(){
    loboaprimoramento.innerHTML = ''; // Limpa a lista

    aprimoramentos.forEach(apri => {
        const botAp = document.createElement('button');
        botAp.className = 'algumAprimoramento';
        botAp.style.cursor = "pointer";
        botAp.innerHTML = `<strong>${apri.id}</strong>`;
        botAp.disabled = streams < apri.preco;

        // Evento para exibir detalhes sem recriar a div
        botAp.addEventListener('mouseenter', (event) => {
            detalhesApri.style.display = 'block';
            detalhesApri.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-weight: bold;">
                    <div style="padding-right: 1rem;">${apri.nome}</div><div>${apri.preco} streams</div>
                </div>
                <div style="border-top: 0.1rem solid black; padding-top: 0.5rem; margin-top: 0.5rem;">${apri.desc}</div>
                <div style="text-align: right; font-size: small; padding-top: 0.25rem; color: red; font-style: italic;">"${apri.quote}"</div>
                <div style="border-top: 0.1rem solid black; font-size: x-small; padding-top: 0.5rem; margin-top: 0.5rem; text-align: center; font-weight: bold;">Clique para comprar.</div>
            `;

            // Define a posição fixa ao lado do botão
            const botApRect = botAp.getBoundingClientRect();
            detalhesApri.style.left = `${botApRect.right + 10}px`;
            detalhesApri.style.top = `${botApRect.top}px`;
        });

        // Evento para esconder a div de detalhes
        botAp.addEventListener('mouseleave', () => {
            detalhesApri.style.display = 'none';
        });

        botAp.addEventListener('click', () => {
            aprimorar(apri.id);
            detalhesApri.style.display = 'none'; // Esconder a div ao comprar
        });

        //if(apri.id > 5 && streams < apri.preco/5){
        //    botAp.style.visibility = "hidden";
        //}

        loboaprimoramento.appendChild(botAp);
    });
}

// Atualiza a loja (botões)
const detalhesLoja = document.createElement('div');
detalhesLoja.className = 'detalhes-loja';
detalhesLoja.style.position = 'absolute';
detalhesLoja.style.color = 'black';
detalhesLoja.style.backgroundColor = 'white';
detalhesLoja.style.width = 'max-content';
detalhesLoja.style.cursor = 'auto';
detalhesLoja.style.border = '1px solid black';
detalhesLoja.style.padding = '10px';
detalhesLoja.style.display = 'none';
detalhesLoja.style.zIndex = '1000';
document.body.appendChild(detalhesLoja);

function updateLoja() {
    loboloja.innerHTML = ''; // Limpa a loja

    loja.forEach(item => {
        const spsTotal = item.sps * item.mult;
        item.desc = `Aumenta o SPS em <strong>${spsTotal}</strong>.`;

        const botao = document.createElement('button');
        botao.className = 'itemDaLoja';
        botao.innerHTML = 
        `<div style= "width: max-content; font-size: 2.2rem; font-weight: 600; float: left; padding-right: 2%; padding-left: 1%;">${item.quantidade}</div> 
        ${item.nome}<br/>${item.preco} streams`;

        // Evento para mostrar a div de detalhes sem recriá-la
        botao.addEventListener('mouseenter', () => {
            detalhesLoja.style.display = 'block';
            detalhesLoja.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-weight: bold;">
                    <div style="padding-right: 1rem;">${item.nome}</div><div>${item.preco} streams</div>
                </div>
                <div style="border-top: 0.1rem solid black; padding-top: 0.5rem; margin-top: 0.5rem;">${item.desc}</div>
                <div style="text-align: right; font-size: small; padding-top: 0.25rem; color: red; font-style: italic;">"${item.quote}"</div>
                <div style="border-top: 0.1rem solid black; font-size: x-small; padding-top: 0.5rem; margin-top: 0.5rem; text-align: center; font-weight: bold;">Clique para comprar.</div>
            `;

            // Define a posição fixa ao lado do botão
            const botaoRect = botao.getBoundingClientRect();
            detalhesLoja.style.left = `${botaoRect.right + 10}px`;
            detalhesLoja.style.top = `${botaoRect.top}px`;
        });

        // Evento para esconder a div de detalhes
        botao.addEventListener('mouseleave', () => {
            detalhesLoja.style.display = 'none';
        });

        if(item.id != 1 && streams < item.inicio/3 && item.quantidade == 0){
        botao.style.visibility = "hidden";
        }

        botao.disabled = streams < item.preco;
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
    document.getElementById("meio").style.backgroundImage="url(fotocas/LOBOS.png)";

}

function antiheroi() {
    document.getElementById("imagem").src = ah;
    document.getElementById("meio").style.backgroundImage="url(fotocas/ANTIHEROI.png)";
}

function pirata() {
    document.getElementById("imagem").src = p;
    document.getElementById("meio").style.backgroundImage="url(fotocas/PIRATA.png)";
}

function superr() {
    document.getElementById("imagem").src = s;
    document.getElementById("meio").style.backgroundImage="url(fotocas/SUPER.png)";
}
