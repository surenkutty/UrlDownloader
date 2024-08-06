import React from 'react'
import MobileUse from '../images/mobileuse.png';
function SecondPage2() {
  return (
    <div className='tutorial'>
      <div className='htu-container'>
        <h1>How To Use</h1>
      </div>
      <section>
        <div className="s3-section">

          <div className="s3-picture">
            <img className='mobileuse' src={MobileUse} alt="hello this img" />
          </div>


          <div className="s3-text">


            <div className="s3-container">
              <div className="round-s3">01</div>
              <div className="s3-container-content">
                <h4 className="s3-title">Find Video</h4>
                <p className="s3-para">Find the video you want from among the videos on YouTube and copy its link.</p>
              </div>
            </div>
            <div className="s3-container">
              <div className="round-s3">02</div>
              <div className="s3-container-content">
                <h4 className="s3-title">Paste Video</h4>
                <p className="s3-para">Paste the copied link in the desired box and then wait for the system to display the desired video download links in different formats and sizes.</p>
              </div>
            </div>
            <div className="s3-container">
              <div className="round-s3">03</div>
              <div className="s3-container-content">
                <h4 className="s3-title">Download Video</h4>
                <p className="s3-para">In the last step, click on download from the displayed list and save the video on your device.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SecondPage2