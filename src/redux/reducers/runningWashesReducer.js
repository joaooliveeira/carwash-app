import { actions } from "../actions";

const initialState = {
    washes: []
}

const runningWashes = (state = initialState, action) => {
    switch (action.type) {
      case actions.SET_RUNNING_WASHES:
        return {
          ...state,
            washes: action.washes,
        }
      default:
        return state
    }
  }
  
  export default runningWashes;