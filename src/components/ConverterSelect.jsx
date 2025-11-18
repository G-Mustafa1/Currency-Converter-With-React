import React, { useState } from 'react'
const currencyCodes = [
    "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
    "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
    "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
    "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
    "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
    "ZWL"
];
const ConverterSelect = ({selectedCurrency, changeCrency}) => {        
    const cuntryCode = selectedCurrency.slice(0, 2);
    
    return (
        <div className="flex items-center gap-2 bg-white/20 border border-white/10 rounded-lg p-2
                          transition duration-300 hover:bg-white/30 hover:scale-[1.02]">
            <img
                src={`https://flagsapi.com/${cuntryCode}/flat/64.png`}
                className="w-8 h-8 rounded transition-transform duration-300 hover:scale-110"
                alt="Flag"
            />
            <select 
            onChange={(e) => changeCrency(e.target.value)}
            className="bg-transparent  outline-none w-full cursor-pointer" value={selectedCurrency}>
                {currencyCodes.map((code) => (
                    <option className='bg-gray-700' key={code} value={code}>{code}</option>
                ))}
                {/* <option className='bg-gray-700' selected value="USD">USD</option>
                <option className='bg-gray-700' value="INR">INR</option>
                <option className='bg-gray-700' value="EUR">EUR</option> */}
            </select>
        </div>
    )
}

export default ConverterSelect
