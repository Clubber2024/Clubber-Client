import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import styles from './QnA.module.css';

export default function QnA() {
    const [faqData, setFaqData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // 현재 열려 있는 질문의 인덱스를 관리하는 상태
    const [itemRow, setItemRow] = useState(4);

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
    }, []);

    useEffect(() => {
        // 화면 크기 변경 시마다 호출될 이벤트 핸들러
        const handleResize = () => {
            if (window.innerWidth <= 786) {
                setItemRow(1);
            } else if (786 < window.innerWidth && window.innerWidth < 1080) {
                setItemRow(2);
            } else if (1080 < window.innerWidth && window.innerWidth <= 1450) {
                setItemRow(3); // 그 외에는 4개씩 표시
            } else {
                setItemRow(4);
            }
        };

        window.addEventListener('resize', handleResize);

        // 초기 로드시 호출
        handleResize();

        // 이벤트 리스너 해제
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleAnswer = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // 같은 질문 클릭 시 닫기
        } else {
            setActiveIndex(index); // 다른 질문 클릭 시 해당 인덱스로 설정
            console.log('index', index);
        }
    };

    const renderDataInRows = (data) => {
        const rows = [];
        for (let i = 0; i < data.length; i += itemRow) {
            const rowItems = data.slice(i, i + itemRow);
            rows.push(
                <div key={`row-${i}`} className={styles.faq_container}>
                    {rowItems.map((item, index) => {
                        const globalIndex = i + index; // 전역 인덱스를 계산합니다.

                        return (
                            <div key={item.id} className={styles.faq_item}>
                                <div
                                    // key={item.id} // 고유한 key 사용
                                    className={styles.faq_rectangle}
                                    onClick={() => toggleAnswer(globalIndex)} // 각 아이템에 고유한 인덱스를 주기 위해 globalIndex 사용
                                >
                                    <div className={styles.faq_container}>
                                        <p className={styles.faq_Q}>Q</p>
                                        <p className={styles.faq_question}>{item.question}</p>
                                    </div>
                                </div>
                                {activeIndex === globalIndex ? ( // 현재 활성화된 질문에 대한 답변만 표시
                                    <div
                                        className={`${styles.faq_answer_div} ${
                                            activeIndex >= i && activeIndex < i + itemRow ? styles.expanded : ''
                                        }`}
                                    >
                                        <div className={styles.faq_answer}>
                                            <p className={styles.faq_answer_content}> {faqData[globalIndex].answer}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.faq_answer_placeholder}>{}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }

        return rows;
    };

    return (
        <div className={styles.qna_div}>
            <p className={styles.qna_title}>문의사항</p>
            <p className={styles.faq_title}>자주 묻는 질문</p>
            {renderDataInRows(faqData)}
        </div>
    );
}
