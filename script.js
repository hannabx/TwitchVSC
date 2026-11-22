/* ============================================================
   script.js – interações da página
============================================================ */

/* ---------- 1. ANO AUTOMÁTICO NO RODAPÉ ---------- */
// Escreve o ano atual dentro de <span id="ano"> para não precisar atualizar.
document.getElementById('ano').textContent = new Date().getFullYear();

/* ---------- 2. COPIAR CÓDIGO DA MIRA ---------- */
// Pega os elementos da página pelo id
const botao = document.getElementById('btn-copiar');
const codigo = document.getElementById('codigo-mira');
const textoBotao = botao.querySelector('span');
const textoOriginal = textoBotao.textContent; // guarda "Copiar código da mira"

// Mostra o aviso "Copiado!" por 2 segundos e depois volta ao normal
function mostrarAviso(mensagem) {
  textoBotao.textContent = mensagem;
  botao.classList.add('copiado');
  setTimeout(() => {
    textoBotao.textContent = textoOriginal;
    botao.classList.remove('copiado');
  }, 2000);
}

// Plano B para navegadores antigos ou páginas sem HTTPS:
// seleciona o texto e usa o comando antigo de copiar.
function copiarPlanoB(texto) {
  const campo = document.createElement('textarea');
  campo.value = texto;
  document.body.appendChild(campo);
  campo.select();
  const deuCerto = document.execCommand('copy');
  document.body.removeChild(campo);
  return deuCerto;
}

// Quando clicar no botão, copia o texto do código
botao.addEventListener('click', async () => {
  const texto = codigo.textContent.trim();
  try {
    await navigator.clipboard.writeText(texto);   // jeito moderno
    mostrarAviso('Copiado!');
  } catch (erro) {
    mostrarAviso(copiarPlanoB(texto) ? 'Copiado!' : 'Não foi possível copiar');
  }
});
