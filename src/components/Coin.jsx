import React, { useState } from 'react'

import './Coin.css'

function Coin() {
    const [coinA, setCoinA] = useState("")
    const [coinB, setCoinB] = useState("")
    const [coinA_value, setCoinA_value] = useState("")
    const [coinB_value, setCoinB_value] = useState("")
    const [cotacao, setCotacao] = useState("")

    function converter() {
        let from_to = `${coinA}_${coinB}`
        let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=b5daa01714cfbad6f81e`
        if (coinA || coinB != '') {
            fetch(url)
                .then(res => {
                    return res.json()
                }).then(json => {
                    let cotacao = json[from_to];
                    let value = (parseFloat(coinA_value * cotacao)).toFixed(2)
                    setCoinB_value(value)
                    setCotacao(`Cotação atual: ${(cotacao).toFixed(2)}`)
                })
        } else {
            setCotacao("Valor inválido")
        }
    }


    return (
        <div className="coin-box">
            <select className="select-a" name="Selecione o tipo"
                onChange={(e) => {
                    const value = e.target.value
                    setCoinA(value)
                }}>
                <option value=""></option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
            </select>
            <select className="select-b" name="Selecione o tipo"
                onChange={(e) => {
                    const selectedCoinB = e.target.value
                    setCoinB(selectedCoinB)
                }}>
                <option value=""></option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
            </select>
            <input className="input" type="text" placeholder="Digite um valor"
                onChange={(e) => {
                    const value = e.target.value
                    setCoinA_value(value)
                }} />
            <button className="button" onClick={converter}>Converter</button>
            <p className="cotacao">{cotacao}</p>
            <p className="result">Valor: {coinB_value}</p>
        </div>

    )
}

export default Coin