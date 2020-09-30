import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { EXCHANGE_SYMBOL } from '../const';
import 'react-datepicker/dist/react-datepicker.css';
import Currencies from './Currencies';
import moment from 'moment';
import './filters.css'

const Filters = () => {
    const [currencies, setCurrencies] = useState(['EUR']);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [exchangeRates, setExchangeRates] = useState();

    useEffect(() => {
        fetch(EXCHANGE_SYMBOL)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrencies([data.base, ...Object.keys(data.rates)])
            })
    }, [])

    useEffect(() => {
        console.log(exchangeRates)
    }, [exchangeRates])


    const handleSubmit = async event => {
        //1. prevent default del formulario cuando hago click en submit
        event.preventDefault();
        const formatDate = moment(selectedDate).format('YYYY-MM-DD');
        try{ 
            const url = `https://api.exchangeratesapi.io/${formatDate}?symbols=USD,GBP,CAD,EUR&base=${selectedCurrency}`
            let response = await fetch(url);
            let data = await response.json()
            console.log(data.rates)
            setExchangeRates(data.rates);
        }
        catch{
            console.log('error')
        }
    
    }

    const handleDate = (dateChanged) => {
        setSelectedDate(dateChanged)
    }

    const handleChangeCurrency = event => {
        setSelectedCurrency(event.target.value);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Histórico de cotizaciones</h1>
                <div className="label">
                    <label htmlFor="symbols">Selecciona la moneda de referencia:</label>
                </div>
                <div className="symbol-select">
                    <select id="symbols" name="nombre" onChange={handleChangeCurrency}>
                        <option value="default-value" disabled>Moneda</option>
                        {currencies.map((option) => (
                            <option value={option} key={option}>{option}</option>
                        ))}
                    </select>
                </div>
                    <div className="label">
                        <label htmlFor="calendar">Ingresa la fecha de cotización: </label>
                    </div>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={handleDate} 
                        dateFormat='dd/MM/yyyy'
                        maxDate={new Date()}
                        showYearDropdown
                        id="calendar"
                        placeholderText="DD / MM / YYYY"
                        className="calendar"
                    />
                <div className="btn-submit">
                    <button type="submit">Buscar cotizaciones</button>
                </div>
            </form>
           { exchangeRates && <Currencies exchangeRates={exchangeRates}/>}
        </div>
    )
}

export default Filters;
