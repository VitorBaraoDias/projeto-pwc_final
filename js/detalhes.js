const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6Ijc2OThjMDVmNTgyNzQwM2QzOTkxZTcwZTM0NDIzOTg2ZDA5MTZkMWI0M2Q3NWFjY2JiNzYyYzAzYTJiMTg5Yjc0YjQwZjg4NDUwYmRmY2UzIiwiaWF0IjoxNjk5ODc1NzA5LCJuYmYiOjE2OTk4NzU3MDksImV4cCI6MTY5OTg3OTMwOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ycsUae5AvOED-CPusoei9nStaqJjhVYk0xow3GUL7D2HcoCHbF_TmO24HLJpVmwcFXZ9wZyd55wUCDQxqMBGcHTpwG3GYyNeOz91n3nc7xC-VxlB2GMJk2ACR7VV0_ZOsa83xutb_DVuKWOUHTF_vdTBv55PFCwVYIAuQfqj1iwbWTAA6Dv8xH2iARUlUIcEiTM3faKsLyHW1ptJxPGgY-F1m1eu-iOixxMo78-jhhEOkTcUuy6v0JljIE7My54AefK9kvD5fN4UrYVFjJfLGOPFFFr1-CT_uECXUUeamEbtbCvrrtvgJq30-wLVfg35Yxmu8yecZE3PzQhFAaFUdw';
const cabecalho_dog = document.getElementById('cabecalho-dog');

document.addEventListener('DOMContentLoaded', function() {
    // Obtém o ID do animal a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');

    // Carrega os detalhes do animal com base no ID
    carregarDetalhes(animalId);
  });
function carregarDetalhes(animalId){
    fetch(`${apiUrl}/${animalId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          jsonToHtml(data);
        })
        .catch(error => {
          console.error('Erro ao obter animais da PetFinder:', error);
        });
}
function jsonToHtml(data) {
    console.log(data)
    const nome = document.getElementById("nomeDog");
    const estadoAdocao = document.getElementById("estadoAdocao");
    const img = document.getElementById('img-detalhe');

    nome.textContent = "Detalhes de " + data.animal.name;
    estadoAdocao.textContent = data.animal.status == 'adoptable' ? 'Estado de adoção: Adotável' : 'Não é possível adotar';
    img.src = data.animal.primary_photo_cropped && data.animal.primary_photo_cropped.medium ? data.animal.primary_photo_cropped.medium : 'não possui imagem';

    addButtonAdotar(data.animal.id);
    getTable(data);
}
function getTable(data) {
    const tbody = document.querySelector('tbody'); 
    const animal = data.animal;

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

    propriedades.forEach(({ chave, valor }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${chave}</td><td>${valor}</td>`;
        tbody.appendChild(tr);
    });
}
function addButtonAdotar(animalId){
  const buttonHTML = `
  <button href="#" class="btn btn-primary" onclick="adotarDog(${animalId})">Adotar</button>`;
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
  const storedAnimalName = localStorage.getItem('caoAdotado') ? localStorage.getItem('caoAdotado').split(',') : [];
  //adiciona no array
  storedAnimalName.push(animalName);
  localStorage.setItem('caoAdotado', storedAnimalName);
}

