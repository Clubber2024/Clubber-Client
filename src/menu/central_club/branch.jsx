import React from 'react';
import styles from './branch.module.css';

function Branch() {
    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}>취미 분과</h2>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club1" src="branch_image\club1.png" />
                    <h3 className={styles.title}>더 밴드</h3>
                    <p className={styles.content}>
                        음악을 좋아하는 학생들끼리 모인 곳 입니다!<br></br>
                        정기적으로 밴드 공연을 하는 동아리입니다.
                        <br></br>
                        악기 연주 경험이 없으셔도 괜찮습니다.<br></br>음악을 사랑한다면 누구나 환영입니다.
                    </p>
                </div>
                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club2" src="branch_image\club2.png" />
                    <h3 className={styles.title}>스터디</h3>
                    <p className={styles.content}>
                        공부를 좋아하는 학생들끼리 모인 곳 입니다!<br></br>정기적으로 스터디를 하는 동아리입니다.
                        <br></br>열정만 있으시다면 누구나 환영입니다.
                    </p>
                </div>
                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club1" src="branch_image\club1.png" />
                    <h3 className={styles.title}>더 밴드</h3>
                    <p className={styles.content}>
                        음악을 좋아하는 학생들끼리 모인 곳 입니다!<br></br>
                        정기적으로 밴드 공연을 하는 동아리입니다.
                        <br></br>
                        악기 연주 경험이 없으셔도 괜찮습니다.<br></br>음악을 사랑한다면 누구나 환영입니다.
                    </p>
                </div>

                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club2" src="branch_image\club2.png" />
                    <h3 className={styles.title}>스터디</h3>
                    <p className={styles.content}>
                        공부를 좋아하는 학생들끼리 모인 곳 입니다!<br></br>정기적으로 스터디를 하는 동아리입니다.
                        <br></br>열정만 있으시다면 누구나 환영입니다.
                    </p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club1" src="branch_image\club1.png" />
                    <h3 className={styles.title}>더 밴드</h3>
                    <p className={styles.content}>
                        음악을 좋아하는 학생들끼리 모인 곳 입니다!<br></br>
                        정기적으로 밴드 공연을 하는 동아리입니다.
                        <br></br>
                        악기 연주 경험이 없으셔도 괜찮습니다.<br></br>음악을 사랑한다면 누구나 환영입니다.
                    </p>
                </div>
                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club2" src="branch_image\club2.png" />
                    <h3 className={styles.title}>스터디</h3>
                    <p className={styles.content}>
                        공부를 좋아하는 학생들끼리 모인 곳 입니다!<br></br>정기적으로 스터디를 하는 동아리입니다.
                        <br></br>열정만 있으시다면 누구나 환영입니다.
                    </p>
                </div>
                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club1" src="branch_image\club1.png" />
                    <h3 className={styles.title}>더 밴드</h3>
                    <p className={styles.content}>
                        음악을 좋아하는 학생들끼리 모인 곳 입니다!<br></br>
                        정기적으로 밴드 공연을 하는 동아리입니다.
                        <br></br>
                        악기 연주 경험이 없으셔도 괜찮습니다.<br></br>음악을 사랑한다면 누구나 환영입니다.
                    </p>
                </div>

                <div className={styles.rectangle}>
                    <img className={styles.image} alt="club2" src="branch_image\club2.png" />
                    <h3 className={styles.title}>스터디</h3>
                    <p className={styles.content}>
                        공부를 좋아하는 학생들끼리 모인 곳 입니다!<br></br>정기적으로 스터디를 하는 동아리입니다.
                        <br></br>열정만 있으시다면 누구나 환영입니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Branch;
