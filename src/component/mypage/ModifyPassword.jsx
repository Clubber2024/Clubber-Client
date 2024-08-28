import { useState } from 'react';
import { customAxios } from '../../config/axios-config';
import { useLocation, useNavigate } from 'react-router-dom';
import './myPage.css'; 
import ErrorModal from '../modal/ErrorModal';

export default function ModifyPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const accessToken = location.state?.accessToken;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const onClickModify = async () => {
        if (newPassword === confirmPassword) {
            try {
                const res = await customAxios.patch(
                    `v1/admins/me`,
                    {
                        password: newPassword
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // 토큰 포함
                        },
                    }
                );
                console.log(res);
                setModalMessage('비밀번호 변경이 완료되었습니다.');
                setIsModalOpen(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            setModalMessage('입력하신 비밀번호가 다릅니다.');
            setIsModalOpen(true);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
        navigate('/admin');
    };

    return (
        <div className='password_container'>
            <h3 style={{marginBottom : "50px"}}>비밀번호 변경</h3>
            <label>새 비밀번호</label>
            <input type="password" className='password_input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <label>새 비밀번호 확인</label>
            <input type="password" className='password_input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className='modify_button' onClick={onClickModify}>변경하기</button>
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </div>

    )
}