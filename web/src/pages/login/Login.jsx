import React, { useState } from 'react';
import './login.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authReducer';
import { useLoginMutation } from '../../api/authApiSlice';

function Login() {
  const notify = (error) => toast(error);
  const dispatch = useDispatch()
  const [login] = useLoginMutation()
  const [userIdUnsanitized, setUsername] = useState("");
  const [passwordUnsanitized, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      if (userIdUnsanitized && passwordUnsanitized) {
        // Queries are parameterised in the backend; extra 'sanitizing' corrupted passwords
        const userId = userIdUnsanitized;
        const password = passwordUnsanitized;
        const response = await login({ userId, password }).unwrap()
        
        // Handle the response properly - assuming it returns { accessToken, user }
        const { accessToken, user } = response
        if (!user || Number(user.isAdmin) !== 1) {
          notify('Nur Administratoren haben Zugriff auf das Panel.');
          return;
        }
        dispatch(loginSuccess({ user: user || userId, token: accessToken }))
        
        setUsername('')
        setPassword('')
      } else {
        notify('Bitte alle Felder ausfüllen!');
      }
    } catch (err) {
      if (!err.status) {
        notify('Keine Antwort vom Server');
      } else if (err.status === 400) {
        notify('Benutzername oder Passwort fehlt');
      } else if (err.status === 401) {
        notify('Benutzername oder Passwort falsch');
      } else if (err.status === 403) {
        notify('Benutzer deaktiviert');
      } else {
        notify(err.data?.message);
      }
    }
  }

  return (
    <div className="login">
      <img src='/snackki_logo3.png' style={{width:"150px"}} alt='logo' />
      <br/>
      <form onSubmit={handleLogin} className="form">
        <label>
          Benutzername:
          <input type="number" required value={userIdUnsanitized} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Passwort:
          <input type="password" required value={passwordUnsanitized} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br/>
        <button type="submit" className="button" >Anmelden</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;