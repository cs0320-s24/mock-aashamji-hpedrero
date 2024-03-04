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

/**
 * Renders a button that allows the user to log in or out.
 * The button's behavior changes based on the `isLoggedIn` prop.
 * When clicked, it toggles the user's login status by invoking `setIsLoggedIn`.
 *
 * @param {loginProps} props - The properties passed to the LoginButton component.
 * @returns {JSX.Element} A button element that either logs the user in or out based on their current state.
 *
 * @example
 * <LoginButton isLoggedIn={false} setIsLoggedIn={toggleLogin} />
 */
export function LoginButton(props: loginProps) {
  /**
   * Toggles the user's login state.
   *
   * @returns {boolean} The new login state after toggling.
   */
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
