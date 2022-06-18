import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";
import styles from "../styles/Home.module.css";
import ScrollButton from "../components/ScrollButton";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    console.log(keyword);
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <header>
        <div>
          <h1 className={styles.titleIndex}>Country</h1>
        </div>
      </header>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <Search
            placeholder="Type any country name"
            onChange={onInputChange}
          />
        </div>
      </div>
      <Table countries={filteredCountries} />
      <ScrollButton scrollPoint={100} />
    </Layout>
  );
}

// export const getStaticProps = async () => {
export const getStaticProps = async () => {
  //   const res = await fetch("https://restcountries.eu/rest/v2/all");
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
