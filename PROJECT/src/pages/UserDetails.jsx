import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const UserDetails = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [UseDetailsError, setUseDetailsError] = useState('');
    const [userDetails, setUserDetails] = useState(
        {
            name: '',
            email: "",
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: ""
                }
            },
            phone: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: ""
            }
        });

    const handleChange = (field, value) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userDetails.name || !userDetails.address.city || !userDetails.address.street || !userDetails.address.suite || !userDetails.address.zipcode || !userDetails.address.geo.lat || !userDetails.address.geo.lng || !userDetails.company.name || !userDetails.company.catchPhrase || !userDetails.company.bs || !userDetails.phone) {
            setUseDetailsError('Please fill in all fields.');
            return;
        }
        if (!ValidateEmail(userDetails.email)) {
            setUseDetailsError("You have entered an invalid email address!");
            return;
        }

        const url = 'http://localhost:3000/users';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...userDetails,
                username: user.username,
                website: user.website
            })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                const userToLS = { ...data };
                delete userToLS.website;
                localStorage.setItem('currentUser', JSON.stringify(userToLS));
                setUser(data);
                setUseDetailsError('User created successfully');
                navigate('/home');
            })
            .catch(error => {
                setUseDetailsError('Error creating user');
            });
    };
    function ValidateEmail(mailAdress) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailAdress.match(mailformat)) {
            return true;
        } else {

            return false;
        }
    }
    return (
        <div>
            {user != null ?
                <div className='form'>
                    <h2 className="title">User Details</h2><br />
                    <input type="text" className='input' value={user.username} readOnly /><br />
                    <input type="text" className='input' value={user.website} readOnly /><br />
                    <input type="text" className='input' placeholder="name" value={userDetails.name} onChange={(e) => handleChange('name', e.target.value)} /><br />
                    <input type="email" className='input' placeholder="email" value={userDetails.email} onChange={(e) => handleChange('email', e.target.value)} /><br />
                    <input type="text" className='input' placeholder="street" value={userDetails.address.street} onChange={(e) => handleChange('address', { ...userDetails.address, street: e.target.value })} /><br />
                    <input type="text" className='input' placeholder="suite" value={userDetails.address.suite} onChange={(e) => handleChange('address', { ...userDetails.address, suite: e.target.value })} /><br />
                    <input type="text" className='input' placeholder="city" value={userDetails.address.city} onChange={(e) => handleChange('address', { ...userDetails.address, city: e.target.value })} /><br />
                    <input type="text" className='input' placeholder="zipcode" value={userDetails.address.zipcode} onChange={(e) => handleChange('address', { ...userDetails.address, zipcode: e.target.value })} /><br />
                    <input type="text" className='input' placeholder="lat" value={userDetails.address.geo.lat} onChange={(e) => handleChange('address', { ...userDetails.address, geo: { ...userDetails.address.geo, lat: e.target.value } })} /><br />
                    <input type="text" className='input' placeholder="lng" value={userDetails.address.geo.lng} onChange={(e) => handleChange('address', { ...userDetails.address, geo: { ...userDetails.address.geo, lng: e.target.value } })} /><br />
                    <input type="text" className='input' placeholder="name" value={userDetails.company.name} onChange={(e) => handleChange('company', { ...userDetails.company, name: e.target.value })} /><br />
                    <input type="text" className='input' placeholder="catchPhrase" value={userDetails.company.catchPhrase} onChange={(e) => handleChange('company', { ...userDetails.company, catchPhrase: e.target.value })} /><br />
                    <input type="text" className='input' placeholder="bs" value={userDetails.company.bs} onChange={(e) => handleChange('company', { ...userDetails.company, bs: e.target.value })} /><br />
                    <input type="tel" className='input' placeholder="phone" value={userDetails.phone} onInput={(e) => { const value = e.currentTarget.value.replace(/\D/g, ''); handleChange('phone', value); }} /><br />
                    <button className="btnSaveDetails" onClick={handleSubmit}>Save</button><br />
                    {UseDetailsError && <p className='error' style={{ color: UseDetailsError == "The details have been filled in successfully" ? 'green' : "red" }}>{UseDetailsError}</p>}
                </div>
                : <div></div>
            }
        </div>
    );
}

export default UserDetails
