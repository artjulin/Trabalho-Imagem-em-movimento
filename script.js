<script>
    // FATOR DE AJUSTE: Garante que a imagem seja empurrada 1 pixel para dentro ao colidir
    const AJUSTE_COLISAO = 1; 

    // A função principal que gerencia o movimento de um único elemento.
    function iniciarMovimento(elemento, velocidadeX, velocidadeY) {
        let x = elemento.offsetLeft; 
        let y = elemento.offsetTop;
        let dx = velocidadeX;
        let dy = velocidadeY;

        // O loop que fará o movimento para este elemento específico
        setInterval(() => {
            x += dx; y += dy; 
            
            const larguraElemento = elemento.offsetWidth;
            const alturaElemento = elemento.offsetHeight;
            const larguraTela = window.innerWidth;
            const alturaTela = window.innerHeight;

            // 1. Lógica de Colisão Horizontal
            if (x + larguraElemento >= larguraTela) { 
                // Colidiu na Borda Direita: Inverte e empurra para a esquerda
                dx *= -1;
                x = larguraTela - larguraElemento - AJUSTE_COLISAO; 
            } else if (x <= 0) { 
                // Colidiu na Borda Esquerda: Inverte e empurra para a direita
                dx *= -1;
                x = AJUSTE_COLISAO; 
            }

            // 2. Lógica de Colisão Vertical
            if (y + alturaElemento >= alturaTela) { 
                // Colidiu na Borda Inferior: Inverte e empurra para cima
                dy *= -1;
                y = alturaTela - alturaElemento - AJUSTE_COLISAO; 
            } else if (y <= 0) { 
                // Colidiu na Borda Superior: Inverte e empurra para baixo
                dy *= -1;
                y = AJUSTE_COLISAO; 
            }

            // Aplica as novas posições
            elemento.style.left = x + 'px';
            elemento.style.top = y + 'px'; 

        }, 20); // Mantendo o intervalo de 20ms para um movimento suave e rápido
    }

    // 1. Seleciona TODOS os elementos com a classe "imagem-movel"
    const imagens = document.querySelectorAll('.imagem-movel'); 

    // 2. Aplica a lógica de movimento para cada elemento
    imagens.forEach((img, index) => {
        // Velocidade alta para que a "batida" seja visível
        const VELOCIDADE_BASE = 1.5; 
        
        const velocidadeX = (index + 1) * VELOCIDADE_BASE; 
        const velocidadeY = (index + 1) * (VELOCIDADE_BASE - 0.5); 
        
        iniciarMovimento(img, velocidadeX, velocidadeY);
    });

</script>
