import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@chakra-ui/react';

const ContactFormContainer = styled.div`
  padding: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.075);
  margin-bottom: 25px;
  color: #727272;
  font-size: 13px;
  transition: all 0.4s;

  &:hover {
    border: 1px solid #8bc3a3;
  }

  &:focus {
    color: white;
    outline: none;
    border: 1px solid #8bc3a3;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  height: 200px;
  max-height: 200px;
  max-width: 100%;
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.075);
  color: #727272;
  font-size: 13px;
  transition: all 0.4s;

  &:hover {
    border: 1px solid #8bc3a3;
  }

  &:focus {
    color: white;
    outline: none;
    border: 1px solid #8bc3a3;
  }
`;

const SubmitButton = styled.button`
  background-color: #a8cc9c;
  color: white;
  padding: 15px 25px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  margin-top: 20px;
  gap: 10px;
  width: 200px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(131, 172, 131);
  }
`;

const MessageBox = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.7s;
  margin: 25px auto 0;
  opacity: ${props => (props.visible ? 1 : 0)};
  height: ${props => (props.visible ? 'auto' : '0px')};
`;


const Contactus = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageVisible(true);
  };

  return (
    <>
    <ContactFormContainer style={{ padding: '20px' }}>
    <Text style={{ paddingTop: '40px' , fontWeight: '600' , textAlign: 'center' , paddingBottom:'20px' }}> Contact us </Text>
      <Form id="contact-us" onSubmit={handleSubmit}>
        <div style={{ flex: '1', paddingRight: '10px' }}>
          <Input type="text" name="name" required placeholder="Name" />
          <Input type="email" name="mail" required placeholder="Email" />
          <Input type="text" name="subject" required placeholder="Subject" />
        </div>
        <div style={{ flex: '1', paddingLeft: '10px' }}>
          <Textarea name="message" placeholder="Message" />
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </div>
      </Form>

      <MessageBox visible={messageVisible}>
        <strong>Thank You!</strong> Your email has been delivered.
      </MessageBox>

    </ContactFormContainer>
    </> 
  );
};

export default Contactus;
