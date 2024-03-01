import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";

/**
 * This is the highest level component!
 */
/**
 * App component serves as the root component for this application. It manages the
 * authentication state to conditionally render the REPL component based on the user's
 * login status.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  /**
   * Tracks whether the user is logged in.
   * @type {[boolean, Function]}
   */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
