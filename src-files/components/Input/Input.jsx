import React from 'react'
import './Input.css'



function Input(props) {

	return(
			<>
				<input
					className="form__input"
					type={props.type}
					name={props.name}
					value={props.value}
					placeholder={props.placeholder}
					autoComplete={props.autoComplete}
					onChange={props.onChange} />
			</>

	)
}

export default Input