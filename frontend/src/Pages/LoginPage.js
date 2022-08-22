import React, { useEffect } from "react";
import Login from "../Components/Login";
import { connect } from "react-redux";
function LoginPage(props) {
  useEffect(() => {
    if (props.user.isLoggedIn) window.location.href = "/home";
  });

  return <Login />;
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(LoginPage);
