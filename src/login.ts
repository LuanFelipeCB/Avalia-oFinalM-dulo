
let formularioLogin = document.getElementById('formularioLogin') as HTMLFormElement;
let usuarioLogin = document.getElementById('usuarioLogin') as HTMLInputElement;
let senhaLogin = document.getElementById('senhaLogin') as HTMLInputElement;

interface Usuario {
    nome: string;
    senha: string;
    recados: Recados[];
}

formularioLogin.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    logar();
})

function logar(): void{
    let listaDeUsuarios = buscaListaUsuarios();

    let cadastroEncontrado = listaDeUsuarios.find((usuario) => usuario.nome === usuarioLogin.value && usuario.senha === senhaLogin.value);

    if(!cadastroEncontrado){
        alert("E-mail ou password incorretas! Verifique e tente novamente!")
        formularioLogin.reset();
        return
    }

    localStorage.setItem('usuarioLogado', cadastroEncontrado.nome);

    window.location.href = 'recados.html';
}

function buscaListaUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || '[]')
}