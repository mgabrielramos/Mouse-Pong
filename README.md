# Mouse Pong

Este é um jogo clássico de Pong implementado em HTML, CSS e JavaScript. O jogo permite que um jogador jogue contra a CPU em um ambiente web.

## Visão Geral

O jogo Pong é uma recreação digital do jogo de tênis de mesa, onde dois jogadores controlam paletas verticais para rebater uma bola. O objetivo é marcar pontos fazendo com que a bola ultrapasse a paleta do oponente.

### Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js (para testes)

### Funcionalidades

- Jogo de um jogador contra a CPU
- Controle por mouse ou teclado (setas para cima e para baixo)
- Sistema de pontuação até 11 pontos
- Efeitos visuais como sombras e trilhas da bola
- Layout responsivo que se adapta ao tamanho da tela

## Estrutura do Projeto

- `play.html`: Arquivo principal contendo a estrutura HTML e estilos CSS. Agora utiliza o código JavaScript modularizado.
- `js/game.js`: Lógica do jogo extraída e modularizada para facilitar testes e manutenção.
- `tests/game.test.js`: Suite de testes unitários para a lógica do jogo.
- `package.json`: Configuração do projeto e scripts de teste.

## Como Executar

Para executar o jogo, basta abrir o arquivo `play.html` em qualquer navegador web moderno.
*Nota: Devido ao uso de módulos ES, alguns navegadores podem exigir que o arquivo seja servido via um servidor local (ex: `npx serve .`) para evitar problemas de CORS.*

## Controles

- **Mouse**: Mova o mouse verticalmente para controlar sua paleta
- **Teclado**: Use as setas para cima e para baixo para mover sua paleta
- **Clique ou Espaço**: Iniciar o jogo ou reiniciar após vitória

## Testes

Este projeto inclui uma suite de testes unitários para garantir a estabilidade da lógica do jogo (detecção de colisão, física da bola, pontuação, etc.).

Para executar os testes, você precisará do Node.js (v18+) instalado.

```bash
npm test
```

## Desenvolvimento

O jogo foi refatorado de uma abordagem monolítica para uma estrutura modular, permitindo a implementação de testes unitários automatizados. A lógica central reside em `js/game.js` e é importada como um módulo ES em `play.html`.

### Práticas de Codificação

- Código JavaScript estruturado em funções específicas e testáveis.
- Uso de `export` para expor o estado e as funções do jogo.
- Testes automatizados usando o test runner nativo do Node.js.
- Manutenção da compatibilidade com o loop de jogo `requestAnimationFrame`.
