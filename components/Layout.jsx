import Header from "./Header1";
import Head from "next/head";

function Layout({ children }) {  
  return (
    <div>
      <Head>
        <title>MediBlock Secure</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Header />
    <main className="w-11/12 mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
