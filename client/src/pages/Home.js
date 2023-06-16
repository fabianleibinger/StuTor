import React, { useEffect } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const RootContainer = styled("div")({
  paddingTop: (theme) => theme.spacing(8),
  paddingBottom: (theme) => theme.spacing(8),
});

const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(4),
});

const CardContainer = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: (theme) => theme.spacing(3),
});

const CardTitle = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
});

const CardButton = styled(Button)({
  marginTop: (theme) => theme.spacing(2),
});

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RootContainer>
      <Container maxWidth="md">
        <Title variant="h2" component="h1">
          Welcome to STUTOR
        </Title>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <CardContainer>
              <CardContent>
                <CardTitle variant="h5" component="h2">
                  Search Sessions
                </CardTitle>
                <Typography variant="body2" color="textSecondary">
                  Find study sessions that match your interests and needs.
                </Typography>
                <CardButton variant="contained" color="primary">
                  Get Started
                </CardButton>
              </CardContent>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContainer>
              <CardContent>
                <CardTitle variant="h5" component="h2">
                  My Study Sessions
                </CardTitle>
                <Typography variant="body2" color="textSecondary">
                  Access and manage your study sessions conveniently.
                </Typography>
                <CardButton variant="contained" color="primary">
                  Explore
                </CardButton>
              </CardContent>
            </CardContainer>
          </Grid>
        </Grid>
      </Container>
    </RootContainer>
  );
}

export default Home;
