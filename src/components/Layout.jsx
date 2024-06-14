import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../lib/api/auth";
import { useEffect } from "react";
import styled from "styled-components";

const Navbar = styled.div`
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  color: #fff;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #555;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const UserName = styled.div`
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background-color: #ff4444;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
  }
`;

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/sign_in");
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <Outlet />
    </>
  );
}
