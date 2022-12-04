import React from "react";
import "./index.css";
import axios from "axios";

export default function ServiceCard({
  service,
  login,
  handleReload,
  actionRedirect,
}) {
  const connectService = () => {
    let callback = "http://localhost:8081/profile";

    if (actionRedirect) {
      callback = `http://localhost:8081/create/${actionRedirect}/services/${service.name}`;
    }

    window.location.href = `http://localhost:8080/service/${
      service.name
    }/auth?jwt=${localStorage.getItem("token")}&callback=${callback}`;
    handleReload();
  };

  const logoutService = () => {
    axios
      .get(`/service/${service.name}/logout`)
      .then((res) => {
        console.log(res);
        handleReload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="area-service-card-container"
      style={{ backgroundColor: service.color }}
    >
      <img
        className="area-service-card-logo"
        src={service.logo}
        alt={service.name}
      />
      <span className="area-service-card-title">{service.title}</span>
      {login && (
        <span
          className="area-service-card-login"
          onClick={service.loged ? logoutService : connectService}
        >
          {service.loged ? "Log out" : "Log in"}
        </span>
      )}
    </div>
  );
}
