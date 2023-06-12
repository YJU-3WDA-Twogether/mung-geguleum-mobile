import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    const handleSignup = () => {
        console.log('Signup:', {
            username,
            password,
            confirmPassword,
            email,
            nickname,
        });
        // 회원가입 로직 추가
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>YourLogo</Text>
                <Text style={styles.welcomeText}>Welcome</Text>
            </View>
            <View style={styles.formContainer}>
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
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setNickname}
                    value={nickname}
                    placeholder="Nickname"
                />
                <View style={styles.termsContainer}>
                    <Button
                        onPress={() => {
                            // 약관 상세 페이지로 이동하는 로직 추가
                            console.log('Go to Terms');
                        }}
                        title="Terms and Conditions"
                    />
                </View>
                <Button onPress={handleSignup} title="Signup" />
                <View style={styles.socialLoginContainer}>
                    <Text>Or signup with:</Text>
                    {/* 간편 로그인 버튼들 */}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 18,
        marginTop: 10,
    },
    formContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    termsContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    socialLoginContainer: {
        alignItems: 'center',
    },
});

export default Signup;
