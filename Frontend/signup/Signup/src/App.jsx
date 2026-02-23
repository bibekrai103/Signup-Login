import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "login" : "signup";

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setMessage(data.message);

    setFormData({
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      className="bg-green-400 p-10 rounded-2xl  "
      style={{ textAlign: "center", marginTop: "80px" }}
    >
      <h2 className="mb-5 text-2xl font-bold">
        {isLogin ? "Login" : "Signup"}
      </h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              className="bg-white text-gray-900 p-3 w-80 rounded-2xl"
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <br /> <br />
            <input
              className="bg-white text-gray-900 p-3 w-80 rounded-2xl"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <br />
            <br />
          </>
        )}

        <input
          className="bg-white text-gray-900 p-3 w-80 rounded-2xl"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          className="bg-white text-gray-900 p-3 w-80 rounded-2xl"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {!isLogin && (
          <>
            <input
              className="bg-white text-gray-900 p-3 w-80 rounded-2xl"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <br /> <br />
          </>
        )}

        <button
          className="cursor-pointer border-2 p-2 w-30 rounded-2xl "
          type="submit"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        {isLogin ? "Don't have an account? " : "Already Have an account"}

        <span
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
      <h4>{message}</h4>
    </div>
  );
}
export default AuthPage;
