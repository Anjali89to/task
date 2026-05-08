import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo / Heading */}
        <div className="login-header">
         

          <h2>Welcome Back</h2>

          <p>Login to continue your task dashboard</p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button onClick={loginUser} className="login-btn">
          Login
        </button>

        {/* Register Link */}
        <p className="register-text">
          New user?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background:
            radial-gradient(circle at top left, rgba(37, 99, 235, 0.45), transparent 35%),
            linear-gradient(135deg, #020617, #0f172a 45%, #1e3a8a);
          font-family: "Times New Roman", Times, serif;
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 30px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          border: 2px solid #dbeafe;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-logo {
          width: 70px;
          height: 70px;
          margin: 0 auto 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 15px 30px rgba(37, 99, 235, 0.45);
        }

        .login-logo span {
          color: #ffffff;
          font-size: 30px;
          font-weight: 900;
        }

        .login-header h2 {
          margin: 0;
          font-size: 34px;
          font-weight: 900;
          color: #020617;
          letter-spacing: -0.5px;
        }

        .login-header p {
          margin-top: 9px;
          font-size: 15px;
          color: #64748b;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .form-group input {
          width: 100%;
          padding: 15px 16px;
          border-radius: 14px;
          border: 2px solid #cbd5e1;
          outline: none;
          font-size: 16px;
          color: #0f172a;
          background: #ffffff;
          transition: 0.3s;
          font-family: "Times New Roman", Times, serif;
        }

        .form-group input::placeholder {
          color: #94a3b8;
        }

        .form-group input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
        }

        .login-btn {
          width: 100%;
          margin-top: 8px;
          padding: 15px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          font-size: 17px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 15px 30px rgba(37, 99, 235, 0.35);
          font-family: "Times New Roman", Times, serif;
        }

        .login-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-2px);
        }

        .register-text {
          margin-top: 24px;
          text-align: center;
          font-size: 15px;
          color: #64748b;
          font-weight: 600;
        }

        .register-text span {
          color: #2563eb;
          font-weight: 900;
          cursor: pointer;
        }

        .register-text span:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 22px;
            border-radius: 20px;
          }

          .login-header h2 {
            font-size: 30px;
          }

          .login-logo {
            width: 62px;
            height: 62px;
          }

          .login-logo span {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;