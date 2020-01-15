class App {
  constructor() {
    //guardar toda lista do repositorios
    this.repositories = [];

    //buscar referencia pelo js
    this.formEl = document.getElementById('repo-form');

    this.registerHandlers();
  }

  // Registrar os eventos
  registerHandlers() {
    //ouvindo o evento ao click
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  addRepository(event) {
    event.preventDefault();

    //adcionando as informaçoes esstatico
    this.repositories.push({
      name: 'rocketseat.com.br',
      description: 'Tire a sua ideia do papel e de vida à sua startup',
      avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?v=4',
      html_url: 'http://github.com/rocketseat/rocketseat.com.br'
    });

    console.log(this.repositories);
  }
}


new App();

