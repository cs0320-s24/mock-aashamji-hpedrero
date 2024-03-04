import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { addCommand, executeCommand } from "./REPLFunction";
import { loadCsv, viewCsv, searchCsv } from "./Commands";

addCommand("loadcsv", loadCsv);
addCommand("viewcsv", viewCsv);
addCommand("searchcsv", searchCsv);

/**
 * Props for the REPLInput component.
 *
 * @interface REPLInputProps
 * @property {Function} onNewCommand - Callback function to handle the submission of new commands.
 */
interface REPLInputProps {
  onNewCommand: (newCommand: string) => void;
}
/**
 * A component for inputting commands into the REPL.
 * It includes a text input for entering commands and a submit button to execute them.
 * The component also shows the number of commands submitted.
 *
 * @param {REPLInputProps} props - The props for the REPLInput component.
 * @returns {JSX.Element} The REPL input field, submit button, and the count of submitted commands.
 */
export function REPLInput({ onNewCommand }: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [outputMode, setOutputMode] = useState<"brief" | "verbose">("verbose");

  const handleSubmit = async () => {
    const [action, ...args] = commandString.split(" ");
    let result;
    if (action == "mode") {
      if (args[0] === "brief" || args[0] === "verbose") {
        setOutputMode(args[0]);
        result = `Output mode set to ${args[0]}`;
      } else {
        result = "ERROR USAGE: mode + <brief / verbose>";
      }
    } else {
      result = executeCommand(action, args);
    }

    if (Array.isArray(result)) {
      result = JSON.stringify(result);
    }

    let output =
      outputMode === "verbose"
        ? `Command: ${commandString}\nOutput: ${result}`
        : result;

    onNewCommand(output);
    setCommandString("");
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
      <div>Commands Submitted: {count}</div>{" "}
    </div>
  );
}
