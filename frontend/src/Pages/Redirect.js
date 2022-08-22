import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setCurrentUserFromToken } from "../Redux/Actions/userActions";
import { connect } from "react-redux";
function Redirect(props) {
  const { token } = useParams();
  useEffect(() => {
    props.setCurrentUserFromToken(token);
    window.location.href = "/home";
  });

  return <div>Login Suceeded Taking you to Twitter</div>;
}

export default connect(null, { setCurrentUserFromToken })(Redirect);
