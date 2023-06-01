import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
// import { UserEvents } from 'components/UserEvents/UserEvents';

export const AllUsers = () => {
  const profileItems = useSelector((store) => store.user.items) // changed from store.user.profile
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)
  // const username = useSelector((store) => store.user.username)
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    };

    fetch(API_URL('users'), options)
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
        dispatch(user.actions.setError('Error retrieving users'))
        dispatch(user.actions.setItems([]));
      })
  }, [accessToken, dispatch]);

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setItems(null))
    dispatch(user.actions.setError(null))
  }

  return (
    <>
      <h1>Here you can see all other users</h1>
      {profileItems && (
        // Only render if userProfile is not null or undefined
        profileItems.map((profile) => ( // changed from profile
          // eslint-disable-next-line no-underscore-dangle
          <div key={profile._id}>
            {console.log(profile)}
            <h2>{profile.username.toUpperCase()}&apos;s profile</h2>
            <p>First name: {profile.firstName}</p>
            <p>Last name: {profile.lastName}</p>
            <p>Email address: {profile.emailAddress}</p>
            <p>Member since: {profile.memberSince}</p>
            <p>Gender: {profile.gender}</p>
            <p>Birthday: {profile.birthday}</p>
            <p>Interests: {profile.interests}</p>
            <p>Current City: {profile.currentCity}</p>
            <p>Home Country: {profile.homeCountry}</p>
            <p>Languages: {profile.languages}</p>
          </div>
        ))
      )}
      {/* {username ? <h2>{username.toUpperCase()}&apos;s profile</h2> : ''} */}

      <button type="button" onClick={onLogoutButtonClick}>
        LOG OUT
      </button>
    </>
  );
};

