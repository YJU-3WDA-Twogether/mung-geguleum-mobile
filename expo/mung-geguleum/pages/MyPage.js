import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import styled from "../styles/Mypage.module.css";
import pfile from "../image/Profile.jpg";
import bgfile from "../image/background.jpg";
import {BsCalendar3}  from "react-icons/bs";
import MyLog from "./MyLog";
import MyPostView from "./MyPostView";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdExit} from "react-icons/io";
import {TopCategory} from "../topCatgory/TopCategory";
import style from "../styles/MyPageBtn.module.css";
import MyLikeView from "./MyLikeView";

const API_URL = process.env.REACT_APP_API_URL;
function MyPage({ handlePostClick, selectedPostUno ,MainClose}) {

    const [user, setUser] = useState({});
    const [user2, setUser2]= useState({});
    const [selected, setSelected] = useState(1);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    const handleClick = (n) => {
        setSelected(n, () => {
            console.log(selected);
        });
    };
    useEffect(() => {
        if (selectedPostUno) {
            fetchUserInfo(selectedPostUno);
        }
    }, [selectedPostUno]);

    const fetchUserInfo = async (pno) => {
        try {
            const response = await axios.get(`${API_URL}/user/read/${pno}`);
            const userInfo = response.data;
            setUser2(userInfo);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    return (
        <section className={styled.container}>
            <div className={styled.main__container}>

                <TopCategory
                    text={selectedPostUno === null ? user.uid :user2.uid}
                    iconName={<IoArrowBackOutline />}
                    iconName2={<IoMdExit />}
                    MainClose={MainClose}
                />
                <div className={styled.setUserInfo}>
                    <div className={styled.backImage}>
                        <img src={bgfile} alt="배경사진" />
                    </div>

                    <div className={styled.profile}>
                        <div className={styled.profile__edit}>
                            <div className={styled.profile__image}>
                                <img src={pfile} alt="프로필 이미지" />
                            </div>
                            {selectedPostUno === user2.uno ? null : (
                                <div className={styled.profile__editBtn}>
                                    프로필 수정
                                </div>
                            )}
                        </div>
                        <div className={styled.profile__info}>
                            <div className={styled.userInfo}>
                                <p>{selectedPostUno  === null ? user.nickname :user2.nickname}</p>
                                <p>@{selectedPostUno  === null  ? user.uid :user2.uid}</p>
                            </div>
                            <div className={styled.profile__desc}>
                                <p>안녕하세요</p>
                            </div>
                            <div className={styled.profile__createdAt}>
                                <BsCalendar3 />
                                <p>가입일 :</p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={styled.categoryList}>
                    <div
                        onClick={() => handleClick(1)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 1 && style.selectedBox}`}
                        >
                            <p>내 활동</p>
                        </div>
                    </div>
                    <div
                        onClick={() => handleClick(2)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 2 && style.selectedBox}`}
                        >
                            <p>내 기록</p>
                        </div>
                    </div>
                    <div
                        onClick={() => handleClick(3)}
                        className={`${style.container} ${ style.sizeContainer}`}
                    >
                        <div
                            className={`${style.btnBox} ${selected === 3 && style.selectedBox}`}
                        >
                            <p>내 게시판</p>
                        </div>
                    </div>
                </nav>
                {selected === 1 && <MyLog selectedPostUno={selectedPostUno} />}
                {selected === 2 && <MyLikeView />}
                {selected === 3 && <MyPostView selectedPostUno={selectedPostUno}/>}
            </div>
        </section>
    );
}
export default MyPage;