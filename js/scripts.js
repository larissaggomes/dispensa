const salvarProduto = () => {
    let nome = document.getElementById('nome');
    let preco = document.getElementById('preco');
    let id = document.getElementById('id');
    if (nome.value && preco.value && id.value) {
        cadastrar(id.value, nome.value, preco.value)

        nome.value = "";
        preco.value = "";
        id.value = "";
    } else {
        alert("Campos obrigatórios");
    }


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

        // Displaying results to console
        .then(json => console.log(json));
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

        // Displaying results to console
        .then(json => console.log(json));
}

const ler = () => {
    // pegando o tbody da tela 
    tbody = document.querySelector('tbody')

    //faz uma requisao na url da API e usando o GET para pegar uma lista de objetos
    fetch("http://localhost:4000/produtos")

        // Convetendo os dados (lista de produtos) de texto json para objeto json
        .then(response => response.json())
        .then(json => {
            json.forEach(produto => {
                // criando novos elemntos como o tr,th e tdnome tdpreco
                tr = document.createElement('tr')
                th = document.createElement('th')
                td_nome = document.createElement('td')
                td_preco = document.createElement('td')
                td_editar = document.createElement('td')
                td_deletar = document.createElement('td')

                //inserido o valor do scope
                th.scope = 'row'
                //inserido o texto id,nome e preço
                th.innerText = produto.id
                td_nome.innerText = produto.nome
                td_preco.innerText = produto.preco
                td_editar.innerText = "e"
                td_deletar.innerText = "d"
                td_editar.onclick = () => {
                    window.location.replace("index.html?id=" + produto.id)
                }
                td_deletar.onclick = () => {
                    console.log(produto.id);
                }

                //inserido os filhos do elemento do tr
                tr.append(th)
                tr.append(td_nome)
                tr.append(td_preco)
                tr.append(td_editar)
                tr.append(td_deletar)

                //adicionado ao tbody o elemento tr 
                tbody.append(tr)
            });

        });
}

const getbyid = () => {


    var url_string = window.location.href;
    var url = new URL(url_string);
    var id_produto = url.searchParams.get("id"); //pega o value

    fetch("http://localhost:4000/produtos/"+id_produto)

        // Convetendo os dados (lista de produtos) de texto json para objeto json
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })

}

window.addEventListener('DOMContentLoaded', event => {
    ler()
    getbyid()
});
