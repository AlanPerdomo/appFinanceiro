import React, { useState } from 'react';
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

  const userProfilePictureUrl = 'https://via.placeholder.com/150';
  const usuarioId = AsyncStorage.getItem('USER_ID');

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

  const handleUpdateProfile = () => {
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
            usuarioService.deletar(usuarioId);
            Alert.alert(
              'Conta Excluída',
              'Sua conta foi excluída com sucesso.',
            );
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
    handleCloseModal();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil</Text>
      <TouchableOpacity onPress={handleSettingsPress}>
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
                  title="Atualizar Dados"
                  onPress={handleUpdateProfile}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 10,
  },
});
