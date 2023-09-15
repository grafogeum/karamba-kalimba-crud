// userConstants.ts
import { FormDataProps } from "../constants/types";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";

// Akcje logowania
interface UserLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  payload: any; // Tutaj zastąp "any" odpowiednim typem danych
}

interface UserLoginFailAction {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

export type UserActionTypes = UserLoginRequestAction | UserLoginSuccessAction | UserLoginFailAction | UserLogoutAction;

export const userLoginRequest = (): UserLoginRequestAction => ({
  type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (userInfo: any): UserLoginSuccessAction => ({
  type: USER_LOGIN_SUCCESS,
  payload: userInfo,
});

export const userLoginFail = (error: string): UserLoginFailAction => ({
  type: USER_LOGIN_FAIL,
  payload: error,
});

export const userLogout = (): UserLogoutAction => ({
  type: USER_LOGOUT,
});
