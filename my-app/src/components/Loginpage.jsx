import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.7); /* Darken the video for better text contrast */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-width: 350px;
  width: 90%;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  color: #333;
  font-size: 24px;
  font-weight: bold;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/emails', { email: username });
      navigate('/table');
    } catch (error) {
      console.error('Error saving email:', error);
    }
  };

  return (
    <Container>
      <VideoBackground autoPlay loop muted>
        <source src={require('./background2.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Form onSubmit={handleLogin}>
        <Title>SKYLARK PORTAL</Title>
        <Input 
          type="text" 
          placeholder="Email" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
