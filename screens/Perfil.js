import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usuarioService from '../services/UsuarioService';
export default function Perfil({ navigation }) {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await usuarioService.obterUsuario(
        await AsyncStorage.getItem('USER_ID'),
      );
      setUsuario(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout: ', error);
    }
  };

  const handleSettingsPress = () => {
    setIsSettingsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsSettingsModalVisible(false);
  };

  const handleUpdatePassword = () => {
    Alert.alert('Atualizar Dados', 'Lógica de atualização do perfil');
    handleCloseModal();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const usuarioId = await AsyncStorage.getItem('USER_ID');
              console.log(usuarioId);
              await usuarioService.deletar(usuarioId);

              Alert.alert(
                'Conta Excluída',
                'Sua conta foi excluída com sucesso.',
              );
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Erro ao excluir conta: ', error);
              Alert.alert('Erro', 'Ocorreu um erro ao excluir a conta.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
    handleCloseModal();
  };

  return (
    <View style={perfilStyles.container}>
      {usuario && (
        <View style={perfilStyles.userDetails}>
          <View style={perfilStyles.userInfoItem}>
            <Text style={perfilStyles.userInfoLabel}>
              {' '}
              <Icon name="user" size={16} color="black" />
              Nome:
            </Text>
            <Text style={perfilStyles.userInfoText}>{usuario.nome}</Text>
            <TouchableOpacity onPress={() => console.log('Alterar Nome')}>
              <Icon name="edit" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <View style={perfilStyles.userInfoItem}>
            <Text style={perfilStyles.userInfoLabel}>
              <Icon name="envelope" size={16} color="black" />
              Email:
            </Text>
            <Text style={perfilStyles.userInfoText}>{usuario.email}</Text>
            <TouchableOpacity onPress={() => console.log('Alterar Email')}>
              <Icon name="edit" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <View style={perfilStyles.userInfoItem}>
            <Text style={perfilStyles.userInfoLabel}>
              <Icon name="user" size={16} color="black" />
              CPF:
            </Text>
            <Text style={[perfilStyles.userInfoText, { flex: 0.65 }]}>
              {usuario.cpf}
            </Text>
          </View>
          <View style={perfilStyles.userInfoItem}>
            <Text style={perfilStyles.userInfoLabel}>
              <Icon name="phone" size={16} color="black" />
              Telefone:
            </Text>
            <Text style={perfilStyles.userInfoText}>{usuario.telefone}</Text>
            <TouchableOpacity onPress={() => console.log('Alterar Telefone')}>
              <Icon name="edit" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={perfilStyles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Icon name="cog" size={30} color="black" />
      </TouchableOpacity>

      <Modal
        visible={isSettingsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={perfilStyles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={perfilStyles.modalContent}>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={perfilStyles.closeButton}
                >
                  <Text style={{ color: 'white' }}>Fechar</Text>
                </TouchableOpacity>
                <Button
                  buttonStyle={perfilStyles.buttonStyle}
                  icon={<Icon name="sign-out" size={15} color="white" />}
                  title="Sair"
                  onPress={() => logout()}
                />
                <Button
                  buttonStyle={perfilStyles.buttonStyle}
                  icon={<Icon name="pencil" size={15} color="white" />}
                  title="Alterar Senha"
                  onPress={handleUpdatePassword}
                />
                <Button
                  buttonStyle={[
                    perfilStyles.buttonStyle,
                    { backgroundColor: 'red' },
                  ]}
                  icon={<Icon name="trash" size={15} color="white" />}
                  title="Excluir Conta"
                  onPress={handleDeleteAccount}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const perfilStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    width: '90%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    margin: 10,
    backgroundColor: 'white',
  },
  userInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  userInfoText: {
    fontSize: 16,
    color: 'black',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(1, 0, 0, 0.25)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 50,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  buttonStyle: {
    marginVertical: 10,
  },
});
