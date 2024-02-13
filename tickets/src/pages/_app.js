import { API } from "@/actions/api";
import buildClient from "@/api/build-client";
import "@/styles/globals.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AppComponent = ({ Component, pageProps, user }) => {
  console.log(user);
  return <Component {...pageProps} user={{ name: "hadi" }} />;
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log({ app: appContext.ctx.req.headers.cookie.split("=")[1] });
  const client = buildClient(appContext);

  const { data } = await client.get(`/auth/current-user`);

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    // ...data,
  };
};

export default AppComponent;
