

let inputNameLogin = document.getElementById('inputNameLogin')
let inputPassLogin = document.getElementById('inputPassLogin')
let btnLogin = document.getElementById('btn_login')

const url="http://localhost:7070/"

/* SISTEMA DE POST PARA LOGIN */

async function connDadosPost(url, dados){
    
    fetch(url+"loginPost",{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({name: dados.name, password: dados.password})
    })
    .then(response =>{
      if(response.ok){
        response.json()
        window.location.href = "/menu";
      }else{
        if(response.status==409){
        alert("Usuário já está logado!")
        }else{
          alert("Nome de usuário ou senha inválidas.")
        throw new Error("Network response was not ok")
        }
      }
    })
    .catch(error =>{
      console.log(error)
    })
  }


/* BOTÃO PARA LOGIN */

btnLogin.addEventListener('click', ()=>{

    if(inputNameLogin.value=="" || inputPassLogin.value==""){
        alert("Impossivel proceder!")
    }else{
        let obj ={
            name: inputNameLogin.value,
            password: inputPassLogin.value
        }
        connDadosPost(url, obj)
    }

    
   
    
})