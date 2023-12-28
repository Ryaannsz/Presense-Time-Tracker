let inputName = document.getElementById('inputName')
let inputPass = document.getElementById('inputPass')
let btnCreate = document.getElementById('btn_cadastro')


const url="http://localhost:7070"

/* SISTEMA DE POST PARA CADASTRO */

async function connDadosPost(url, dados){
    
    fetch(url+"/"+"post",{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({name: dados.name, password: dados.password})
    })
    .then(response =>{
      if(response.ok){
        alert("Cadastrado com sucesso!")
        response.json()
      }else{
        
          alert('Usuário já cadastrado!')
        
        
        throw new Error("Network response was not ok!!!!")
      }
    })
    .then(response => {
      
      response.json()
      })
    .catch(error =>{
     
    })
  }
  
  

/* BOTÃO PARA CADASTRO */

btnCreate.addEventListener('click', ()=>{
    
    if(inputName.value=="" || inputPass.value==""){
        alert("Impossivel proceder!")
    }else{
        let obj ={
            name: inputName.value,
            password: inputPass.value
        }
        connDadosPost(url, obj)
        inputName.value = "";
        inputPass.value="";
    }
})


