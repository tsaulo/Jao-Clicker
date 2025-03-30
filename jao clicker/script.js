let streams = 100000;
let numero = 1;
let modificadorC = 1;
let sps = 0;
let skin = "skinLobos";

document.addEventListener("DOMContentLoaded", () => {
  carregar();
  escolhaSkin(skin);
  atualizarInterface();

  updateLoja();
  updateAprimoramentos();
  document.getElementById("sps").innerHTML = sps;

  // Aumenta os streams automaticamente com base no SPS a cada 1 segundo
  setInterval(aumentarStreamsPorSegundo, 100);
  setInterval(updateLoja, 1000);
  setInterval(updateAprimoramentos, 1000);
  setInterval(salvar, 30000);
});

function salvar() {
  let salvo = {
    streams,
    modificadorC,
    sps,
    loja,
    aprimoramentos,
    skin,
  };
  localStorage.setItem("salvo", JSON.stringify(salvo));
}

function carregar() {
  const data = localStorage.getItem("salvo");
  if (data) {
    let arquivo = JSON.parse(data);
    if (arquivo.streams) streams = arquivo.streams;
    if (arquivo.modificadorC) modificadorC = arquivo.modificadorC;
    if (arquivo.sps) sps = arquivo.sps;
    if (arquivo.loja) loja = arquivo.loja;
    if (arquivo.aprimoramentos) aprimoramentos = arquivo.aprimoramentos;
    if (arquivo.skin) skin = arquivo.skin;
  }
}

// LOJA
const loboloja = document.getElementById("loboloja");

let loja = [
  {
    id: 1,
    nome: "Cover",
    inicio: 10,
    preco: 10,
    quantidade: 0,
    sps: 0.1,
    mult: 1,
    quote: "Um bom cover nas redes sociais aumenta o número de streams.",
  },
  {
    id: 2,
    nome: "Karaoke",
    inicio: 100,
    preco: 100,
    quantidade: 0,
    sps: 1,
    mult: 1,
    quote: "Monopoliza o karaoke de um barzinho para mais streams.",
  },
  {
    id: 3,
    nome: "Música Autoral",
    inicio: 1313,
    preco: 1313,
    quantidade: 0,
    sps: 13,
    mult: 1,
    quote: "Gera streams numa plataforma de música.",
  },
  {
    id: 4,
    nome: "Pocket Show",
    inicio: 10000,
    preco: 10000,
    quantidade: 0,
    sps: 50,
    mult: 1,
    quote: "Uma experiência intimista para impulsionar os streams.",
  },
  {
    id: 5,
    nome: "Videoclipe",
    inicio: 100000,
    preco: 100000,
    quantidade: 0,
    sps: 100,
    mult: 1,
    quote: "Promove streams por meio de um clipe de um single.",
  },
  {
    id: 6,
    nome: "Colaboração",
    inicio: 1000000,
    preco: 1000000,
    quantidade: 0,
    sps: 1000,
    mult: 1,
    quote: "Um feat. com outro artista para provocar streams.",
  },
  {
    id: 7,
    nome: "Turnê",
    inicio: 1000000,
    preco: 1000000,
    quantidade: 0,
    sps: 5000,
    mult: 1,
    quote: "Estimula os fãs a gerarem streams depois do show.",
  },
  {
    id: 8,
    nome: "Merch",
    inicio: 10000000,
    preco: 10000000,
    quantidade: 0,
    sps: 10000,
    mult: 1,
    quote: "Mercadoria oficial que incentiva os streams.",
  },
  {
    id: 9,
    nome: "Festival",
    inicio: 100000000,
    preco: 100000000,
    quantidade: 0,
    sps: 100000,
    mult: 1,
    quote:
      "Apresentar-se num festival faz pessoas que não te conheciam antes te darem streams.",
  },
  {
    id: 10,
    nome: "Parceria",
    inicio: 10000000,
    preco: 10000000,
    quantidade: 0,
    sps: 1000000,
    mult: 1,
    quote: "Uma parceria com uma marca famosa que estimula streams.",
  },
];

loja = loja.map((item) => ({
  ...item,
  desc: `,
    total: `,
}));

// APRIMORAMENTOS

const loboaprimoramento = document.getElementById("loboaprimoramento");

let aprimoramentos = [
  {
    id: 1,
    nome: "Cigarro",
    desc: "Aumenta o poder do clique em 50%",
    quote: "Você me ensina a fumar?",
    preco: 25,
    tipo: "clique",
    mod: 1.5,
    req: 0,
  },

  {
    id: 2,
    nome: "Ressaca",
    desc: "Aumenta a produção do Álcool em 50%",
    quote: "E de bar em bar, terminei no mar.",
    preco: 50,
    tipo: "mItem",
    mod: 1.5,
    IDItem: 1,
    req: 1,
  },

  {
    id: 3,
    nome: "Própria Caminhada",
    desc: "Aumenta a produção do Lobo em 50%",
    quote: "Nada do que você diz faz sentido algum...",
    preco: 100,
    tipo: "mItem",
    mod: 1.5,
    IDItem: 2,
    req: 1,
  },
];

// Atualiza a interface
function atualizarInterface() {
  document.getElementById("streams").innerText = parseFloat(streams.toFixed(1));
  document.getElementById("sps").innerText = parseFloat(sps.toFixed(1));
}

function calcSPS() {
  sps = 0;
  loja.forEach((item) => {
    sps += item.sps * item.quantidade * item.mult;
  });
}

// Função para clicar e aumentar os streams
function clicar() {
  streams += numero * modificadorC;
  atualizarInterface();
  updateLoja(); // Atualiza a loja após clicar
  updateAprimoramentos();
}

function aprimorar(apriID) {
  const apri = aprimoramentos.findIndex((a) => a.id === apriID);

  if (apri !== -1 && streams >= aprimoramentos[apri].preco) {
    const aprimoramento = aprimoramentos[apri];
    streams -= aprimoramento.preco;

    if (aprimoramento.tipo == "clique") {
      modificadorC *= aprimoramento.mod;
    } else if (aprimoramento.tipo == "mItem") {
      const itemAP = loja.find((i) => i.id === aprimoramento.IDItem);
      if (itemAP) {
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
  const item = loja.find((i) => i.id === itemID);

  if (!item) {
    console.error(`Item com ID ${itemID} não encontrado.`);
    return;
  }

  if (streams >= item.preco) {
    streams -= item.preco; // Deduz o preço dos streams
    item.quantidade++; // Aumenta a quantidade comprada
    item.preco = Math.round(item.inicio * Math.pow(1.15, item.quantidade)); // Atualiza o preço

    // Atualiza os streams por segundo com base no item comprado
    sps += item.sps * item.mult; // Adiciona o SPS do item comprado

    console.log(
      `Comprado: ${item.nome} - Novo preço: ${item.preco} - Streams restantes: ${streams}`
    );
    atualizarInterface(); // Atualiza os streams
    updateLoja(); // Atualiza a loja
  } else {
    console.warn("Streams insuficientes!");
  }
}

// Criar uma única div para os detalhes dos aprimoramentos
const detalhesApri = document.createElement("div");
detalhesApri.className = "detalhes-aprimoramento";
detalhesApri.style.position = "absolute";
detalhesApri.style.color = "black";
detalhesApri.style.backgroundColor = "white";
detalhesApri.style.width = "max-content";
detalhesApri.style.cursor = "auto";
detalhesApri.style.border = "1px solid black";
detalhesApri.style.padding = "10px";
detalhesApri.style.display = "none";
detalhesApri.style.zIndex = "1000";
document.body.appendChild(detalhesApri);

function updateAprimoramentos() {
  loboaprimoramento.innerHTML = ""; // Limpa a lista

  aprimoramentos.forEach((apri) => {
    if (apri.IDItem !== undefined) {
      const item = loja.find((i) => i.id === apri.IDItem);
      if (item && item.quantidade < apri.req) {
        return; // Pula a criação do botão se a quantidade for insuficiente
      }
    }
    const botAp = document.createElement("button");
    botAp.className = "algumAprimoramento";
    botAp.style.cursor = "pointer";
    botAp.innerHTML = `<strong>${apri.id}</strong>`;
    botAp.disabled = streams < apri.preco;

    // Evento para exibir detalhes sem recriar a div
    botAp.addEventListener("mouseenter", (event) => {
      detalhesApri.style.display = "block";
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
    botAp.addEventListener("mouseleave", () => {
      detalhesApri.style.display = "none";
    });

    botAp.addEventListener("click", () => {
      aprimorar(apri.id);
      detalhesApri.style.display = "none"; // Esconder a div ao comprar
    });

    if (apri.id > 1 && streams < apri.preco / 5) {
      botAp.style.visibility = "hidden";
    }

    loboaprimoramento.appendChild(botAp);
  });
}

// Atualiza a loja (botões)
const detalhesLoja = document.createElement("div");
detalhesLoja.className = "detalhes-loja";
detalhesLoja.style.position = "absolute";
detalhesLoja.style.color = "black";
detalhesLoja.style.backgroundColor = "white";
detalhesLoja.style.width = "max-content";
detalhesLoja.style.cursor = "auto";
detalhesLoja.style.border = "1px solid black";
detalhesLoja.style.padding = "10px";
detalhesLoja.style.display = "none";
detalhesLoja.style.zIndex = "1000";
document.body.appendChild(detalhesLoja);

function updateLoja() {
  loboloja.innerHTML = ""; // Limpa a loja

  loja.forEach((item) => {
    const spsTotal = item.sps * item.mult;
    const spsAtual = spsTotal * item.quantidade;
    item.desc = `Aumenta o SPS em <strong>${parseFloat(
      spsTotal.toFixed(1)
    )}</strong>`;
    item.total = `Atualmente responsável por <strong>${parseFloat(
      spsAtual.toFixed(1)
    )}</strong> SPS.`;

    const botao = document.createElement("button");
    botao.className = "itemDaLoja";
    botao.innerHTML = `<div style= "width: max-content; font-size: 2.2rem; font-weight: 600; float: left; padding-right: 2%; padding-left: 1%;">${item.quantidade}</div> 
        ${item.nome}<br/>${item.preco} streams`;

    // Evento para mostrar a div de detalhes sem recriá-la
    botao.addEventListener("mouseenter", () => {
      detalhesLoja.style.display = "block";
      detalhesLoja.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-weight: bold;">
                    <div style="padding-right: 1rem;">${item.nome}</div><div>${item.preco} streams</div>
                </div>
                <div style="border-top: 0.1rem solid black; padding-top: 0.5rem; margin-top: 0.5rem;">${item.desc}</div>
                <div style="font-size: small">${item.total}</div>
                <div style="width: 50%; margin-left: 50%; justify-content: flex-end; text-align: right; font-size: small; padding-top: 0.25rem; color: red; font-style: italic;">"${item.quote}"</div>
                <div style="border-top: 0.1rem solid black; font-size: x-small; padding-top: 0.5rem; margin-top: 0.5rem; text-align: center; font-weight: bold;">Clique para comprar.</div>
            `;

      // Define a posição fixa ao lado do botão
      const botaoRect = botao.getBoundingClientRect();
      detalhesLoja.style.left = `${botaoRect.right + 10}px`;
      detalhesLoja.style.top = `${botaoRect.top}px`;
    });

    // Evento para esconder a div de detalhes
    botao.addEventListener("mouseleave", () => {
      detalhesLoja.style.display = "none";
    });

    if (item.id != 1 && streams < item.inicio / 3 && item.quantidade == 0) {
      botao.style.visibility = "hidden";
    }

    botao.disabled = streams < item.preco;
    botao.addEventListener("click", () => comprar(item.id));

    loboloja.appendChild(botao);
  });
}

// Função para aumentar os streams por segundo
function aumentarStreamsPorSegundo() {
  streams += sps / 10; // Aumenta os streams de acordo com os SPS acumulados
  atualizarInterface(); // Atualiza a interface para mostrar o novo valor de streams
}

// SKINS
const skinLobos = "fotocas/lobos sem fundo.png";
const skinAntiHeroi = "fotocas/anti heroi sem fundo.png";
const skinPirata = "fotocas/pirata sem fundo.png";
const skinSuper = "fotocas/super sem fundo.png";

const skinsBackground = {
  skinLobos: { bg: "fotocas/lobos sem fundo.png", cd: "fotocas/LOBOS.png" },
  skinAntiHeroi: {
    bg: "fotocas/anti heroi sem fundo.png",
    cd: "fotocas/ANTIHEROI.png",
  },
  skinPirata: { bg: "fotocas/pirata sem fundo.png", cd: "fotocas/PIRATA.png" },
  skinSuper: { bg: "fotocas/super sem fundo.png", cd: "fotocas/SUPER.png" },
};

function escolhaSkin(tema) {
  skin = tema;
  const qualSkin = skinsBackground[tema];
  if (qualSkin) {
    document.getElementById("imagem").src = qualSkin.bg;
    document.getElementById(
      "meio"
    ).style.backgroundImage = `url(${qualSkin.cd})`;

    return;
  }
  document.getElementById("imagem").src = skinLobos;
  document.getElementById("meio").style.backgroundImage =
    "url(fotocas/LOBOS.png)";
}
