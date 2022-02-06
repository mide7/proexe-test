import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import {
  setAllUsers,
  setAllUsersError,
  setAllUsersLoading,
} from "./features/users";

import Dashboard from "./pages/Dashboard";
import EditUser from "./pages/Form/EditUser";
import FormPage from "./pages/Form/Index";
import CreateUser from "./pages/Form/NewUser";
import { base_url } from "./utils/constants";

function App() {
  const dispatch = useDispatch();

  async function fetchUsersList() {
    dispatch(setAllUsersLoading(true));
    try {
      const res = await fetch(base_url);
      const data = await res.json();
      dispatch(setAllUsers(data));
    } catch (error: any) {
      dispatch(setAllUsersError(error.message));
    } finally {
      dispatch(setAllUsersLoading(false));
    }
  }

  useEffect(() => {
    fetchUsersList();
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="form" element={<FormPage />}>
          <Route path="new" element={<CreateUser />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
