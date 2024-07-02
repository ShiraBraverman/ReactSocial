import React, { useState } from 'react';

const SignUp = ({ setPlayersArray }) => {
    const [userName, setUserName] = useState('');
    const [veriftPassword, setVeriftPassword] = useState('');
    const [password, setPassword] = useState('');
    const [signUpError, setSignUpError] = useState('');
    function handleRegistration() {
        if (!userName || !veriftPassword || !password) {
            setSignUpError('Please fill in all fields.');
            return;
        }

        const url = `http://localhost:3000/users?username=${userName}`;
        let foundUser;
        fetch(url)
            .then(res => res.json())
            .then(user => {
                foundUser = user[0];
                if (foundUser != null) {
                   
                    console.log(user);
                    setSignUpError('User exists, please logIn');
                }
                else {
                    const url = 'http://localhost:3000/users';
                    const newUser = {
                        userName: userName,
                        website: password
                    };
                    const requestOptions = {
                        method: 'POST',
                        body: JSON.stringify(newUser),
                    };
                    fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.id);       // גישה ל-id של המשתמש החדש
                            console.log(data.userName); //  גישה ל-userName של המשתמש החדש
                            console.log(data.website);   // גישה ל-website של המשתמש החדש
                            localStorage.setItem(userName, JSON.stringify(data));
                            setSignUpError('User created successfully');
                            setVeriftPassword("");
                            setUserName("");
                            setPassword("");
                        })
                        .catch(error => {
                            setSignUpError('Error creating user');
                        });
                }
            })

    }



    return (
        <div >
            <h2 className="title">Create Account</h2><br />
            <input type="text" className='input' value={userName} placeholder="userName" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="password" className='input' value={veriftPassword} placeholder="verift-password" onChange={(e) => setVeriftPassword(e.target.value)} /><br />
            <button className="btnOkSignUp" onClick={handleRegistration}>Connect</button><br />
            {signUpError && <p className='error' style={{ color: signUpError == "Registration successful" ? 'green' : "red" }}>{signUpError}</p>}
        </div>
    )
};

export default SignUp;