import { Paper, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)({
  backgroundColor: "#D4EBEC",
  height: "100vh",
});

const StyledPaper = styled(Paper)({
  padding: "1rem",
  marginBottom: "1rem",
});

const Tietoa = (props) => {
  return (
    <>
      <StyledContainer maxWidth={false}>
        <Container>
        <Box sx={{ p: 5 }}>
          <StyledPaper>
          <Typography variant="h4" sx={{ mb: 2 }}>Tervetuloa TestoSonnit Oy:n kirja-arkisto tietoja sivulle!</Typography>
            <Typography align="left">Tältä sivulta löydät yleistä tietoa luomastamme projektista.</Typography>
            <Typography align="left">Kirja-arkisto sovelluksella voit luoda omia kokoelmia ja muokata niitä.</Typography>
            <Typography align="left">Rekisteröityminen ja kirjautuminen on pakollista, jos haluat luoda tai muokata omia kokoelmia.</Typography>
            <Typography align="left">Mahdolliset ilmoitukset ongelmista voi lähettää Scrum Masterille sähköpostitse.</Typography>
          </StyledPaper>
          <StyledPaper>
            <Typography variant="h5" sx={{ mb: 2 }}>TestoSonnit Oy:n jäsenet</Typography>
            <Typography align="left">Jonni Paavola</Typography>
            <Typography align="left">Olli Tanninen</Typography>
            <Typography align="left">Taneli Saarenkunnas</Typography>
            <Typography align="left">Topias Pohjola</Typography>
          </StyledPaper>
          <StyledPaper>
            <Typography variant="h5" sx={{ mb: 2 }}>Yhteystiedot</Typography>
            <Typography align="left">Yhteydenotot sähköpostitse osoitteeseen:{" "}<a href="mailto:ScrumMaster@hotmail.com">ScrumMaster@hotmail.com</a></Typography>
            <Typography align="left">Yhteydenotot puhelimitse numeroon:{" "}<a href="tel:04542071551">04542071551</a></Typography>
            <Typography align="left">Osoite: Microkatu 1</Typography>
          </StyledPaper>
        </Box>
        </Container>
      </StyledContainer>
    </>
  );
};

export { Tietoa };