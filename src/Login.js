import React, {useState, useEffect} from 'react'
import Email from './components/Email';
import Otp from './components/Otp';

function Login() {
	const [email, setEmail] = useState('');
	const [displayOTPInput, setDisplayOTPInput] = useState(false);

	useEffect(() => {
		console.log('displayOTPInput: ', displayOTPInput);
	}, [displayOTPInput])
	return (
		<div className="outer-container">
			{
				displayOTPInput ? 
				<Otp email={email} />
				:
				<Email setEmail={setEmail} setDisplayOTPInput={setDisplayOTPInput}/>
			}
		</div>
	)
}

export default Login
