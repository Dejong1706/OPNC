import React, { useState, useEffect } from 'react';
import moment from 'moment';
import css from "styled-jsx/css";
import Link from "next/link";
import crypto from 'crypto-js';

const style = css`
  .container{
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }  

  .MainLogo{
    margin-top: 1%;
    display: flex;
    width: 250px;
    height: 100px;
    background-color: #e0e0e0;
    font-size: 70px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
  }

  .MainLogo p{
    margin-bottom: 0px;
  }

  .NavBar{
    display: inline-block;
    vertical-align: middle;
  }

  .NavBar ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .NavBar ul li{
    margin-right: 30px;
  }

  .NavBar ul button{
    margin-right: 30px;
  }
`;

function Header() {
  const [Data, setData] = useState("")

  let timer = null;
  const [time, setTime] = useState(moment());
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;
    console.log(key);
    const bytes = crypto.AES.decrypt(localStorage.getItem('name'), key);
    const originalText = JSON.parse(bytes.toString(crypto.enc.Utf8));
    console.log(originalText);
    setData(originalText);
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="MainLogo"><p><Link href = "../main">Logo</Link></p></div>
        <div className="NavBar">
          <ul>
            <li>
            {time.format('HH:mm')}
            </li>
            <li>{time.format('YYYY-MM-DD(ddd)')}</li>
            <li>{Data}</li>
            <button><Link href = "../login">로그아웃</Link></button>
          </ul>
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  );
}

export default Header;