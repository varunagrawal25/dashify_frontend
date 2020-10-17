export const isAuthenticated = () => {
  console.log("in isAuthenticated");
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("UserToken")) {
    return true;
  } else {
    return false;
  }
};
