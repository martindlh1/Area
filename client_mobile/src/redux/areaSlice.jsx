import { createSlice, current } from "@reduxjs/toolkit";

function containsAction(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (
      list[i].actionId === obj.actionId &&
      list[i].serviceId === obj.serviceId
    ) {
      return true;
    }
  }
  return false;
}

export const areaSlice = createSlice({
  name: "area",
  initialState: {
    reload: false,
    name: "",
    actions: [],
    reactions: [],
    services: null,
    timer: 5,
    apiServices: null,
  },
  reducers: {
    addAction: (state, action) => {
      if (!containsAction(action.payload, current(state.actions))) {
        state.actions.push(action.payload);
      }
    },
    removeAction: (state, action) => {
      state.actions.splice(
        state.actions.findIndex(
          (stateAction) =>
            stateAction.id === action.payload[0] &&
            stateAction.serviceId === action.payload[1]
        ),
        1
      );
    },
    addReaction: (state, action) => {
      if (!containsAction(action.payload, current(state.reactions))) {
        state.reactions.push(action.payload);
      }
    },
    removeReaction: (state, action) => {
      state.reactions.splice(
        state.reactions.findIndex(
          (stateReaction) =>
            stateReaction.id === action.payload[0] &&
            stateReaction.serviceId === action.payload[1]
        ),
        1
      );
    },
    setInterval: (state, action) => {
      state.interval = action.payload;
    },
    loginService: (state, action) => {
      const index = state.services.findIndex(
        (service) => service.id === action.payload
      );
      state.services[index].connected = true;
    },
    logoutService: (state, action) => {
      const index = state.services.findIndex(
        (service) => service.id === action.payload
      );
      state.services[index].connected = false;
    },
    setApiServices: (state, action) => {
      state.apiServices = action.payload;
    },
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    resetArea: (state, action) => {
      state.name = "";
      state.actions = [];
      state.reactions = [];
      state.timer = 5;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const {
  addAction,
  addReaction,
  removeAction,
  removeReaction,
  loginService,
  logoutService,
  setApiServices,
  setServices,
  setName,
  setTimer,
  resetArea,
  setReload,
} = areaSlice.actions;

export default areaSlice.reducer;
