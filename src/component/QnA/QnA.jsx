import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import styles from './QnA.module.css';

export default function QnA() {
    const [faqData, setFaqData] = useState([]);

    const getFaQData = async () => {
        try {
            const res = await customAxios.get(`/v1/faqs`);
            //console.log(res.data.data);
            setFaqData(res.data.data);
        } catch (error) {
            console.error('error:', error);
        }
    };

    useEffect(() => {
        getFaQData();
    });

    return (
        <div className={styles.qna_div}>
            <p className={styles.qna_title}>문의사항</p>
            <p className={styles.faq_title}>자주 묻는 질문</p>

            <div className={styles.faq_container} key={faqData.code}>
                {faqData?.map((item) => (
                    <div className={styles.faq_rectangle}>
                        <p className={styles.faq_Q}>Q</p>
                        <p className={styles.faq_question}>{item.question}</p>
                    </div>
                ))}
            </div>

            <p className={styles.faq_title}>Q&A</p>
        </div>
    );
}
