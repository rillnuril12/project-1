import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import logo from '../assets/movie.png';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const [nip, setNip] = React.useState('')
  const [nama, setNama] = React.useState('')
  const [password, setPassword] = React.useState('');

    const [data, setData] = React.useState({
      nip: '',
      nama: '',
      password: '',
    })

    useEffect(() => {
      getData()
      return () => { };
    }, []);

    const getData = async () => {
      try {
        let nip = await AsyncStorage.getItem('nip')
        let nama = await AsyncStorage.getItem('name')
        let password = await AsyncStorage.getItem('password')
        if (nip !== null) {
          //value proviously stored
          setData({
            nip: nip,
            nama: name,
            password: password,
            name: name
          })
        }
      } catch (e) {
        //error reading value
      }
    }

    const register = async (value) => {
      console.log('value', value);
      try {
        const response = await axios.post('http://192.168.1.5:3300/users', {
          nip: value.nip,
          nama: value.nama,
          password: value.password
        })
        if (response.data.status == 200) {
          console.log('response', response)
          ToastAndroid.show("Register berhasil", ToastAndroid,SHORT)
        }
      } catch (error) {
        console.log(error.message)
        ToastAndroid.show("Register gagal", ToastAndroid.SHORT)
      }
    }
    
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          marginBottom: 40,
          marginTop: 10,
        }}>
        Cinema
      </Text>
      <View>
        <TextInput
          style={styles.Input}
          placeholder="Nip"
          placeholderTextColor="white"
          onChangeText={(nip) => setNip(nip)}
          value={nip}
        />
        <TextInput
          style={styles.Input}
          placeholder="Name"
          placeholderTextColor="white"
          onChangeText={(nama) => setNama(nama)}
          value={nama}
        />
        <TextInput
          style={styles.Input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (nip == "" || nama == "" || password == "") {
              ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT)
            } else {
              register({ nip, nama, password })
            }
          }}>
          <Text style={styles.textbutton}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Already have an Account?
          <Text 
            style={{fontWeight: 'bold'}} 
            onPress={() => navigation.goBack()}
        > Sign In</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  Input: {
    width: 300,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#f2ed46',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textbutton: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Register;
