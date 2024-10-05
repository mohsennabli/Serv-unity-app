import React, { useState, useEffect } from 'react';
import Register from "./Register";
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #f5f5f547;
`;

const StyledInput = styled.input`
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StyledSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.color};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;


export default function Login({ onLogin }) {
    const [rows, setRows] = useState([]);
    const [role, setRole] = useState('');
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:8081/user')
            .then(res => res.json())
            .then(data => setRows(data))
            .catch(err => console.log(err));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: loginName, password: loginPassword , role: role}),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log('Login successful');
                onLogin(role, loginName);
            } else {
                setLoginError('Invalid credentials');
            }
        })
        .catch(err => {
            console.log(err);
            setLoginError('Login failed');
        });
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    return (
        <StyledContainer>
            <StyledInput id='name' type="text" placeholder="Name" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
            <StyledInput type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <StyledSelect value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="consumer">Consumer</option>
                <option value="owner">Owner</option>
            </StyledSelect>
            <StyledButton color="#255387" hoverColor="#134a89" onClick={handleLogin}>Login</StyledButton>
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            <p>If you don't have an account ..</p>
            <StyledButton color="#343f36" hoverColor="#212722" onClick={toggleRegister}>Create an account</StyledButton>
            {showRegister && <Register />}
        </StyledContainer>
    );
}
