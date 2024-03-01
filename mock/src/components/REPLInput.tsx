import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mockedCsvData, searchMockedData } from "./mockedJson";

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
  // TODO WITH TA : add a count state

  // TODO WITH TA: build a handleSubmit function called in button onClick
  const handleSubmit = async () => {
    const [action, param] = commandString.split(" ");
    let result = "Command not recognized";
    if (action === "loadcsv") {
      result = "CSV loaded!";
    }
    if (action === "viewcsv") {
      result = JSON.stringify(mockedCsvData);
    } else if (action === "searchcsv") {
      const searchResults = searchMockedData(param, mockedCsvData);
      result = JSON.stringify(searchResults);
    }

    onNewCommand(`${commandString} - ${result}`);
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
