var product_name;
var product_description;
var product_value;

function cadastrar(){
    product_name = document.getElementById("nome-produto").value;
    product_description = document.getElementById("descricao-produto").value;
    product_value = document.getElementById("valor-produto").value;

    let _data = {
        name: "nome",
        description: "desc",
        value: 0
    }

    fetch('http://localhost:3000/products', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    console.log(_data);
}