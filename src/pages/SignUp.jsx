import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/api/auth";
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

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log(id);
    console.log(password);
    console.log(nickname);

    if (id.length < 4 || id.length > 10) {
      alert("id는 4~10글자 이내로 입력해주세요.");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      alert("비밀번호는 4~16자로 입력해주세요.");
      return;
    }
    if (nickname.length < 1 || nickname.length > 10) {
      alert("닉네임은 1~10자로 입력해주세요.");
      return;
    }

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });
    if (response) {
      alert("회원가입이 완료되었습니다.");
      navigate("/sign_in");
    }
  };

  return (
    <Container>
      <Title>회원가입 페이지다!</Title>
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
      <InputGroup>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handleRegister}>회원가입</Button>
        <Button onClick={() => navigate("/sign_in")}>돌아가기</Button>
      </ButtonGroup>
    </Container>
  );
};

export default SignUp;
