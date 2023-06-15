// components/Login.js
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Signup from "./Signup";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = () => {
        // navigation.navigate('Signup');
        return (
        <NavigationContainer>
            <View>
                <Signup />
            </View>
        </NavigationContainer>
        );
    };
    /*

    [ 2023.06.12 - 박진석 ]
    login.js, Signup.js 만들고 연결함
    하지만 Navigation 관련 부분에서 계속 오류 뜸.
    정확히는 login.js는 잘 표시되지만 login.js에서 Signup.js로 넘어가는 부분에서 계속 아래와 같은 오류가 뜸
    -----
    The 'navigation' object hasn't been initialized yet. This might happen if you don't have a navigator mounted, or if the navigator hasn't finished mounting. See https://reactnavigation.org/docs/navigating-without-navigati
    on-prop#handling-initialization for more details.
    -----
    이를 위해 기존 13번째 라인 navigation.navigate('Signup'); 부분을 주석처리한 후
    App.js 에서 사용하는 방식으로 변경함. -> 당연히 작동은 안됨ㅋ

     */

    const onLogin = () => {
        console.log(username, password);
        // 이후에 DB 연결 및 인증 로직을 여기에 추가
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />

            <Button
                onPress={onLogin}
                title="Login"
            />

            <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    signupLink: {
        marginTop: 20,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Login;
