// Configurações da Operação
const DATA_LIMITE = new Date("May 08, 2026 03:30:00").getTime();

// 1. Controle de Navegação (SPA)
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// 2. Contador Regressivo e Status
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

// 3. Simulação de Dados do Google Sheets e Gráfico
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

// Inicialização
window.onload = () => {
    setInterval(updateCountdown, 1000);
    initChart();
    // Esconder loader após carregar
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1000);
};
