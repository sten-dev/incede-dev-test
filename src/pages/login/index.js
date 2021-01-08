import React from "react";
import Layout from "../../components/Layout";
import Login from "../../components/login/Login";
import Transition from "../../Transition";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout pageTitle="Login | Incede" page="login">
        <Transition>
          <Login />
        </Transition>
      </Layout>
    );
  }
}
