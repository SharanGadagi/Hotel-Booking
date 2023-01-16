import React from 'react'
import './ContactMail.css'

const ContactMail = () => {
  return (
<>
<div className="contactMail">
    <h1 className="contactMail-title">Save time and Save Money!! </h1>
    <span className="ContactMail-desc">Sign up and we'll send you best details..</span>
    <div className="contactMail-input">
        <input type="text" placeholder='Enter Your Email' className='c-emailInput'/>
        <button className='c-emailBtn'>Subscribe</button>
    </div>

</div>
</>
  )
}

export default ContactMail
