const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6ImJiMGRiNGJiMTNlODU2YTkwMzU2YjM0ZGY2MWUxMGUwMjE2YTQ1NTI4NTNkNDU5ZWMxMjNkYzk3MzM0NzQwMTk3OWJkNTQxMjA2N2M4ZGFiIiwiaWF0IjoxNzA1ODU4ODEwLCJuYmYiOjE3MDU4NTg4MTAsImV4cCI6MTcwNTg2MjQxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.vVIhRnMMZQ8Yf9RHtc_hj-pgN0PYObYUOAXDHBT-9KCaOPR0-YDoShbXXvq6eigGNml5-0kBB4p49bcUu-108Y_4eFPuaMdEgFBKPjXiUivo3JafxJPgMQtQznxTrNejhHuOcm9uORnBkFhwyO5ILaozBrfoxvXfsHbu09mV1XcuTwyvIyD5-zUNJ7HwweF9kPEGQpYE0dOlQ6W_VJDiF_PlWQmwn2fKPguUL1fjI_DfZWK9L3-G0g34xvzaIrrUNSRPUVGo77wpkCKY9f8SQPPSfFQk0zWj9f6Xf7Ap4O18cfugD5ByWUfyPjoRtqifJO6nLByRB8_w1iHvVZPdPQ';
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
  <a href="formulario.html?id=${animalId}"
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
function addStorage(animalName){
  //se nao existir um localstorage cria um array
  const storedAnimalName = JSON.parse(localStorage.getItem("caoAdotado")) || [];
  //adiciona no array
  storedAnimalName.push(animalName);
  localStorage.setItem('caoAdotado', JSON.stringify(storedAnimalName));
}

