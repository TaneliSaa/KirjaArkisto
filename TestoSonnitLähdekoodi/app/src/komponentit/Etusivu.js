import { Typography, Button, Box } from "@mui/material";
import { Container } from "@mui/system";

const Etusivu = () => {
    return (
        <Container maxWidth={false} sx={{ bgcolor: "#D4EBEC", minHeight: "100vh", display: "flex" }}>
            <Box sx={{ p: 5, my: "auto", mx: "auto", textAlign: "center", maxWidth: "800px",bgcolor: "#FFFFFF", border: "1px solid #CCCCCC", borderRadius: "10px" }}>
                <Typography variant="h4" sx={{ mb: 2 }} align="center" gutterBottom>Tervetuloa kirja-arkisto sovellukseen!</Typography>
                <Typography align="left" gutterBottom>Meillä on laaja valikoima kirjoja eri genreistä, joita voit selailla.</Typography>
                <Typography align="left" gutterBottom>Rekisteröitymisen ja kirjautumisen jälkeen pystyt luomaan omia kokoelmia haluamistasi kirjoista!</Typography>
                <Typography align="left" gutterBottom>Käyttöliittymämme on suunniteltu helpoksi käyttää ja hyödylliseksi omien kokoelmien luontiin.</Typography>
                <Typography align="left" gutterBottom>Olemme ylpeitä siitä, että voimme tarjota sinulle laajan valikoiman kirjoja ja auttaa sinua löytämään sieltä juuri haluamasi kirjat.</Typography>
                <Typography align="left" gutterBottom>Käytä aikaa selaillaksesi kokoelmaamme, löytääksesi uusia suosikkeja ja luo omia kokoelmia suosikki kirjoistasi!</Typography>
                <Typography align="left" gutterBottom>Tervetuloa kirja-arkisto sovellukseen ja nauti lukemisesta!</Typography>
                <Typography align="left" gutterBottom>Alla olevasta napista pääset selaamaan kirja-arkiston kokoelmaa.</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                        <Button variant="contained" color="primary" href="/kokoelmat">Tutustu kokoelmaamme</Button>
                    </Box>
            </Box>
        </Container>
    );
};

export { Etusivu };