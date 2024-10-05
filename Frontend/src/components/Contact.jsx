import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:8081/contact`)
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(err => console.log(err));
  };

  const insertRow = () => {
    fetch('http://localhost:8081/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,phone,address,email,description}),
    })
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      phone,
      address,
      email,
      description
    });
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setPhone('');
    setAddress('');
    setEmail('');
    setDescription('');
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      <ContactInfo>
        <ContactItem>Email: contact@servunity.com</ContactItem>
        <ContactItem>Phone: +216 58 596 697</ContactItem>
      </ContactInfo>
      <Card>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label>Name:</Label><br/>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </FormField>
          <FormField>
            <Label>Phone Number:</Label><br/>
            <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </FormField>
          <FormField>
            <Label>Address:</Label><br/>
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </FormField>
          <FormField>
            <Label>Email:</Label><br/>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormField>
          <FormField>
            <Label>Description:</Label><br/>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </FormField>
          <SubmitButton type="submit" onClick={insertRow}>Submit</SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  
  border-radius: 8px;
  margin-top: -50px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: white;  /* White color */
  font-size: 32px;  /* Larger font size */
  font-weight: bold;  /* Bold font weight */
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.p`
  font-size: 18px;
  color: white;  /* White color */
  text-shadow: 1px 1px 2px black;  /* Text shadow for better readability */
`;

const Card = styled.div`
  background-color: #f5f5f547;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  
  width: 50%;
  margin-left: 185px; 
  background-color: #255387;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
`;

export default Contact;
