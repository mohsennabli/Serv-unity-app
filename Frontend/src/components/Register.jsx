import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function RegistrationForm () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const fetchData = () => {
    fetch('http://localhost:8081/user')
        .then(res => res.json())
        .catch(err => console.log(err));
  };

  const insertRow = (e) => {
    e.preventDefault(); 
    if (password !== confirmPassword) {
      setPasswordMatchError(true); 
      return; 
    }
    setPasswordMatchError(false); 
    fetch('http://localhost:8081/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
    })
    .then(() => fetchData())
    .catch(err => console.log(err));
    alert("You are registered successfully");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledRegistrationForm onSubmit={insertRow}>
      <Label>
        Name:
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Label>
      <Label>
        Email:
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Label>
      <Label>
        Password:
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Label>
      <Label>
        Confirm Password:
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {passwordMatchError && <ErrorText>Passwords do not match</ErrorText>}
      </Label>
      <Label>
        Role:
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="consumer">Consumer</option>
          <option value="owner">Service Owner</option>
        </Select>
      </Label>
      <Button type="submit" >Register</Button>
    </StyledRegistrationForm>
  );
};

const StyledRegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  margin-top: 5px;
  width: 210px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  color: white;
  background-color: #255387;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #134a89;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;