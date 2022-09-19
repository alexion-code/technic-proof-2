import React, { Dispatch, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../redux/slices/setUserSlice";

const Header = (props: any) => {

  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <p className="lead text-muted">123 Items found</p>
          <h1 className="fw-light">Search Results for "Bathroom taps"</h1>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  clearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
