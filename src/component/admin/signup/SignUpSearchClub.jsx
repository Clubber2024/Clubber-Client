import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { customAxios } from '../../../config/axios-config';
import styles from './signUpSearchClub.module.css';

const getClubs = (name) => {
    return customAxios
        .get(`/v1/clubs?clubName=${name}`)
        .then((res) => res.data) // API 응답에서 데이터 추출
        .catch((error) => {
            console.error('Error fetching clubs:', error);
            return [];
        });
};

const SignUpSearchClub = () => {
    const [clubName, setClubName] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false); // 추천어 보이기 여부

    // 🔹 useCallback을 사용하여 debounce 함수 생성
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // 🔹 API 호출을 Debounce 적용하여 실행
    const fetchSuggestions = useCallback(
        debounce(async (searchTerm) => {
            if (searchTerm.trim() === '') {
                setSuggestion([]);
                setShowSuggestions(false);
                return;
            }
            const data = await getClubs(searchTerm);
            setSuggestion(data);
            setShowSuggestions(true);
        }, 100), // 300ms 동안 입력이 없으면 실행
        []
    );

    useEffect(() => {
        fetchSuggestions(clubName);
        console.log(clubName);
    }, [clubName, fetchSuggestions]);

    const onChangeName = (e) => {
        const currentName = e.target.value;
        setClubName(currentName);

        if (currentName.length < 1) {
            // setNameMessage('필수입력사항');
            // setIsName(false);
        } else {
            // setNameMessage('사용 가능한 닉네임입니다.');
            // setIsName(true);
        }
    };

    return (
        <>
            <div className={styles.content_search_div}>
                <input
                    id="name"
                    name="name"
                    value={clubName}
                    onChange={onChangeName}
                    className={styles.content_input_search}
                    placeholder="동아리명 입력"
                />
                <img src="/admin/sign-up/search.png" className={styles.content_search_img} />
                {showSuggestions && (
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            position: 'absolute',
                            top: '68px',
                            width: '100%',
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            maxHeight: '150px',
                            overflowY: 'auto',
                        }}
                    >
                        {suggestion.length > 0 ? (
                            suggestion.map((club, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #ddd',
                                    }}
                                    onClick={() => {
                                        setClubName(club.name); // 선택한 동아리 이름 입력창에 설정
                                        setShowSuggestions(false);
                                    }}
                                >
                                    {club.name}
                                </li>
                            ))
                        ) : (
                            <li style={{ padding: '10px', color: 'gray' }}>직접 입력</li>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SignUpSearchClub;
