let tabelaDeRecadosHTML = document.getElementById('tabelaDeRecados') as HTMLTableElement;
let descricaoHTML = document.getElementById('descricao') as HTMLInputElement;
let detalhamentoHTML = document.getElementById('detalhamento') as HTMLInputElement;
let formularioRecadosHTML = document.getElementById('formularioRecados') as HTMLFormElement;
//let registroUsuarioOnline

interface Recados {
    ordem: number,
    descricao: string,
    detalhamento: string,
}

interface Usuario {
    nome: string, 
    senha: string,
    recados: Recados[];
}

let registroUsuarioOnline: Usuario;

document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        alert("É preciso estar logado para acessar essa página!");
        window.location.href = 'login.html'
    }

    let listagemDeUsuarios = buscaTodosRegistros();

    registroUsuarioOnline = listagemDeUsuarios.find((usuario) => usuario.nome === usuarioLogado) as Usuario;
    registroUsuarioOnline.recados.forEach((recado) => mostraRecados(recado));
    
})

function buscaTodosRegistros(): Usuario[] {
  return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || '[]')
}

formularioRecadosHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    escreverRecado()

})

function escreverRecado(): void {

    let i  = JSON.parse(localStorage.getItem('ordem') || '[]');  //FUNCIONA?
    console.log("i",i)
    let l = ++i
    console.log("i2",l)
    let k = localStorage.setItem('ordem', JSON.stringify(l));    //FUNCIONA? TODOS DESSE TENHO QUE TROCAR PRA . PARSE?

    let recado = {
        ordem: i,
        descricao: descricaoHTML.value,
        detalhamento: detalhamentoHTML.value
    }

    registroUsuarioOnline.recados.push(recado);
    atualizaRegistroUsuarioOnline(registroUsuarioOnline);
    mostraRecados(recado);
    //formularioRecadosHTML.reset();????????
}

function atualizaRegistroUsuarioOnline(registrosAtualizados: Usuario): void{
    let listagemDeUsuarios = buscaTodosRegistros();
    let posicaoUsuarioEncontrado = listagemDeUsuarios.findIndex((usuario) => usuario.nome === registrosAtualizados.nome);

    listagemDeUsuarios[posicaoUsuarioEncontrado] = registrosAtualizados;

    atualizaRegistrosStorage(listagemDeUsuarios);
}

function atualizaRegistrosStorage(dadosUsuario: Usuario[]): void{
    localStorage.setItem('cadastroDeUsuarios', JSON.stringify(dadosUsuario))
}

function mostraRecados(umRecado: Recados): void {
    let linha = document.createElement('tr');
    linha.classList.add('itensTabela');
    linha.setAttribute('id', JSON.stringify(umRecado.ordem)) //FUNCIONA?

    let colunaOrdem = document.createElement('td')
    colunaOrdem.innerHTML = JSON.stringify(umRecado.ordem)////////////////////////////////////////////////////////////////////////////////

    let colunaDescricao = document.createElement('td')
    colunaDescricao.innerHTML = umRecado.descricao

    let colunaDetalhamento = document.createElement('td')
    colunaDetalhamento.innerHTML = umRecado.detalhamento
    colunaDetalhamento.setAttribute('id', 'detalhamento')

    let colunaBotoes = document.createElement('td')

    let botaoEditar = document.createElement('button')
    botaoEditar.innerHTML = 'Editar'
    botaoEditar.addEventListener('click', () => {
        editarRecado(JSON.stringify(umRecado.ordem)) //ESSE JSON STRINGIFY FUNCIONA?
    })

    let botaoApagar = document.createElement('button')
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.addEventListener('click', () => {
        apagarRecado(JSON.stringify(umRecado.ordem))//ESSE JSON STRINGIFY FUNCIONA?
    })

    colunaBotoes.appendChild(botaoEditar);
    colunaBotoes.appendChild(botaoApagar);
    linha.appendChild(colunaOrdem);
    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaDetalhamento);
    linha.appendChild(colunaBotoes);
    tabelaDeRecadosHTML.appendChild(linha);
}

function editarRecado(posicaoOrdem: string): void{
    let ordemDoRecado = registroUsuarioOnline.recados.findIndex((esteRecado) =>  JSON.stringify(esteRecado.ordem) === posicaoOrdem); //FUNCIONA?
    let linha = document.getElementById(posicaoOrdem) as HTMLTableElement;       // esse de cima FUNCIONA?
     
     let novoDetalhamento = prompt("Digite o novo detalhamento")
     let tr = document.getElementById(posicaoOrdem) as HTMLTableElement; //ESSE AS TA CERTO?
     console.log('tr')
     console.log(tr.children)
     
     let td = tr.children[2]
     console.log(td)
     td.textContent = novoDetalhamento

}

function apagarRecado(posicaoOrdem: string) {
    let ordemDoRecado = registroUsuarioOnline.recados.findIndex((esteRecado) => JSON.stringify(esteRecado.ordem) === posicaoOrdem)
    let linha = document.getElementById(posicaoOrdem) as HTMLTableElement;


   // console.log(ordemDoRecado)
  //  console.log(linha)


    let confirmaExclusao = confirm(`Tem certeza que deseja excluir o recado ${posicaoOrdem} ?`);

  //  console.log(confirmaExclusao)
    if(confirmaExclusao){
        linha.remove();
        console.log(linha)
        registroUsuarioOnline.recados.splice(ordemDoRecado, 1)
        atualizaRegistroUsuarioOnline(registroUsuarioOnline)
    }else{
        alert("Operação não efetuada com sucesso")
    }
}


