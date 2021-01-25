import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from 'react-native-paper';

export function LoginScreen({ route, navigation }) {

  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  React.useEffect(() => {
    if (route.params?.email && route.params?.password) {
      setVisible(true);
      setEmail(route.params.email);
      setPassword(route.params.password);
      loga();
    }
  }, [route, navigation, password]);

  const loga = async () => {

    if (password.length == 0 || email.length == 0) {
      return false;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (e) {
      // console.warn(e.response);
      setError(e.response.data.message);
      setLoading(false);
      if (e.response.data.message == 'Account is disabled.') {
        setError('');
        navigation.navigate('Confirmation', { email: email, password: password });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>LOGIN</Heading>
      <Error error={error} />

      <Snackbar
        duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          onPress: () => {
            // Do something
          },
        }}>
        {
          route.params ?
            route.params.email ?
              <Text>Conta ativada com sucesso!</Text>
              :
              <Text></Text>
            :
            <Text></Text>
        }
      </Snackbar>

      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Senha'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Entrar'}
        style={styles.loginButton}
        onPress={
          async () => {
            await loga();
          }
        }
      />
      <TextButton
        title={'Não possui uma conta?'}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
  }
});
