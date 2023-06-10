/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';

export const AllUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  // const currentuser = useSelector((store) => store.user.currentUserUsername)
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      // console.log('start page:', currentuser)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatDateWithSuffix = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setCurrentUserUsername(null))
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setItems(null))
    dispatch(user.actions.setError(null))
  }

  const onViewUserButtonClick = (username) => {
    navigate(`/users/${username}`)
    dispatch(user.actions.setUsername(username))
  }

  return (
    <>
      <h2>Here you can see all other users</h2>
      {loading && <p>Loading...</p>}
      <section>
        {userList.map((eachUser) => {
          return (
            <div key={eachUser._id}>
              <p>Username: {eachUser.username}</p>
              <p>First Name: {eachUser.firstName}</p>
              <p>Last name: {eachUser.lastName}</p>
              <p>Email address: {eachUser.emailAddress}</p>
              <p>Member since: {formatDateWithSuffix(new Date(eachUser.memberSince))}</p>
              <p>Gender: {eachUser.gender}</p>
              <p>Birthday: {formatDateWithSuffix(new Date(eachUser.birthday))}</p>
              <p>Interests: {eachUser.interests}</p>
              <p>Current City: {eachUser.currentCity}</p>
              <p>Home Country: {eachUser.homeCountry}</p>
              <button type="button" onClick={() => onViewUserButtonClick(eachUser.username)}>View User Profile</button>
              <p>----------</p>
              {/* <p>Languages: {eachUser.languages}</p> */}
            </div>
          )
        })}
      </section>
      <button type="button" onClick={onLogoutButtonClick}>
        LOG OUT
      </button>
    </>
  );
};

