import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/Country.module.css";
import { Button, Grid, Card, CardContent, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/router";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const router = useRouter();
  const [borders, setBorders] = useState([]);

  const buttonBack = () => {
    router.push("/");
  };

  const getBorders = async () => {
    if (country.borders) {
      const borders = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );
      setBorders(borders);
    }
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <Button
        style={{ margin: "0 1rem" }}
        variant="contained"
        type="button"
        color="secondary"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => buttonBack()}
      >
        Back To Home
      </Button>
      <Grid container>
        <Grid item xs={12} md={7}>
          <span className={styles.title_Page}>{country.name}</span>
          <img
            className={styles.img_table}
            src={country.flag}
            alt={country.name}
          ></img>{" "}
          <br />
          {country.altSpellings.map((num) => (
            <div key={num} className={styles.buttonTable}>
              <Button variant="contained" type="button" color="success">
                {num}
              </Button>
            </div>
          ))}
        </Grid>
        <Grid item xs={6} md={5} sx={{ marginRight: "10px" }}>
          <Card
            sx={{
              minWidth: "440px",
              maxWidth: "440px",
              minHeight: "130px",
              maxHeight: "130px",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {country.demonym}
              </Typography>
              <Typography
                variant="h2"
                component="div"
                sx={{ color: "#8362F2" }}
              >
                {country.area}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={5}>
          <Card
            sx={{
              minWidth: "440px",
              maxWidth: "440px",
              minHeight: "130px",
              maxHeight: "130px",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Capital : {country.capital}
              </Typography>
              <Typography variant="h5" component="div">
                Region : {country.region}
              </Typography>
              <Typography variant="h5" component="div">
                subRegion :{country.subregion}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={6}
          md={5}
          sx={{ marginTop: "10px", marginRight: "10px" }}
        >
          <Card
            sx={{
              minWidth: "440px",
              maxWidth: "440px",
              minHeight: "130px",
              maxHeight: "130px",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Calling Codes
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{ color: "#8362F2" }}
              >
                {country.callingCodes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={5} sx={{ marginTop: "10px" }}>
          <Card
            sx={{
              minWidth: "440px",
              maxWidth: "440px",
              minHeight: "130px",
              maxHeight: "130px",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Currencies
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#8362F2" }}
              >
                {country.currencies.map(({ code, name }) => (
                  <div key={name}>
                    {code}
                    <div>{name}</div>
                  </div>
                ))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
