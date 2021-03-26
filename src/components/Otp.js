import React, { useState, useEffect } from 'react'
import {API_KEY, API_KEYID} from '../apiKeys';
import {useHistory} from 'react-router-dom';

function OTP({email}) {
	const history = useHistory();

	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState('');

	useEffect(() => {
		setOtp('');
	}, [])

	const handleChange = e => {
		setOtp(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		
		if(otp){
			setLoading(true);

			fetch('https://console.gateway.senslabs.io/api/otp/verify?category=operator', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'x-sens-api-key-id': API_KEYID,
					'x-sens-api-key': API_KEY
				},
				body: JSON.stringify({
					Medium: 'Email',
					MediumValue: email,
					Otp: otp,
					SessionId: localStorage.getItem('demo-SID')
				})
			})
			.then(res => res.json())
			.then(res => {
				console.log('otp fetch function ... ')
				console.log('demo-Auth_Token: ', res);
				localStorage.setItem('demo-Auth_Token', res.AuthToken)
			})
			.then(() => {
				const token = localStorage.getItem('demo-Auth_Token');
				return fetch('https://console.gateway.senslabs.io/api/tokens/request', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
						'Authorization': 'Bearer ' + token, 
						'x-sens-api-key-id': API_KEYID,
						'x-sens-api-key': API_KEY
					}
				})
			})
			.then(res => res.json())
			.then(res => {
				console.log('refresh response: ', res);
				localStorage.setItem('demo-Access_Token', res.AccessToken)
				console.log('tokens set');
				history.push('/');
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {
				setOtp('');
				setLoading(false)
			})
		}
	}

	return (
		<div className="outer-container">
			{
				loading ? 'Loading ... ' :
				<form onSubmit={handleSubmit}>
					<input type="text" value={otp} placeholder="Enter your OTP" onChange={handleChange}/>
					<button>Verify</button>
				</form>
			}
		</div>
	)
}

export default OTP
