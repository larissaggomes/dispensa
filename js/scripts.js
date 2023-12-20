const salvarProduto = () => {
    //pegendo os elementos input da tela
    const inputNome = document.getElementById('nome');
    const inputPreco = document.getElementById('preco');
    const inputId = document.getElementById('id');

    //verificando se os valores dos inputs sao validos
    if (nome.value && preco.value && id.value) {
        //pegando o id da url
        const id_produto = getidbyURL();

        //verificando se existe um id na url
        (id_produto) ? 
        //se sim editamos 
        editar(inputId.value, inputNome.value, inputPreco.value)
        //se nao, cadastramos 
        :cadastrar(inputId.value, inputNome.value, inputPreco.value);

        
        
    } else {
        //caso os campos estejam invalidos, mostrar mensagem na tela
        alert("Campos obrigatórios");
    }


}

const ler = () => {
    // pegando o tbody da tela 
    const tbody = document.querySelector('tbody');

    //faz uma requisao na url da API e usando o GET para pegar uma lista de objetos
    fetch("http://localhost:4000/produtos")

        // Convetendo os dados (lista de produtos) de texto json para objeto json
        .then(response => response.json())
        .then(json => {
            json.forEach(produto => {
                // criando novos elemntos como o tr,th e tdnome tdpreco
                tr = document.createElement('tr');
                th = document.createElement('th');
                td_nome = document.createElement('td');
                td_preco = document.createElement('td');
                td_editar = document.createElement('td');
                td_deletar = document.createElement('td');
                icon_editar = document.createElement('i');
                icon_deletar = document.createElement('i');

                //inserido o valor do scope
                th.scope = 'row';
                //inserido o texto id,nome e preço
                th.innerText = produto.id; // <th> 1 </th>
                td_nome.innerText = produto.nome; // <td> leite </td>
                td_preco.innerText = produto.preco; // <td> 11 </td>
                
                // adicionado icones nos botões de editar e deletar
                // <i class="fa fa-pencil" aria-hidden="true"></i>
                icon_editar.classList = "fa fa-pencil";
                icon_editar.setAttribute('aria-hidden','true');
                icon_editar.style = "cursor: pointer";
                td_editar.append(icon_editar); //<td> <i></i> <td>
                
                //<i class="fa fa-trash" aria-hidden="true"></i>
                icon_deletar.classList = "fa fa-trash";
                icon_deletar.setAttribute('aria-hidden','true');
                icon_deletar.style = "cursor: pointer";
                td_deletar.append(icon_deletar); //<td> <i></i> </td>

                // adicionado evento de editar no botao de editar
                icon_editar.onclick = () => {
                    window.location.replace("index.html?id=" + produto.id);
                }

                // adicionado evento de deletar no botao de deletar
                icon_deletar.onclick = () => {
                    console.log(produto.id);
                }

                //inserido os filhos do elemento do tr
                tr.append(th); //<tr> <th></th> </tr>
                tr.append(td_nome); // <tr> <td></td> </tr>
                tr.append(td_preco);
                tr.append(td_editar);
                tr.append(td_deletar);

                //adicionado ao tbody o elemento tr 
                tbody.append(tr);
            });

        });
}

const cadastrar = (id, nome, preco) => {
    // POST request using fetch()
    fetch("http://localhost:4000/produtos", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            id: id,
            nome: nome,
            preco: preco
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // redirecionndo para tela do tabela
        .then(json => window.location.replace('tabela.html'));
}

const editar = (id, nome, preco) => {
    // criando o objeto do json do payload(corpo que leva os dados)
    payload = JSON.stringify({
        nome: nome,
        preco: preco
    })

    // contatenando o id na url para fazer o PUT
    fetch("http://localhost:4000/produtos/" + id, {

        // chamando o metodo PUT serve para fazer atualizaçao
        method: "PUT",

        // adiconado o payload ao corpo da requisiçao 
        body: payload,

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // redirecionado pra tela da tabela
        .then(json => window.location.replace('tabela.html'));
}

const getidbyURL = () => {
    //pegando a url atual
    const url_string = window.location.href;
    //coventendo a string de url em um objeto URL
    const url = new URL(url_string);
    //pegando o parametro ID da url
    const id_produto = url.searchParams.get("id");

    //retornado id de produto
    return id_produto;
} 

const getbyid = () => {
    const inputNome = document.getElementById('nome');
    const inputPreco = document.getElementById('preco');
    const inputId = document.getElementById('id');

    const id_produto = getidbyURL();

    fetch("http://localhost:4000/produtos/"+id_produto)

        // Convetendo os dados (lista de produtos) de texto json para objeto json
        .then(response => response.json())
        .then(produto => {

            //inserido os valores dos inputs de acordo com o produto
            // recebido da requisição
            inputNome.value = produto.nome;
            inputPreco.value = produto.preco;
            inputId.value = produto.id
            
            // desabilitado o campo id para nao permitir editar
            inputId.disabled = true;
        })

}

window.addEventListener('DOMContentLoaded', event => {
    ler()
    getbyid()
});
