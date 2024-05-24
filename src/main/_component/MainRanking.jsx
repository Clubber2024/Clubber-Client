import styles from './mainRanking.module.css';

const rankingData = [
    {
        id: 1,
        name: '유어슈',
    },
    {
        id: 2,
        name: 'UMC',
    },
    {
        id: 3,
        name: 'SCCC',
    },
    {
        id: 4,
        name: '써밋',
    },
    {
        id: 5,
        name: '서있는 살암들',
    },
    {
        id: 6,
        name: 'ASC',
    },
    {
        id: 7,
        name: '두메',
    },
    {
        id: 8,
        name: 'FRAME',
    },
    {
        id: 9,
        name: '바람개비',
    },
    {
        id: 10,
        name: '멋사',
    },
];

export default function MainRanking() {
    // 메인페이지에 보여줄 동아리 순위
    return (
        <div className={styles.container}>
            <div className={styles.ranking_index}>조회수</div>
            <div className={styles.ranking_container}>
                {rankingData.map((item) => {
                    return (
                        <>
                            <div key={item.id} className={styles.div_ranking}>
                                <p>{item.id}. </p>
                                <p>{item.name}</p>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
