export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

const commandRegistry: Record<string, REPLFunction> = {};

export const addCommand = (command: string, fn: REPLFunction) => {
  commandRegistry[command] = fn;
};

export const executeCommand = (
  command: string,
  args: Array<string>
): string | string[][] => {
  if (command in commandRegistry) {
    return commandRegistry[command](args);
  } else {
    return "Command not recognized";
  }
};
