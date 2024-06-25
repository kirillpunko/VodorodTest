import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [currencyA, setCurrencyA] = useState('');
    const [currencyB, setCurrencyB] = useState('');
    const [amountA, setAmountA] = useState(0);
    const [amountB, setAmountB] = useState(0);
    const [rateA, setRateA] = useState(null);
    const [rateB, setRateB] = useState(null);
    const [scaleA, setScaleA] = useState(null);
    const [scaleB, setScaleB] = useState(null);


    useEffect(() => {
        if (currencyA) {
            axios.get(`https://www.nbrb.by/api/exrates/rates/${currencyA}?periodicity=0&parammode=2`)
                .then(response => {
                    setRateA(response.data.Cur_OfficialRate);
                    setScaleA(response.data.Cur_Scale);
                })
                .catch((error)=>{
                    if (currencyA==='BYN'){
                        setRateA(1);
                        setScaleA(1);
                    }
                    else
                        console.error('Error fetching rateA', error)});
        }
        if (currencyB) {
            axios.get(`https://www.nbrb.by/api/exrates/rates/${currencyB}?periodicity=0&parammode=2`)
                .then(response =>{
                    setRateB(response.data.Cur_OfficialRate);
                    setScaleB(response.data.Cur_Scale);
                })
                .catch((error)=>{
                    if (currencyB==='BYN'){
                        setRateA(1);
                        setScaleA(1);
                    }
                    else
                        console.error('Error fetching rateB', error)});
        }
    }, [currencyA, currencyB]);

    useEffect(() => {

    },[amountA]);
    useEffect(() => {

    },[amountB]);
    const convertAtoB = () => {
        if (rateA && rateB) {
            const amountATemp = document.getElementById('sumA').value;
            setAmountA(amountATemp);
            setAmountB((amountATemp * rateA * scaleB / (rateB * scaleA)).toFixed(2));
        }
    };

    const convertBtoA = () => {
        if (rateA && rateB) {
            const amountBTemp = document.getElementById('sumB').value;
            setAmountB(amountBTemp);
            setAmountA((amountBTemp * rateB * scaleA / (rateA * scaleB)).toFixed(2));
        }
    };

    return (
        <div>
            <h2>Конвертер валют</h2>
            <div>
                <input type="text" value={currencyA} onChange={(e) => setCurrencyA(e.target.value)} placeholder="Валюта A" />
                <input id="sumA" type="number" value={amountA} onChange={convertAtoB} placeholder="Сумма A" />
            </div>
            <div>
                <input type="text" value={currencyB} onChange={(e) => setCurrencyB(e.target.value)} placeholder="Валюта B" />
                <input id="sumB" type="number" value={amountB} onChange={convertBtoA} placeholder="Сумма B" />
            </div>
        </div>
    );
};

export default CurrencyConverter;
