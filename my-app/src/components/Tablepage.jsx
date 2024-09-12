import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.5);
`;

const Table = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;

  &.edit {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }

  &.save {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const EditInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 80%;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`;

const TablePage = () => {
  const [emails, setEmails] = useState([]);
  const [editEmailId, setEditEmailId] = useState(null);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/emails');
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/emails/${id}`);
      fetchEmails();
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const handleEdit = (id, email) => {
    setEditEmailId(id);
    setNewEmail(email);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/emails/${id}`, { email: newEmail });
      setEditEmailId(null);
      setNewEmail('');
      fetchEmails();
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted>
        <source src={require('./background1.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <Title>SKYLARK DATABASE</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>SI.no</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={email._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {editEmailId === email._id ? (
                  <EditInput
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                ) : (
                  email.email
                )}
              </TableCell>
              <TableCell>
                {editEmailId === email._id ? (
                  <Button className="save" onClick={() => handleSaveEdit(email._id)}>Save</Button>
                ) : (
                  <Button className="edit" onClick={() => handleEdit(email._id, email.email)}>Edit</Button>
                )}
                <Button className="delete" onClick={() => handleDelete(email._id)}>Delete</Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TablePage;
