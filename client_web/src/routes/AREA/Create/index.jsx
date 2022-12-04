import React from "react";
import ActionCard from "../../../components/ActionCard";
import AddButton from "../../../components/AddButton";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAction,
  removeReaction,
  resetArea,
  setName,
  setTimer,
} from "../../../redux/areaSlice";
import BasicButton from "../../../components/BasicButton";
import ExitIcon from "../../Profile/ExitIcon.svg";
import axios from "axios";

export default function Create() {
  const actions = useSelector((state) => state.area.actions);
  const reactions = useSelector((state) => state.area.reactions);
  const timer = useSelector((state) => state.area.timer);
  const name = useSelector((state) => state.area.name);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitArea = () => {
    const area = {
      name: name,
      interval: timer * 1000,
      actions: actions.map((action) => ({
        id: action.actionId,
        serviceId: action.serviceId,
        param: action.param,
      })),
      reactions: reactions.map((reaction) => ({
        id: reaction.actionId,
        serviceId: reaction.serviceId,
        param: reaction.param,
      })),
    };

    axios
      .post("/areas", area)
      .then((res) => {
        dispatch(resetArea());
        navigate("/home");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="area-create-page-container">
      <div className="home-header">
        <div className="home-title-container">
          <span className="home-title-text">Create an AREA</span>
          <hr className="home-title-line" size="4" color="#4461F2" />
        </div>
        <Link to="/">
          <img className="home-header-profile-icon" src={ExitIcon} alt="Exit" />
        </Link>
      </div>
      <div className="area-create-container">
        <div className="area-actions-container-wrapper">
          <div className="area-actions-name-interval-container">
            <div className="area-actions-container name">
              <span className="area-actions-title">Name</span>
              <input
                className="login-input"
                placeholder="AREA Name"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                autoComplete="off"
                style={{ textAlign: "center" }}
              />
            </div>
            <div className="area-actions-container interval">
              <span className="area-actions-title">Interval</span>
              <input
                className="area-interval-slider"
                type="range"
                min="5"
                max="500"
                step="1"
                value={timer}
                onChange={(e) => dispatch(setTimer(e.target.value))}
              />
              <span className="area-interval-value">{timer} seconds</span>
            </div>
          </div>
          <div className="area-actions-container actions">
            <span className="area-actions-title">Actions</span>
            {actions.map((action, index) => (
              <ActionCard
                action={action}
                key={index}
                color={action.color}
                logo={action.logo}
                onClick={() =>
                  dispatch(removeAction([action.id, action.serviceId]))
                }
                params={action.param}
              />
            ))}

            <Link to={"action/services"} className="add-action-button">
              <AddButton />
            </Link>
          </div>
          <div className="area-actions-container reactions">
            <span className="area-actions-title">Reactions</span>
            {reactions.map((action, index) => (
              <ActionCard
                action={action}
                key={index}
                color={action.color}
                logo={action.logo}
                onClick={() =>
                  dispatch(removeReaction([action.id, action.serviceId]))
                }
                params={action.param}
              />
            ))}
            <Link to={"reaction/services"} className="add-action-button">
              <AddButton />
            </Link>
          </div>
        </div>
        <div className="area-create-button-container">
          <BasicButton title={"AREA"} onClick={submitArea} />
        </div>
      </div>
    </div>
  );
}
