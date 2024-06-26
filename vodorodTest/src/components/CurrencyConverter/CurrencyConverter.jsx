import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './CurrencyConverter.module.css'
import SelectCurrency from "../selectCurrency/selectCurrency.jsx";
import {useLocation} from "react-router-dom";
import ShareButton from "../ShareButton/ShareButton.jsx";


const CurrencyConverter = () => {
    const getParams = new URLSearchParams(useLocation().search);
    const [currencyA, setCurrencyA] = useState(getParams.get('currencyA')||'');
    const [currencyB, setCurrencyB] = useState(getParams.get('currencyB')||'');
    const [amountA, setAmountA] = useState(getParams.get('amountA')||0);
    const [amountB, setAmountB] = useState(getParams.get('amountB')||0);
    const [rateA, setRateA] = useState(null);
    const [rateB, setRateB] = useState(null);
    const [scaleA, setScaleA] = useState(null);
    const [scaleB, setScaleB] = useState(null);


    useEffect(() => {
        if (currencyA) {
            axios.get(`https://www.nbrb.by/api/exrates/rates/${currencyA}?periodicity=0`)
                .then(response => {
                    setRateA(response.data.Cur_OfficialRate);
                    setScaleA(response.data.Cur_Scale);
                })
                .catch((error) => {
                    if (currencyA === 'BYN') {
                        setRateA(1);
                        setScaleA(1);
                    } else
                        console.error('Error fetching rateA', error)
                });
        }
        if (currencyB) {
            axios.get(`https://www.nbrb.by/api/exrates/rates/${currencyB}?periodicity=0`)
                .then(response => {
                    setRateB(response.data.Cur_OfficialRate);
                    setScaleB(response.data.Cur_Scale);
                })
                .catch((error) => {
                    if (currencyB === 'BYN') {
                        setRateA(1);
                        setScaleA(1);
                    } else
                        console.error('Error fetching rateB', error)
                });
        }
    }, [currencyA, currencyB]);

    useEffect(() => {
        if (currencyA && currencyB && amountA && amountB) {
            convertAtoB();
        }
    }, []);

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
            <h2 className={styles.blockHeader}>Конвертер валют</h2>
            <div className={styles.mainBlock}>
                <div>
                    <SelectCurrency styles={styles.selector} val={currencyA}
                                    change={(e) => setCurrencyA(e.target.value)}/>
                    <input className={styles.inputSum} id="sumA" type="number" value={amountA} onChange={convertAtoB} placeholder="Сумма A"/>
                </div>
                <div>
                    <SelectCurrency styles={styles.selector} val={currencyB}
                                    change={(e) => setCurrencyB(e.target.value)}/>
                    <input className={styles.inputSum} id="sumB" type="number" value={amountB} onChange={convertBtoA} placeholder="Сумма B"/>
                </div>
            </div>
            <ShareButton params={{ currencyA, currencyB, amountA, amountB }} />
        </div>
    );
};

export default CurrencyConverter;
