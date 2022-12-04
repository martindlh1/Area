import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../api/setAuthToken";
import DeleteButton from "../../components/DeleteButton";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { logOut } from "../../redux/authSlice";
import "./index.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReload = () => {
    setReload(true);
  };

  const signOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    setAuthToken();
    navigate("/login");
  };

  const deleteUser = (id) => {
    axios
      .delete(`/admin/users/${id}`)
      .then((res) => {
        handleReload();
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/home");
        }
        setLoading(false);
        setError(true);
        console.log(err);
      });
    setReload(false);
  }, [reload]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return (
      <div className="admin-container">
        <div className="home-header">
          <div className="home-title-container">
            <span className="home-title-text">Admin</span>
            <hr className="home-title-line" size="4" color="#4461F2" />
          </div>
          <span className="admin-logout" onClick={signOut}>
            Log out
          </span>
        </div>
        <div className="admin-body">
          {users.map((user) => (
            <div className="admin-user-card">
              {user.username}
              <DeleteButton onClick={() => deleteUser(user._id)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Admin;
