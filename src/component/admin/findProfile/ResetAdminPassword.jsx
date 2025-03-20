import React, { useRef, useState } from 'react';
import styles from '../password/changeAdminPassword.module.css';
import { customAxios } from '../../../config/axios-config';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorModal from '../../modal/ErrorModal';

export default function ResetAdminPassword() {
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const location = useLocation();
    const { id, authCode } = location.state || {};
    //비밀번호 변경값 관리
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const newPasswordRef = useRef(null);
    const newPasswordConfirmRef = useRef(null);
    //유효성 검사
    const [isPassword1, setIsPassword1] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isPassword3, setIsPassword3] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const [isShowPwChecked, setIsShowPwChecked] = useState(false);
    const [isShowPwConfirmChecked, setIsShowPwConfirmChecked] = useState(false);
    //오류메세지 상태 저장
    const [passwordMessage1, setPasswordMessage1] = useState('');
    const [passwordMessage2, setPasswordMessage2] = useState('');
    const [passwordMessage3, setPasswordMessage3] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    //모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //비밀번호 변경 api
    const patchResetAdminPassword = async () => {
        try {
            const res = await customAxios.patch(
                `/v1/admins/password/reset`,
                {
                    username: id,
                    password: newPassword,
                    authCode: authCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                setModalMessage('비밀번호 변경이 완료되었습니다.');
                setIsModalOpen(true);
                console.log(res.data);
            }
        } catch (error) {
            console.error(error.response.data.reason);
            setModalMessage(error.response.data.reason);
            setIsModalOpen(true);
        }
    };

    //비밀번호 변경 버튼
    const onClickPasswordChange = () => {
        if (newPassword === newPasswordConfirm) {
            patchResetAdminPassword();
        } else {
            return;
        }
    };

    const onChangeNewPassword = (e) => {
        const currentPassword = e.target.value;
        setNewPassword(currentPassword);
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
    const onChangeNewPasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setNewPasswordConfirm(currentPasswordConfirm);
        if (newPassword !== currentPasswordConfirm) {
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
            setIsPasswordConfirm(true);
        }
    };

    const handleShowPwChecked = async () => {
        const currentPassword = await newPasswordRef.current;
        if (currentPassword === null) return;

        await setIsShowPwChecked(!isShowPwChecked);
        if (!isShowPwChecked) {
            currentPassword.type = 'text';
        } else {
            currentPassword.type = 'password';
        }
    };

    const handleShowPwConfirmChecked = async () => {
        const currentPasswordConfirm = await newPasswordConfirmRef.current;
        if (currentPasswordConfirm === null) return;

        await setIsShowPwConfirmChecked(!isShowPwConfirmChecked);
        if (!isShowPwConfirmChecked) {
            currentPasswordConfirm.type = 'text';
        } else {
            currentPasswordConfirm.type = 'password';
        }
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        navigate('/login');
    };

    return (
        <>
            <div className={styles.password_total_div}>
                <p className={styles.password_title}>비밀번호 찾기</p>

                <div className={styles.password_content_div}>
                    <p className={styles.password_content_title}>새 비밀번호</p>
                    <div className={styles.content_pw_div}>
                        <img
                            src={isShowPwConfirmChecked ? '/admin/sign-up/eye.png' : '/admin/sign-up/eye-off.png'}
                            onClick={handleShowPwChecked}
                            className={styles.content_input_pw_img}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={newPassword}
                            onChange={onChangeNewPassword}
                            ref={newPasswordRef}
                            className={styles.password_content_input}
                            placeholder="새 비밀번호 입력"
                        />
                    </div>
                    <p className={isPassword1 ? styles.message_confirm : styles.message}> {passwordMessage1} </p>
                    <p className={isPassword2 ? styles.message_confirm : styles.message}> {passwordMessage2} </p>
                    <p className={isPassword3 ? styles.message_confirm : styles.message}> {passwordMessage3} </p>
                </div>
                <div className={styles.password_content_div}>
                    <p className={styles.password_content_title}>새 비밀번호 확인</p>
                    <div className={styles.content_pw_div}>
                        <img
                            src={isShowPwConfirmChecked ? '/admin/sign-up/eye.png' : '/admin/sign-up/eye-off.png'}
                            onClick={handleShowPwConfirmChecked}
                            className={styles.content_input_pw_img}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={newPasswordConfirm}
                            onChange={onChangeNewPasswordConfirm}
                            ref={newPasswordConfirmRef}
                            className={styles.password_content_input}
                            placeholder="새 비밀번호 재입력"
                        />
                    </div>
                    <p className={isPasswordConfirm ? styles.message_confirm : styles.message}>
                        {' '}
                        {passwordConfirmMessage}{' '}
                    </p>
                </div>
                <button onClick={onClickPasswordChange} className={styles.password_confirm_button}>
                    확인
                </button>
            </div>
            {isModalOpen && <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={onCloseModal} />}
        </>
    );
}
