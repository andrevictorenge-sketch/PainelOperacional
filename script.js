// 1. Configurações
const DATA_LIMITE = new Date("May 08, 2026 08:00:00").getTime();
// COLE AQUI O LINK QUE GEROU NO PASSO 1 (TERMINADO EM output=csv)
const LINK_PLANILHA_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS...SuaChave.../pub?output=csv";

// 2. Função para Carregar Dados da Planilha
async function carregarDadosPlanilha() {
    try {
        const resposta = await fetch(LINK_PLANILHA_CSV);
        const dadosRaw = await resposta.text();
        
        // Divide o CSV em linhas e colunas
        const linhas = dadosRaw.split('\n');
        
        // Supondo que na sua planilha:
        // Linha 2, Coluna A (Índice [1] e [0]) seja o Total de Registros
        const dadosLinha2 = linhas[1].split(',');
        const totalRegistros = dadosLinha2[0]; 

        // Atualiza o HTML
        document.getElementById('total-registros').innerText = totalRegistros;
        
        console.log("Dados carregados com sucesso!");
    } catch (erro) {
        console.error("Erro ao carregar planilha:", erro);
    }
}
// 3. Controle de Navegação (SPA)
function showSection(id) {
    // Esconde todas
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
    // Mostra a selecionada
    document.getElementById(id).classList.remove('hidden');
    
    // Rola para o topo suavemente ao trocar de aba
    document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });
}

// 3.1. Contador Regressivo e Status
function updateCountdown() {
    const agora = new Date().getTime();
    const distancia = DATA_LIMITE - agora;
    const statusBadge = document.getElementById('status-badge');

    if (distancia < 0) {
        document.getElementById("countdown").innerHTML = "OPERAÇÃO EM ANDAMENTO";
        statusBadge.innerHTML = "Operação Ativa";
        statusBadge.className = "px-6 py-2 rounded-full font-bold uppercase tracking-wider bg-red-600 text-white";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    statusBadge.innerHTML = "Operação em Planejamento";
    statusBadge.className = "px-6 py-2 rounded-full font-bold uppercase tracking-wider bg-yellow-500 text-black";
}

// 3.2 Simulação de Dados do Google Sheets e Gráfico
function initChart() {
    const ctx = document.getElementById('chartProdutividade').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Prisões', 'Apreensões', 'Veículos Recup.', 'Armas'],
            datasets: [{
                label: 'Dados Operacionais',
                data: [12, 19, 3, 5],
                backgroundColor: ['#2d3319', '#c2b280', '#3e4625', '#000']
            }]
        }
    });
    document.getElementById('total-registros').innerText = "39";
}

// Função para abrir a imagem em tela cheia
function abrirFullscreen(src) {
    console.log("Tentando ampliar a imagem: " + src); // Mensagem de teste
    const modal = document.getElementById('modalFullscreen');
    const img = document.getElementById('imgFullscreen');
    
    if (modal && img) {
        img.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Garante que fique visível e centralizado
        document.body.style.overflow = 'hidden'; // Trava a rolagem da página
    } else {
        console.error("Erro: O Modal ou a Imagem não foram encontrados no HTML!");
    }
}

function fecharFullscreen() {
    const modal = document.getElementById('modalFullscreen');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Devolve a rolagem
    }
}

// 4. Carregar documento
function carregarDoc(link) {
    const iframe = document.getElementById('doc-iframe');
    const container = document.getElementById('doc-container');
    
    // Adiciona um efeito de carregamento simples
    iframe.style.opacity = "0.3";
    
    // Atualiza o link do iframe
    // DICA: Para o Drive, use o link que termina em /preview
    iframe.src = link;

    setTimeout(() => {
        iframe.style.opacity = "1";
    }, 500);

    // Feedback visual nos botões
    document.querySelectorAll('.doc-btn').forEach(btn => {
        btn.classList.remove('bg-[#c2b280]', 'text-[#2d3319]');
        btn.classList.add('border', 'text-white');
    });
    event.currentTarget.classList.add('bg-[#c2b280]', 'text-[#2d3319]');
}


// 4. INICIALIZAÇÃO (Aqui é onde o código "acorda")
window.onload = () => {
    setInterval(updateCountdown, 1000);
    
    // CHAMADA DA PLANILHA:
    carregarDadosPlanilha(); 
    
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1000);
};
