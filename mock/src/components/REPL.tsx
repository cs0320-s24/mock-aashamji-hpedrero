import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
/**
 * A top-level component for the Read-Eval-Print Loop (REPL) interface.
 * This component serves as a container for the REPL interaction, managing
 * the state for the commands entered by the user and displaying the history
 * of executed commands.
 *
 * @component
 * @example
 * return (
 *   <REPL />
 * )
 */

export default function REPL() {
  /**
   * State to hold all commands submitted in the REPL.
   * @type {[string[], Function]}
   */
  const [commands, setCommands] = useState<string[]>([]);

  /**
   * Handles adding a new command to the REPL history.
   *
   * @param {any} newCmd - The new command to be added to the history.
   */
  const handleNewCommand = (newCmd: any) => {
    setCommands((prevCommands) => [...commands, newCmd]);
  };

  return (
    <div className="repl">
      <REPLHistory cmds={commands} />
      <hr></hr>
      <REPLInput onNewCommand={handleNewCommand} />
    </div>
  );
}
