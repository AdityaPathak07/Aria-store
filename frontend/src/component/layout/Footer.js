import React from 'react'
import playStore from '../../images/playstore.png'
import AppStore from '../../images/Appstore.png'
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android</p>
            <img src={playStore} alt='play'></img>
            <img src={AppStore} alt='app'></img>
        </div>

        <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>Best Quality Ecommerce store and values is our first priority</p>

        <p>Copyrights 2023 &copy; AdityaPathak</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a target="_blank" rel="noreferrer" href="http://instagram.com/aditya_pathak07">Instagram</a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aditya-pathak-72753910a/">LinkedIn</a>
        <a target="_blank" rel="noreferrer" href="https://github.com/AdityaPathak07">GitHub</a>
      </div>
    </footer>
  )
}

export default Footer