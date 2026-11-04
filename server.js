// Cronômetro no terminal

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

console.clear();
console.log('Cronômetro iniciando!');
console.log('p = pausar/continuar | r = resetar | Ctrl+C = sair\n');


let tempo = 0;


let rodando = true;


function formatar(total) {
    
    const min = Math.floor(total / 60);

   
    const seg = total % 60;

   
    return String(min).padStart(2, '0') + ':' + String(seg).padStart(2, '0');
}


function atualizarTela(mensagem = '') {
    console.clear();
    console.log(`⏱️  ${formatar(tempo)}`);
    if (mensagem) {
        console.log(mensagem);
    }
}


setInterval(() => {
   
    if (rodando) {
        tempo++;
        atualizarTela();
    }
}, 1000);


process.stdin.on('keypress', (letra, tecla) => {
    if (!tecla) return;

  
    if (tecla.name === 'p') {
      
        rodando = !rodando;
        atualizarTela(rodando ? '▶️  Continuando...' : '⏸️  Pausado');

 
    } else if (tecla.name === 'r') {
        tempo = 0;
        atualizarTela('🔄 Resetado');


    } else if (tecla.ctrl && tecla.name === 'c') {
        console.clear();
        console.log('👋🏽 Até mais!');
        process.exit();
    }
});