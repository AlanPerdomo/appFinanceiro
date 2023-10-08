import axios from 'axios';
class UsuarioService {
  async cadastrar(data) {
    return axios({
      method: 'POST',
      url: 'http://192.168.1.3:3000/usuario/cadastrar',
      data: data,
      timeout: 5000,
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
const usuarioService = new UsuarioService();
export default usuarioService;
