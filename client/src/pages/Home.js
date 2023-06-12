import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  cardTitle: {
    marginBottom: theme.spacing(2),
  },
  cardButton: {
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" className={classes.title}>
          Welcome to STUTOR
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.cardTitle}
                >
                  Search Sessions
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Find study sessions that match your interests and needs.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.cardButton}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.cardTitle}
                >
                  My Study Sessions
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Access and manage your study sessions conveniently.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.cardButton}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
