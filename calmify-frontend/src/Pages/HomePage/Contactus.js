import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@chakra-ui/react';

const Contactus = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageVisible(true);
  };

  return (
    <>
      <ContactFormContainer>
        <Header>Contact Us</Header>
        <Form id="contact-us" onSubmit={handleSubmit}>
          <LeftContainer>
            <Input type="text" name="name" required placeholder="Name" />
            <Input type="email" name="mail" required placeholder="Email" />
            <Input type="text" name="subject" required placeholder="Subject" />
          </LeftContainer>
          <RightContainer>
            <Textarea name="message" placeholder="Message" />
          </RightContainer>
        </Form>
        <SubmitButton type="submit">Send Message</SubmitButton>

        <MessageBox visible={messageVisible}>
          <strong>Thank You!</strong> Your email has been delivered.
        </MessageBox>
      </ContactFormContainer>
    </>
  );
};

export default Contactus;

const ContactFormContainer = styled.div`
  padding: 40px 20px;
  background-color: #f7f7f7;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Header = styled(Text)`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightContainer = styled.div`
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;

  &:hover, &:focus {
    border-color: #a8cc9c;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;

  &:hover, &:focus {
    border-color: #a8cc9c;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #a8cc9c;
  color: white;
  padding: 15px 30px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  display: block;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(131, 172, 131);
  }
`;

const MessageBox = styled.div`
  background-color: #f0f8f1;
  padding: 15px;
  margin-top: 20px;
  border-radius: 5px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.5s;
  text-align: center;
  font-size: 16px;
  color: #3a7a3a;
  height: ${props => (props.visible ? 'auto' : '0')};
`;
