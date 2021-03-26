import React, { useState, useEffect } from 'react'
import {API_KEY, API_KEYID} from '../apiKeys';

function Email({setEmail, setDisplayOTPInput}) {
	const [emailInput, setEmailInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [receivedSID, setReceivedSID] = useState(false);

	useEffect(() => {
		setEmailInput('');
	}, []);

	const handleChange = e => {
		setEmailInput(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		
		if(emailInput){
			setLoading(true);
			setEmail(emailInput);

			fetch('https://console.gateway.senslabs.io/api/otp/request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'x-sens-api-key-id': API_KEYID,
					'x-sens-api-key': API_KEY
				},
				body: JSON.stringify({
					Medium: 'Email',
					MediumValue: emailInput
				})
			})
			.then(res => {
				console.log('status: ', res.status)
				// setSIDStatus(res.status);
				return res.json()
			})
			.then(res => {
				console.log(res.SessionId);
				// setSessionId(res.SessionId);
				setReceivedSID(true);
				localStorage.setItem('demo-SID', res.SessionId)
			})
			.catch(console.log)
			.then(() => {
				setLoading(false)
			})
		}
	}

	useEffect(() => {
		if(receivedSID){
			setDisplayOTPInput(true);
		}
	}, [receivedSID])

	return (
		<div>
			{
				loading ? 'Loading ... ' :
				<form onSubmit={handleSubmit}>
					<input type="text" value={emailInput} placeholder="Enter your email ID" onChange={handleChange}/>
					<button>Submit</button>
				</form>
			}
		</div>
	)
}

export default Email
