import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActionCard from "../../../components/ActionCard";
import BackButton from "../../../components/BackButton";
import BasicButton from "../../../components/BasicButton";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import TabTitle from "../../../components/TabTitle";
import { addAction, addReaction } from "../../../redux/areaSlice";
import "./index.css";

const SingleAction = ({ type }) => {
  const { serviceName } = useParams();
  const { actionId } = useParams();

  const dispatch = useDispatch();

  const [params, setParams] = useState([]);
  const [error, setError] = useState(false);

  const [service, setService] = useState({});
  const [action, setAction] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/service/${serviceName}/${type}/${actionId}`)
      .then((res) => {
        setAction(res.data);
        setParams(res.data.paramSchem.map((i) => ""));
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
  }, []);

  const setParam = (param, index) => {
    let tmp_params = params.map((i) => i);

    tmp_params[index] = param;

    setParams(tmp_params);
  };

  const checkParams = () => {
    for (const param of params) {
      if (param !== "") {
        return false;
      }
    }
    return true;
  };

  const addReduxAction = () => {
    if (checkParams() && params.length !== 0) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      type === "action"
        ? dispatch(
            addAction({
              logo: service.logo,
              color: service.color,
              actionId: action.id,
              desc: action.desc,
              serviceId: service.id,
              param: params,
            })
          )
        : dispatch(
            addReaction({
              logo: service.logo,
              color: service.color,
              actionId: action.id,
              desc: action.desc,
              serviceId: service.id,
              param: params,
            })
          );
      navigate("/create");
    }
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return (
      <div className="single-action-wrapper">
        <BackButton />
        <TabTitle title={service.title} />
        <div className="single-action-container">
          <ActionCard action={action} color={service.color} />
          <div className="single-action-cards-container">
            {action.paramSchem.map((param, index) => (
              <div
                key={index}
                className="param-card-container"
                style={{ backgroundColor: service.color }}
              >
                <span className="param-card-title">{param.desc}</span>
                <input
                  className="param-card-input"
                  type="text"
                  placeholder="Enter parameter"
                  onChange={(e) => setParam(e.target.value, index)}
                  value={params[index]}
                />
              </div>
            ))}
          </div>
          <BasicButton
            title={error ? "Error, check parameters" : "Confirm"}
            onClick={addReduxAction}
            style={{ margin: "10px" }}
          />
        </div>
      </div>
    );
  }
};

export default SingleAction;
