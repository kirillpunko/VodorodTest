import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styles from "./CurrencyRates.module.css"
import {useLocation} from "react-router-dom";
import ShareButton from "../ShareButton/ShareButton.jsx";


const CurrencyRates = () => {
    const getParams = new URLSearchParams(useLocation().search);
    const [date, setDate] = useState(getParams.get('date') || '');
    const [rates, setRates] = useState([]);

    const fetchRates = async () => {
        try {
            const response = await axios.get(`https://api.nbrb.by/exrates/rates?ondate=${date}&periodicity=0`);
            console.log(date);
            setRates(response.data);
        } catch (error) {
            console.error('Error fetching the currency rates', error);
        }
    };

    useEffect(() => {
        if (date) {
            fetchRates();
        }
    }, []);

    return (
        <div>
            <h2 className={styles.blockHeader}>Курс валют на определенную дату</h2>
            <div className={styles.formBlock}>
                <input className={styles.inputData} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button className={styles.btn} onClick={fetchRates}>Получить курс</button>
            </div>
            {rates.length > 0 && (
                <table className={styles.tableBlock} >
                    <thead>
                    <tr>
                        <th>Название валюты</th>
                        <th>Количество</th>
                        <th>Курс в BYN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rates.map((rate) => (
                        <tr key={rate.Cur_ID}>
                            <td>{rate.Cur_Name}</td>
                            <td>{rate.Cur_Scale}</td>
                            <td>{rate.Cur_OfficialRate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ShareButton params={{ date }} />
        </div>
    );
};

export default CurrencyRates;
