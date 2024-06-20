import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { useState, useEffect } from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";
import $ from 'jquery';
import React from 'react';



const API_URL = 'https://type.fit/api/quotes'


function QuoteGenerator() {
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')

  useEffect(() => {
    handleClick()
  }, [])

  function handleClick() {
    let randomNumber = Math.floor(Math.random() * 16)
    const fetchData = async () => {
      const result = await fetch(API_URL)
      const data = await result.json()
      const finalQuote = data[randomNumber];
      const {author, text} = finalQuote;
      setQuote(text)
      setAuthor(author.split(',')[0])
    }
    fetchData()
  }

  function changeContainerColor() {
    let randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    $('.container-fluid').css({'backgroundColor': randomColor})
    }

  return(
    <>
      <div className="container-fluid" id="quote-box">
        <p id="text">{quote}</p>
        <p id="author">{author}</p>
        <a href="twitter.com/intent/tweet" target="_blank" id="tweet-quote"><FaSquareXTwitter style={{height: 40, width: 40, color: 'black'}}/></a>
        <button id="new-quote" className='btn btn-light' 
        onClick={() => {
          handleClick()
          changeContainerColor()
        }} >
        Generate a new quote</button>
      </div>
    </>
  )
}


function App() {
  return (
    <div className="App">
      <div className="center-container">
        <div className="container text-center" >
          <QuoteGenerator />
        </div>
      </div>
    </div>
  );
}

export default App;
