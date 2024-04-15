import { Outlet } from "react-router-dom";
import "./App.css";
import { HomePage } from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";



function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
