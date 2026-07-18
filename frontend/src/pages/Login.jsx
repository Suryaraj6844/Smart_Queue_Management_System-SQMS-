import { useState } from "react";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/login", {
        email,
        password,
      });


      console.log(response.data);


      localStorage.setItem(
        "token",
        response.data.token
      );


      alert("Login successful");


    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message || 
        "Login failed"
      );

    }

  };


  return (

    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>


        <form onSubmit={handleLogin}>


          <div className="mb-4">

            <label>
              Email
            </label>

            <input
              type="email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>



          <div className="mb-4">

            <label>
              Password
            </label>

            <input
              type="password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>



          <button
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Login
          </button>


        </form>

      </div>

    </div>

  );
}


export default Login;