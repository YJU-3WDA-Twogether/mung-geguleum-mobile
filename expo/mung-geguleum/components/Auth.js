import React, { useState } from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, Button, Alert} from 'react-native';
import styles from '../styles/styles';
import authlg from "../image/MainLogo.png";
// ScrollView - 화면전환할 때 네비게이션, 스택 추가로 사용해야함

function Auth({ setUserObj }) {
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = () => setNewAccount(!newAccount);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.auth}>
                <View style={styles.nwitter__logo}>
                    <Image source={authlg} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={styles.nwitter__notice}>
                    {/*<TypingEffect />*/}
                    <Text style={{ color: '#6667ab' }}>창작을 </Text>
                    <Text>자유롭게</Text>
                </View>
                {newAccount ? (
                    <View style={styles.nwitter__info}>
                        <Button
                            title={"9Room 로그인하기"}
                            color={"#6667ab"}
                            onPress={() => Alert.alert("로그인 버튼 눌림")}
                        />
                    </View>
                ) : (
                    <View style={styles.nwitter__info}>
                        <Text>오늘 9Room에 가입하세요.</Text>
                    </View>
                )}
                {/*<AuthForm newAccount={newAccount} setUserObj={setUserObj} />*/}
                <View style={styles.authBtns}>
                    <Text>Google 로그인</Text>
                    <Text>Github 로그인</Text>
                </View>
                {newAccount ? (
                    <View style={styles.auth__notice}>
                        <Text style={styles.auth__noticeText}>계정이 없으신가요?</Text>
                        <View>
                            <TouchableOpacity onPress={toggleAccount} style={styles.authSwitch}>
                                <Text style={{ color: 'blue' }}>가입</Text>
                            </TouchableOpacity>
                            <Text>하기</Text>
                        </View>

                        {/* <ScrollView> 테스트용 텍스트 더미데이터*/}
                        <View>
                            <Text style={{ color: '#e8e8e8'}}>
                                스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}스크롤 테스트용 더미데이터 {"\n"}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.auth__notice}>
                        <Text style={styles.auth__noticeText}>이미 9Room에 가입하셨나요?</Text>
                        <View>
                            <TouchableOpacity onPress={toggleAccount} style={styles.authSwitch}>
                                <Text style={{ color: 'blue' }}>로그인</Text>
                            </TouchableOpacity>
                            <Text>하기</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

// 위 코드에 대한 스타일 지정하는 샘플 코드 한번 만들어봄
// const styles = StyleSheet.create({   // StyleSheet.create({...})를 통해 새로운 스타일시트를 선언
//     block: {
//         flex: 1,    //flex 1을 설정해주면 위치한 곳의 모든 영역을 차지
//     }
// })

export default Auth;