import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SmallClubProps from '../smallClub/SmallClubProps';

export default function Manager() {
    const [clubID, setClubID] = useState();
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [clubInfoData, setClubInfoData] = useState([]);
    const [error, setError] = useState(null);

    const adminId = localStorage.getItem('adminId');
    //const accessToken = localStorage.getItem('acessToken');

    console.log('adminId:', adminId);
    //setClubID(adminId);

    const getClub = async () => {
        try {
            const res = await axios.get(`http://13.125.141.171:8080/v1/clubs/${adminId}`);
            if (res.data.success) {
                setClubs(res.data.data);
                setClubInfoData(res.data.data.clubInfo);
                console.log(res.data.data);
                console.log(res.data.data.clubInfo);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClub();
    }, [adminId]);

    if (loading) return <div>Loading...</div>;

    return <></>;
}
