// O CÓDIGO DE MOVIMENTO EM JAVASCRIPT (Versão para tela cheia):

let e = document.getElementById('minhaImagem'); // 1. Seleciona a imagem.
// Iniciamos a posição em 0, 0 e definimos uma velocidade menor para que o efeito seja sutil.
let x = 0, y = 0, dx = 0.5, dy = 0.5; // 2. Coordenadas iniciais e velocidade (ajustada para um movimento lento).

setInterval(() => { // 3. Inicia o loop de animação a cada 30ms.
    x += dx; y += dy; // 4. Atualiza as coordenadas.
    
    // 5. Verifica colisão horizontal e inverte a direção (dx) se necessário.
    // Usamos window.innerWidth e window.innerHeight para a tela inteira.
    if (x + e.offsetWidth > window.innerWidth || x < 0) dx *= -1; 
    
    // 6. Verifica colisão vertical e aplica as novas posições.
    if (y + e.offsetHeight > window.innerHeight || y < 0) dy *= -1; 
    e.style.left = x + 'px'; e.style.top = y + 'px'; 
}, 30);
