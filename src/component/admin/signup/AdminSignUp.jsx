import React, { useRef } from 'react';
import styles from './adminSignUp.module.css';
import { useState } from 'react';
import { customAxios } from '../../../config/axios-config';
import ErrorModal from '../../modal/ErrorModal';
import SignUpSearchClub from './SignUpSearchClub';
import { Contact } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminSignUp() {
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    //값 저장
    const [id, setId] = useState('');
    const [clubName, setClubName] = useState('');
    const [clubType, setClubType] = useState('');
    const [clubId, setClubId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [extension, setExtension] = useState('');
    const [imageKey, setImageKey] = useState('');
    const [presignedUrl, setPresignedUrl] = useState('');
    const [instagram, setInstagram] = useState('');
    const [etc, setEtc] = useState('');
    //이메일 상태 관리
    const [email, setEmail] = useState('');
    const [authEmail, setAuthEmail] = useState('');
    const [code, setCode] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isCode, setIsCode] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    //유효성 검사
    const [isId1, setIsId1] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isname, setIsName] = useState(false);
    const [isPassword1, setIsPassword1] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isPassword3, setIsPassword3] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isShowPwChecked, setIsShowPwChecked] = useState(false);
    const [isShowPwConfirmChecked, setIsShowPwConfirmChecked] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isVerfiyEmail, setIsVerifyEmail] = useState(false);
    // 오류메세지 상태 저장
    const [idMessage1, setIdMessage1] = useState('');
    const [idMessage2, setIdMessage2] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [passwordMessage1, setPasswordMessage1] = useState('');
    const [passwordMessage2, setPasswordMessage2] = useState('');
    const [passwordMessage3, setPasswordMessage3] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [emailCodeMessage, setEmailCodeMessage] = useState('');

    //모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const fileInputRef = useRef(null);

    //인증번호 메일 전송 api
    const postSignUpCode = async (currentEmail) => {
        setEmail(currentEmail);
        try {
            const res = await customAxios.post(`/v1/admins/auths/sign-up/send`, {
                clubName: clubName,
                email: currentEmail,
            });

            if (res.data.success) {
                setAuthEmail(currentEmail);
            }
        } catch {}
    };

    //인증번호 검증 api
    const postVerfifyCode = async () => {
        try {
            const res = await customAxios.post(`/v1/admins/auths/sign-up/verify`, {
                clubName: clubName,
                email: email,
                authCode: code,
            });
            console.log(res);
            if (res.data.success) {
                console.log(res.data);
                setIsVerifyCode(true);
                setAuthCode(code);
                setEmailCodeMessage('인증되었습니다.');
            }
        } catch {
            setIsVerifyCode(false);
            setEmailCodeMessage('인증번호를 확인해주세요.');
        }
    };

    //아이디 중복 확인 api
    const getIdDuplicate = async () => {
        try {
            const res = await customAxios.get(`/v1/admins/username/duplicate?username=${id}`);
            console.log(res.data.data.isAvailable);
            if (res.data.data.isAvailable) {
                setId(res.data.data.username);
                setIsIdAvailable(true);
                setIdMessage1('사용 가능한 아이디입니다.');
                // setIsModalOpen(true);
            } else {
                setId('');
                setModalMessage('이미 존재하는 아이디입니다.');
                setIsModalOpen(true);
            }
        } catch {}
    };

    //증빙 이미지 등록 Presigned URL 생성 api
    const postVerifyPresignedURL = async (extension) => {
        try {
            const res = await customAxios.post(
                `/v1/images/admin/sign-up/verify`,
                {
                    username: id,
                    imageFileExtension: extension,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        username: id,
                        imageFileExtension: extension,
                    },
                }
            );
            console.log(res.data.imageKey);
            if (res.data.success) {
                console.log(res.data.data);
                setImageKey(res.data.data.imageKey);
                setPresignedUrl(res.data.data.presignedUrl);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //이미지 파일을 presigned URl로 업로드
    const putPresignedURL = async () => {
        try {
            const res = await axios.put(presignedUrl, imageFile, {
                headers: {
                    'Content-Type': imageFile.type,
                },
            });

            return true;
        } catch (error) {
            console.log('putERror', error);
            return false;
        }
    };

    //회원가입 완료 api
    const postSignUp = async () => {
        try {
            const isImgUpload = await putPresignedURL();
            if (!isImgUpload) {
                setModalMessage('이미지 업로드에 실패하였습니다.');
                setIsModalOpen(true);
                return;
            } else if (!instagram & !etc) {
                setModalMessage('인스타그램 또는 기타 연락수단을 입력해주세요.');
                setIsModalOpen(true);
            }

            const res = await customAxios.post(`/v1/admins/sign-up`, {
                username: id,
                password: password,
                clubType: clubType,
                clubName: clubName,
                email: authEmail,
                contact: {
                    instagram: instagram,
                    etc: etc,
                },
                imageForApproval: imageKey,
                authCode: authCode,
            });

            if (res.data.success) {
                setModalMessage('회원가입을 완료하였습니다.');
                setIsModalOpen(true);
                navigate(`/`);
            }
        } catch {}
    };

    const onChangeId = (e) => {
        if (!isIdAvailable) {
            const currentId = e.target.value;
            setId(currentId);
            // 영소문자로 시작하고, 영소문자와 숫자로 이루어진 6~12자 정규식
            const idRegExp = /^[a-z][a-z0-9]{5,11}$/;
            //연속 문자 3개 이상 방지 정규식

            if (!idRegExp.test(currentId)) {
                setIdMessage1('아이디는 영소문자로 시작하며, 6-12사이 대소문자 또는 숫자만 입력해 주세요!');
                setIsId1(false);
            } else {
                setIsId1(true);
            }
        } else {
            return;
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

        // newPasswordConfirm과 비교하여 일치하는지 여부 확인
        if (passwordConfirm && currentPassword !== passwordConfirm) {
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
            setIsPasswordConfirm(true);
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

    const handleShowPwChecked = async () => {
        const currentPassword = await passwordRef.current;
        if (currentPassword === null) return;

        await setIsShowPwChecked(!isShowPwChecked);
        if (!isShowPwChecked) {
            currentPassword.type = 'text';
        } else {
            currentPassword.type = 'password';
        }
    };

    const handleShowPwConfirmChecked = async () => {
        const currentPasswordConfirm = await passwordConfirmRef.current;
        if (currentPasswordConfirm === null) return;

        await setIsShowPwConfirmChecked(!isShowPwConfirmChecked);
        if (!isShowPwConfirmChecked) {
            currentPasswordConfirm.type = 'text';
        } else {
            currentPasswordConfirm.type = 'password';
        }
    };

    //이메일 관련 함수
    const onChangeEmail = (e) => {
        if (isVerifyCode) return;
        const currentEmail = e.target.value;
        setEmail(currentEmail);
    };

    const handleEmailVerificationButton = () => {
        if (isVerfiyEmail) {
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setIsVerifyEmail(false);
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            return;
        } else {
            postSignUpCode(email);
            // setIsVerifyEmail(true);
            setEmailMessage('인증번호를 전송했습니다.');
            setIsCode(true);
        }
    };

    //인증코드 관련 함수
    const onChangeCode = (e) => {
        if (isVerifyCode) {
            return;
        } else {
            const currentCode = e.target.value;
            setCode(currentCode);
        }
    };

    const handleVerfiyCode = () => {
        if (isVerifyCode) {
            return;
        } else {
            if (code) {
                postVerfifyCode();
            }
        }
    };

    //연락수단 입력
    const onChangeInsta = (e) => {
        const currentInsta = e.target.value;
        setInstagram(currentInsta);
    };

    const onChangeEtc = (e) => {
        const currentEtc = e.target.value;
        setEtc(currentEtc);
    };

    // 이미지 클릭 시 파일 업로드 입력창 클릭
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleProofButton = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setFileName(file.name);
        const extension = file.name.split('.').pop().toUpperCase();
        await setExtension(extension);
        postVerifyPresignedURL(extension);
    };

    //아이디 중복 확인
    const onClickIdDuplicate = () => getIdDuplicate();

    //모달
    const handleModalClose = () => {
        setIsVerifyEmail(true);
        setIsModalOpen(false);
    };

    //회원가입 버튼
    const onClickSignUp = () => {
        postSignUp();
    };

    return (
        <>
            <div className={styles.signup_div}>
                <img src="/clubber_logo.png" className={styles.signup_logo} />
            </div>

            <div className={styles.content_div}>
                <div className={styles.content_total_div}>
                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>아이디</p>
                        <p className={styles.content_option_p}>필수사항</p>
                    </div>

                    <div className={styles.content_id_div}>
                        <input
                            id="id"
                            name="id"
                            value={id}
                            onChange={onChangeId}
                            className={styles.content_input_id}
                            placeholder="아이디 입력"
                            autoComplete="off"
                        />
                        <button className={styles.id_duplicate_check_button} onClick={onClickIdDuplicate}>
                            중복확인
                        </button>
                    </div>
                    <p className={isId1 ? styles.message_confirm : styles.message}>{idMessage1}</p>
                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>비밀번호</p>
                        <p className={styles.content_option_p}>필수사항</p>
                    </div>
                    <div className={styles.content_pw_div}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            ref={passwordRef}
                            className={styles.content_input}
                            placeholder="비밀번호 입력"
                            autoComplete="off"
                        />
                        <img
                            src={isShowPwChecked ? '/admin/sign-up/eye.png' : '/admin/sign-up/eye-off.png'}
                            onClick={handleShowPwChecked}
                            className={styles.content_input_pw_img}
                        />
                    </div>
                    <p className={isPassword1 ? styles.message_confirm : styles.message}> {passwordMessage1} </p>
                    <p className={isPassword2 ? styles.message_confirm : styles.message}> {passwordMessage2} </p>
                    <p className={isPassword3 ? styles.message_confirm : styles.message}> {passwordMessage3} </p>
                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>비밀번호 확인</p>
                        <p className={styles.content_option_p}>필수사항</p>
                    </div>
                    <div className={styles.content_pw_div}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={passwordConfirm}
                            onChange={onChangePasswordConfirm}
                            ref={passwordConfirmRef}
                            className={styles.content_input}
                            placeholder=""
                            autoComplete="off"
                        />
                        <img
                            src={isShowPwConfirmChecked ? '/admin/sign-up/eye.png' : '/admin/sign-up/eye-off.png'}
                            onClick={handleShowPwConfirmChecked}
                            className={styles.content_input_pw_img}
                        />
                    </div>
                    <p className={isPasswordConfirm ? styles.message_confirm : styles.message}>
                        {passwordConfirmMessage}
                    </p>
                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>동아리명</p>
                        <p className={styles.content_option_p}>필수사항</p>
                    </div>

                    <SignUpSearchClub
                        clubName={clubName}
                        setClubName={setClubName}
                        clubType={clubType}
                        setClubType={setClubType}
                        clubId={clubId}
                        setClubId={setClubId}
                        type={'signup'}
                    />

                    <p className={isname ? styles.message_confirm : styles.message}> {nameMessage} </p>
                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>이메일 주소</p>
                        <p className={styles.content_option_p}>필수사항</p>
                    </div>
                    <div className={styles.input_email_div}>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            className={styles.content_input_email}
                            placeholder="이메일 입력"
                            autoComplete="off"
                        />
                        <button
                            onClick={handleEmailVerificationButton}
                            className={
                                email ? styles.content_input_email_button : styles.content_input_email_button_before
                            }
                        >
                            인증메일 인증
                        </button>
                    </div>
                    <p className={isVerfiyEmail ? styles.message_email_confirm : styles.message_email}>
                        {emailMessage}
                    </p>

                    {isCode ? (
                        <div>
                            <p className={styles.content_title}>인증 코드</p>
                            <div className={styles.content_id_div}>
                                <input
                                    id="code"
                                    name="code"
                                    value={code}
                                    onChange={onChangeCode}
                                    className={styles.content_input_id}
                                    placeholder="인증코드 입력"
                                    autoComplete="off"
                                />
                                <button
                                    onClick={handleVerfiyCode}
                                    className={
                                        code
                                            ? styles.id_duplicate_check_button
                                            : styles.id_duplicate_check_button_before
                                    }
                                >
                                    인증번호 확인
                                </button>
                            </div>
                            <p className={isVerifyCode ? styles.message_confirm : styles.message_code}>
                                {emailCodeMessage}
                            </p>
                        </div>
                    ) : (
                        ''
                    )}

                    <br />

                    <p className={styles.content_title}>연락수단</p>
                    <p className={styles.content_option_p}>선택 1</p>
                    <br />
                    <p className={styles.content_notice_p}>
                        팀 클러버와 공식적으로 소통할 수 있는 동아리 연락 수단을 작성해주세요! <br />
                        해당 연락수단으로 추후 동아리 인증 결과를 전달해드릴 예정입니다.
                    </p>
                    <p className={styles.contact_title}>1. 인스타그램</p>
                    <input
                        id="insta"
                        name="insta"
                        value={instagram}
                        onChange={onChangeInsta}
                        className={styles.content_input_contact}
                        placeholder="인스타그램 아이디 입력"
                        autoComplete="off"
                    />
                    <p className={styles.contact_title}>2. 기타</p>
                    <input
                        id="etc"
                        name="etc"
                        value={etc}
                        onChange={onChangeEtc}
                        className={styles.content_input_contact}
                        placeholder="기타 연락수단 입력"
                        autoComplete="off"
                    />
                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>동아리 증빙서류</p>
                        <p className={styles.content_option_p}>선택사항</p>
                    </div>
                    <div className={styles.content_input_proof_div}>
                        <div className={styles.content_input_proof} onClick={handleImageClick}>
                            {' '}
                            <img src="/admin/sign-up/download.png" className={styles.proof_img} ty />{' '}
                            <input
                                type="file"
                                accept=".png, .jpeg, .jpg"
                                ref={fileInputRef}
                                onChange={handleProofButton}
                                style={{ display: 'none' }}
                                autoComplete="off"
                            />
                            {fileName ? <p>{fileName}</p> : <p>파일 올리기</p>}
                        </div>

                        <p className={styles.content_notice_p}>
                            에브리타임 모집글, 동아리 활동 사진 등 동아리를 증빙할 수 있는 최소한의 정보
                        </p>
                    </div>

                    <button className={styles.sign_up_button} onClick={onClickSignUp}>
                        회원가입
                    </button>
                </div>
            </div>
            {isModalOpen && <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={handleModalClose} />}
        </>
    );
}
