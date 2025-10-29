<script>
    // Fator de ajuste para evitar que os objetos fiquem presos após a colisão
    const AJUSTE_COLISAO = 2; 

    // Classe (Molde) para cada objeto móvel
    class ObjetoMovel {
        constructor(elemento, velocidadeX, velocidadeY) {
            this.elemento = elemento;
            this.x = elemento.offsetLeft;
            this.y = elemento.offsetTop;
            this.dx = velocidadeX;
            this.dy = velocidadeY;
            this.raio = elemento.offsetWidth / 2; // Para facilitar a colisão circular
        }

        // Move o objeto baseado em sua velocidade (dx, dy)
        mover() {
            this.x += this.dx;
            this.y += this.dy;
        }

        // Aplica a nova posição ao estilo CSS
        renderizar() {
            this.elemento.style.left = this.x + 'px';
            this.elemento.style.top = this.y + 'px';
        }

        // Lógica de colisão com as bordas da tela (já existente)
        checarColisaoBorda() {
            const larguraTela = window.innerWidth;
            const alturaTela = window.innerHeight;
            const largura = this.elemento.offsetWidth;
            const altura = this.elemento.offsetHeight;

            // Colisão Horizontal
            if (this.x + largura >= larguraTela) { 
                this.dx *= -1;
                this.x = larguraTela - largura - AJUSTE_COLISAO;
            } else if (this.x <= 0) { 
                this.dx *= -1;
                this.x = AJUSTE_COLISAO;
            }

            // Colisão Vertical
            if (this.y + altura >= alturaTela) { 
                this.dy *= -1;
                this.y = alturaTela - altura - AJUSTE_COLISAO;
            } else if (this.y <= 0) { 
                this.dy *= -1;
                this.y = AJUSTE_COLISAO;
            }
        }
    }


    // --- FUNÇÕES DE COLISÃO PRINCIPAIS ---

    // 1. Detecta se dois elementos estão se sobrepondo (colidindo)
    function estaoColidindo(obj1, obj2) {
        // Usa o Teorema de Pitágoras para calcular a distância entre os centros (a forma mais precisa)
        const distanciaX = obj1.x + obj1.raio - (obj2.x + obj2.raio);
        const distanciaY = obj1.y + obj1.raio - (obj2.y + obj2.raio);
        const distanciaTotal = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
        
        // Colisão ocorre se a distância entre os centros for menor que a soma dos raios (metade da largura)
        return distanciaTotal < (obj1.raio + obj2.raio);
    }

    // 2. Resolve a colisão: inverte as velocidades (faz eles "baterem e voltarem")
    function resolverColisao(obj1, obj2) {
        // Troca as velocidades (direções) entre os dois objetos
        [obj1.dx, obj2.dx] = [obj2.dx, obj1.dx];
        [obj1.dy, obj2.dy] = [obj2.dy, obj1.dy];
    }


    // --- INICIALIZAÇÃO DO JOGO ---

    const elementosHTML = document.querySelectorAll('.imagem-movel'); 
    const objetosMoveis = [];
    const VELOCIDADE_BASE = 1.8; // Velocidade alta para que as colisões sejam visíveis

    // Cria objetos ObjetoMovel para cada imagem na tela
    elementosHTML.forEach((el, index) => {
        const velocidadeX = (index % 2 === 0 ? 1 : -1) * VELOCIDADE_BASE; // Alterna entre direções inicial
        const velocidadeY = (index % 3 === 0 ? 1 : -1) * (VELOCIDADE_BASE - 0.4); 
        objetosMoveis.push(new ObjetoMovel(el, velocidadeX, velocidadeY));
    });

    // Função de loop principal (game loop)
    function loopPrincipal() {
        // 1. Move todos os objetos e checa colisão de borda
        objetosMoveis.forEach(obj => {
            obj.mover();
            obj.checarColisaoBorda();
        });

        // 2. Checa colisão entre TODOS os pares de objetos
        for (let i = 0; i < objetosMoveis.length; i++) {
            for (let j = i + 1; j < objetosMoveis.length; j++) {
                const obj1 = objetosMoveis[i];
                const obj2 = objetosMoveis[j];

                if (estaoColidindo(obj1, obj2)) {
                    resolverColisao(obj1, obj2);
                }
            }
        }

        // 3. Renderiza a posição final de todos os objetos
        objetosMoveis.forEach(obj => {
            obj.renderizar();
        });

        // Usa requestAnimationFrame para um loop de animação mais suave e eficiente
        requestAnimationFrame(loopPrincipal);
    }

    // Inicia o loop de animação!
    requestAnimationFrame(loopPrincipal);

</script>
