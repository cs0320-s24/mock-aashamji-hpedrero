import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mockedCsvData, searchMockedData } from "./mockedJson";
import { executeCommand } from "./REPLFunction";
import { addCommand } from "./REPLFunction";

addCommand("loadcsv", () => "CSV loaded!");
addCommand("viewcsv", () => JSON.stringify(mockedCsvData));
addCommand("searchcsv", (args) =>
  JSON.stringify(searchMockedData(args.join(" "), mockedCsvData))
);
addCommand("mode", (args) => `Output mode set to ${args[0]}`);
// addCommand("mode", (args) => {
//   if (args.length === 0 || (args[0] !== "verbose" && args[0] !== "brief")) {
//     return "ERROR USAGE: mode + <brief / verbose>";
//   }
//   return `Output mode set: ${args[0]}`;
// });

interface REPLInputProps {
  onNewCommand: (newCommand: string) => void;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput({ onNewCommand }: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [outputMode, setOutputMode] = useState<"brief" | "verbose">("verbose");
  // TODO WITH TA : add a count state

  // TODO WITH TA: build a handleSubmit function called in button onClick
  const handleSubmit = async () => {
    const [command, ...args] = commandString.split(" ");
    let result = executeCommand(command, args);

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
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={handleSubmit}>Submit</button>
      <div>Commands Submitted: {count}</div>{" "}
    </div>
  );
}
