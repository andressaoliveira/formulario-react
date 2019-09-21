import axios from 'axios';

class FormularioRepository {
  constructor() {
    this.baseUrl = `http://localhost:8080`;
  }

  enviarFormulario(dados) {
    
    console.log('trace repos', dados);
    return axios.post(`${this.baseUrl}`, dados, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  }

}

export default FormularioRepository;