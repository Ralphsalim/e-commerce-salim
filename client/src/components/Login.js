import React from "react";

function Login() {
  return (
    <div className="login">
      <div className="login-text">Login</div>
      <div className="login-form">
        <form>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
