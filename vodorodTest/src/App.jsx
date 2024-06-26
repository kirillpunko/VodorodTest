import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrencyRates from './components/CurrencyRates/CurrencyRates.jsx';
import CurrencyDynamic from './components/CurrencyDynamic/CurrencyDynamic.jsx';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.jsx';
import BrowserInfo from './components/BrowserInfo/BrowserInfo.jsx';
import styles from './App.module.css'

const App = () => {
    return (
        <Router>
            <div className={styles.container}>
                <nav>
                    <ul className={styles.navigation}>
                        <li className={styles.list_item}><Link className={styles.link} to="/">Курсы валют</Link></li>
                        <li className={styles.list_item}><Link className={styles.link} to="/dynamic">Динамика курса</Link></li>
                        <li className={styles.list_item}><Link className={styles.link} to="/converter">Конвертер валют</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path="/" element={<CurrencyRates/>} />
                    <Route path="/dynamic" element={<CurrencyDynamic/>} />
                    <Route path="/converter" element={<CurrencyConverter/>} />
                </Routes>
            </div>
            <BrowserInfo />
        </Router>
    );
};

export default App;
