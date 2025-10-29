// O ID do elemento que você quer mover. Ele PRECISA estar no seu HTML.
const ELEMENTO_ID = 'minhaImagem'; 

// --- Configurações de Movimento ---
const PASSO = 5;         // Velocidade (em pixels por frame)
const INTERVALO_MS = 30; // Suavidade/Taxa de atualização (ms)

// --- Variáveis de estado ---
let elemento = null;
let posX = 0; 
let posY = 0; 
let direcaoX = 1; // 1 (direita), -1 (esquerda)
let direcaoY = 1; // 1 (baixo), -1 (cima)

// Função que executa o movimento em cada intervalo
function moverImagem() {
    // 1. Atualizar as posições
    posX += PASSO * direcaoX;
    posY += PASSO * direcaoY;

    // 2. Aplicar as novas posições ao elemento
    elemento.style.left = posX + 'px';
    elemento.style.top = posY + 'px';

    // 3. Lógica de Colisão/Quicar nas Bordas
    // Pega as dimensões do contêiner (elemento pai)
    // Se não houver pai, usa a janela (window) como limite
    const larguraContainer = elemento.parentElement ? elemento.parentElement.clientWidth : window.innerWidth;
    const alturaContainer = elemento.parentElement ? elemento.parentElement.clientHeight : window.innerHeight;
    
    // Pega as dimensões do próprio elemento
    const larguraElemento = elemento.clientWidth;
    const alturaElemento = elemento.clientHeight;

    // Colisão Horizontal
    if (posX + larguraElemento > larguraContainer || posX < 0) {
        direcaoX *= -1; // Inverte a direção
    }

    // Colisão Vertical
    if (posY + alturaElemento > alturaContainer || posY < 0) {
        direcaoY *= -1; // Inverte a direção
    }
}

// Inicia o script quando a página carrega
window.onload = function() {
    elemento = document.getElementById(ELEMENTO_ID);
    
    if (!elemento) {
        // Mensagem de erro se o elemento não for encontrado no HTML
        console.error(`ERRO JS: O elemento com ID '${ELEMENTO_ID}' não foi encontrado no HTML.`);
        return;
    }

    // Configura a posição inicial e o estilo necessário (caso o CSS não o faça)
    elemento.style.position = 'absolute';
    posX = elemento.offsetLeft;
    posY = elemento.offsetTop;
    
    // Inicia a repetição do movimento
    setInterval(moverImagem, INTERVALO_MS);
}
