import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { AuthContext } from '../contexts/AuthContext';

export function ConfirmationScreen({ route, navigation }) {

  const { confirmation } = React.useContext(AuthContext);
  const [token, setToken] = React.useState('');
  const [email, setEmail] = React.useState(route.params.email);
  const [password, setPassword] = React.useState(route.params.password);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <View style={styles.container}>
      {/* <Heading style={styles.title}>CONFIRMAÇÃO</Heading> */}
      <Text>Digite o código de ativação enviado para o seu e-mail</Text>
      <Error error={error} />
      <Input
        style={styles.inputHidden}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.inputHidden}
        placeholder={'Senha'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        style={styles.input}
        placeholder={'Código'}
        keyboardType={'numeric'}
        value={token}
        onChangeText={setToken}
      />
      <FilledButton
        title={'Confirmar'}
        style={styles.loginButton}
        onPress={
          async () => {
            try {
              setLoading(true);
              const status = await confirmation(email, password, token);
              if (status == '200') {
                navigation.navigate('Login', { email: email, password: password });
              }
            } catch (e) {
                // console.warn(e.response.status);
                // console.warn(e.response);
                setError('');

                if (e.response.status == '404') {
                    setError('Código inválido');
                }
                
                if (e.response.status == '500') {
                    setError('Erro de Servidor');
                }

                // setToken('');
                setLoading(false);
            }
          }
        }
      />
      <TextButton
        title={'Sair'}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Loading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    padding: 20
  },
  input: {
    marginVertical: 10
  },
  title: {
    marginBottom: 20
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 20
  },
  inputHidden: {
    display: 'none'
  }
});
