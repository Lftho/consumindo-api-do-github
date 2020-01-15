import api from './api';

class App {
  constructor() {
    //guardar toda lista do repositorios
    this.repositories = [];

    //buscar referencia pelo js
    this.formEl = document.getElementById('repo-form');

    //referencia o input do html
    this.inputEl = document.querySelector('input[name=repository]');

    //renderizar em tela a nossa lista
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  // Registrar os eventos
  registerHandlers() {
    //ouvindo o evento ao click
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  // uma função de carregar
  setLoading(loading = true) {
    if ( loading === true ){
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando'));
      loadingEl.setAttribute('id', 'loading');

      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById('loading').remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    //pegando o valor do input
    const repoInput = this.inputEl.value;
    // verificar se tem alguma coisa escrito dentro do nosso input
    if ( repoInput.length === 0 ) 
      return;

    this.setLoading();
    
    // Try e o catch para dá um posição se o repositorio existe ou não
    try { 
    //se realmente entrou informação dentro input, então buscaremos valores dentro da api
    const response = await api.get(`/repos/${repoInput}`);

    //destruturação
    const { name, description, html_url, owner: { avatar_url } } = response.data;

    //adcionando as informaçoes estatico e template literals
    this.repositories.push({
      name,
      description,
      avatar_url,
      html_url,
    });

    this.inputEl.value = '';

    this.render();
   } catch(err) {
     alert('O repositorio não existe');
   }

   this.setLoading(false);
  }
    // Rendenrizar tudo do zero
    render() {
      this.listEl.innerHTML = '';
      //Usado o metodo forEach para renderizar todos os repositorio, pois é o metodo que mais prático do que o map.
      //Que percorre sem mudar o array do repositories.
      this.repositories.forEach(repo => {
        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', repo.avatar_url);

        let titleEl = document.createElement('strong');
        titleEl.appendChild(document.createTextNode(repo.name));

        let descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(repo.description));

        let linkEl = document.createElement('a');
        linkEl.setAttribute('target', '_blank' );
        linkEl.setAttribute('href', repo.html_url);
        linkEl.appendChild(document.createTextNode('Acessar'));

        let listItemEl = document.createElement('li');
        listItemEl.appendChild(imgEl);
        listItemEl.appendChild(titleEl);
        listItemEl.appendChild(descriptionEl);
        listItemEl.appendChild(linkEl);

        this.listEl.appendChild(listItemEl);
    });
  }
}


new App();

