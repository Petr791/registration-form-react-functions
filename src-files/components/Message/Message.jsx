import React from 'react'
import './Message.css'


function Message({error, text}) {

	return(
		<div className='message-wrapper'>
			 {(error)? <p className='message message--red'><sup>*</sup>{error}</p> : (text) && <p className='message message--green'><sup>*</sup>{text}</p>}
		</div>

	)
}

export default Message
