import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import styles from './QnA.module.css';

export default function QnA() {
    const [faqData, setFaqData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // 현재 열려 있는 질문의 인덱스를 관리하는 상태

    const getFaQData = async () => {
        try {
            const res = await customAxios.get(`/v1/faqs`);
            //console.log(res.data.data);
            setFaqData(res.data.data);
        } catch (error) {
            console.error('error:', error);
        }
    };

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // 같은 박스를 클릭하면 닫고, 다른 박스를 클릭하면 해당 인덱스로 설정
    };

    useEffect(() => {
        getFaQData();
    });

    return (
        <div className={styles.qna_div}>
            <p className={styles.qna_title}>문의사항</p>
            <p className={styles.faq_title}>자주 묻는 질문</p>
            <div className={styles.faq_container}>
                {faqData?.map((item, index) => (
                    <div key={index} className={styles.faq_rectangle} onClick={() => toggleAnswer(index)}>
                        <div className={styles.faq_container}>
                            <p className={styles.faq_Q}>Q</p>
                            <p className={styles.faq_question}>{item.question}</p>
                        </div>

                        {activeIndex === index && ( // 현재 활성화된 질문에 대한 답변만 표시
                            <div className={styles.faq_answer_div}>
                                <div className={styles.faq_answer_rectangle}>
                                    <div className={styles.faq_answer}>
                                        <div className={styles.faq_container}>
                                            <p className={styles.faq_answer_content}>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
