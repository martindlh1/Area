import React, { useState } from "react";
import "./index.css";
import ProfileIcon from "./Profile.svg";
import AddIcon from "./AddIcon.svg";
import AreaCard from "../../components/AreaCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import BasicButton from "../../components/BasicButton";

export default function Home() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/areas")
      .then((res) => {
        setAreas(res.data);
        console.log(res.data);
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

  const askReload = () => {
    setReload(true);
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return (
      <div className="home-container">
        <div className="home-header">
          <div className="home-title-container">
            <span className="home-title-text">My AREAS</span>
            <hr className="home-title-line" size="4" color="#4461F2" />
          </div>
          <Link to="/profile">
            <img
              className="home-header-profile-icon"
              src={ProfileIcon}
              alt="Profile"
            />
          </Link>
        </div>
        <div className="home-body">
          <a href="/client.apk" className="download-apk-container">
            <BasicButton title="Download APK" style={{ background: "black" }} />
          </a>
          {areas.length === 0 ? (
            <Link className="home-first-area-container" to="/create">
              <BasicButton title="Create your first AREA" />
            </Link>
          ) : (
            <>
              {" "}
              <span className="home-body-title">
                Click on an AREA to edit it
              </span>
              <div className="home-body-areas-container">
                {areas.map((area) => (
                  <AreaCard key={area._id} area={area} onChange={askReload} />
                ))}
              </div>
            </>
          )}
        </div>
        {areas.length !== 0 && (
          <Link to="/create">
            <img className="home-header-add-icon" src={AddIcon} alt="Add" />
          </Link>
        )}
      </div>
    );
  }
}
