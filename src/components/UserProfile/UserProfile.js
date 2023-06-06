import React, { useEffect, useState } from 'react';
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

  // for profile updating
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: '',
    lastName: '',
    // memberSince: new Date().toLocaleDateString('en-US', {
    //   day: 'numeric',
    //   month: 'long',
    //   year: 'numeric'
    // }),
    gender: 'prefer not to say',
    birthday: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    interests: '',
    currentCity: '',
    homeCountry: ''
    // languages: ''
  })

  //

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

          const {
            firstName,
            lastName,
            emailAddress,
            memberSince,
            gender,
            birthday,
            interests,
            currentCity,
            homeCountry
            // languages
          } = data.response

          setUpdatedProfile({
            firstName: firstName || '',
            lastName: lastName || '',
            emailAddress: emailAddress || '',
            memberSince: memberSince || new Date().toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            gender: gender || 'prefer not to say',
            birthday: birthday || '',
            interests: interests || '',
            currentCity: currentCity || '',
            homeCountry: homeCountry || ''
            // languages: languages || ''
          });
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

  // for profile updating

  const handleEditProfileClick = () => {
    setIsEditing(true);
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  // setUpdatedProfile((prevState) => ({ ...prevState,
  //   [name]: value,
  // }))

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedProfile((prevState) => {
      // eslint-disable-next-line prefer-object-spread
      const updatedState = Object.assign({}, prevState);
      updatedState[name] = value;
      return updatedState;
    });
  };

  const handleSaveProfileClick = () => {
    if (isEditing) {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify(updatedProfile)
      }
      fetch(API_URL(`users/${username}/update`), options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            dispatch(user.actions.setError(null));
            dispatch(user.actions.setItems(data.response));
            setIsEditing(false);
          } else {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setItems(null))
          }
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <>
      {username ? <h2>{username.toUpperCase()}&apos;s profile</h2> : ''}
      <h1>Welcome to your profile, {username}</h1>
      {console.log(profileItems, 'profile items')}

      {isEditing ? (
        // render the form fields for editing
        <div>
          <label htmlFor="First name:">
            First name:
            <input
              type="text"
              name="firstName"
              value={updatedProfile.firstName}
              onChange={handleInputChange} /><br />
          </label>
          <label htmlFor="Last name:">
            Last name:
            <input
              type="text"
              name="lastName"
              value={updatedProfile.lastName}
              onChange={handleInputChange} /><br />
          </label>
          <label htmlFor="Email address:">
            Email address:
            <input
              type="text"
              name="emailAddress"
              value={updatedProfile.emailAddress}
              onChange={handleInputChange} /><br />
          </label>
          <label htmlFor="Gender:">
            Gender:
            <input
              type="text"
              name="gender"
              value={updatedProfile.gender}
              onChange={handleInputChange} /><br />
          </label>
          <label htmlFor="Birthday:">
            Birthday:
            <input
              type="text"
              name="birthday"
              value={updatedProfile.birthday}
              onChange={handleInputChange} /><br />
          </label>
          <label htmlFor="Interests:">
            Interests:
            <input
              type="text"
              name="interests"
              value={updatedProfile.interests}
              onChange={handleInputChange} /><br />
          </label>
          <label htmlFor="Current city:">
            Current City:
            <input
              type="text"
              name="currentCity"
              value={updatedProfile.currentCity}
              onChange={handleInputChange} />
            {/* <label htmlFor="Languages:">
            Languages:
              <input
                type="text"
                name="languages"
                value={updatedProfile.languages}
                onChange={handleInputChange} /><br />
            </label> */}
          </label>
          <button type="button" onClick={handleSaveProfileClick}>Save changes</button>
        </div>
      ) : (
        // render the static profile information
        <div>
          {profileItems && (
            <>
              {/* <h2>{username.toUpperCase()}&apos;s profile</h2> */}
              <p>First name: {profileItems.firstName}</p>
              <p>Last name: {profileItems.lastName}</p>
              <p>Email address: {profileItems.emailAddress}</p>
              <p>Member since: {new Date(profileItems.memberSince).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              </p>
              <p>Gender: {profileItems.gender}</p>
              <p>Birthday: {profileItems.birthday}</p>
              <p>Interests: {profileItems.interests}</p>
              <p>Current City: {profileItems.currentCity}</p>
              <p>Home Country: {profileItems.homeCountry}</p>
              {/* <p>Languages: {profileItems.languages}</p> */}
              <button type="button" onClick={handleEditProfileClick}>Edit Profile</button>
            </>
          )}
        </div>
      )}
      <button type="button" onClick={onLogoutButtonClick}>
        LOG OUT
      </button>
    </>
  )
};