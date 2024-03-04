import "../styles/main.css";

/**
 * Properties for the REPLHistory component.
 *
 * @interface REPLHistoryProps
 * @property {string[]} cmds - An array of command strings to be displayed as part of the REPL history.
 */
interface REPLHistoryProps {
  cmds: string[];
}

/**
 * Renders a list of executed commands as part of the REPL (Read-Eval-Print Loop) history.
 * This component displays each command that has been entered and executed in the REPL interface.
 *
 * The `REPLHistory` component takes an array of strings (`cmds`) as a prop and renders each string
 * as an individual element within the history display. This allows users to see a history of their
 * interactions with the REPL.
 *
 * @component
 * @param {REPLHistoryProps} props - The props for the REPLHistory component.
 * @returns {JSX.Element} A div element containing the list of commands represented by `cmds`.
 *
 * @example
 * const commands = ["echo Hello, world!", "calculate 1 + 1"];
 * <REPLHistory cmds={commands} />
 */
export function REPLHistory({ cmds }: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {cmds.map((cmd, index) => (
        <div key={index}>{cmd}</div>
      ))}
    </div>
  );
}
