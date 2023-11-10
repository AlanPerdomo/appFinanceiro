import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../util/Config';

class UsuarioService {
  async cadastrar(data) {
    return axios({
      url: Config.API_URL + 'usuario/cadastrar',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        AsyncStorage.setItem('TOKEN', response.data.access_token);
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  async login(data) {
    return axios({
      url: Config.API_URL + 'usuario/login',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        if (response.data.access_token) {
          AsyncStorage.setItem('TOKEN', response.data.access_token);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  async loginComToken(data) {
    return axios({
      url: Config.API_URL + 'usuario/login-token',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        if (response.data.access_token) {
          AsyncStorage.setItem('TOKEN', response.data.access_token);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async obterUsuario(usuarioId) {
    return axios({
      url: Config.API_URL + 'usuario/' + usuarioId,
      method: 'GET',
      timeout: Config.TIMEOUT_REQUEST,
      headers: {
        ...Config.HEADER_REQUEST,
        Authorization: `Bearer ${await AsyncStorage.getItem('TOKEN')}`,
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  // async alterarSenha(data) {
  //   return axios({
  //     url: Config.API_URL + 'usuario/alterar-senha',
  //     method: 'POST',
  //     timeout: Config.TIMEOUT_REQUEST,
  //     data: data,
  //     headers: {
  //       ...Config.HEADER_REQUEST,
  //       Authorization: `Bearer ${await AsyncStorage.getItem('TOKEN')}`,
  //     },
  //   })
  //     .then((response) => {
  //       return Promise.resolve(response);
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // }

  // async alterarDados(data) {
  //   return axios({
  //     url: Config.API_URL + 'usuario/alterar-dados',
  //     method: 'POST',
  //     timeout: Config.TIMEOUT_REQUEST,
  //     data: data,
  //     headers: {
  //       ...Config.HEADER_REQUEST,
  //       Authorization: `Bearer ${await AsyncStorage.getItem('TOKEN')}`,
  //     },
  //   })
  //     .then((response) => {
  //       return Promise.resolve(response);
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // }
}

const usuarioService = new UsuarioService();
export default usuarioService;
