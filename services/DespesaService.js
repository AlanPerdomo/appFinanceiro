import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../util/Config';

class DespesaService {
  async cadastrar(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'despesa/cadastrar',
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
  async listarDespesasPorUsuario(usuarioId) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'despesa/listar/' + usuarioId,
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
const despesaService = new DespesaService();
export default despesaService;
