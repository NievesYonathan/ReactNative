import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { CustomTextInput } from "../../../Presentation/components/CustomTextInput";
import useViewModel from "./viewModel";

export const RegisterScreen = () => {
  const {
    name,
    lastname,
    phone,
    email,
    password,
    confirmPassword,
    errorMessage,
    successMessage,  // Mensaje de éxito
    onChange,
    register,
    resetForm  // Función para registrar usuario
  } = useViewModel();


  //Para saber si la variable ya tiene establecido un valor.
  useEffect(() => {
    if (errorMessage !== ''){
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);


 // Efecto para mostrar mensajes de éxito
 useEffect(() => {
  if (successMessage !== '') {
    // Muestra un Toast con el mensaje de éxito
    ToastAndroid.show(successMessage, ToastAndroid.LONG);
    // Aquí podrías agregar navegación a otra pantalla si lo deseas
  }
}, [successMessage]);


  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/chef.jpg")}
        style={styles.imageBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/user_image.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>REGISTRARSE</Text>

          <CustomTextInput
            image={require("../../../../assets/user.png")}
            placeholder="Nombres"
            KeyboardType="default"
            property="name"
            onChangeText={onChange}
            value={name}
            secureTextEntry={false}
          />
          <CustomTextInput
            image={require("../../../../assets/my_user.png")}
            placeholder="Apellidos"
            KeyboardType="default"
            property="lastname"
            onChangeText={onChange}
            value={lastname}
            secureTextEntry={false}
          />
          <CustomTextInput
            image={require("../../../../assets/email.png")}
            placeholder="Correo electrónico"
            KeyboardType="email-address"
            property="email"
            onChangeText={onChange}
            value={email}
            secureTextEntry={false}
          />
          <CustomTextInput
            image={require("../../../../assets/phone.png")}
            placeholder="Teléfono"
            KeyboardType="numeric"
            property="phone"
            onChangeText={onChange}
            value={phone}
            secureTextEntry={false}
          />
          <CustomTextInput
            image={require("../../../../assets/password.png")}
            placeholder="Contraseña"
            KeyboardType="default"
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />
          <CustomTextInput
            image={require("../../../../assets/confirm_password.png")}
            placeholder="Confirmar Contraseña"
            KeyboardType="default"
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <View style={{ marginTop: 30 }}>
            <RoundedButton text="CONFIRMAR" onPress={() => register()} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%",
  },

  form: {
    width: "100%",
    height: "75%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },

  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },

  formInput: {
    flexDirection: "row",
    marginTop: 25,
  },

  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 15,
  },

  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  formRegisterText: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "5%",
    alignItems: "center",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
});

//40
