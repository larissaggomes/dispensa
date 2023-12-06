const salvarProduto = () => {
    let nome = document.getElementById('nome');
    let preco = document.getElementById('preco');
    let id = document.getElementById('id');
    if (nome.value && preco.value && id.value) {
        cadastrar(id.value,nome.value,preco.value)
        
        nome.value = "";
        preco.value = "";
        id.value = "";
    } else {
        alert("Campos obrigatórios");
    }


}

const cadastrar = (id,nome,preco) =>{
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

const ler = () => {
    fetch("http://localhost:4000/produtos")

        // Converting received data to JSON
        .then(response => response.json())
        .then(json => {
            console.log(json);

        });
}

window.addEventListener('DOMContentLoaded', event => {
    ler()
});
