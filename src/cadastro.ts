let nomeDeUsuario = document.getElementById('nomeDeUsuario') as HTMLInputElement;
let senhaCadastro = document.getElementById('senhaCadastro') as HTMLInputElement;
let senhaVerifica = document.getElementById('senhaVerifica') as HTMLInputElement;

let formularioCadastro = document.getElementById('formularioCadastro') as HTMLFormElement;

interface Recados {
  ordem: number,
  descricao: string,
  detalhamento: string,
}

interface Usuario {
  nome: string,
  senha: string,
  recados: Recados[]
}

formularioCadastro.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let valida = validarSenhas();

  if(!valida){
    return
  }

  cadastroDeUsuario();
})

function cadastroDeUsuario() {

  let listagemDeCadastros = buscarRegistrosStorage();

  let verificaUsuarioExiste = listagemDeCadastros.some((usuario) => usuario.nome === nomeDeUsuario.value);

  if(verificaUsuarioExiste){
    alert("Esse usuário já está cadastrato!");
    return
  }

  const usuario: Usuario = {
    nome: nomeDeUsuario.value,
    senha:senhaCadastro.value,
    recados:[]
  }
 
  listagemDeCadastros.push(usuario);
  salvaRegistrosStorage(listagemDeCadastros);

  alert("Conta criada com sucesso.");
  formularioCadastro.reset();
  window.location.href = 'login.html';
 
}

function validarSenhas(): Boolean {

  if (senhaCadastro.value !== senhaVerifica.value) {
    alert("Senhas não são iguais");
    return false
  }
  return true
}

function salvaRegistrosStorage(listaUsuarios: Usuario[]): void{
     localStorage.setItem('cadastroDeUsuarios', JSON.stringify(listaUsuarios));
}

function buscarRegistrosStorage(): Usuario[]{
  return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || "[]");
}

