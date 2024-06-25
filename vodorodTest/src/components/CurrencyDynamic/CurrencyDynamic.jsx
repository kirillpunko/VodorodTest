import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SelectCurrency from "../selectCurrency/selectCurrency.jsx";

const CurrencyDynamic = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currency, setCurrency] = useState('');
    const [dynamics, setDynamics] = useState([]);

    const fetchDynamics = async () => {
        try {
            const response = await axios.get(`https://api.nbrb.by/exrates/rates/dynamics/${currency}?startdate=${startDate}&enddate=${endDate}`);
            setDynamics(response.data);
        } catch (error) {
            console.error('Error fetching the currency dynamics', error);
        }
    };

    return (
        <div>
            <h2>Динамика курса валют</h2>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <SelectCurrency val={currency} change={(e) => setCurrency(e.target.value)}/>
            <button onClick={fetchDynamics}>Получить динамику</button>
            {dynamics.length > 0 && (
                <ul>
                    {dynamics.map((dynamic) => (
                        <li key={dynamic.Date}>
                            {dynamic.Date}: {dynamic.Cur_OfficialRate}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CurrencyDynamic;
