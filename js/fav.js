const content_animals = document.querySelector('#content-animals');
const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6ImJiMGRiNGJiMTNlODU2YTkwMzU2YjM0ZGY2MWUxMGUwMjE2YTQ1NTI4NTNkNDU5ZWMxMjNkYzk3MzM0NzQwMTk3OWJkNTQxMjA2N2M4ZGFiIiwiaWF0IjoxNzA1ODU4ODEwLCJuYmYiOjE3MDU4NTg4MTAsImV4cCI6MTcwNTg2MjQxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.vVIhRnMMZQ8Yf9RHtc_hj-pgN0PYObYUOAXDHBT-9KCaOPR0-YDoShbXXvq6eigGNml5-0kBB4p49bcUu-108Y_4eFPuaMdEgFBKPjXiUivo3JafxJPgMQtQznxTrNejhHuOcm9uORnBkFhwyO5ILaozBrfoxvXfsHbu09mV1XcuTwyvIyD5-zUNJ7HwweF9kPEGQpYE0dOlQ6W_VJDiF_PlWQmwn2fKPguUL1fjI_DfZWK9L3-G0g34xvzaIrrUNSRPUVGo77wpkCKY9f8SQPPSfFQk0zWj9f6Xf7Ap4O18cfugD5ByWUfyPjoRtqifJO6nLByRB8_w1iHvVZPdPQ';
getAnimalsFav();
function getAnimalsFav(){
    const dogsFavoritos = obterIdsArmazenados();
    dogsFavoritos.forEach(idDog => {
        carregarDog(idDog)
      });
}
function obterIdsArmazenados() {
  let storedAnimalIds = JSON.parse(localStorage.getItem("animalIds")) || [];
  return storedAnimalIds;
}
function carregarDog(animalId) {
  $.ajax({
    url: `${apiUrl}/${animalId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    success: function(data) {
      console.log(data);
      addDogDiv(data.animal);
    },
    error: function(error) {
      console.error('Erro ao obter animais da PetFinder:', error);
    }
  });
}

function getRandomElement(arr) {
    //retorna o um elemento aleatorio do array
    return arr[Math.floor(Math.random() * arr.length)];
  }
function addDogDiv(animal){
    const dogs = ['./img/cao1.jpeg','./img/cao2.jpeg','./img/cao3.jpg','./img/cao4.webp','./img/cao5.jpg'];

    const nome = animal.name;
    const id = animal.id;
    const descricao = animal.description != '' && animal.description != null ? animal.description : 'Não possui descrição';
    const imagemUrl = animal.primary_photo_cropped && animal.primary_photo_cropped.medium ? animal.primary_photo_cropped.medium : getRandomElement(dogs);

    content_animals.appendChild(getCardDog(imagemUrl,nome,id,descricao));
}
function getCardDog(imagemUrl,nome,id,descricao) {
    const divAnimal = document.createElement('div');
    divAnimal.classList.add('col');
    // Montar o conteúdo da div com a estrutura HTML desejada
    divAnimal.innerHTML = `
      <div class="card">
          <img src="${imagemUrl}" class="card-img-top" alt="${nome}">
          <svg class="like active" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"  onclick="setFavorito(${id})" data-index="${id}">
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
function validarFav(array,animalIds_){

  let obj = array.find(o => o == animalIds_);
  // Retorna true se o objeto for encontrado
  return obj !== undefined;
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
