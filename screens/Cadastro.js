import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import {
  Button as PaperButton,
  Provider,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import usuarioService from '../services/UsuarioService';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorNome, setErrorNome] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorTermos, setErrorTermos] = useState(null);

  let cpfField = null;
  let telefoneField = null;

  const validar = () => {
    let error = false;
    setErrorEmail(null);
    setErrorCpf(null);
    setErrorNome(null);
    setErrorPassword(null);
    setErrorTelefone(null);
    setErrorConfirmPassword(null);
    setErrorTermos(null);

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmail('Preencha seu e-mail corretamente');
      error = true;
    }
    if (nome == null) {
      setErrorNome('Nome é obrigatório');
      error = true;
    }
    if (cpf == null) {
      setErrorCpf('CPF é obrigatório');
      error = true;
    }
    if (!cpfField.isValid()) {
      setErrorCpf('Preencha seu CPF corretamente');
      error = true;
    }
    if (telefone == null) {
      setErrorTelefone('Preencha seu telefone corretamente');
      error = true;
    }
    if (password == null) {
      setErrorPassword('Senha é obrigatoria');
      error = true;
    }
    if (password != confirmPassword) {
      setErrorConfirmPassword('Senhas não coincidem');
      error = true;
    }
    if (!isSelected) {
      setErrorTermos('Aceite os termos');
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);
      let data = {
        email: email,
        nome: nome,
        senha: password,
        telefone: telefone,
        cpf: cpf,
      };
      usuarioService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          const title = response.data.status ? 'Sucesso!' : 'Erro!';
          Alert.alert(title, response.data.message);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Erro', error.response.data.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={'100'}
    >
      <ScrollView style={{ width: '100%' }}>
        <Text style={{ textAlign: 'center' }} h2>
          Cadastro
        </Text>

        <Input
          placeholder="Nome"
          onChangeText={setNome}
          //leftIcon={<Icon name="user" type="font-awesome" />}
          errorMessage={errorNome}
        />
        <Input
          placeholder="E-mail"
          onChangeText={setEmail}
          keyboardType="email-address"
          //leftIcon={<Icon name="envelope" type="font-awesome" />}
          errorMessage={errorEmail}
        />
        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="CPF"
            type={'cpf'}
            value={cpf}
            onChangeText={(value) => {
              setCpf(value);
              setErrorCpf(null);
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            style={styles.maskedInput}
            ref={(ref) => (cpfField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorCpf}</Text>
        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Telefone"
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={telefone}
            onChangeText={(value) => {
              setTelefone(value);
              setErrorTelefone(null);
            }}
            keyboardType="phone-pad"
            returnKeyType="done"
            style={styles.maskedInput}
            ref={(ref) => (telefoneField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorTelefone}</Text>
        <Input
          placeholder="Senha"
          onChangeText={(value) => setPassword(value)}
          errorMessage={errorPassword}
          secureTextEntry={true}
        />
        <Input
          placeholder="Confirme a senha"
          onChangeText={setConfirmPassword} // Use uma variável diferente para a confirmação da senha
          secureTextEntry={true}
          errorMessage={errorConfirmPassword} // Use uma variável diferente para os erros de confirmação de senha
        />

        <CheckBox
          title="Aceito os termos de uso"
          checkedIcon="check"
          checkedColor="green"
          uncheckedIcon="square-o"
          uncheckedColor="red"
          containerStyle={{ marginTop: 20 }}
          textStyle={{ color: 'green' }}
          checked={isSelected}
          onPress={() => {
            setSelected(!isSelected);
            setErrorTermos(null);
          }}
        />
        <Text style={styles.errorMessage}>{errorTermos}</Text>
        {isLoading && <Text>Carregando...</Text>}

        {!isLoading && (
          <Button
            icon={<Icon name="check" size={15} color="white" />}
            title="Salvar"
            buttonStyle={styles.buttonStyle}
            onPress={() => salvar()}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    padding: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});
