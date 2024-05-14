import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/authSlice.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const userData = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_DOMIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      console.log(dataRes);

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      // console.log(userData);
    } else {
      alert("Please fill out required field");
    }
  };

  console.log(userData);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full mx-w-sm bg-white m-auto flex  flex-col p-2 max-w-md">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto ">
          <img
            src="https://miro.medium.com/v2/resize:fit:800/1*xcTPFKvsB-ZpMDhAqD5EPw.gif"
            className="w-full"
          />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className=" w-full bg-slate-200 border-none outline-none "
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-center text-2xl py-1 mt-1 rounded-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-2">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="text-red-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
