// var request = new XMLHttpRequest();
// request.onreadystatechange = e => {
//     if (request.readyState !== 4) {
//         return;
//     }
//
//     if (request.status === 200) {
//         console.log('success', request.responseText);
//     } else {
//         console.warn('error');
//     }
// };
//
// request.open('GET', 'https://mywebsite.com/endpoint/');
// request.send();

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const dummyData = {
    uid: "dummyUser",
    uname: "더미 유저",
    password: "dummyPassword",
    email: "dummy@example.com",
    nickname: "더미닉",
};

function AxiosTest() {
    const [data, setData] = useState(null);




    useEffect(() => {
        console.log(`-------------------------
        서버 접근 중`)
        axios
            .post('http://10.30.3.85:9094/user/create', dummyData)
            .then(response => {
                setData(response.data);
                console.log('서버 접근 완료! dummydata: ' + dummyData.uid)
            })
            .catch(error => {
                console.error(error);
                console.log('서버 접근 실패... dummydata: ' + dummyData.uid)
            });
    }, []);



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Server Response:</Text>
            {data ? <Text>{data}</Text> : <Text>Loading...</Text>}
        </View>
    );
}

export default AxiosTest;
