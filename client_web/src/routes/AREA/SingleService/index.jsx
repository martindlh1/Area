import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActionCard from "../../../components/ActionCard";
import BackButton from "../../../components/BackButton";
import BasicCard from "../../../components/BasicCard";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import ServiceCard from "../../../components/ServiceCard";
import TabTitle from "../../../components/TabTitle";
import "./index.css";

export default function SingleService({ type }) {
  const { serviceName } = useParams();
  const [service, setService] = useState({});
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const handleReload = () => {
    setReload(true);
  };

  const focusError = () => {
    setNeedLogin(true);
    setTimeout(() => setNeedLogin(false), 500);
  };

  useEffect(() => {
    axios
      .get(`/service/${serviceName}/${type}`)
      .then((res) => {
        setActions(res.data);
        axios
          .get(`/service/${serviceName}`)
          .then((res) => {
            setService(res.data);
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
    if (type === "action") {
      return (
        <div className="single-action-wrapper">
          <BackButton to={`/create/${type}/services`} />
          <TabTitle title={service.title} />
          <div className="single-service-container">
            {!service.loged && (
              <BasicCard
                color={needLogin ? "red" : service.color}
                title="Please login to service to get access to actions"
              />
            )}
            <ServiceCard
              service={service}
              login
              actionRedirect={type}
              handleReload={handleReload}
            />
            {actions.map((action, index) => (
              <Link
                {...(service.loged
                  ? { to: action.id.toString() }
                  : { onClick: focusError })}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <ActionCard action={action} color={service.color} />
              </Link>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <BackButton to={`/create/${type}/services`} />
          <TabTitle title={service.title} />
          <div className="single-service-container">
            {!service.loged && (
              <BasicCard
                color={needLogin ? "red" : service.color}
                title="Please login to service to get access to actions"
              />
            )}
            <ServiceCard
              service={service}
              login
              actionRedirect={type}
              handleReload={handleReload}
            />
            {actions.map((action, index) => (
              <Link
                {...(service.loged
                  ? { to: action.id.toString() }
                  : { onClick: focusError })}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <ActionCard action={action} color={service.color} />
              </Link>
            ))}
          </div>
        </>
      );
    }
  }
}
