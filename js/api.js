const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6ImRiN2JhOTE2NGI5M2I5ZTI2ZjM2Y2RjZTVhNmI0ZjQxNjZkZWUzYWE2ZmUxZTQ4NzBiMjMzYTE0ZjEyZDc2NGU2NzhjYmJjZWYwOWZjNDE3IiwiaWF0IjoxNzA1Njg0NjIzLCJuYmYiOjE3MDU2ODQ2MjMsImV4cCI6MTcwNTY4ODIyMywic3ViIjoiIiwic2NvcGVzIjpbXX0.S_ypMn-_7wNArNe4rTvmwzi-JZswwur1W6QpoKzLDbfKzxwmHNbrXg6xPzY1kEnyWal0u8Vwoy7IWHnPJ70PKfG80Et0sP9Z7f1w3my0EpdVa8ieG2YYZHf74ELmMVmdbfQC52z-xPqqeUP9N8JLUO9V_9K27s75Otua8XpbGy9eNTmFRxn9efGSHt4OwqrnmXHyTw3oKGtoy-_Y7ZHZKaPtfbXr3XvsEphutGg_sqvQzOzB1SFXekF2VWGyCZBnYmZgnuKEP6bIvWqFGsyVqupYf5QjWsOKmp0AEuAbG2k-PGIIZyv0NhMSwK47JZc4ROu17TAP_Ifw_r8fRUG-bA';
const content_animals = document.querySelector('#content-animals');


getAnimals();
function getAnimals() {
  $.ajax({
    url: apiUrl,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    success: function(data) {
      console.log(data);
      //transforma a inf recebida para hmtl
      jsonToHtml(data);
    },
    error: function(error) {
      console.error('Erro ao obter animais da PetFinder:', error);
    }
  });
}
function jsonToHtml(data) {
    const dogs = ['./img/cao1.jpeg','./img/cao2.jpeg','./img/cao3.jpg','./img/cao4.webp','./img/cao5.jpg'];
    //percorre todos os caes do array de objetos data
    data.animals.forEach(animal => {
        const nome = animal.name;
        const id = animal.id;
        const descricao = animal.description != '' && animal.description != null ? animal.description : 'Não possui descrição';
        const imagemUrl = animal.primary_photo_cropped && animal.primary_photo_cropped.medium ? animal.primary_photo_cropped.medium : getRandomElement(dogs);
        content_animals.appendChild(getCardDog(imagemUrl,nome,id,descricao));
      });
}
function getCardDog(imagemUrl,nome,id,descricao) {
  const divAnimal = document.createElement('div');
  divAnimal.classList.add('col');
  // Montar o conteúdo da div com a estrutura HTML desejada
  divAnimal.innerHTML = `
    <div class="card">
        <img src="${imagemUrl}" class="card-img-top" alt="${nome}">
        <svg class="like ${verificar_estado_favDog(id)}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"  onclick="setFavorito(${id})" data-index="${id}">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>"
        </svg>
        <div class="card-body">
            <h5 class="card-title">${nome}</h5>
            <small class="text-body-secondary">${descricao}</small>
            <button href="#" class="btn btn-primary float-end" onclick="verDetalhes(${id})">Ver</button>
        </div>
    </div>
  `;
  return divAnimal;
}
function getRandomElement(arr) {
  //retorna o um elemento aleatorio do array, usado para escolher uma foto aleatoriamente
  return arr[Math.floor(Math.random() * arr.length)];
}
function verDetalhes(animalId) {
  // Obtém o ID do animal
  window.location.href = `/detalhes.html?id=${animalId}`;
}
function setFavorito(animalId){
  const fav  = document.querySelector(`svg[data-index="${animalId}"]`);

  if(fav.classList.contains("active")){
    deleteFav(animalId);
  }
  else{
    addStorage(animalId);
    console.log(obterIdsArmazenados());
  }
  fav.classList.toggle("active");
}
function addStorage(animalId){

//obj to array
  if(typeof(Storage) !== "undefined"){

    var ids_animals = JSON.parse(localStorage.getItem("animalIds")) || [];
    if(!validarFav(ids_animals, animalId)){

      ids_animals.push(animalId);
      localStorage.setItem("animalIds", JSON.stringify(ids_animals));
      window.alert("adicionado dos favoritos");
    }
    else window.alert("removido dos favoritos");

  }
  else console.log("Nao suporta cookies")
}
function validarFav(array,animalIds_){

  let obj = array.find(o => o == animalIds_);
  // Retorna true se o objeto for encontrado
  return obj !== undefined;
}
function obterIdsArmazenados() {
  let storedAnimalIds = JSON.parse(localStorage.getItem("animalIds")) || [];
  return storedAnimalIds;
}
function verificar_estado_favDog(animalId){
  let storedAnimalIds = JSON.parse(localStorage.getItem("animalIds")) || [];
  //encontra dentro do array o index que contei o id do anial
  const index = storedAnimalIds.indexOf(animalId.toString());
  if (index !== -1) {
      return "active";
  }
  return "";
}
function deleteFav(animalId){
  let storedAnimalIds = JSON.parse(localStorage.getItem("animalIds")) || [];
  //encontra dentro do array o index que contei o id do anial
  console.log(storedAnimalIds)
  const index = storedAnimalIds.indexOf(parseInt(animalId));
  if (index !== -1) {
      //remoe do array
      storedAnimalIds.splice(index, 1);
      localStorage.setItem('animalIds', JSON.stringify(storedAnimalIds));
      console.log(`O animalId ${animalId} foi removido do localStorage.`);
  } else {
      console.log(`O animalId ${animalId} não foi encontrado no localStorage.`);
  }
}


