import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styles from "./CurrencyRate.module.css"

const CurrencyRates = () => {
    const [date, setDate] = useState('');
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
                        <th>Курс в белорусских рублях</th>
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
        </div>
    );
};

export default CurrencyRates;
