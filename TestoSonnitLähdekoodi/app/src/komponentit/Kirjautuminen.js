import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const Kirjautuminen = (props) => {


  const [inputNimi,setInputNimi] = useState("");
  const [inputSalasana,setInputSalasana] = useState("");
  const [tarkistaNimi,setTarkistaNimi] = useState("");
  const [tarkistaSalasana,setTarkistaSalasana] = useState("");
  const [tarkistaAdmin,setTarkistaAdmin] = useState("");
  const [id,setId] = useState("");
  const [kirjauduElement, setKirjauduElement] = useState("");
  const navigoi = useNavigate();

  const handleKirjautuminen = async () => {

    let response = await fetch(`http://localhost:3004/kayttaja?nimi=${inputNimi}&salasana=${inputSalasana}`);
    let kayttaja = await response.json();

    if (kayttaja.length === 1) {
      props.setKirjautumisToken(true);
      props.setKayttajaId(kayttaja[0].id);

      if (kayttaja[0].admin) {
        props.setAdmin(true);
      }

      
      navigoi("/");
    } else {
      setKirjauduElement("Väärä käyttäjänimi tai salasana.");
    }
  }

  return(
    <Box sx={{bgcolor: "#D4EBEC", height: "100vh", display: "flex", alignItems: "center"}}>
      <Container maxWidth="sm" sx={{bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 3}}>
        <Typography variant="h4" align="center" gutterBottom>Kirjautuminen</Typography>
        <Box component="form" sx={{mt: 4}}>
          <TextField required fullWidth id="outlined-username" value={inputNimi} label="Käyttäjänimi" onChange={(e) => setInputNimi(e.target.value)} sx={{mb: 2}} />
          <TextField required fullWidth id="outlined-password" value={inputSalasana} label="Salasana" type="password" onChange={(e) => setInputSalasana(e.target.value)} sx={{mb: 2}} />
          <Button variant="contained" onClick={handleKirjautuminen} fullWidth color="primary">Kirjaudu sisään</Button>
          <Typography sx={{mt: 2}}>{kirjauduElement}</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export {Kirjautuminen}