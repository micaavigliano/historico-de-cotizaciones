import React, { useState } from 'react';
import './filters.css';
import 'currency-flags/dist/currency-flags.min.css';

function Currencies({exchangeRates}) {
    //console.log(exchangeRates);
    const currencies = Object.keys(exchangeRates);
    //console.log(currencies)
    const [viewMore, setViewMore] = useState(false);

    return (
        <div>
            <h2>Cotizaciones de divisas</h2>
            {
                currencies.map((value) => 
                    <li key={value} className="listita">
                        <div className={`currency-flag currency-flag-${value.toLocaleLowerCase()}`}></div>
                        <span className="nameCurrency">{value}</span> 
                        <span className="valueCurrency">{exchangeRates[value].toFixed(3)}</span>
                    </li>)
            }
            <div>
                <button>View More</button>
            </div>
        </div>
    )
}

export default Currencies;