"use strict";
let nomeDeUsuario = document.getElementById('nomeDeUsuario');
let senhaCadastro = document.getElementById('senhaCadastro');
let senhaVerifica = document.getElementById('senhaVerifica');
let formularioCadastro = document.getElementById('formularioCadastro');
formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let valida = validarSenhas();
    if (!valida) {
        return;
    }
    cadastroDeUsuario();
});
function cadastroDeUsuario() {
    let listagemDeCadastros = buscarRegistrosStorage();
    let verificaUsuarioExiste = listagemDeCadastros.some((usuario) => usuario.nome === nomeDeUsuario.value);
    if (verificaUsuarioExiste) {
        alert("Esse usuário já está cadastrato!");
        return;
    }
    const usuario = {
        nome: nomeDeUsuario.value,
        senha: senhaCadastro.value,
        recados: []
    };
    listagemDeCadastros.push(usuario);
    salvaRegistrosStorage(listagemDeCadastros);
    alert("Conta criada com sucesso.");
    formularioCadastro.reset();
    window.location.href = 'login.html';
}
function validarSenhas() {
    if (senhaCadastro.value !== senhaVerifica.value) {
        alert("Senhas não são iguais");
        return false;
    }
    return true;
}
function salvaRegistrosStorage(listaUsuarios) {
    localStorage.setItem('cadastroDeUsuarios', JSON.stringify(listaUsuarios));
}
function buscarRegistrosStorage() {
    return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || "[]");
}
