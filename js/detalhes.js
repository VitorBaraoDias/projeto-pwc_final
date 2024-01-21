const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6ImRiN2JhOTE2NGI5M2I5ZTI2ZjM2Y2RjZTVhNmI0ZjQxNjZkZWUzYWE2ZmUxZTQ4NzBiMjMzYTE0ZjEyZDc2NGU2NzhjYmJjZWYwOWZjNDE3IiwiaWF0IjoxNzA1Njg0NjIzLCJuYmYiOjE3MDU2ODQ2MjMsImV4cCI6MTcwNTY4ODIyMywic3ViIjoiIiwic2NvcGVzIjpbXX0.S_ypMn-_7wNArNe4rTvmwzi-JZswwur1W6QpoKzLDbfKzxwmHNbrXg6xPzY1kEnyWal0u8Vwoy7IWHnPJ70PKfG80Et0sP9Z7f1w3my0EpdVa8ieG2YYZHf74ELmMVmdbfQC52z-xPqqeUP9N8JLUO9V_9K27s75Otua8XpbGy9eNTmFRxn9efGSHt4OwqrnmXHyTw3oKGtoy-_Y7ZHZKaPtfbXr3XvsEphutGg_sqvQzOzB1SFXekF2VWGyCZBnYmZgnuKEP6bIvWqFGsyVqupYf5QjWsOKmp0AEuAbG2k-PGIIZyv0NhMSwK47JZc4ROu17TAP_Ifw_r8fRUG-bA';
const cabecalho_dog = document.getElementById('cabecalho-dog');

document.addEventListener('DOMContentLoaded', function() {
    // Obtém o ID do animal a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');

    // Carrega os detalhes do animal com base no ID
    carregarDetalhes(animalId);
  });
  function carregarDetalhes(animalId) {
    $.ajax({
      url: `${apiUrl}/${animalId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      success: function(data) {
        console.log(data);
        //tranforma a inf recebida para html
        jsonToHtml(data);
      },
      error: function(error) {
        window.alert("Ups, não existe os detalhes do cão que selecionou");
        window.location.href = `../adocao.html`;
        console.error('Erro ao obter detalhes do animal da PetFinder:', error);
      }
    });
  }
  
function jsonToHtml(data) {
    console.log(data)
    const nome = document.getElementById("nomeDog");
    const estadoAdocao = document.getElementById("estadoAdocao");
    const img = document.getElementById('img-detalhe');
    //preencher html
    nome.textContent = "Detalhes de " + data.animal.name;
    estadoAdocao.textContent = data.animal.status == 'adoptable' ? 'Estado de adoção: Adotável' : 'Não é possível adotar';
    img.src = data.animal.primary_photo_cropped && data.animal.primary_photo_cropped.medium ? data.animal.primary_photo_cropped.medium : 'não possui imagem';

    addButtonAdotar(data.animal.id);
    getTable(data);
}
function getTable(data) {
    const tbody = document.querySelector('tbody'); 
    const animal = data.animal;
    //chaves para construir a tabela
    const propriedades = [
        { chave: 'Nome do Animal', valor: animal.name },
        { chave: 'Idade', valor: animal.age },
        { chave: 'Género', valor: animal.gender },
        { chave: 'Raça', valor: animal.breeds.primary },
        { chave: 'Cor da Pelagem', valor: animal.colors.primary },
        { chave: 'Tamanho', valor: animal.size },
        { chave: 'Status de Adoção', valor: animal.status },
        { chave: 'Características', valor: animal.tags.join(', ') },
        { chave: 'Descrição', valor: animal.description || 'Não possui descrição' }
    ];
    //percorrer o array de objeto propriedades e tirar a chave e o valor para construir a tabela
    propriedades.forEach(({ chave, valor }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${chave}</td><td>${valor}</td>`;
        tbody.appendChild(tr);
    });
}
function addButtonAdotar(animalId){
  const buttonHTML = `
  <a href="formulario.html"
  ><button class="btn btn-primary">Adotar</button></a>`;
  cabecalho_dog.insertAdjacentHTML('beforeend',buttonHTML);
}
function adotarDog(animalId){
  changeModal();
  //adicionar o nome do cao adotado localStorage
}
//fehcar modal
function changeModal(){
  const content_modal = document.getElementById('modal');
  content_modal.classList.toggle('active');
}
function verificarAdocao(){
  //adotar
  //verificar se já foi adotado
  //retirar adocao
  
}
function addStorage(animalName){
  //se nao existir um localstorage cria um array
  const storedAnimalName = JSON.parse(localStorage.getItem("caoAdotado")) || [];
  //adiciona no array
  storedAnimalName.push(animalName);
  localStorage.setItem('caoAdotado', JSON.stringify(storedAnimalName));
}

