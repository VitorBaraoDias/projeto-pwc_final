var form = document.querySelector('form');

//nao deixa dar submit ao formulario
form.addEventListener('submit', function (event) {
    //se retornar falso, nao esta validado o form
    if (!validateForm()) {
        event.preventDefault();
    }
});

function validateForm(){
    //vai buscar todos as caixas de texto
    let inputs = form.getElementsByTagName("input"), input = null, validacao = true;

    //percorre todos os inputs
    for(let i = 0, len = inputs.length; i < len; i++) {
        //referencia o input atual
        input = inputs[i];
        //se o input nao esta validado, erro
        if(!input.value) {
            validacao = false;
            input.focus();
            //vai dar scroll para o input não validado
            input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            alert("Preencha todas as caixas de texto");
            break;
        }
    }
    return(validacao);
}