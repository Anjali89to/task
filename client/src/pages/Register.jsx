import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", form);

      alert("Register successful");

      // 👉 login page pe bhejo
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Register failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <div className="register-logo">
            <span>R</span>
          </div>

          <h2>Create Account</h2>

          <p>Register to start managing your tasks</p>
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Button */}
        <button onClick={registerUser} className="register-btn">
          Register
        </button>

        {/* Login Link */}
        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .register-page {
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

        .register-card {
          width: 100%;
          max-width: 430px;
          background: #ffffff;
          border-radius: 24px;
          padding: 34px 30px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          border: 2px solid #dbeafe;
        }

        .register-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .register-logo {
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

        .register-logo span {
          color: #ffffff;
          font-size: 30px;
          font-weight: 900;
          font-family: "Times New Roman", Times, serif;
        }

        .register-header h2 {
          margin: 0;
          font-size: 34px;
          font-weight: 900;
          color: #020617;
          letter-spacing: -0.5px;
        }

        .register-header p {
          margin-top: 9px;
          font-size: 15px;
          color: #64748b;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 18px;
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

        .register-btn {
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

        .register-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-2px);
        }

        .login-text {
          margin-top: 24px;
          text-align: center;
          font-size: 15px;
          color: #64748b;
          font-weight: 600;
        }

        .login-text span {
          color: #2563eb;
          font-weight: 900;
          cursor: pointer;
        }

        .login-text span:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 28px 22px;
            border-radius: 20px;
          }

          .register-header h2 {
            font-size: 30px;
          }

          .register-logo {
            width: 62px;
            height: 62px;
          }

          .register-logo span {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;