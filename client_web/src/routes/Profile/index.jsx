import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import ExitIcon from "./ExitIcon.svg";
import ServiceCard from "../../components/ServiceCard";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/authSlice";
import BasicButton from "../../components/BasicButton";
import { setAuthToken } from "../../api/setAuthToken";
import axios from "axios";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

const Profile = () => {
  const [services, setLocalServices] = useState([]);
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

  useEffect(() => {
    axios
      .get("/service")
      .then((res) => {
        setLocalServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          localStorage.removeItem("token");
          navigate("/login");
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
      <div className="profile-container">
        <div className="home-header">
          <div className="home-title-container">
            <span className="home-title-text">My Profile</span>
            <hr className="home-title-line" size="4" color="#4461F2" />
          </div>
          <Link to="/home">
            <img
              className="home-header-profile-icon"
              src={ExitIcon}
              alt="Exit"
            />
          </Link>
        </div>
        <div className="profile-info">
          <BasicButton
            title="Sign out"
            onClick={signOut}
            style={{ margin: "20px" }}
          />
        </div>
        <div className="profile-body">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              login
              handleReload={handleReload}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Profile;
