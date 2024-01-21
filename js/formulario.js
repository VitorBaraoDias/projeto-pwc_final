var form = document.querySelector('form'),
nomeCaoAdocao = document.getElementById('nomeCaoAdocao');
const apiUrl = 'https://api.petfinder.com/v2/animals';
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvaktpdXNBSnNUdHh0RE9RRXh2c1NUVVpmczl4MlpzcHJKYWRYanZYNU5Zb1U0UjFORCIsImp0aSI6ImJiMGRiNGJiMTNlODU2YTkwMzU2YjM0ZGY2MWUxMGUwMjE2YTQ1NTI4NTNkNDU5ZWMxMjNkYzk3MzM0NzQwMTk3OWJkNTQxMjA2N2M4ZGFiIiwiaWF0IjoxNzA1ODU4ODEwLCJuYmYiOjE3MDU4NTg4MTAsImV4cCI6MTcwNTg2MjQxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.vVIhRnMMZQ8Yf9RHtc_hj-pgN0PYObYUOAXDHBT-9KCaOPR0-YDoShbXXvq6eigGNml5-0kBB4p49bcUu-108Y_4eFPuaMdEgFBKPjXiUivo3JafxJPgMQtQznxTrNejhHuOcm9uORnBkFhwyO5ILaozBrfoxvXfsHbu09mV1XcuTwyvIyD5-zUNJ7HwweF9kPEGQpYE0dOlQ6W_VJDiF_PlWQmwn2fKPguUL1fjI_DfZWK9L3-G0g34xvzaIrrUNSRPUVGo77wpkCKY9f8SQPPSfFQk0zWj9f6Xf7Ap4O18cfugD5ByWUfyPjoRtqifJO6nLByRB8_w1iHvVZPdPQ';

var nomeCao = "";
document.addEventListener('DOMContentLoaded', function() {
    // Obtém o ID do animal a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');

    // Carrega os detalhes do animal com base no ID
    carregarNomeAnimal(animalId);
  });
  function carregarNomeAnimal(animalId) {
    $.ajax({
      url: `${apiUrl}/${animalId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      success: function(data) {
        console.log(data);
        nomeCaoAdocao.innerHTML = "Adotar " + data.animal.name;
        nomeCao = data.animal.name;
      },
      error: function(error) {
        window.alert("Ups, não existe o  cão que quer adotar");
        window.location.href = `../adocao.html`;
        console.error('Erro ao obter detalhes do animal da PetFinder:', error);
      }
    });
} 
//nao deixa dar submit ao formulario enquanto o formo não for validado
form.addEventListener('submit', function (event) {
    //se retornar falso, nao esta validado o form
    if (!validarForm()) {
        return event.preventDefault();
    }
    addCaoAdotado(nomeCao);
});
function validarForm() {
    //vai buscar todos as caixas de texto
    let inputs = form.getElementsByTagName("input"), input = null, validacao = true;

    //percorre todos os inputs
    for (let i = 0, len = inputs.length; i < len; i++) {
        //referencia o input atual
        input = inputs[i];
        //se o input nao esta validado, erro
        if (!input.value) {
            validacao = false;
            input.focus();
            //vai dar scroll para o input não validado
            input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            alert("Preencha todas as caixas de texto");
            break;
        }
    }
    return (validacao);
}
function activeModal() {
    const content_modal = document.getElementById('modal');
    content_modal.classList.toggle('active');
}
function addCaoAdotado(nomeCao) {
    if (typeof (Storage) !== "undefined") {
        var nomeCao_array = JSON.parse(localStorage.getItem("nomeCao")) || [];
        nomeCao_array.push(nomeCao);
        localStorage.setItem("nomeCao", JSON.stringify(nomeCao_array));
        window.alert("Foi adotado com sucesso");
    }
    else console.log("Nao suporta cookies")

}
function voltarPaginaAdocao(){
    window.location.href = `../adocao.html`;
}
