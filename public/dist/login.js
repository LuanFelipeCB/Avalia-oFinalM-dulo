"use strict";
let formularioLogin = document.getElementById('formularioLogin');
let usuarioLogin = document.getElementById('usuarioLogin');
let senhaLogin = document.getElementById('senhaLogin');
formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    logar();
});
function logar() {
    let listaDeUsuarios = buscaListaUsuarios();
    let cadastroEncontrado = listaDeUsuarios.find((usuario) => usuario.nome === usuarioLogin.value && usuario.senha === senhaLogin.value);
    if (!cadastroEncontrado) {
        alert("E-mail ou password incorretas! Verifique e tente novamente!");
        formularioLogin.reset();
        return;
    }
    localStorage.setItem('usuarioLogado', cadastroEncontrado.nome);
    window.location.href = 'recados.html';
}
function buscaListaUsuarios() {
    return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || '[]');
}
