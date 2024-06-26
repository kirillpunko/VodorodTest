import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SelectCurrency from "../selectCurrency/selectCurrency.jsx";
import styles from "./CurrencyDynamic.module.css"
import {useLocation} from "react-router-dom";
import ShareButton from "../ShareButton/ShareButton.jsx";


const CurrencyDynamic = () => {
    const getParams = new URLSearchParams(useLocation().search);
    const [startDate, setStartDate] = useState(getParams.get('startDate') || '');
    const [endDate, setEndDate] = useState(getParams.get('endDate') || '');
    const [currency, setCurrency] = useState(getParams.get('currency') || '');
    const [dynamics, setDynamics] = useState([]);
    const [scale, setScale] = useState([]);

    const fetchDynamics = async () => {
        try {
            const response = await axios.get(`https://api.nbrb.by/exrates/rates/dynamics/${currency}?startdate=${startDate}&enddate=${endDate}`);
            setDynamics(response.data);
            const response2 = await  axios.get(`https://api.nbrb.by/exrates/rates/${currency}`);
            setScale(response2.data.Cur_Scale);
        } catch (error) {
            console.error('Error fetching the currency dynamics', error);
        }
    };

    useEffect(() => {
        if (startDate && endDate && currency) {
            fetchDynamics();
        }
    }, []);

    return (
        <div>
            <h2 className={styles.blockHeader}>Динамика курса валют</h2>
            <div className={styles.dateBlock}>
                <input className={styles.inputData} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input className={styles.inputData} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <SelectCurrency styles={styles.selector} val={currency} change={(e) => setCurrency(e.target.value)}/>
            <button className={styles.btn} onClick={fetchDynamics}>Получить динамику</button>
            {dynamics.length > 0 && (
                <table className={styles.tableBlock}>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Курс в BYN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dynamics.map((dynamic) => (
                        <tr key={dynamic.Date}>
                            <td>{new Date(dynamic.Date).toLocaleDateString()}</td>
                            <td>{(scale*dynamic.Cur_OfficialRate).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ShareButton params={{ startDate, endDate, currency }} />
        </div>
    );
};

export default CurrencyDynamic;
