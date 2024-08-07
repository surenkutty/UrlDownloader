import React from 'react'
import supporDevices from '../images/supportdevices.svg';
import videoConvert from '../images/videoconveter.svg';
import Cardimg3 from '../images/FastDownload1.svg';
import Cardimg4 from '../images/unlimiited.svg';

function WhyToChoose() {
    return (
        <div className='whytochoosepage'>

            <h1 className='why-head'>Why To Choose</h1>
            <section className='s4-section'>



                <div className="card-container">
                    <div className="card">
                        <h1 className='card-head'>Support All Devices</h1>
                        <img className='cardimg1' src={supporDevices} alt="" />
                        <p className='card-para'>YouTubeSave is a website-based and online platform that you can easily download from any operating system, including Windows, Linux, iPhone, and Android, without any restrictions.</p>
                    </div>
                    <div className="card">
                        <h1 className='card-head'>Online Video Converter</h1>
                        <img className='cardimg2' src={videoConvert} alt="" />
                        <p className='card-para'>Convert downloaded videos from Youtube to different file formats or audio-only formats (e.g., MP3, Mp4)</p>
                    </div>
                    <div className="card">
                        <h1 className='card-head'>Fast Downloading</h1>
                        <img className='cardimg3' src={Cardimg3} alt="" />
                        <p className='card-para'>Using YoutubeSave downloader, quickly download your desired videos from YouTube with just a few simple clicks without wasting any time or paying extra fees.</p>
                    </div>
                    <div className="card">
                        <h1 className='card-head'>Unlimited Download</h1>
                        <img className='cardimg3' src={Cardimg4} alt="" />
                        <p className='card-para'>Through this free tool, you can download the videos you want at any time and without limiting the number of downloads. Transfer speed is up to 1GB/s.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WhyToChoose