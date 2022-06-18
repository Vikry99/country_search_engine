import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Table.module.css";
import { useState } from "react";

const orderBy = (countries, value, direction) => {
  if (direction === "asc" && direction) {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({}) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return <div className={styles.heading_arrow}></div>;
  } else {
    return <div className={styles.heading_arrow}></div>;
  }
};

const Table = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountry = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };
  const setValueDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueDirection("name")}
        >
          {value === "name" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountry.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <a className={styles.row}>
            <div className={styles.name}>{country.name}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Table;
