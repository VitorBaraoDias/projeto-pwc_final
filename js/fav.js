const content_animals = document.querySelector('#content-animals');
const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6Ijc2OThjMDVmNTgyNzQwM2QzOTkxZTcwZTM0NDIzOTg2ZDA5MTZkMWI0M2Q3NWFjY2JiNzYyYzAzYTJiMTg5Yjc0YjQwZjg4NDUwYmRmY2UzIiwiaWF0IjoxNjk5ODc1NzA5LCJuYmYiOjE2OTk4NzU3MDksImV4cCI6MTY5OTg3OTMwOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ycsUae5AvOED-CPusoei9nStaqJjhVYk0xow3GUL7D2HcoCHbF_TmO24HLJpVmwcFXZ9wZyd55wUCDQxqMBGcHTpwG3GYyNeOz91n3nc7xC-VxlB2GMJk2ACR7VV0_ZOsa83xutb_DVuKWOUHTF_vdTBv55PFCwVYIAuQfqj1iwbWTAA6Dv8xH2iARUlUIcEiTM3faKsLyHW1ptJxPGgY-F1m1eu-iOixxMo78-jhhEOkTcUuy6v0JljIE7My54AefK9kvD5fN4UrYVFjJfLGOPFFFr1-CT_uECXUUeamEbtbCvrrtvgJq30-wLVfg35Yxmu8yecZE3PzQhFAaFUdw';
getAnimalsFav();
function getAnimalsFav(){
    const dogsFavoritos = obterIdsArmazenados();
    dogsFavoritos.forEach(idDog => {
        carregarDog(idDog)
      });
}
function obterIdsArmazenados() {
    const storedAnimalIds = localStorage.getItem('animalIds') ? localStorage.getItem('animalIds').split(',') : [];
    return storedAnimalIds;
}
function carregarDog(animalId){
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
          addDogDiv(data.animal);
        })
        .catch(error => {
          console.error('Erro ao obter animais da PetFinder:', error);
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
function deleteFav(animalId){
    let storedAnimalIds = localStorage.getItem('animalIds') ? localStorage.getItem('animalIds').split(',') : [];
    //encontra dentro do array o index que contei o id do anial
    const index = storedAnimalIds.indexOf(animalId.toString());
    if (index !== -1) {
        //remoe do array
        storedAnimalIds.splice(index, 1);
        localStorage.setItem('animalIds', storedAnimalIds);
        console.log(`O animalId ${animalId} foi removido do localStorage.`);
    } else {
        console.log(`O animalId ${animalId} não foi encontrado no localStorage.`);
    }
}
