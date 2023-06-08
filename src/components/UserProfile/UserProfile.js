import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import countryList from 'country-list';

// To check email uniqueness
// const checkEmailUniqueness = (email) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email })
//   };

//   return fetch(API_URL('check-email-availability'), options)
//     .then((res) => res.json())
//     .then((data) => {
//       return data.available;
//     })
//     .catch((error) => {
//       console.log(error);
//       return false;
//     });
// }

export const UserProfile = () => {
  const profileItems = useSelector((store) => store.user.items) // changed from store.user.profile
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)
  const username = useSelector((store) => store.user.username)
  const navigate = useNavigate()
  const [validationErrors, setValidationErrors] = useState('')
  const countries = countryList.getNames();
  console.log(countries);

  const validationRules = [
    { fieldName: 'firstName',
      validationFunction: (value) => {
        const MIN_FIRSTNAME_LENGTH = 2;
        const MAX_FIRSTNAME_LENGTH = 20;
        if (value.length < MIN_FIRSTNAME_LENGTH || value.length > MAX_FIRSTNAME_LENGTH) {
          console.log('First name must be between 2 and 20 characters.')
          return 'First name must be between 2 and 20 characters.'
        }
        return '';
      },
      errorMessage: 'Invalid first name' },
    { fieldName: 'lastName',
      validationFunction: (value) => {
        const MIN_LASTNAME_LENGTH = 2;
        const MAX_LASTNAME_LENGTH = 20;
        if (value.length < MIN_LASTNAME_LENGTH || value.length > MAX_LASTNAME_LENGTH) {
          console.log('Last name must be between 2 and 20 characters.')
          return 'Last name must be between 2 and 20 characters.'
        }
        return '';
      },
      errorMessage: 'Invalid last name' },
    { fieldName: 'emailAddress',
      validationFunction: (value) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(value)) {
          console.log('Invalid email format')
          return 'Invalid email format';
        }
        // const isEmailUnique = checkEmailUniqueness(value);
        // if (!isEmailUnique) {
        //   console.log('Email address already exists');
        //   return 'Email address already exists';
        // }
        return '';
      },
      errorMessage: 'Invalid email' },
    { fieldName: 'gender',
      validationFunction: (value) => {
        if (value === 'Select your gender') {
          return 'Please select a gender';
        }
        return '';
      },
      errorMessage: 'No gender selected' },
    { fieldName: 'interests',
      validationFunction: (value) => {
        if (value === 'Select an interest') {
          return 'Please select an interest';
        }
        return '';
      },
      errorMessage: 'No interest selected' },
    { fieldName: 'homeCountry',
      validationFunction: (value) => {
        // if (value === 'Select a country') {
        if (!value) {
          return 'Please select your home country';
        }
        return '';
      },
      errorMessage: 'No home country selected' }
  ];

  // for profile updating

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    // memberSince: new Date().toLocaleDateString('en-US', {
    //   day: 'numeric',
    //   month: 'long',
    //   year: 'numeric'
    // }),
    gender: 'Select your gender',
    birthday: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    interests: 'Select an interest',
    currentCity: '',
    homeCountry: 'Select a country'
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
            gender: gender || 'Select your gender',
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
      const newValidationErrors = {};
      validationRules.forEach((rule) => {
        const { fieldName, validationFunction } = rule;
        const fieldValue = updatedProfile[fieldName];
        const errorMessage = validationFunction(fieldValue);

        // if (fieldName === 'emailAddress') {
        //   // Check email availability
        //   fetch(API_URL('check-email-availability'), {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ emailAddress: fieldValue })
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       if (!data.available) {
        //         newValidationErrors[fieldName] = 'Email address is already taken';
        //       }
        //     })
        //     .catch((error) => console.log(error));
        // }

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
          console.log(data);
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

  // const handleSaveProfileClick = () => {
  //   if (isEditing) {
  //     const newValidationErrors = {};
  //     validationRules.forEach((rule) => {
  //       const { fieldName, validationFunction } = rule;
  //       const fieldValue = updatedProfile[fieldName];
  //       const errorMessage = validationFunction(fieldValue);

  //       if (errorMessage) {
  //         newValidationErrors[fieldName] = errorMessage;
  //       }
  //     });

  //     if (Object.keys(newValidationErrors).length > 0) {
  //       setValidationErrors(newValidationErrors);
  //       return;
  //     }
  //     setValidationErrors('');

  //     const options = {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: accessToken
  //       },
  //       body: JSON.stringify(updatedProfile)
  //     }
  //     fetch(API_URL(`users/${username}/update`), options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.success) {
  //           dispatch(user.actions.setError(null));
  //           dispatch(user.actions.setItems(data.response));
  //           setIsEditing(false);
  //         } else {
  //           dispatch(user.actions.setError(data.response))
  //           dispatch(user.actions.setItems(null))
  //         }
  //       })
  //       .catch((error) => console.log(error))
  //   }
  // }

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
            <select
              name="gender"
              value={updatedProfile.gender}
              onChange={handleInputChange}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
            <br />
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
            <select
              name="interests"
              value={updatedProfile.interests}
              onChange={handleInputChange}>
              <option value="">Select an interest</option>
              <option value="Category One">Category One</option>
              <option value="Category Two">Category Two</option>
              <option value="Category Three">Category Three</option>
              <option value="Category Four">Category Four</option>
              <option value="Category Five">Category Five</option>
            </select>
            <br />
          </label>
          <label htmlFor="Current city:">
            Current City:
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
            <select
              name="homeCountry"
              value={updatedProfile.homeCountry}
              onChange={handleInputChange}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <br />
            {/* <label htmlFor="Languages:">
            Languages:
              <input
                type="text"
                name="languages"
                value={updatedProfile.languages}
                onChange={handleInputChange} /><br />
            </label> */}
          </label>
          <button type="button" onClick={() => handleSaveProfileClick()}>Save changes</button>
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
      {validationErrors.firstName && <p>{validationErrors.firstName}</p>}
      {validationErrors.lastName && <p>{validationErrors.lastName}</p>}
      {validationErrors.emailAddress && <p>{validationErrors.emailAddress}</p>}
      {validationErrors.gender && <p>{validationErrors.gender}</p>}
      {validationErrors.interests && <p>{validationErrors.interests}</p>}
      {validationErrors.homeCountry && <p>{validationErrors.homeCountry}</p>}

    </>
  )
};

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { API_URL } from 'utils/urls';
// import { user } from 'reducers/user';
// import countryList from 'country-list';

// // To check email uniqueness
// const checkEmailUniqueness = (email) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email })
//   };

//   return fetch(API_URL('check-email-availability'), options)
//     .then((res) => res.json())
//     .then((data) => {
//       return data.available;
//     })
//     .catch((error) => {
//       console.log(error);
//       return false;
//     });
// }

// export const UserProfile = () => {
//   const profileItems = useSelector((store) => store.user.items)
// changed from store.user.profile
//   const dispatch = useDispatch()
//   const accessToken = useSelector((store) => store.user.accessToken)
//   const username = useSelector((store) => store.user.username)
//   const navigate = useNavigate()
//   const [validationErrors, setValidationErrors] = useState({})
//   // const [countries, setCountries] = useState([]);
//   const countries = countryList.getNames();
//   console.log(countries);

//   // useEffect(() => {
//   //   const fetchCountryNames = async () => {
//   //     try {
//   //       const names = await countryList.getNames();
//   //       setCountries(names);
//   //     } catch (error) {
//   //       console.error('Failed to fetch country names:', error);
//   //     }
//   //   };

//   //   fetchCountryNames();
//   // }, []);

//   const validationRules = [
//     { fieldName: 'firstName',
//       validationFunction: (value) => {
//         const MIN_FIRSTNAME_LENGTH = 2;
//         const MAX_FIRSTNAME_LENGTH = 20;
//         if (value.length < MIN_FIRSTNAME_LENGTH || value.length > MAX_FIRSTNAME_LENGTH) {
//           console.log('First name must be between 2 and 20 characters.')
//           return 'First name must be between 2 and 20 characters.'
//         }
//         return '';
//       },
//       errorMessage: 'Invalid first name' },
//     { fieldName: 'lastName',
//       validationFunction: (value) => {
//         const MIN_LASTNAME_LENGTH = 2;
//         const MAX_LASTNAME_LENGTH = 20;
//         if (value.length < MIN_LASTNAME_LENGTH || value.length > MAX_LASTNAME_LENGTH) {
//           console.log('Last name must be between 2 and 20 characters.')
//           return 'Last name must be between 2 and 20 characters.'
//         }
//         return '';
//       },
//       errorMessage: 'Invalid last name' },
//     { fieldName: 'emailAddress',
//       validationFunction: async (value) => {
//         const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//         if (!emailRegex.test(value)) {
//           console.log('Invalid email format')
//           return 'Invalid email format';
//         }
//         const isEmailUnique = await checkEmailUniqueness(value);
//         if (!isEmailUnique) {
//           console.log('Email address already exists');
//           return 'Email address already exists';
//         }
//         return '';
//       },
//       errorMessage: 'Invalid email' },
//     { fieldName: 'gender',
//       validationFunction: (value) => {
//         if (value === 'Select your gender') {
//           return 'Please select a gender';
//         }
//         return '';
//       },
//       errorMessage: 'No gender selected' },
//     { fieldName: 'interests',
//       validationFunction: (value) => {
//         if (value === 'Select an interest') {
//           return 'Please select an interest';
//         }
//         return '';
//       },
//       errorMessage: 'No interest selected' },
//     { fieldName: 'homeCountry',
//       validationFunction: (value) => {
//         if (value === 'Select a country') {
//           return 'Please select your home country';
//         }
//         return '';
//       },
//       errorMessage: 'No home country selected' }
//   ];

//   // for profile updating

//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedProfile, setUpdatedProfile] = useState({
//     firstName: '',
//     lastName: '',
//     emailAddress: '',
//     // memberSince: new Date().toLocaleDateString('en-US', {
//     //   day: 'numeric',
//     //   month: 'long',
//     //   year: 'numeric'
//     // }),
//     gender: 'Select your gender',
//     birthday: new Date().toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     }),
//     interests: 'Select an interest',
//     currentCity: '',
//     homeCountry: 'Select a country'
//     // languages: ''
//   })

//   //

//   useEffect(() => {
//     if (!accessToken) {
//       navigate('/login')
//     }
//   }, [accessToken, navigate, username]);

//   console.log(accessToken)

//   useEffect(() => {
//     const options = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: accessToken
//       }
//     }

//     fetch(API_URL(`users/${username}`), options)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         if (data.success) {
//           dispatch(user.actions.setError(null))
//           dispatch(user.actions.setItems(data.response))

//           const {
//             firstName,
//             lastName,
//             emailAddress,
//             memberSince,
//             gender,
//             birthday,
//             interests,
//             currentCity,
//             homeCountry
//             // languages
//           } = data.response

//           setUpdatedProfile({
//             firstName: firstName || '',
//             lastName: lastName || '',
//             emailAddress: emailAddress || '',
//             memberSince: memberSince || new Date().toLocaleDateString('en-US', {
//               day: 'numeric',
//               month: 'long',
//               year: 'numeric'
//             }),
//             gender: gender || 'Select your gender',
//             birthday: birthday || '',
//             interests: interests || '',
//             currentCity: currentCity || '',
//             homeCountry: homeCountry || ''
//             // languages: languages || ''
//           });
//         } else {
//           dispatch(user.actions.setError(data.response))
//           dispatch(user.actions.setItems([]))
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(user.actions.setError('Error retrieving user profile'))
//         dispatch(user.actions.setItems([]))
//       })
//   }, [accessToken, dispatch, username])

//   // console.log(profileItems)

//   const onLogoutButtonClick = () => {
//     dispatch(user.actions.setAccessToken(null))
//     dispatch(user.actions.setUsername(null))
//     dispatch(user.actions.setItems(null))
//     dispatch(user.actions.setError(null))
//   }

//   // for profile updating

//   const handleEditProfileClick = () => {
//     setIsEditing(true);
//   }

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   // setUpdatedProfile((prevState) => ({ ...prevState,
//   //   [name]: value,
//   // }))

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setUpdatedProfile((prevState) => {
//       // eslint-disable-next-line prefer-object-spread
//       const updatedState = Object.assign({}, prevState);
//       updatedState[name] = value;
//       return updatedState;
//     });
//   };

//   // fetch to check email address
//   // fetch to update profile in the .then
//   // const handleSaveProfileClick = () => {
//   //   if (isEditing) {
//   //     const newValidationErrors = {};
//   //     validationRules.forEach((rule) => {
//   //       const { fieldName, validationFunction } = rule;
//   //       const fieldValue = updatedProfile[fieldName];
//   //       const errorMessage = validationFunction(fieldValue);

//   //       if (errorMessage) {
//   //         newValidationErrors[fieldName] = errorMessage;
//   //       }
//   //     });

//   //     if (Object.keys(newValidationErrors).length > 0) {
//   //       setValidationErrors(newValidationErrors);
//   //       return;
//   //     }
//   //     setValidationErrors('');

//   //     const options = {
//   //       method: 'PATCH',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         Authorization: accessToken
//   //       },
//   //       body: JSON.stringify(updatedProfile)
//   //     }
//   //     fetch(API_URL(`users/${username}/update`), options)
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         console.log(data);
//   //         if (data.success) {
//   //           dispatch(user.actions.setError(null));
//   //           dispatch(user.actions.setItems(data.response));
//   //           setIsEditing(false);
//   //         } else {
//   //           dispatch(user.actions.setError(data.response))
//   //           dispatch(user.actions.setItems(null))
//   //         }
//   //       })
//   //       .catch((error) => console.log(error))
//   //   }
//   // }

//   const handleSaveProfileClick = () => {
//     if (isEditing) {
//       const newValidationErrors = {};
//       validationRules.forEach((rule) => {
//         const { fieldName, validationFunction } = rule;
//         const fieldValue = updatedProfile[fieldName];
//         const errorMessage = validationFunction(fieldValue);

//         if (errorMessage) {
//           newValidationErrors[fieldName] = errorMessage;
//         }
//       });

//       if (Object.keys(newValidationErrors).length > 0) {
//         setValidationErrors(newValidationErrors);
//         return;
//       }
//       setValidationErrors('');

//       // First fetch to check user availability
//       const checkAvailabilityOptions = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: accessToken
//         }
//       };

//       fetch(API_URL(`users/${username}/check-availability`), checkAvailabilityOptions)
//         .then((res) => res.json())
//         .then((availabilityData) => {
//           if (availabilityData.available) {
//             // Second fetch to perform the PATCH request
//             const updateOptions = {
//               method: 'PATCH',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: accessToken
//               },
//               body: JSON.stringify(updatedProfile)
//             };

//             return fetch(API_URL(`users/${username}/update`), updateOptions);
//           } else {
//             throw new Error('Username not available');
//           }
//         })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           if (data.success) {
//             dispatch(user.actions.setError(null));
//             dispatch(user.actions.setItems(data.response));
//             setIsEditing(false);
//           } else {
//             dispatch(user.actions.setError(data.response));
//             dispatch(user.actions.setItems(null));
//           }
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   return (
//     <>
//       {username ? <h2>{username.toUpperCase()}&apos;s profile</h2> : ''}
//       <h1>Welcome to your profile, {username}</h1>
//       {console.log(profileItems, 'profile items')}

//       {isEditing ? (
//         // render the form fields for editing
//         <div>
//           <label htmlFor="First name:">
//             First name:
//             <input
//               type="text"
//               name="firstName"
//               value={updatedProfile.firstName}
//               onChange={handleInputChange} /><br />
//           </label>
//           <label htmlFor="Last name:">
//             Last name:
//             <input
//               type="text"
//               name="lastName"
//               value={updatedProfile.lastName}
//               onChange={handleInputChange} /><br />
//           </label>
//           <label htmlFor="Email address:">
//             Email address:
//             <input
//               type="text"
//               name="emailAddress"
//               value={updatedProfile.emailAddress}
//               onChange={handleInputChange} /><br />
//           </label>
//           <label htmlFor="Gender:">
//             Gender:
//             <select
//               name="gender"
//               value={updatedProfile.gender}
//               onChange={handleInputChange}>
//               <option value="">Select your gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//               <option value="prefer not to say">Prefer not to say</option>
//             </select>
//             <br />
//           </label>
//           <label htmlFor="Birthday:">
//             Birthday:
//             <input
//               type="text"
//               name="birthday"
//               value={updatedProfile.birthday}
//               onChange={handleInputChange} /><br />
//           </label>
//           <label htmlFor="Interests:">
//             Interests:
//             <select
//               name="interests"
//               value={updatedProfile.interests}
//               onChange={handleInputChange}>
//               <option value="">Select an interest</option>
//               <option value="Category One">Category One</option>
//               <option value="Category Two">Category Two</option>
//               <option value="Category Three">Category Three</option>
//               <option value="Category Four">Category Four</option>
//               <option value="Category Five">Category Five</option>
//             </select>
//             <br />
//           </label>
//           <label htmlFor="Current city:">
//             Current City:
//             <select
//               name="currentCity"
//               value={updatedProfile.currentCity}
//               onChange={handleInputChange}>
//               <option value="">Select your current city</option>
//               <option value="Stockholm">Stockholm</option>
//               <option value="London">London</option>
//               <option value="Paris">Paris</option>
//             </select>
//             <br />
//           </label>
//           <label htmlFor="Home country:">
//             Home Country:
//             <select
//               name="homeCountry"
//               value={updatedProfile.homeCountry}
//               onChange={handleInputChange}>
//               <option value="">Select a country</option>
//               {countries.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//             <br />
//             {/* <label htmlFor="Languages:">
//             Languages:
//               <input
//                 type="text"
//                 name="languages"
//                 value={updatedProfile.languages}
//                 onChange={handleInputChange} /><br />
//             </label> */}
//           </label>
//           <button type="button" onClick={() => handleSaveProfileClick()}>Save changes</button>
//         </div>
//       ) : (
//         // render the static profile information
//         <div>
//           {profileItems && (
//             <>
//               {/* <h2>{username.toUpperCase()}&apos;s profile</h2> */}
//               <p>First name: {profileItems.firstName}</p>
//               <p>Last name: {profileItems.lastName}</p>
//               <p>Email address: {profileItems.emailAddress}</p>
//               <p>Member since: {new Date(profileItems.memberSince).toLocaleDateString('en-US', {
//                 day: 'numeric',
//                 month: 'long',
//                 year: 'numeric'
//               })}
//               </p>
//               <p>Gender: {profileItems.gender}</p>
//               <p>Birthday: {profileItems.birthday}</p>
//               <p>Interests: {profileItems.interests}</p>
//               <p>Current City: {profileItems.currentCity}</p>
//               <p>Home Country: {profileItems.homeCountry}</p>
//               {/* <p>Languages: {profileItems.languages}</p> */}
//               <button type="button" onClick={handleEditProfileClick}>Edit Profile</button>
//             </>
//           )}
//         </div>
//       )}
//       <button type="button" onClick={onLogoutButtonClick}>
//         LOG OUT
//       </button>
//       {validationErrors.firstName && <p>{validationErrors.firstName}</p>}
//       {validationErrors.lastName && <p>{validationErrors.lastName}</p>}
//       {validationErrors.emailAddress && <p>{validationErrors.emailAddress}</p>}
//       {validationErrors.gender && <p>{validationErrors.gender}</p>}
//       {validationErrors.interests && <p>{validationErrors.interests}</p>}
//       {validationErrors.homeCountry && <p>{validationErrors.homeCountry}</p>}

//     </>
//   )
// };