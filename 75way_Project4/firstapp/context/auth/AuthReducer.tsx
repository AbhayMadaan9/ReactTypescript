

export interface User {
    data: any;
}
export const initialState = {
    data: null
}

export const AuthReducer = (state: User, action: {type: string; payload: any})=>{
    switch (action.type) {
        case 'LOGIN':
            return { ...state, data: action.payload };
        case 'REGISTER':
            return { ...state, data: action.payload };
        case 'LOGOUT':
             state.data = null; 
        default:
            throw new Error(`${action.type} case not defined`);
            
    }
}