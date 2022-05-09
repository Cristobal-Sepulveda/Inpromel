import * as Types from '../actions/types';

const initialState = {
  session: [],
  sess: [],
  location: [
    {
      latitude: undefined,
      longitude: undefined,
    },
  ],
  polygon: [],
  farm: [],
  datachart: [],
  selected_datachart: [],
  sumafrio: [],
  sumagrados: [],
  frio: [],
  diez: [],
  bioDes: [],
  bioPtos: [],
  escBio: [],
  imgOfline: [],
  ptosBiosense: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case Types.INSERT_SESSION:
    //   return { ...state, session: [action.payload.token] };
    // case Types.INSERT_SESS:
    //   return { ...state, sess: [action.payload.sess] };
    // case Types.DELETE_SESSION:
    //   return {
    //     ...state,
    //     session: [],
    //   };
    default:
      return state;
  }
};

export { reducer };
