import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
/**
 * Props for ControlledInput component.
 *
 * @interface
 * @property {string} value - The current value of the input.
 * @property {Dispatch<SetStateAction<string>>} setValue - Function to update the state of the input's value.
 * @property {string} ariaLabel - Accessible label for the input, used by screen readers.
 */
interface ControlledInputProps {
  value: string;
  // This type comes from React+TypeScript. VSCode can suggest these.
  //   Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}
/**
 * ControlledInput is a React component for rendering a controlled input element.
 * This component ensures that the input's state is managed by React, allowing for
 * more predictable data flow and state management. The `value` and `setValue`
 * props tie the input's value to a piece of state in the parent component, while
 * `ariaLabel` provides an accessible name for the input.
 *
 * @component
 * @param {ControlledInputProps} props - The props for the ControlledInput component.
 * @returns {JSX.Element} A controlled input element with bound value and change handler.
 *
 * @example
 * <ControlledInput
 *   value={command}
 *   setValue={setCommand}
 *   ariaLabel="Command Input"
 * />
 */

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
