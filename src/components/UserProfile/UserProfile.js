import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';

export const UserProfile = () => {
  const profileItems = useSelector((store) => store.user.items) // changed from store.user.profile
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)
  const username = useSelector((store) => store.user.username)
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate, username]);

  console.log(accessToken)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    fetch(API_URL(`users/${username}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          dispatch(user.actions.setError(null))
          dispatch(user.actions.setItems(data.response))
        } else {
          dispatch(user.actions.setError(data.response))
          dispatch(user.actions.setItems([]))
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(user.actions.setError('Error retrieving user profile'))
        dispatch(user.actions.setItems([]))
      })
  }, [accessToken, dispatch, username])

  // console.log(profileItems)

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setItems(null))
    dispatch(user.actions.setError(null))
  }

  return (
    <>
      {username ? <h2>{username.toUpperCase()}&apos;s profile</h2> : ''}
      <h1>Welcome to your profile, {username}</h1>
      {console.log(profileItems, 'profile items')}
      {profileItems && (
        <div>
          {/* <h2>{username.toUpperCase()}&apos;s profile</h2> */}
          <p>First name: {profileItems.firstName}</p>
          <p>Last name: {profileItems.lastName}</p>
          <p>Email address: {profileItems.emailAddress}</p>
          <p>Member since: {profileItems.memberSince}</p>
          <p>Gender: {profileItems.gender}</p>
          <p>Birthday: {profileItems.birthday}</p>
          <p>Interests: {profileItems.interests}</p>
          <p>Current City: {profileItems.currentCity}</p>
          <p>Home Country: {profileItems.homeCountry}</p>
          <p>Languages: {profileItems.languages}</p>
        </div>
      )}
      <button type="button" onClick={onLogoutButtonClick}>
        LOG OUT
      </button>
    </>
  );
};

/* return (
    <>
      <h1>Welcome to your profile</h1>
      {userProfile.map((profile) => (
        // eslint-disable-next-line no-underscore-dangle
        <div key={profile._id}>
          <h2>{profile.username.toUpperCase()}&apos profile</h2>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <p>Gender: {profile.gender}</p>
          <p>Birthday: {profile.birthday}</p>
          <p>Interests: {profile.interests}</p>
          <p>Current City: {profile.currentCity}</p>
          <p>Home Country: {profile.homeCountry}</p>
          <p>Languages: {profile.languages}</p>
        </div>
      ))}
      {username ? (<h2>{username.toUpperCase()}&apos profile</h2>) : ''}
      <button type="button" onClick={onLogoutButtonClick}>LOG OUT</button>
    </>
  )
} */