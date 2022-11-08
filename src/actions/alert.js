// import { SET_ALERT, REMOVE_ALERT } from "./types";
// import uuid from "uuid";

// import axios from "axios";
// import { useRouteLoaderData } from "react-router-dom";
// import setAuthToken from "../utils/setAuthToken";

// export const setAlert = (msg, alertType) => (dispatch) => {
//   const id = uuid.v4();
//   dispatch({
//     type: SET_ALERT,
//     payload: {
//       msg,
//       alertType,
//       id,
//     },
//   });
// };

// export const register = ({name,email,password})=> async dispatch => {
//   const config = {
//     headers : {
//       'content-type':"application/json"
//     }
//   }
//   const body = JSON.stringify({ name, email , password})

//   try {
//     const res = await axios.post('/api/users',body,config);
//     dispatch ({
//       type : REGISTER SUCCESS,
//       payload : res.data
//     })
//   } catch (err){
//     dispatch({
//       type : register failed
//     })
//   }
// }

// export const loaduser => async dispatch => {
//     if (localStorage.token) {
//         setAuthToken(localStorage.token);
//     }
//     try {
//         const res = await axios.get('/api/auth');
//         dispatch ({
//             type: useRouteLoaderData,
//             payload : res.data
//         })
//     } catch (error) {
//         dispatch ({
//             type : auth error
//         })
//     }
// }

// const initialState
