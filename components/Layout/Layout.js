import Head from "next/head";
import React from "react";
import styles from "../../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Country</title>
        <meta charset="UTF-8" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default Layout;
