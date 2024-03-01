/**
 * Defines the type for functions that can be registered in the REPL command registry.
 * These functions take an array of strings as arguments and return either a string or
 * an array of string arrays, typically representing command execution output.
 *
 * @callback REPLFunction
 * @param {Array<string>} args - An array of strings representing the arguments passed to the command.
 * @returns {string | string[][]} The output of the command, which can be a single string or an array of string arrays.
 */
export interface REPLFunction {
  (args: Array<string>): string | string[][];
}
/**
 * A registry for storing REPL commands. Each command is associated with a `REPLFunction`
 * that is executed when the command is called.
 * 
 * @type {Record<string, REPLFunction>}
 */
const commandRegistry: Record<string, REPLFunction> = {};

/**
 * Registers a new command in the REPL command registry.
 *
 * @param {string} command - The name of the command to register.
 * @param {REPLFunction} fn - The function to execute when the command is called.
 */
export const addCommand = (command: string, fn: REPLFunction) => {
  commandRegistry[command] = fn;
};
/**
 * Executes a command if it is found in the command registry, passing any arguments to it.
 * If the command is not recognized, returns an error message.
 *
 * @param {string} command - The name of the command to execute.
 * @param {Array<string>} args - An array of strings representing the arguments to pass to the command.
 * @returns {string | string[][]} The output from executing the command, or an error message if the command is not recognized.
 */
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
