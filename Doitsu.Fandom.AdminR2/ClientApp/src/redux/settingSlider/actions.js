const actions = {
  SET_STATE: 'settingSlider/SET_STATE',
  SETTING_SLIDER: 'settingSlider/SETTING_SLIDER',
  GET_LIST_SLIDER: 'settingSlider/SET_SGET_LIST_SLIDERTATE'
}

export const getListSlider = (payload) => dispatch => {
  dispatch({ type: actions.GET_LIST_SLIDER, payload});
};

export const setState = (payload) => dispatch => {
  dispatch({ type: actions.SET_STATE, payload});
};


export const settingSlider = (payload) => dispatch => {
  dispatch({ type: actions.SETTING_SLIDER, payload });
};

export default actions
