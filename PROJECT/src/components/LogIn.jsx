import React, { useState, useEffect } from 'react';
const logIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    function handleLogin() {
        if (!userName || !password) {
            setLoginError('Please fill in all fields.');
            return;
        }
        let foundUser;
        const url = `http://localhost:3000/users?username=${userName}`;
        fetch(url)
            .then(res => res.json())
            .then(user => {
                console.log(...user)
                foundUser = user[0];
                console.log(foundUser)

                if (!foundUser) {
                    setLoginError("You are not exist in the system, please sign up");
                }
                else {
                    if (foundUser.website == password) {
                        localStorage.setItem("currentUser", JSON.stringify(foundUser));
                        setUserName("");
                        setPassword("");
                        setLoginError('Registration successful');
                    }
                    else {
                        setLoginError("no currect password")
                    }
                }
            })

    };
    return (
        <div >
            <h2 className="title">Log in</h2><br />
            <input type="userName" className='input' value={userName} placeholder="userName" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
        </div>
    );
}
export default logIn