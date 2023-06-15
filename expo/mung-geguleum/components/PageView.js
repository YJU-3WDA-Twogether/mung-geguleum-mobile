import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiDownload, FiMoreHorizontal } from "react-icons/fi";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import pfile from "../image/Profile.jpg";
import PageModal from "../modal/PageModal";
import D3 from '../pages/D3';
import styled from '../styles/PostView.module.css';
import jwt from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;


const PostView = ({ selectedPost, handlePostClick, selectedPostUno }) => {
    const [posts, setPosts] = useState([]);
    const [fileNum,setFileNum] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [clickedPostId, setClickedPostId] = useState(null);
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [dropdownPostId, setDropdownPostId] = useState(null);
    const [modalPostId,setModalPostId]  = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    const downloadFile = (file) => {
        const params = {
            uno: user.uno,
            pno: file.pno,
        };

        axios.get(`${API_URL}/file/download/${file.fno}`, { params, responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = file.fname;
                link.click();
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchPosts();
        }

    }, [user.uno, selectedPostUno]);
    console.log("테스트"+localStorage.getItem('accessToken'))
    const fetchPosts = async (params) => {
        try {
            const response = await axios.get(`${API_URL}/post/getlist`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log(response.data.content);
            setPosts(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };
    const handleHeartClick = async (postId, hexist) => {
        const formData = {
            pno: postId,
        };
        try {
            if (hexist) {
                // If the post is already liked, send a DELETE request
                const response = await axios.delete(`${API_URL}/heart/delete`, { data: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }});
                console.log(response.data);

                // Update likedPosts state
                setLikedPosts(likedPosts.filter((id) => id !== postId));

                // Update hcount in posts state
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.pno === postId ? { ...post, hexist: false, hcount: post.hcount - 1 } : post
                    )
                );
            } else {
                // If the post is not liked yet, send a POST request
                const response = await axios.post(`${API_URL}/heart/get`, { data: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }});
                console.log(response.data);

                // Update likedPosts state
                setLikedPosts([...likedPosts, postId]);

                // Update hcount in posts state
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.pno === postId ? { ...post, hexist: true, hcount: post.hcount + 1 } : post
                    )
                );
            }
        } catch (error) {
            console.error('Error updating heart data:', error);
        }
    };
    const handleClick = (uno) => {
        handlePostClick(uno);
    };

    const handleSlideChange = (currentIndex) => {
        setFileNum(currentIndex);
    };

    const pnoClick = (postId) => {
        setSelectedPostId(postId);
        setClickedPostId(postId);
        setShowPopup(true);
    };

    const handleActionClick = (postId) => {
        setShowModal(true);
        setModalPostId(postId);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalPostId(null);

    };
//   모달창 CSS
    const modalStyles = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10000, // Set a higher value than the other modal's z-index
        background: "#6667AB",
        padding: "10px",
        borderRadius: "4px",
        backdropFilter: "blur(8px)",
        width: "1200px", // Adjust the width as desired
        height: "900px", // Adjust the height as desired
    };
    const [closeButtonStyles, setCloseButtonStyles] = useState({
        position: "absolute",
        top: "10px",
        right: "20px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        fontSize: "18px",
        color: "white",
    });

    // You can also add hover styles to change the button appearance on hover
    const closeButtonHoverStyles = {
        color: "black",
    };

//   모달창 CSS

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (postId) => {
        setDropdownPostId(postId === dropdownPostId ? null : postId);
    };

    return (
        <>
            {posts.map((post) => (
                <li className={styled.nweet}>
                    <div className={styled.nweet__wrapper}>
                        <div className={styled.nweet__container} key={post.pno}>
                            <div
                                className={styled.nweet__profile}
                            >
                                <img
                                    src={pfile}
                                    alt="profileImg"
                                    className={styled.profile__image}
                                    onClick={() => handlePostClick(post.uno)}
                                />
                            </div>
                            <div className={styled.userInfo}>
                                <div className={styled.userInfo__name}>
                                    <div
                                        className={styled.userInfo__one}
                                    >
                                        <p>{post.nickname}</p>
                                    </div>
                                    <div className={styled.userInfo__two}>
                                        <p onClick={() => handlePostClick(post.uno)}>
                                            @{post.uid}
                                        </p>
                                        <p style={{ margin: "0 4px" }}>·</p>
                                        <p className={styled.nweet__createdAt}>
                                            {post.regDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styled.nweet__text}>
                            <p style={{fontWeight:'bold', fontSize:'18px', color:'#6667ab', paddingBottom:'5px'}}>{post.title}</p>
                            <h4>{post.content}</h4>
                            {post.file.length > 0 && (
                                <Carousel
                                    showThumbs={false}
                                    onChange={handleSlideChange}
                                >
                                    {post.file.map((file) => (
                                        <div key={file.fno}>
                                            {file.fname.match(/.(jpg|jpeg|png|gif)$/i) ? (
                                                <img src={`${API_URL}/file/read/${file.fno}`} alt="file" />
                                            ) : file.fname.match(/.(mp4|webm)$/i) ? (
                                                <video controls>
                                                    <source
                                                        src={`${API_URL}/file/read/${file.fno}`}
                                                        type={`video/${file.fname.split('.').pop()}`}
                                                    />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : file.fname.match(/.(mp3|wav)$/i) ? (
                                                <audio controls>
                                                    <source
                                                        src={`${API_URL}/file/read/${file.fno}`}
                                                        type={`audio/${file.fname.split('.').pop()}`}
                                                    />
                                                    Your browser does not support the audio tag.
                                                </audio>
                                            ) : (
                                                <div className="file-wrap">{file.fname}</div>
                                            )}
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                        <nav className={styled.nweet__actions}>
                            <div className={`${styled.actionBox} ${styled.like} `}>
                                <div className={styled.actions__icon} onClick={() => handleHeartClick(post.pno, post.hexist)}>
                                    {post.hexist ? <FaHeart style={{color:"red"}}/> : <FaRegHeart />}
                                </div>
                                <div className={styled.actions__text}>
                                    {post.hcount === 0 ? null : (
                                        <p className={styled.like}>
                                            {post.hcount}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styled.actionBox} ${styled.comment}`}>
                                <div
                                    className={styled.actions__icon}
                                >
                                    <FaRegComment  onClick={() => pnoClick(post.pno) }/>
                                </div>
                                <div className={styled.actions__text}>
                                    {post.rcount === 0 ? null : (
                                        <p>
                                            {post.rcount}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`${styled.actionBox}`}
                            >
                                <div className={styled.actions__icon}>
                                    <FiDownload  onClick={() => downloadFile(post.file[fileNum])} />
                                </div>
                                <div className={styled.actions__text}>
                                    {post.lcount === 0 ? null : (
                                        <p>
                                            {post.lcount}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styled.actionBox}`}>
                                <div className={styled.actions__icon} onClick={() => toggleDropdown(post.pno)}>
                                    <FiMoreHorizontal />
                                </div>
                                {dropdownPostId === post.pno && (
                                    <Dropdown.Menu show style={{left : '73.5%'}}>
                                        <Dropdown.Item onClick={() => { handleActionClick(post.pno); setDropdownPostId(null); }}>
                                            그래프
                                        </Dropdown.Item>

                                        <Dropdown.Item href="#/action-2" onClick={() => setDropdownPostId(null)}>
                                          신고하기
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                )}
                                {modalPostId === post.pno && (
                                    <div style={modalStyles}>
                                        <button
                                            onClick={handleCloseModal}
                                            style={closeButtonStyles}
                                            onMouseEnter={() => setCloseButtonStyles({...closeButtonStyles, ...closeButtonHoverStyles})}
                                            onMouseLeave={() => setCloseButtonStyles({
                                                ...closeButtonStyles,
                                                color: "white" // Resetting the color to default on mouse leave
                                            })}
                                        >
                                            Close
                                        </button>
                                        <D3 handlePostClick={handlePostClick}/>
                                    </div>
                                )}
                            </div>
                        </nav>

                    </div>
                </li>
            ))}
            <PageModal
                showPopup={showPopup && selectedPostId === clickedPostId}
                setShowPopup={setShowPopup}
                postId={showPopup && selectedPostId === clickedPostId ? clickedPostId : null}
                handlePostClick={handlePostClick}
            />
        </>
    );
};

export default PostView;