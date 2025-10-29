<script>
    // O CÓDIGO JAVASCRIPT REESTRUTURADO PARA MULTIPLOS ELEMENTOS

    // A função principal que gerencia o movimento de um único elemento.
    function iniciarMovimento(elemento, velocidadeX, velocidadeY) {
        // Inicializa as coordenadas baseadas na posição atual no HTML
        let x = elemento.offsetLeft; 
        let y = elemento.offsetTop;
        let dx = velocidadeX;
        let dy = velocidadeY;

        // O loop que fará o movimento para este elemento específico
        setInterval(() => {
            x += dx; y += dy; 

            // Lógica de Colisão (Horizontal)
            if (x + elemento.offsetWidth > window.innerWidth || x < 0) {
                dx *= -1; // Inverte direção X
            }

            // Lógica de Colisão (Vertical)
            if (y + elemento.offsetHeight > window.innerHeight || y < 0) {
                dy *= -1; // Inverte direção Y
            }

            // Aplica as novas posições
            elemento.style.left = x + 'px';
            elemento.style.top = y + 'px'; 

        }, 20); // Intervalo reduzido para 20ms para um movimento ligeiramente mais suave
    }

    // 1. Seleciona TODOS os elementos com a classe "imagem-movel"
    const imagens = document.querySelectorAll('.imagem-movel'); 

    // 2. Aplica a lógica de movimento para cada elemento
    imagens.forEach((img, index) => {
        // *** ALTERAÇÃO AQUI: Aumentando o multiplicador de 0.5 para 1.5 ***
        // Isso aumenta a velocidade base de cada imagem.
        const VELOCIDADE_BASE = 1.5; 
        
        const velocidadeX = (index + 1) * VELOCIDADE_BASE; 
        const velocidadeY = (index + 1) * (VELOCIDADE_BASE - 0.5); // Garante que Y seja um pouco diferente de X
        
        iniciarMovimento(img, velocidadeX, velocidadeY);
    });

</script>
