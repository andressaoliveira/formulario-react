
import FormularioRepository from "../Repositories/FormularioRepositoy";

class FormularioService {
    constructor(formularioRepository = new FormularioRepository()) {
      this.formularioRepository = formularioRepository;
    }

  async enviarFormulario(dados) {
    try {
      const response = await this.formularioRepository.enviarFormulario(dados);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
export default FormularioService