import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './userLoginIcon.style.css';

const UserLoginIcon = () => {
	const auth = useSelector((state) => state.auth);
	const [charA, setCharA] = useState();
	const [charB, setCharB] = useState();

	useEffect(() => {
		setCharA(auth.firstName.charAt(0).toUpperCase());
		setCharB(auth.lastName.charAt(0).toUpperCase());
	}, [auth.firstName, auth.lastName]);

	return <div className="user-login-icon">{`${charA}.${charB}`}</div>;
};

export default UserLoginIcon;
