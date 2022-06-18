import React from "react";
import styles from "../../styles/SearchInput.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} {...rest} />
      <SearchIcon color="inherit" />
    </div>
  );
};

export default Search;
