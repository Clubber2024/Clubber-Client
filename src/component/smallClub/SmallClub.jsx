import React, { useEffect, useState } from 'react';
import styles from './smallClub.module.css';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../config/axios-config';

function SmallClub() {
    const navigate = useNavigate();
    const [college, setCollege] = useState([]);

    const onClicked = (value) => {
        navigate('/small/colleges', { state: { department: value } });
    };

    const getCollegeData = async () => {
        try {
            const res = await customAxios.get(`/v1/clubs/colleges`);

            if (res.data.success) {
                // console.log(res.data.data);
                setCollege(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching pending data : ', error);
        }
    };

    useEffect(() => {
        getCollegeData();
    }, []);

    const renderCollege = (data) => {
        const rows = [];
        const slicedData = data.slice(0, 8); // 9번째 데이터 제외

        for (let i = 0; i < slicedData.length; i += 4) {
            const rowItems = slicedData.slice(i, i + 4);
            rows.push(
                <div className={styles.container} key={i}>
                    {rowItems.map((college) => (
                        <div className={styles.rectangle} key={college.collegeCode}>
                            <h3 className={styles.title}>{college.collegeTitle ? college.collegeTitle : '2'}</h3>
                            <div className={styles.scrollBar}>
                                {college.departments
                                    ? college.departments.map((department) => (
                                          <h5
                                              className={styles.text}
                                              key={department.code}
                                              onClick={() => onClicked(department.code)}
                                          >
                                              {department.title}
                                          </h5>
                                      ))
                                    : '1'}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        return rows;
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h2 className={styles.header_title}>단과대</h2>
            </div>
            {renderCollege(college)}
        </div>
    );
}
export default SmallClub;
