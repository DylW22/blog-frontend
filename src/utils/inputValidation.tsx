const titleIsValid = (str: string) => {
  if (!str) return false;
  if (str.trim().length < 10) return false;
  return true;
};
const contentIsValid = (str: string) => {
  if (!str) return false;
  if (str.trim().length < 10) return false;
  if (str.trim().length > 255) return false;
  return true;
};

export { titleIsValid, contentIsValid };
