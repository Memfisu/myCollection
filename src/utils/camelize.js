export const camelize = (string) => {
  return string
    .split(' ')
    .map((word, index) =>
      index === 0
        ? word[0].toLowerCase() + word.slice(1)
        : word[0].toUpperCase() + word.slice(1)
    )
    .join('');
};
