import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { customAxios } from '../../../config/axios-config';
import styles from './signUpSearchClub.module.css';

const getClubNames = (name) => {
    return customAxios
        .get(`/v1/clubs/sign-up?clubName=${name}`)
        .then((res) => res.data) // API 응답에서 데이터 추출
        .catch((error) => {
            console.error('Error fetching clubs:', error);
            return [];
        });
};

const SignUpSearchClub = ({
    clubName,
    setClubName,
    clubType,
    setClubType,
    clubId,
    setClubId,
    type,
    college,
    setCollege,
    department,
    setDepartment,
}) => {
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true); // 추천어 보이기 여부
    const [clubTypes, setClubTypes] = useState([]);
    const [isType, setIsType] = useState(false);
    const [isName, setIsName] = useState(false);
    //소모임 관리
    const [isSmall, setIsSmall] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [colleges, setColleges] = useState([]);

    //GENERAL, OFFICIAL, ETC, CENTER, SMALL
    const checkClubType = {
        중앙동아리: 'CENTER',
        일반동아리: 'GENERAL',
        공식단체: 'OFFICIAL',
        소모임: 'SMALL',
        기타: 'ETC',
    };

    const getClubTypes = async () => {
        try {
            const res = await customAxios.get(`v1/clubs/category/club-types`);

            if (res.data.success) {
                setClubTypes(res.data.data);
                setIsType(true);
            }
        } catch {}
    };

    //소모임 단과대 목록 조회
    const getCollegesList = async () => {
        try {
            const res = await customAxios.get(`v1/clubs/category/colleges`);

            if (res.data.success) {
                setColleges(res.data.data);
                console.log(res.data.data);
            }
        } catch {}
    };

    //단과대 소속 학과 목록 조회
    const getDepartmentsList = async (college) => {
        try {
            const res = await customAxios.get(`v1/clubs/category/departments`, {
                params: {
                    college: college,
                },
            });

            if (res.data.success) {
                setDepartments(res.data.data);
            }
        } catch {}
    };

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
            const data = await getClubNames(searchTerm);
            setSuggestion(data.data);
            setShowSuggestions(true);
        }, 100), // 100ms 동안 입력이 없으면 실행
        []
    );

    useEffect(() => {
        getClubTypes();
        getCollegesList();
    }, []);

    useEffect(() => {
        if (showSuggestions) {
            fetchSuggestions(clubName);
        }
    }, [clubName, fetchSuggestions, showSuggestions]);

    const onChangeName = (e) => {
        setShowSuggestions(true);
        const currentName = e.target.value;
        setClubName(currentName);

        if (currentName.length < 1) {
            setIsName(false);
            setIsType(false);
        }
    };

    const onClickDepartment = (e) => {
        console.log(e.target.value);
        const collegeCode = e.target.value;
        setCollege(e.target.value);
        getDepartmentsList(collegeCode);
    };

    console.log(clubType);

    const handleCheckboxChange = (e) => {
        if (isType) {
            return;
        } else {
            const value = e.target.value;
            setClubType(value);
            if (value == 'SMALL') {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        }
    };

    console.log(clubTypes);

    return (
        <>
            <div className={styles.content_search_div}>
                <img
                    src="/admin/sign-up/search.png"
                    className={type === 'signup' ? styles.content_search_img : styles.content_search_img_find}
                />
                <input
                    id="name"
                    name="name"
                    value={clubName}
                    onChange={onChangeName}
                    className={type === 'signup' ? styles.content_input_search : styles.content_input_search_find}
                    autoComplete="off"
                    placeholder="동아리명 입력"
                />

                {showSuggestions && (
                    <ul
                        className={
                            type === 'signup' ? styles.sign_up_search_club_ul : styles.sign_up_search_club_ul_find
                        }
                    >
                        {suggestion.length > 0 ? (
                            suggestion.map((club, index) => (
                                <li
                                    key={index}
                                    className={styles.sign_up_search_club_li}
                                    onClick={() => {
                                        setShowSuggestions(false);
                                        setClubName(club.clubName);
                                        setClubType(club.clubType);
                                        setClubId(club.clubId);
                                        setIsType(true);
                                        setIsName(true);
                                    }}
                                >
                                    <img src="/admin/sign-up/search.png" className={styles.sign_up_search_club_img} />
                                    {club.clubName}
                                </li>
                            ))
                        ) : (
                            <li
                                className={styles.sign_up_search_club_li}
                                onClick={() => {
                                    setIsType(false);
                                    setIsName(false);
                                    setShowSuggestions(false);
                                }}
                            >
                                <img src="/admin/sign-up/search.png" className={styles.sign_up_search_club_img} /> 직접
                                입력
                            </li>
                        )}
                    </ul>
                )}
            </div>

            <div>
                <p className={styles.search_content_title}>동아리 타입</p>
                <div className={styles.search_content_clubType_div}>
                    {clubTypes?.map(({ code, title }, idx) => (
                        <div key={idx} className={styles.checkbox_div}>
                            <input
                                type="radio"
                                name="clubType"
                                id={code}
                                value={code}
                                checked={clubType === code}
                                onChange={handleCheckboxChange} // 선택한 값 설정
                                className={styles.checkbox_input}
                            />
                            <label htmlFor={code}>{title}</label>
                        </div>
                    ))}
                </div>

                {isSmall ? (
                    <div className={styles.content_form_div}>
                        <p className={styles.search_content_title}>단과대 선택</p>
                        <div>
                            <form>
                                {' '}
                                <select className={styles.search_colleages} onChange={onClickDepartment}>
                                    {colleges.map((colleges) => (
                                        <option key={colleges.code} value={colleges.code}>
                                            {colleges.title}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className={styles.search_colleages}
                                    onChange={() => setDepartment(departments.code)}
                                >
                                    {departments?.map((departments) => (
                                        <option key={departments.code} value={departments.code}>
                                            {departments.title}
                                        </option>
                                    ))}
                                </select>
                            </form>{' '}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default SignUpSearchClub;
//GENERAL, OFFICIAL, ETC, CENTER, SMALL
