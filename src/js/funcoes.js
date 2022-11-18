var product_name;
var product_description;
var product_value;
var product_disponibility;
var aux;

function cadastrar(){
    product_name = document.getElementById("nome-produto").value;
    product_description = document.getElementById("descricao-produto").value;
    product_value = document.getElementById("valor-produto").value;
    product_disponibility = document.querySelector('input[name="disponibilidde"]:checked').value;
    
    let _data = {
        name: product_name,
        description: product_description,
        value: parseFloat(product_value),
        disponibility: product_disponibility
    }
    
    fetch('http://localhost:3000/products', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })

      alert('Cadastrado com sucesso!')
      console.log(_data)
      listar();
}

function excluir(id){
  fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE"
  })
}

function listar(){
    
  fetch('http://localhost:3000/products')

  .then(function(response){

    return response.json();

  })

  .then(function(products){

    let placeholder = document.querySelector("#data-output");

    let out = "";

    products.sort(function(a, b){
      if(a.value < b.value){
        return -1;
      }else {
        return  true;
      }
    });

    for(let product of products){

      if(product.disponibility === "true"){
        aux = "Disponivel";
        if(product.id != -1){
          out += `
          <tr">
            <td> ${product.name}</td>
            <td> ${product.description}</td>
            <td><span style="background-color: white; color: #F68634; padding: 5px; border-radius: 50px;"> ${aux} </span></td>
            <td> ${product.value}</td>
            <td> <svg style="fill: white; cursor: pointer; height: 20px; width: 15px" onclick="excluir(${product.id})"> xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></td>
          </tr>
          `;
        }
      }else{
        aux = "Indisponivel";
        if(product.id != -1){
          out += `
          <tr">
            <td> ${product.name}</td>
            <td> ${product.description}</td>
            <td><span> ${aux} </span></td>
            <td> ${product.value}</td>
            <td> <svg style="fill: white; cursor: pointer; white; height: 20px; width: 15px" onclick="excluir(${product.id})"> xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></td>
          </tr>
          `;
        }
      }
    }
    placeholder.innerHTML = out;
  })
}