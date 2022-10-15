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
          </tr>
          `;
        }
      }
        
      
    }
    
    placeholder.innerHTML = out;

  })
}