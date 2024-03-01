import { Dispatch, SetStateAction } from "react";

/**
 * Props for the LoginButton component.
 *
 * @interface
 * @property {boolean} isLoggedIn - Indicates whether the user is currently logged in.
 * @property {Dispatch<SetStateAction<boolean>>} setIsLoggedIn - Function to update the login status.
 */
interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export function LoginButton(props: loginProps) {
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };

  if (props.isLoggedIn) {
    return (
      <button aria-label="Sign Out" onClick={authenticate}>
        Sign out
      </button>
    );
  } else {
    return (
      <button aria-label="Login" onClick={authenticate}>
        Login
      </button>
    );
  }
}
