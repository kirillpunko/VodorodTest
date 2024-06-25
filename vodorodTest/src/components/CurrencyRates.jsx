import React, { useState } from 'react';
import axios from 'axios';

const CurrencyRates = () => {
    const [date, setDate] = useState('');
    const [rates, setRates] = useState([]);

    const fetchRates = async () => {
        try {
            const response = await axios.get(`https://api.nbrb.by/exrates/rates?ondate=${date}&periodicity=0`);
            console.log(response);
            setRates(response.data);
        } catch (error) {
            console.error('Error fetching the currency rates', error);
        }
    };

    return (
        <div>
            <h2>Курсы валют на определенную дату</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={fetchRates}>Получить курсы</button>
            {rates.length > 0 && (
                <ul>
                    {rates.map((rate) => (
                        <li key={rate.Cur_ID}>
                            {rate.Cur_Name}: {rate.Cur_OfficialRate}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CurrencyRates;
