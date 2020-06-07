import ACTIONS from "redux/actions/types"
export function mainAction(TYPE,payload){
    //console.log(TYPE,payload)
      return {
        type: TYPE,
        payload
      };
    }
    