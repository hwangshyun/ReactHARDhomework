import { useState } from "react";
import styled from "styled-components";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";

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

export default function Profile({ user, setUser }) {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    console.log(nickname);
    console.log(avatar);

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    }
  };

  return (
    <Container>
      <Title>프로필 수정 페이지</Title>
      <InputGroup>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          placeholder="닉네임"
          minLength="1"
          maxLength="10"
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="avatar">아바타 이미지</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={handleUpdateProfile}>프로필 업데이트</Button>
        <Button onClick={() => navigate("/")}>취소</Button>
      </ButtonGroup>
    </Container>
  );
}
