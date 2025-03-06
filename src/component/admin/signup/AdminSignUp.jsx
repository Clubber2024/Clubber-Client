import React from 'react';
import styles from './adminSignUp.module.css';
import { useState } from 'react';

export default function AdminSignUp() {
    //값 저장
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    //유효성 검사
    const [isId, setIsId] = useState(false);
    const [isname, setIsName] = useState(false);
    const [isPassword1, setIsPassword1] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isPassword3, setIsPassword3] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    // 오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [passwordMessage1, setPasswordMessage1] = useState('');
    const [passwordMessage2, setPasswordMessage2] = useState('');
    const [passwordMessage3, setPasswordMessage3] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');
    const [birthMessage, setBirthMessage] = useState('');

    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        // 영소문자로 시작하고, 영소문자와 숫자로 이루어진 6~12자 정규식
        const idRegExp = /^[a-z][a-z0-9]{5,11}$/;

        if (!idRegExp.test(currentId)) {
            setIdMessage('아이디는 영소문자로 시작하며, 6-12사이 대소문자 또는 숫자만 입력해 주세요!');
            setIsId(false);
        } else {
            setIdMessage('사용 가능한 아이디입니다.');
            setIsId(true);
        }
    };

    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);

        if (currentName.length < 1) {
            setNameMessage('필수입력사항');
            setIsName(false);
        } else {
            setNameMessage('사용 가능한 닉네임입니다.');
            setIsName(true);
        }
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        //길이 정규식
        const lengthRegExp = /^.{8,20}$/;
        //영문숫자특수문자 포함 정규식
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=`{}[\]:";'<>?,.\/]).{8,20}$/;
        //연속 문자 3개 이상 방지 정규식
        const consecutiveRegExp = /(.)\1\1/;

        setPasswordMessage1('비밀번호는 8~20자로 설정해야 합니다.');
        setPasswordMessage2('비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.');
        setPasswordMessage3('비밀번호에 동일한 문자가 3번 이상 연속될 수 없습니다.');

        if (!lengthRegExp.test(currentPassword)) {
            setIsPassword1(false);
        } else if (lengthRegExp.test(currentPassword)) {
            setIsPassword1(true);
        }

        if (!passwordRegExp.test(currentPassword)) {
            setIsPassword2(false);
        } else if (passwordRegExp.test(currentPassword)) {
            setIsPassword2(true);
        }

        if (consecutiveRegExp.test(currentPassword)) {
            setIsPassword3(false);
        } else if (!consecutiveRegExp.test(currentPassword)) {
            setIsPassword3(true);
        }
    };
    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);
        if (password !== currentPasswordConfirm) {
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
            setIsPasswordConfirm(true);
        }
    };
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage('이메일의 형식이 올바르지 않습니다!');
            setIsEmail(false);
        } else {
            setEmailMessage('사용 가능한 이메일입니다.');
            setIsEmail(true);
        }
    };

    return (
        <>
            <div className={styles.signup_div}>
                <img src="/clubber_logo.png" className={styles.signup_logo} />
            </div>

            <div className={styles.content_div}>
                <div>
                    <p className={styles.content_title}>아이디</p>
                    <div className={styles.content_id_div}>
                        <input
                            id="id"
                            name="id"
                            value={id}
                            onChange={onChangeId}
                            className={styles.content_input_id}
                            placeholder="아이디 입력"
                        />
                        <button className={styles.id_duplicate_check_button}>중복확인</button>
                    </div>
                    <p className={isId ? styles.message_confirm : styles.message}> {idMessage} </p>
                    <p className={styles.content_title}>비밀번호</p>
                    <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        className={styles.content_input}
                        placeholder="비밀번호 입력"
                    />
                    <p className={isPassword1 ? styles.message_confirm : styles.message}> {passwordMessage1} </p>
                    <p className={isPassword2 ? styles.message_confirm : styles.message}> {passwordMessage2} </p>
                    <p className={isPassword3 ? styles.message_confirm : styles.message}> {passwordMessage3} </p>
                    <p className={styles.content_title}>비밀번호 확인</p>
                    <input
                        id="password"
                        name="password"
                        value={passwordConfirm}
                        onChange={onChangePasswordConfirm}
                        className={styles.content_input}
                        placeholder=""
                    />
                    <p className={isPasswordConfirm ? styles.message_confirm : styles.message}>
                        {passwordConfirmMessage}
                    </p>
                    <p className={styles.content_title}>동아리명</p>
                    <input
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        className={styles.content_input}
                        placeholder="동아리명 입력"
                    />
                    <p className={isname ? styles.message_confirm : styles.message}> {nameMessage} </p>
                    <p className={styles.content_title}>이메일 주소</p>
                    <input className={styles.content_input} placeholder="이메일 입력" />

                    <br />

                    <p className={styles.content_title}>연락수단</p>
                    <br />
                    <p className={styles.contact_title}>1. 인스타그램</p>
                    <input className={styles.content_input} placeholder="인스타그램 아이디 입력" />
                    <p className={styles.contact_title}>2. 기타</p>
                    <input className={styles.content_input} placeholder="기타 연락수단 입력" />

                    <p className={styles.content_title}>동아리 증빙서류</p>
                    <input className={styles.content_input} placeholder="파일 올리기" />
                </div>
            </div>
        </>
    );
}
