import React, { useState, useEffect } from 'react'
import {useHistory, Link} from 'react-router-dom';
import {API_KEY, API_KEYID} from './apiKeys';

function Users() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const history = useHistory();

	useEffect(() => {
		if(!localStorage.getItem('demo-Access_Token')) {
      history.push('/login');
		} 
		getUsers();
	}, [])

	function getUsers(){
		setLoading(true);

		fetch('https://console.gateway.senslabs.io/api/users/list?matcher=DEFAULT', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-sens-api-key-id': API_KEYID,
        'x-sens-api-key': API_KEY,
        'Authorization': localStorage.getItem('demo-Access_Token'), 
      }     
    })
    .then(res => res.json())
    .then(res => {
      const filteredUsers = res.filter(user => new Date(user.DateOfBirth).getYear() > 70) //only for this demo
      // console.log('filteredUsers: ', filteredUsers);
      setUsers(filteredUsers);
    })
    .catch(console.log)
    .then(() => {
      setLoading(false);
    })
	}

	const row_style = {
		backgroundColor: 'lightblue',
		width: '50vw',
		margin: '.25em',
		padding: '.25em',
		textDecoration: 'none',
		borderRadius: '.25em'
	}

	const link_style = {
		backgroundColor: 'aqua',
		width: '10em',
		textDecoration: 'none',
		color: 'black'
	}

	function generateRows(user){
		return users.map(user => {
			const firstName = user.Auth.FirstName;
			const lastName = user.Auth.LastName;
			const userId = user.UserId;

			return (<div className="" key={user.UserId} style={row_style}>
				<Link to={`/graph/${userId}`} target="_blank" style={link_style}>
					<div className="user-row">
						<span>{firstName} {lastName}</span>
					</div>
				</Link>
			</div>)
		})
	}

	useEffect(() => {
		if(users.length){
			console.log('users: ', users[0])
		}
	}, [users])

	return (
		<div className="outer-container">
			{ loading ? 'Loading ... ' : users.length ? generateRows(users) : 'awaiting ... ' }
		</div>
	)
}

export default Users
