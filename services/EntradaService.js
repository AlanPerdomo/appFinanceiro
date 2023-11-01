import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../util/Config';

class EntradaService {
  async cadastrar(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'entrada/cadastrar',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  async listarEntradasPorUsuario(usuarioId) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'entrada/listar/' + usuarioId,
      method: 'GET',
      timeout: Config.TIMEOUT_REQUEST,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
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
const entradaService = new EntradaService();
export default entradaService;
