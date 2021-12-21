import React from 'react'

function Register() {
    return (
      <div className="login">
        <div className="login-wrapper">
          <form>
            <div>
              <label htmlFor="password">Password </label>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div>
              <label htmlFor="username">Username </label>
              <input type="username" name="username" id="username" />
            </div>
            <div>
              <label htmlFor="phone">Phone </label>
              <input type="phone" name="phone" id="phone" />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Register
