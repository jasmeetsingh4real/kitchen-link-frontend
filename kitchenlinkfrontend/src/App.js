import { Outlet } from "react-router-dom";
import "./App.css";
import { HomePage } from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Outlet/>
    </div>
  );
}

export default App;
