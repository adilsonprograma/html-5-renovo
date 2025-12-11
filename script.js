// 1. Identifica o campo do CEP no HTML
const cepInput = document.getElementById('cep');

// 2. Fica vigiando: quando o usuário sai do campo (blur), ele age
cepInput.addEventListener('blur', (event) => {
    
    // Limpa o CEP (tira traços e pontos, deixa só números)
    let cep = event.target.value.replace(/\D/g, '');

    // Verifica se tem 8 dígitos (tamanho padrão de CEP)
    if (cep.length === 8) {
        buscarEndereco(cep); // Chama a função que vai na API
    }
});

// 3. Função que vai buscar os dados na API ViaCEP
async function buscarEndereco(cep) {
    try {
        // Vai até o servidor do ViaCEP buscar os dados
        const consulta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await consulta.json();

        // Se o CEP não existir
        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        // Se deu tudo certo, preenche os campos
        preencherFormulario(dados);

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível buscar o endereço. Verifique sua conexão.");
    }
}

// 4. Função que coloca os dados dentro das caixinhas do formulário
function preencherFormulario(dados) {
    document.getElementById('logradouro').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('localidade').value = `${dados.localidade} - ${dados.uf}`;
}