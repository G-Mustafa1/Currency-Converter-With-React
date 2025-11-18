import { ArrowLeftRightIcon, RefreshCcw, Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ConverterSelect from './ConverterSelect'

const ConverterForm = () => {
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("PKR");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const changeCountry = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }
    const handleSubbmit = (e) => {
        e.preventDefault();
        if (!amount || Number(amount) <= 0) {
            setErrors("Please enter a valid amount.");
            console.log(errors);
            return
        }

        setErrors("");
        coverter();
    }

    const coverter = async () => {
        setLoading(true);
        const Api_Key = import.meta.env.VITE_API_KEY
        try {
            const apiUrl = await fetch(`https://v6.exchangerate-api.com/v6/${Api_Key}/pair/${fromCurrency}/${toCurrency}/${amount}`);

            if (!apiUrl.ok) {
                throw new Error('Something went wrong while fetching conversion');
            }
            const data = await apiUrl.json();
            console.log(data);

            if (data.result !== "success") {
                throw new Error("Conversion failed");
            }

            const rate = data.conversion_rate;
            const convertedAmount = (amount * rate).toFixed(2);

            const lastUpdate = new Date(data.time_last_update_utc).toLocaleString();
            const nextUpdate = new Date(data.time_next_update_utc).toLocaleString();

            setConvertedAmount({
                convertedAmount,
                rate,
                lastUpdate,
                nextUpdate,
            })
        } catch (error) {
            setErrors("Failed to fetch conversion. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubbmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Enter Amount</label>
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    type="number"
                    className="p-3 rounded-lg bg-white/20 border border-white/10 outline-none 
                     focus:ring-2 focus:ring-indigo-300 
                     transition-all duration-300 hover:bg-white/30 hover:scale-[1.02]"
                    placeholder="Enter amount..."
                />
                {errors && <p className='text-red-500 text-sm'>{errors}</p>}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">

                <div className="flex flex-col gap-2 sm:w-1/2">
                    <label className="text-sm font-medium">From</label>
                    <ConverterSelect selectedCurrency={fromCurrency} changeCrency={setFromCurrency} />
                </div>

                <div className="flex items-center justify-center pt-6">
                    <button
                        onClick={changeCountry}
                        type="submit"
                        className="px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 shadow-md 
                       transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                        <ArrowLeftRightIcon />
                    </button>
                </div>

                <div className="flex flex-col  gap-2 sm:w-1/2">
                    <label className="text-sm font-medium">To</label>
                    <ConverterSelect selectedCurrency={toCurrency} changeCrency={setToCurrency} />
                </div>

            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95
                ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}

            >
                {loading ? "Converting..." : "Convert"}
            </button>
            {convertedAmount && (
                <div className="mt-4 bg-white/10 backdrop-blur p-4 rounded-lg text-gray-100">
                    <p className="font-semibold text-xl">
                        {amount} {fromCurrency} = {convertedAmount.convertedAmount} {toCurrency}
                    </p>

                    <p className="mt-1">
                        <span className='font-semibold text-amber-200'>Rate: 1</span> {fromCurrency} = {convertedAmount.rate} {toCurrency}</p>

                    <div className='flex justify-start items-center gap-1.5 my-2.5'>
                        <Timer size={20} className='text-emerald-400'/>
                        <p className="text-sm ">
                            <span className='text-amber-200 font-semibold'>Last Update:</span> {convertedAmount.lastUpdate}</p>
                    </div>

                    <div className='flex justify-start items-center gap-1.5'>
                        <RefreshCcw size={20} className='text-lime-400'/>
                        <p className="text-sm">
                            <span className='text-amber-200 font-semibold'>Next Update:</span> {convertedAmount.nextUpdate}</p>
                    </div>
                </div>
            )}

        </form>
    )
}

export default ConverterForm
