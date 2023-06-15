/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import { CardContainer } from 'components/GlobalStyles';
import { Button } from '../Button/Button.styles';
import { AllUsersTitle, User, Label, ButtonContainer, Arrow } from './AllUsers.styles'

export const AllUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accessToken) {
      console.log('second use effect:', accessToken)
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      };

      fetch(API_URL('users'), options)
        .then((response) => response.json())
        .then((data) => setUserList(data.response))
        .catch((error) => console.log(error))
        .finally(() => { setLoading(false) })
    } else {
      alert('Please log in')
    }
  }, [accessToken])

  const onViewUserButtonClick = (username) => {
    navigate(`/users/${username}`)
    dispatch(user.actions.setUsername(username))
  }

  return (
    <>
      <AllUsersTitle>Meet your people!</AllUsersTitle>
      {loading && <p>Loading...</p>}
      <CardContainer>
        {userList.map((eachUser) => {
          return (
            <User key={eachUser._id}>
              <p><Label htmlFor="username">Username: </Label>{eachUser.username}</p>
              <p><Label htmlFor="firstName">First name: </Label>{eachUser.firstName}</p>
              <p><Label htmlFor="interests">Interests: </Label>{eachUser.interests}</p>
              <p><Label htmlFor="currentCity">Current city: </Label>{eachUser.currentCity}</p>
              <ButtonContainer>
                <Arrow />
                <Button type="button" onClick={() => onViewUserButtonClick(eachUser.username)}>View</Button>
              </ButtonContainer>
            </User>
          )
        })}
      </CardContainer>
    </>
  );
};

