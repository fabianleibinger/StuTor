import React, { useEffect } from "react";
import { Container, Typography, Grid, CardContent } from "@mui/material";
import {
  RootContainer,
  Title,
  CardContainer,
  CardTitle,
  CardButton,
} from "../styles";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RootContainer>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" sx={{ paddingTop: "40px" }}>
          Find Tutors for your courses or help others to study efficiently!
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ paddingBottom: "40px" }}
        >
          StuTor is a tutoring platform to help students with their exam
          preparation and course studies, by providing them with trustworthy and
          reliable student tutors who have excelled in the same course at the
          same university. StuTor also allows student tutors to contribute in a
          much easier, compensated fashion.
        </Typography>

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
