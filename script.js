// O CÓDIGO DE MOVIMENTO EM JAVASCRIPT:

let e = document.getElementById('minhaImagem'); // 1. Seleciona o elemento.
let x = e.offsetLeft, y = e.offsetTop, dx = 3, dy = 3; // 2. Coordenadas iniciais e velocidade.

setInterval(() => { // 3. Inicia o loop de animação a cada 30ms.
    x += dx; y += dy; // 4. Atualiza as coordenadas.
    
    // 5. Verifica colisão horizontal e inverte a direção (dx) se necessário.
    if (x + e.offsetWidth > e.parentElement.clientWidth || x < 0) dx *= -1; 
    
    // 6. Verifica colisão vertical e aplica as novas posições.
    if (y + e.offsetHeight > e.parentElement.clientHeight || y < 0) dy *= -1; 
    e.style.left = x + 'px'; e.style.top = y + 'px'; 
}, 30);
