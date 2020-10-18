import * as ActionTypes from "./ActionTypes";

export const comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload, comments: [] };

    case ActionTypes.ADD_COMMENT:
      var newComment = {...action.payload,id:state.comments.length}
   console.log(action.payload + ' from comment reducer ')
     const newState =  {...state,comments:[...state.comments , newComment]}
     console.log(newState + ' from comment reducer new state ')
return newState

    default:
      return state;
  }
};
