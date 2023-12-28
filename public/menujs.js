let btn = document.getElementById('logout')


const userIdElement = document.getElementById('userIdHolder');
const userId = userIdElement.dataset.userId;




const url="http://localhost:7070/show"

/* EVENTO PARA QUANDO A PAGINA CARREGAR */

document.addEventListener('DOMContentLoaded', async function() {

    const response = await fetch(url + '/' + userId);
    const data = await response.json();
    const tabela = createTable(data);
    const divTabela = document.getElementById('table'); 
    divTabela.appendChild(tabela);
});


/* FORMATAÃO DA DATA */

function formatDate(date) {

    if(date==null){
        return "Usuário ativo"
    }else{
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(new Date(date));
    }
    
}

/* CRIAÇÃO DA TABELA DINAMICA */

function createTable(data) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    

 
    const header = document.createElement('tr')
    const entradaHeader = document.createElement('th')
    entradaHeader.textContent = 'Horário de Entrada'
    const saidaHeader = document.createElement('th')
    saidaHeader.textContent = 'Horário de Saída'
    const permHeader = document.createElement('th')
    permHeader.textContent = "Tempo de Permanência"

    header.appendChild(entradaHeader)
    header.appendChild(saidaHeader)
    header.appendChild(permHeader)
    thead.appendChild(header)
    table.appendChild(thead)

  
    data.forEach(entry => {

        const tr = document.createElement('tr')
        const entradaCell = document.createElement('td')
        const saidaCell = document.createElement('td')
        const permCell = document.createElement('td')

        const emMili = new Date(entry.saida).getTime() - new Date(entry.entrada).getTime()
        
        const horas = Math.floor(emMili / (1000 * 60 * 60))
        const minutos = Math.floor((emMili % (1000 * 60 * 60)) / (1000 * 60))
        const segundos = Math.floor((emMili % (1000 * 60)) / 1000)

        entradaCell.textContent = formatDate(entry.entrada)
        if(formatDate(entry.saida)=="Usuário ativo"){
            saidaCell.setAttribute("id", "corVerde")
            saidaCell.textContent="Usuário ativo"
        }else{
            saidaCell.textContent = formatDate(entry.saida)
        }
        saidaCell.textContent = formatDate(entry.saida)
        if(entry.saida==null){
            permCell.setAttribute("id", "corVerde")
            permCell.textContent="Usuário ativo"
        }else{
            permCell.textContent = `${horas}h ${minutos}min e ${segundos}s`;
        }
     

        tr.appendChild(entradaCell);
        tr.appendChild(saidaCell);
        tr.appendChild(permCell)
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    return table;
}

/* BOTÃO PARA LOGOUT */

btn.addEventListener('click', async ()=>{
    try{
        const reponse = await fetch("http://localhost:7070/logout")
        if(reponse.ok){
            window.location.href='/login'
        }else{
            console.log("erro ao fazer logout")
        }
    }catch(error){

    }
})














