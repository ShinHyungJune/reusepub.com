import {SET_POP, SET_FLASH, SET_USER, SET_TOKEN} from "../types";

export const setPop = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_POP,
            payload: data
        });
    }
};

export const setFlash = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_FLASH,
            payload: data
        })
    }
};

export const login = (user = null, token = null) => {

    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: user
        });
        
        dispatch({
            type: SET_TOKEN,
            payload: token
        });

        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("token", JSON.stringify(token));
    }
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: null
        });
    
        dispatch({
            type: SET_TOKEN,
            payload: null
        });
        
        localStorage.removeItem("user");
        
        localStorage.removeItem("token");
    }
};
