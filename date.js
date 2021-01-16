exports.getDate = () => {
  var options = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  var today = new Date();

  const date = today.toLocaleDateString("en-US", options);
  return date;
};
