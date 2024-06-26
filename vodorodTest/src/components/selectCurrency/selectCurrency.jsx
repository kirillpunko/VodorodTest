import React, {useEffect, useState} from 'react';
import axios from "axios";

const SelectCurrency = ({styles, val, change}) => {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const response = await axios.get(`https://www.nbrb.by/api/exrates/rates?ondate=${today}&periodicity=0`);
                setCurrencies(response.data);
            } catch (error) {
                console.error('Error fetching the currency list', error);
            }
        };

        fetchCurrencies();
    }, []);
    return (
        <select className={styles} value={val} onChange={change}>
            <option value="">Выберите валюту</option>
            {currencies.map((cur) => (
                <option key={cur.Cur_ID} value={cur.Cur_ID}>
                    {cur.Cur_Abbreviation} - {cur.Cur_Name}
                </option>
            ))}
        </select>
    );
};

export default SelectCurrency;