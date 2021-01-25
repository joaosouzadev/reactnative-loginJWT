import React from 'react'; ''
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
import { Loading } from '../components/Loading';
import { AuthContext } from '../contexts/AuthContext';

export function RegistrationScreen({ navigation }) {

  const { register } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <View style={styles.container}>
      <IconButton style={styles.closeIcon} name={'closecircleo'} size={32} onPress={() => {
        navigation.pop();
      }} />
      <Heading style={styles.title}>CRIAR CONTA</Heading>
      <Error error={error} />
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
        title={'Criar'}
        style={styles.loginButton}
        onPress={
          async () => {
            try {
              setLoading(true);
              const status = await register(email, password);
              if (status == '201') {
                navigation.navigate('Confirmation', { email: email, password: password });
              }
            } catch (e) {
              setError(e.message);
              setLoading(false);
              console.log(e);
            }
          }
        }
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
  },
  closeIcon: {
    position: 'absolute',
    top: 55,
    left: 20
  }
});
