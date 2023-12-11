import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Rekisteroityminen = () => {
  const [lisaaKayttajaNimi, setLisaaKayttajaNimi] = useState("");
  const [lisaaKayttajaSalasana, setLisaaKayttajaSalasana] = useState("");
  const [rekisteroity, setRekisteroity] = useState(false);
  const navigoi = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lähetä POST-pyyntö API:lle
    const response = await fetch("http://localhost:3004/kayttaja/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nimi: lisaaKayttajaNimi,
        salasana: lisaaKayttajaSalasana,
      }),
    });
    if (response.ok) {
      setRekisteroity(true);
      navigoi("/kirjautuminen");
    }
  };

  return (
    <Box sx={{ bgcolor: "#D4EBEC", height: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm" sx={{bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 3}}>
          <Typography variant="h4" align="center" gutterBottom>
            Rekisteröidy
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth inputProps={{ "data-testid": "rekisteröidy_input" }} id="outlined-username" label="Käyttäjänimi" variant="outlined" value={lisaaKayttajaNimi} onChange={(e) => setLisaaKayttajaNimi(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth inputProps={{ "data-testid": "rsalasana_input" }} id="outlined-password" label="Salasana" type="password" variant="outlined" value={lisaaKayttajaSalasana} onChange={(e) => setLisaaKayttajaSalasana(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: "primary", color: "#fff", "&:hover": { bgcolor: "#006E8A" } }}>
                  Rekisteröidy
                </Button>
              </Grid>
            </Grid>
          </Box>
          {rekisteroity && (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Rekisteröityminen onnistui!
            </Typography>
          )}
      </Container>
    </Box>
  );
};

export { Rekisteroityminen };