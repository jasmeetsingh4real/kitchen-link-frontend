export const isRestaurantOpen = (props) => {
  const openingTime = new Date(props.openingTime);
  const closingTime = new Date(props.closingTime);
  const currTime = new Date();

  if (
    currTime.getHours() < openingTime.getHours() ||
    currTime.getHours() > closingTime.getHours()
  ) {
    return false;
  } else if (
    (currTime.getHours() === openingTime.getHours() &&
      currTime.getMinutes() < openingTime.getMinutes()) ||
    (currTime.getHours() === closingTime.getHours() &&
      currTime.getMinutes() > closingTime.getMinutes())
  ) {
    return false;
  } else {
    return true;
  }
};
