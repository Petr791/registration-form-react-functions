import React, { useEffect, useState } from 'react'
import './Form.css'
import Input from '../Input/Input';
import Message from '../Message/Message';


function Form() {

	const EMPTY_STRING = '';
	const INIT_NAME_STRING ='Поле имени не может быть пустым.';
	const LIMIT_NAME_STRING ='Имя должно быть больше 2 и меньше 20 символов!';
	const LIMIT_SURNAME_STRING ='Фамилия должна быть больше 2 и меньше 25 символов!';
	const INIT_EMAIL_STRING ='Поле email не может быть пустым.';
	const INIT_ERROR_STRING ='Некорректный email!';
	const PHONE_ERROR_STRING ='Некорректный номер!';
	const INIT_PASSWORD_STRING ='Поле пороля не может быть пустым.';
	const INIT_PASSWORD_REPEAT_STRING ='Поле повтора пороля не может быть пустым. И пороли должны совпадать.';
	const LIMIT_PASSWORD_STRING ='Пороль должен быть не меньше 8 и небольше 12 символов!';
	const NO_EQUALITY_PASSWORD_STRING ='Пороли должны совпадать!';
	const FILL_FIRST_PASSWORD_STRING ='Заполните первое поле пороля!';
	const EQUALITY_PASSWORD_STRING ='Пороли совпадают!';

	const [isCheckbox, setIsCheckbox] = useState(true);
	const [checkedStatus, setCheckedStatus] = useState(false);
	const [isRequiredInputs, setIsRequiredInputs] = useState(false);

	const [nameError, setNameError] = useState(EMPTY_STRING);
	const [surnameError, setSurnameError] = useState(EMPTY_STRING);
	const [phoneError, setPhoneError] = useState(EMPTY_STRING);
	const [emailError, setEmailError] = useState(EMPTY_STRING);
	const [passwordError, setPasswordError] = useState(EMPTY_STRING);
	const [passwordRepeatError, setPasswordRepeatError] = useState(EMPTY_STRING);

	const [nameText, setNameText] = useState(INIT_NAME_STRING);
	const [emailText, setEmailText] = useState(INIT_EMAIL_STRING);
	const [passwordText, setPasswordText] = useState(INIT_PASSWORD_STRING);
	const [passwordRepeatText, setPasswordRepeatText] = useState(INIT_PASSWORD_REPEAT_STRING);
	const [formValid, setFormValid] = useState(false);

	const [form, setForm] =useState({
		name: '',
		surname: '',
		phone: '',
		email: '',
		password: '',
		passwordRepeat: '',
		confirm: false
	});

	function handleSubmit(e) {
		e.preventDefault();
		alert('Регистрация прошла успешно!\n\nДанные формы'+ '\nИмя: ' + form.name + '\nФамилия: ' + form.surname + '\nТелефон: ' + form.phone + '\nПочта: ' + form.email + '\nПароль: ' + form.password + '\nПовтор пороля: ' + form.passwordRepeat + '\nСтатус подтверждения пороля: ' + form.confirm);
		console.log(form);
	
			// обнуление полей формы
			setNameText(INIT_NAME_STRING);
			setEmailText(INIT_EMAIL_STRING);
			setPasswordText(INIT_PASSWORD_STRING);
			setPasswordRepeatText(INIT_PASSWORD_REPEAT_STRING);

			setCheckedStatus(false);
			setIsCheckbox(true);
			setForm({
				name: '',
				surname: '',
				phone: '',
				email: '',
				password: '',
				passwordRepeat: '',
				confirm: checkedStatus
			});
	}


	function handleInputChange(e){

		if (e.target.name === 'name') {
		 	setForm({
			...form,
				[e.target.name]: e.target.value
			});
 
			if (e.target.value.length <2 || e.target.value.length >20) {
					setNameError(LIMIT_NAME_STRING);
				if (!e.target.value) {
						setNameText(INIT_NAME_STRING);
						setNameError(EMPTY_STRING);
				}
					setIsRequiredInputs(false);
			} else {
					setNameText(EMPTY_STRING);
					setNameError(EMPTY_STRING);
					setIsRequiredInputs(true);
			}
					 return;
		} 


		if (e.target.name === 'surname') {
		 	setForm({
			...form,
				[e.target.name]: e.target.value
			});
 
			if (e.target.value.length <2 || e.target.value.length >20) {
					setSurnameError(LIMIT_SURNAME_STRING);
					if (!e.target.value) {
						setSurnameError(EMPTY_STRING);
					}
			} else {
					setSurnameError(EMPTY_STRING);
			}
					 return;
		} 

 		if (e.target.name === 'phone') {
		 	setForm({
			...form,
				[e.target.name]: e.target.value
			});

			const regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

			if (!regex.test(e.target.value)) {
					setPhoneError(PHONE_ERROR_STRING);
					if (!e.target.value) {
						setPhoneError(EMPTY_STRING);
					}
			} else {
					setPhoneError(EMPTY_STRING);
			}
				return;
		} 


		 if (e.target.name === 'email') {
			setForm({
				...form,
					[e.target.name]: e.target.value
			});

			const re = /^(([^&lt;&gt;()[\]\\.,;:\s@"]+(\.[^&lt;&gt;()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!re.test(String(e.target.value).toLowerCase())) {
				setEmailError(INIT_ERROR_STRING);
					if (!e.target.value) {
							setEmailError(EMPTY_STRING);
							setEmailText(INIT_EMAIL_STRING);
					}
					setIsRequiredInputs(false);
			} else{
				setEmailText(EMPTY_STRING);
				setEmailError(EMPTY_STRING);
				setIsRequiredInputs(true);
			}
			return;
		} 


		if (e.target.name === 'password') {
		 	setForm({
			...form,
				[e.target.name]: e.target.value
			});

			//  если  не в диапозоне 
			if (e.target.value.length <8 || e.target.value.length >12) {
					setPasswordError(LIMIT_PASSWORD_STRING);
					setIsCheckbox(true);
					setCheckedStatus(false);
					if(form.passwordRepeat !== EMPTY_STRING){
							setPasswordRepeatError(NO_EQUALITY_PASSWORD_STRING);
					}
					//  если  не в диапозоне и пустое
					if (!e.target.value) {
						setPasswordText(INIT_PASSWORD_STRING);
						setPasswordError(EMPTY_STRING);
								if(form.passwordRepeat){
								setPasswordRepeatError(FILL_FIRST_PASSWORD_STRING);
							}
						}
			}

			// если в диапозоне
			else {
					setPasswordText(EMPTY_STRING);
					setPasswordError(EMPTY_STRING);
				// если пороли не равны
					if (e.target.value !== form.passwordRepeat) {
						if(form.passwordRepeat !== EMPTY_STRING){
							setPasswordRepeatText(EMPTY_STRING);
							setPasswordRepeatError(NO_EQUALITY_PASSWORD_STRING);
							}
							setIsCheckbox(true);
							setCheckedStatus(false);
						}
						// если равны
						else{
							setPasswordRepeatError(EMPTY_STRING);
							setPasswordRepeatText(EQUALITY_PASSWORD_STRING);
							setIsCheckbox(false);
						}
			}
					 return;
		} 

		 if (e.target.name === 'passwordRepeat') {
		 	setForm({
			...form,
				[e.target.name]: e.target.value
			});
 
					// если первое поле пороля пустое
					if (!form.password) {
						setPasswordRepeatError(FILL_FIRST_PASSWORD_STRING);
						}
						// если первое поле пороля не пустое
						else{

							//  если  не в диапозоне 
							if (e.target.value.length <8 || e.target.value.length >12) {
									setIsCheckbox(true);
									setCheckedStatus(false);
									if (!e.target.value || !e.target.value && form.passwordRepeat === EMPTY_STRING) {
											setPasswordRepeatError(EMPTY_STRING);
											setPasswordRepeatText(INIT_PASSWORD_REPEAT_STRING);
										} else{
											setPasswordRepeatText(EMPTY_STRING);
											setPasswordRepeatError(NO_EQUALITY_PASSWORD_STRING);
										}
							}
							// если в диапозоне
							else{
								if (e.target.value !== form.password) {
										setPasswordRepeatError(NO_EQUALITY_PASSWORD_STRING);
										setIsCheckbox(true);
										setCheckedStatus(false);
										if (!e.target.value) {
											//убрать	
										}
									} else {
											setPasswordRepeatText(EQUALITY_PASSWORD_STRING);
											setPasswordRepeatError(EMPTY_STRING);
											setIsCheckbox(false);
									}
							}
						}
					 	return;
		} 

 		if (e.target.name === 'confirm') {
			setCheckedStatus(!checkedStatus);
				setForm({
					...form,
						confirm: !checkedStatus
			});
		} 
 		
	}

	useEffect ( () => {

		if (!checkedStatus || !isRequiredInputs) {
			setFormValid(false);
		} else{
			setFormValid(true);
		}

	},[checkedStatus, isRequiredInputs]);



  return (
		<>
			<form className="form" onSubmit={handleSubmit}> 
				<h1 className="form__title">Создание аккаунта</h1>
				<p className="form__subtitle">Введите свои данные, чтобы создать аккаунт в сервисе</p>

				<div className="form__input-wrapper">
						<Input
							type="text"
							name="name"
							value={form.name}
							placeholder="Имя"
							onChange={handleInputChange} />

						<Message
							error={nameError} 
							text={nameText} />
				</div>
			
				<div className="form__input-wrapper">
					<Input
						type="text"
						name="surname"
						value={form.surname}
						placeholder="Фамилия"
						onChange={handleInputChange} />

					<Message
						error={surnameError} />
				</div>

				<div className="form__input-wrapper">
					<Input
					type="tel"
					name="phone"
					value={form.phone}
					placeholder="Номер телефона"
					onChange={handleInputChange} />

					<Message
						error={phoneError} />
				</div>

				<div className="form__input-wrapper">
					<Input
						type="email"
						name="email"
						value={form.email}
						placeholder="Email"
						onChange={handleInputChange} />

					<Message
						error={emailError} 
						text={emailText} />
				</div>

				<div className="form__input-wrapper">
					<Input
						type="password"
						name="password"
						value={form.password}
						placeholder="Пароль"
						autoComplete=''
						onChange={handleInputChange} />

						<Message
							error={passwordError} 
							text={passwordText} />
				</div>

				<div className="form__input-wrapper">
					<Input
						type="password"
						name="passwordRepeat"
						value={form.passwordRepeat}
						placeholder="Повторите пароль"
						autoComplete=''
						onChange={handleInputChange} />

					<Message
						error={passwordRepeatError} 
						text={passwordRepeatText} />
				</div>

				<div className="checkbox-item">
					<input 
						type="checkbox" 
						className="checkbox-input" 
						id="confirm" 
						value={checkedStatus}
						checked={checkedStatus} 
						name="confirm"
						disabled={isCheckbox}
						onChange={handleInputChange} />

						<label 
							htmlFor="confirm" 
							className="checkbox-label">
							Подтверждаю пароль
						</label>
				</div>

				<button 
						className="form__btn"
						type="submit"
						disabled={!formValid}>
						Продолжить
				</button>

		</form>

		<p className="account-entry">Уже есть аккаунт ?<a className="account-entry__link" href="https://dzen.ru/?yredirect=true" target="_blank"><span> Войти</span></a></p>
	</>
  )
}

export default Form







