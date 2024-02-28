import "../styles/main.css";

interface REPLHistoryProps {
  cmds: string[];
}
export function REPLHistory({ cmds }: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {cmds.map((cmd, index) => (
        <div key={index}>{cmd}</div>
      ))}
    </div>
  );
}
