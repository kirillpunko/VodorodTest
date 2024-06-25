import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrencyRates from './components/CurrencyRates.jsx';
import CurrencyDynamic from './components/CurrencyDynamic.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import BrowserInfo from './components/BrowserInfo.jsx';
import ShareButton from './components/ShareButton.jsx';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/curses">Курсы валют</Link></li>
                        <li><Link to="/dynamic">Динамика курса</Link></li>
                        <li><Link to="/converter">Конвертер валют</Link></li>
                    </ul>
                </nav>
                <BrowserInfo />
                <Routes>
                    <Route path="/curses" element={<CurrencyRates/>} />
                    <Route path="/dynamic" element={<CurrencyDynamic/>} />
                    <Route path="/converter" element={<CurrencyConverter/>} />
                </Routes>
                <ShareButton url={window.location.href} />
            </div>
        </Router>
    );
};

export default App;
