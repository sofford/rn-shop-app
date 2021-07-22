import { STARTUP_COMPLETE } from '../actions/startup';

const initialState = {
  startupComplete: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STARTUP_COMPLETE:
      return {
        ...state,
        startupComplete: true,
      };
    default:
      return state;
  }
};
