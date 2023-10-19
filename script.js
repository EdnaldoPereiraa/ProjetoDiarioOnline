// Função para salvar o diário
function salvarDiario() {
    var titulo = document.getElementById("titulo").value;
    var entry = document.getElementById("entry").value;
    var humor = document.getElementById("humor").value;
    var data = getCurrentDate();

    if (titulo === "" || entry === "") {
        document.getElementById("titulo").style.border = "2px solid red";
        document.getElementById("entry").style.border = "2px solid red";
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    document.getElementById("titulo").style.border = "1px solid #ccc";
    document.getElementById("entry").style.border = "1px solid #ccc";

    var postagem = document.createElement("li");

    // Use um atributo personalizado para armazenar a data da postagem
    postagem.setAttribute("data-data", data);

    var humorText = getHumorText(humor);
    postagem.innerHTML = "<strong>Título:</strong> " + titulo + "<br><strong>Texto:</strong> " + entry + "<br><strong>Data:</strong> " + data + "<br><strong>Humor:</strong> " + humorText +
        "<button onclick='editarPostagem(this)'>Editar</button>" +
        "<button onclick='excluirPostagem(this)'>Excluir</button>";

    var diarioList = document.getElementById("diario-list");

    // Adicione a nova postagem no início da lista (no topo)
    if (diarioList.firstChild) {
        diarioList.insertBefore(postagem, diarioList.firstChild);
    } else {
        diarioList.appendChild(postagem);
    }

    document.getElementById("titulo").value = "";
    document.getElementById("entry").value = "";
    document.getElementById("humor").value = "😄";
    document.getElementById("data").value = getCurrentDate();
}


// Função para editar uma postagem
function editarPostagem(button) {
    var postagem = button.parentElement;
    var elements = postagem.getElementsByTagName("strong");
    var titulo, entry, data, humor;

    for (var i = 0; i < elements.length; i++) {
        var text = elements[i].textContent;
        if (text.includes("Título:")) {
            titulo = elements[i].nextSibling.textContent.trim();
        } else if (text.includes("Texto:")) {
            entry = elements[i].nextSibling.textContent.trim();
        } else if (text.includes("Data da Publicação:")) {
            data = elements[i].nextSibling.textContent.trim();
        } else if (text.includes("Humor:")) {
            humor = elements[i].nextSibling.textContent.trim();
        }
    }

    document.getElementById("titulo").value = titulo;
    document.getElementById("entry").value = entry;
    document.getElementById("data").value = data;
    document.getElementById("humor").value = humor;

    var salvarEdicoesButton = document.createElement("button");
    salvarEdicoesButton.innerText = "Salvar Edições";
    salvarEdicoesButton.onclick = function () {
        salvarEdicoes(postagem);
    };

    postagem.appendChild(salvarEdicoesButton); // Adicione o botão "Salvar Edições" à postagem
    button.style.display = "none"; // Oculte o botão "Editar"
}



// Função para salvar as edições em uma postagem
function salvarEdicoes(postagem) {
    var titulo = document.getElementById("titulo").value;
    var entry = document.getElementById("entry").value;
    var humor = document.getElementById("humor").value;
    var data = document.getElementById("data").value;

    if (titulo === "" || entry === "") {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    document.getElementById("titulo").style.border = "1px solid #ccc";
    document.getElementById("entry").style.border = "1px solid #ccc";

    var humorText = getHumorText(humor);

    // Atualize a postagem com os novos valores
    postagem.innerHTML = "<strong>Título:</strong> " + titulo + "<br><strong>Texto:</strong> " + entry + "<br><strong>Data:</strong> " + data + "<br><strong>Humor:</strong> " + humorText +
        "<button onclick='editarPostagem(this)'>Editar</button>" +
        "<button onclick='excluirPostagem(this)'>Excluir</button>";

    document.getElementById("titulo").value = "";
    document.getElementById("entry").value = "";
    document.getElementById("humor").value = "😄";
    document.getElementById("data").value = getCurrentDate();
}


// Função para excluir uma postagem
function excluirPostagem(button) {
    var confirmaExclusao = confirm("Tem certeza de que deseja excluir esta postagem?");

    if (confirmaExclusao) {
        var postagem = button.parentElement;
        postagem.remove();
    }
}

// Função para obter a data atual no formato "YYYY-MM-DD"
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

// Função para obter o nome do humor com base no emoji
function getHumorText(humor) {
    switch (humor) {
        case "😄":
            return "Muito Feliz 😄";
        case "😀":
            return "Feliz 😀";
        case "😎":
            return "Legal 😎";
        case "😢":
            return "Triste 😢";
        case "😤":
            return "Irritado 😤";
        case "😴":
            return "Sonolento 😴";
        case "😰":
            return "Preocupado 😰";
        case "😐":
            return "Neutro 😐";
        default:
            return "Desconhecido";
    }
}

// Define a data atual quando a página é carregada
document.getElementById("data").value = getCurrentDate();
