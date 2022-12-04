import React, { useEffect } from "react";
import TabTitle from "../../../components/TabTitle";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import BackButton from "../../../components/BackButton";
import ServiceCard from "../../../components/ServiceCard";
import axios from "axios";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

export default function Services() {
  const [services, setLocalServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
  }, []);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return (
      <>
        <BackButton to="/create" />
        <div className="area-create-services-wrapper">
          <TabTitle title="Services" />
          <div className="area-create-services-container">
            {services.map((service) => (
              <Link
                to={service.name}
                key={service.id}
                style={{ textDecoration: "none" }}
              >
                <ServiceCard service={service} />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}
