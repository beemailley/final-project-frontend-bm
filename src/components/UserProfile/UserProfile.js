/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls'
import { user } from 'reducers/user';
import countryList from 'country-list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CardContainer } from 'components/GlobalStyles'
import { Button } from '../Button/Button.styles';
import { ProfileName, Profile, EditProfile, Label, EditButtonContainer, SaveButtonContainer, ValidationContainer, ReturnRequest, CountrySelect } from './UserProfile.styles'

export const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const profileItems = useSelector((store) => store.user.items)
  const username = useSelector((store) => store.user.username)
  const currentuser = JSON.parse(localStorage.getItem('currentUserUsername'))
  const [validationErrors, setValidationErrors] = useState('')
  const countries = countryList.getNames();
  // for profile updating
  const [isEditing, setIsEditing] = useState(false);
  const [allowedToEdit, setAllowedToEdit] = useState(false)
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    gender: 'Select your gender',
    birthday: new Date(),
    interests: 'Select an interest',
    currentCity: '',
    homeCountry: 'Select a country'
  })

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, currentuser]);

  const validationRules = [
    { fieldName: 'firstName',
      validationFunction: (value) => {
        const MIN_FIRSTNAME_LENGTH = 2;
        const MAX_FIRSTNAME_LENGTH = 20;
        if (value.length < MIN_FIRSTNAME_LENGTH || value.length > MAX_FIRSTNAME_LENGTH) {
          return 'First name is between 2 and 20 characters.'
        }
        return '';
      },
      errorMessage: 'Invalid first name' },
    { fieldName: 'lastName',
      validationFunction: (value) => {
        const MIN_LASTNAME_LENGTH = 2;
        const MAX_LASTNAME_LENGTH = 20;
        if (value.length < MIN_LASTNAME_LENGTH || value.length > MAX_LASTNAME_LENGTH) {
          return 'Last name is between 2 and 20 characters.'
        }
        return '';
      },
      errorMessage: 'Invalid last name' },
    { fieldName: 'emailAddress',
      validationFunction: (value) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(value)) {
          return 'You use a valid email format.';
        }
        return '';
      },
      errorMessage: 'Invalid email' },
    { fieldName: 'gender',
      validationFunction: (value) => {
        if (value === 'Select your gender') {
          return 'You have selected your gender.';
        }
        return '';
      },
      errorMessage: 'No gender selected' },
    { fieldName: 'interests',
      validationFunction: (value) => {
        if (value === 'Select an interest') {
          return 'You have selected an interest.';
        }
        return '';
      },
      errorMessage: 'No interest selected' },
    { fieldName: 'homeCountry',
      validationFunction: (value) => {
        if (!value) {
          return 'You have selected your home country.';
        }
        return '';
      },
      errorMessage: 'No home country selected' }
  ];

  useEffect(() => {
    const handleEditPermissions = () => {
      if (profileItems) {
        if (username === currentuser) {
          setAllowedToEdit(true)
        }
      } else {
        setAllowedToEdit(false)
      }
    }
    handleEditPermissions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileItems])

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
          } = data.response

          setUpdatedProfile({
            firstName: firstName || '',
            lastName: lastName || '',
            emailAddress: emailAddress || '',
            memberSince: memberSince || new Date(),
            gender: gender || 'Select your gender',
            birthday: new Date(birthday) || new Date(),
            interests: interests || '',
            currentCity: currentCity || '',
            homeCountry: homeCountry || ''
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, username])

  // for profile updating
  const handleEditProfileClick = () => {
    setIsEditing(true);
  }

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setUpdatedProfile((prevState) => {
        // eslint-disable-next-line prefer-object-spread
        const updatedState = Object.assign({}, prevState);
        updatedState[name] = value;
        return updatedState;
      });
    } else if (e) {
      setUpdatedProfile((prevState) => {
        // eslint-disable-next-line prefer-object-spread
        const updatedState = Object.assign({}, prevState);
        updatedState.birthday = e;
        return updatedState;
      });
    }
  }

  const handleSaveProfileClick = (e) => {
    e.preventDefault()

    if (isEditing) {
      const newValidationErrors = {};
      validationRules.forEach((rule) => {
        const { fieldName, validationFunction } = rule;
        const fieldValue = updatedProfile[fieldName];
        const errorMessage = validationFunction(fieldValue);

        if (errorMessage) {
          newValidationErrors[fieldName] = errorMessage;
        }
      });

      if (Object.keys(newValidationErrors).length > 0) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors('');

      // Rest of the code to save the profile
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify(updatedProfile)
      };
      fetch(API_URL(`users/${username}/update`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(user.actions.setError(null));
            dispatch(user.actions.setItems(data.response));
            setIsEditing(false);
          } else {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setItems(null));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const onBackButtonClick = () => {
    dispatch(user.actions.setUsername(currentuser))
    dispatch(user.actions.setItems(null))
    dispatch(user.actions.setError(null))
    navigate('/users')
  }

  return (
    <>
      {username ? <ProfileName>{username}&apos;s Profile</ProfileName> : ''}
      {/* render the static profile information */}
      <CardContainer>
        {!isEditing && profileItems && profileItems.username && (
          <Profile>
            <p><Label htmlFor="firstName">First name: </Label>{profileItems.firstName}</p>
            {allowedToEdit && <p><Label htmlFor="lastName">Last name: </Label>{profileItems.lastName}</p>}
            {allowedToEdit && <p><Label htmlFor="emailAddress">Email address: </Label>{profileItems.emailAddress}</p>}
            <p><Label htmlFor="memberSince">Member since: </Label>{new Date(profileItems.memberSince).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            </p>
            <p><Label htmlFor="gender">Gender: </Label>{profileItems.gender}</p>
            {allowedToEdit && (
              <p><Label htmlFor="birthday">Birthday: </Label>{new Date(profileItems.birthday).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              </p>
            )}
            <p><Label htmlFor="interests">Interests: </Label>{profileItems.interests}</p>
            <p><Label htmlFor="currentCity">Current city: </Label>{profileItems.currentCity}</p>
            <p><Label htmlFor="homeCountry">Home country: </Label>{profileItems.homeCountry}</p>
          </Profile>
        )}
      </CardContainer>

      <CardContainer>
        {isEditing && (
        // render the form fields for editing
          <EditProfile onSubmit={handleSaveProfileClick}>
            <label htmlFor="First name:">
            First name:
              <br />
              <input
                type="text"
                name="firstName"
                value={updatedProfile.firstName}
                onChange={handleInputChange} /><br />
            </label>
            <label htmlFor="Last name:">
            Last name:
              <br />
              <input
                type="text"
                name="lastName"
                value={updatedProfile.lastName}
                onChange={handleInputChange} /><br />
            </label>
            <label htmlFor="Email address:">
            Email address:
              <br />
              <input
                type="text"
                name="emailAddress"
                value={updatedProfile.emailAddress}
                onChange={handleInputChange} /><br />
            </label>
            <label htmlFor="Gender:">
            Gender:
              <br />
              <select
                name="gender"
                value={updatedProfile.gender}
                onChange={handleInputChange}>
                <option value="">Select your gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select>
              <br />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="birthday">
            When is your birthday?
              <br />
              <DatePicker
                id="birthday"
                name="birthday"
                selected={updatedProfile.birthday}
                onChange={handleInputChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" />
            </label>
            <label htmlFor="Interests:">
            I am most interested in events for/about:
              <br />
              <select
                name="interests"
                value={updatedProfile.interests}
                onChange={handleInputChange}>
                <option value="">Select an interest</option>
                <option value="Animal Lovers">Animal Lovers</option>
                <option value="Arts & Music">Arts & Music</option>
                <option value="Books">Books</option>
                <option value="Career">Career</option>
                <option value="Community">Community</option>
                <option value="Families">Families</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Games">Games</option>
                <option value="Health">Health</option>
                <option value="LGBTQ+">LGBTQ+</option>
                <option value="Out in the City">Out in the City</option>
                <option value="Parents">Parents</option>
                <option value="Spirituality">Spirituality</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
              </select>
              <br />
            </label>
            <label htmlFor="Current city:">
            Current City:
              <br />
              <select
                name="currentCity"
                value={updatedProfile.currentCity}
                onChange={handleInputChange}>
                <option value="">Select your current city</option>
                <option value="Stockholm">Stockholm</option>
                <option value="London">London</option>
                <option value="Paris">Paris</option>
              </select>
              <br />
            </label>
            <label htmlFor="Home country:">
              Home Country:
              <br />
              <CountrySelect
                name="homeCountry"
                value={updatedProfile.homeCountry}
                onChange={handleInputChange}>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </CountrySelect>
            </label>
            <br />
            <ValidationContainer>
              {allowedToEdit && validationErrors && Object.keys(validationErrors).length > 0 && (
                <h3>Please ensure:</h3>
              )}
              {validationErrors.firstName && <p>{validationErrors.firstName}</p>}
              {validationErrors.lastName && <p>{validationErrors.lastName}</p>}
              {validationErrors.emailAddress && <p>{validationErrors.emailAddress}</p>}
              {validationErrors.gender && <p>{validationErrors.gender}</p>}
              {validationErrors.interests && <p>{validationErrors.interests}</p>}
              {validationErrors.homeCountry && <p>{validationErrors.homeCountry}</p>}
            </ValidationContainer>
            <SaveButtonContainer><Button type="submit">Save</Button></SaveButtonContainer>
          </EditProfile>
        )}
      </CardContainer>

      {!username && (<ReturnRequest>Please return to the All Users page.</ReturnRequest>)}

      <EditButtonContainer>
        <Button type="button" onClick={onBackButtonClick}>Back</Button>
        {allowedToEdit && !isEditing && (<Button type="button" onClick={handleEditProfileClick}>Edit</Button>)}
      </EditButtonContainer>

    </>
  )
};

