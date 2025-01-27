export const getStackPrefix = () => {
  return process.env.STACK_PREFIX;
}

export const namespaceIt = (name: string, delim: string = '-') => {
  return `${getStackPrefix()}${delim}${name}`;
}
