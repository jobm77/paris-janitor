import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './../styles/Login.css'; 

interface LoginProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Identifiant ou mot de passe incorrect');
      }

      const data = await response.json();
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      
      navigate('/properties'); 

    } catch (error) {
      setError((error as Error).message);
      localStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    }
  };

  const handleCreateAccount = () => { 
    navigate('/register');
  }

  return (
    <div className="login-container">
      <div className="form">
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Identifiant</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <button onClick={handleCreateAccount} className='create-account-button'>Créer un compte</button>
      </div>
    </div>
  );
};

export default Login;