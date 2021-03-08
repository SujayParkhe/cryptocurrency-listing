import React, {useState, useEffect} from 'react';
import Coins from './components/Coins';
import './App.css';
import axios from 'axios';


function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  
 
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(err => alert('Yo there is an error'))
  },[]);

  const handleChange = e => {
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className='coin-app'>
      <div className="crypto-container">
        <header className="crypto-header">
          <h1>Welcome to Crypto Listing</h1>
        </header>
        <p className="crypto-intro">
          Crytocurrency coin information will be listed below.
        </p>
      </div>
      <div className="coin-search">
        <h1 className="coin-text">Search a currency </h1>
        <input type="text" placeholder="Search" onChange={handleChange} className="coin-input"/>
      </div>
      {filteredCoins.map(coin => {
        return(
          <Coins key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h}/>
        )
      })}
    </div>
    
  );
}

export default App;
