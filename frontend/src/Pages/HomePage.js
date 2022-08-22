import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "../Components/Sidebar/Sidebar";
import Feed from "../Components/Feed/Feed";
import Widgets from "../Components/Widgets/Widgets";
import "./HomePage.css";
function HomePage(props) {
  return props.user.isLoggedIn ? (
    <div className="home">
      {" "}
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  ) : (
    <Navigate to="/" />
  );
}

const mapStateToProps = (state) => ({ user: state.user });
export default connect(mapStateToProps, {})(HomePage);
