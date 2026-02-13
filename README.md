# Mouse Pong

Este é um jogo clássico de Pong implementado em HTML, CSS e JavaScript. O jogo permite que um jogador jogue contra a CPU em um ambiente web.

## Visão Geral

O jogo Pong é uma recreação digital do jogo de tênis de mesa, onde dois jogadores controlam paletas verticais para rebater uma bola. O objetivo é marcar pontos fazendo com que a bola ultrapasse a paleta do oponente.

### Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)

### Funcionalidades

- Jogo de um jogador contra a CPU
- Controle por mouse ou teclado (setas para cima e para baixo)
- Sistema de pontuação até 11 pontos
- Efeitos visuais como sombras e trilhas da bola
- Layout responsivo que se adapta ao tamanho da tela

## Estrutura do Projeto

- `play.html`: Arquivo principal contendo toda a estrutura HTML, estilos CSS e lógica JavaScript do jogo.

## Como Executar

Para executar o jogo, basta abrir o arquivo `play.html` em qualquer navegador web moderno.

## Controles

- **Mouse**: Mova o mouse verticalmente para controlar sua paleta
- **Teclado**: Use as setas para cima e para baixo para mover sua paleta
- **Clique ou Espaço**: Iniciar o jogo ou reiniciar após vitória

## Desenvolvimento

O jogo foi implementado com uma abordagem de código único (monolítico), onde todo o HTML, CSS e JavaScript estão contidos em um único arquivo. Isso facilita a distribuição e execução sem necessidade de servidores ou configurações adicionais.

### Estilo de Código

- Utiliza-se `const` e `let` para declaração de variáveis
- Funções nomeadas para organizar a lógica do jogo
- Uso de `requestAnimationFrame` para loop de jogo suave
- Estilos definidos com CSS moderno incluindo Flexbox e propriedades de sombra

### Práticas de Codificação

- Código JavaScript estruturado em funções específicas para cada parte da lógica do jogo
- Uso de `Math.random()` para variação na inteligência artificial da CPU
- Implementação de colisões retangulares para detecção de contato entre paletas e bola
- Animação suave com interpolação para movimento da paleta do jogador quando usando mouse