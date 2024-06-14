import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";
import styled from "styled-components";

const Container = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #444;
  color: white;

  &::placeholder {
    color: #ccc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff0000;
  }
`;

const Signin = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { userId, nickname, avatar } = await login({
      id: id,
      password: password,
    });
    alert("로그인 되었습니다 😁");
    setUser({ userId, nickname, avatar });
    navigate("/");
  };

  return (
    <Container>
      <Title>로그인 페이지다</Title>
      <InputGroup>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력하세요."
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handleSignIn}>로그인</Button>
        <Button onClick={() => navigate("/sign_up")}>회원가입</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Signin;
