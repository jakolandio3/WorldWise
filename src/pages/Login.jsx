import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jakob@example.com');
	const [password, setPassword] = useState('dads');
	const navigate = useNavigate();
	const { isAuthenticated, login } = useAuth();

	function onLogin(e) {
		e.preventDefault();

		if (email && password) login(email, password);
		if (!email || !password) alert('Please enter a valid Email and Password');
	}

	useEffect(() => {
		if (isAuthenticated === false) return;
		navigate('/app', { replace: true });
	}, [isAuthenticated, navigate]);

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={onLogin}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						placeholder='Please enter Email...'
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						placeholder='Please enter Password...'
					/>
				</div>

				<div>
					<Button type={'primary'}>Login</Button>
				</div>
			</form>
		</main>
	);
}
