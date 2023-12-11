import { Button, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom";


const OmaKokoelma =(props) => {

    const [kirjaSarja,setKirjaSarja] = useState("");
    const [kustantaja,setKustantaja] = useState("");
    const [kuvaus,setKuvaus] = useState("");
    const [luokittelu,setLuokittelu] = useState("");
    const [kayttajaId,setKayttajaId] = useState(props.kayttajaId);
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [kirjaSarjaTable,setKirjaSarjaTable] = useState([]);
    const [query,setQuery] = useState("?kayttajaid=" + kayttajaId);
    const [muokkaaKokoelmat, setMuokkaaKokoelmat] = useState(false);
    const [muokkaaKirjaSarja,setMuokkaaKirjaSarja] = useState("");
    const [muokkaaKustantaja,setMuokkaaKustantaja] = useState("");
    const [muokkaaKuvaus,setMuokkaaKuvaus] = useState("");
    const [muokkaaLuokittelu,setMuokkaaLuokittelu] = useState("");
    const [kokoelmaId, setKokoelmaId] = useState("")
    const [laskuri, setLaskuri] = useState(0);
    const [lask, setLask] = useState(0);
    const [poistaVarmistus,setPoistaVarmistus] = useState(false);
    const [muokkaaVarmistus,setMuokkaaVarmistus] = useState(false);
    const [poistettavaId,setPoistettavaId] = useState("");
    const [naytaKentat, setNaytaKentat] = useState(false);
   

    useEffect( () => {

        const lisaaKirjaSarja = async () => {

            fetch("http://localhost:3004/omatsarjat/", {

                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    kirjasarja : kirjaSarja,
                    kustantaja : kustantaja,
                    kuvaus : kuvaus,
                    luokittelu : luokittelu,
                    kayttajaid : kayttajaId,

                })
            });
        }

        if (lisaaQuery != "") {

            lisaaKirjaSarja();     
            
        }

        setKirjaSarja("");
        setKustantaja("");
        setKuvaus("");
        setLuokittelu("");

    },[lisaaQuery])

    useEffect( () => {

        const Muokkaa = async () => {

            fetch("http://localhost:3004/omatsarjat/"+kokoelmaId, {

                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    kirjasarja : muokkaaKirjaSarja,
                    kustantaja : muokkaaKustantaja,
                    kuvaus : muokkaaKuvaus,
                    luokittelu : muokkaaLuokittelu,
                })
            });
        }

        if (laskuri > 0 && muokkaaKirjaSarja != "" && muokkaaKustantaja != "" && muokkaaKuvaus != "" && muokkaaLuokittelu != "") {

            Muokkaa();     
        }

        setMuokkaaKirjaSarja("");
        setMuokkaaKustantaja("");
        setMuokkaaKuvaus("");
        setMuokkaaLuokittelu("");

        toggleMuokkaaKokoelma("");
        setLask(lask+1);

    },[laskuri])


    const handlePost = () => {

        let m  = [];

        if (kirjaSarja != "" && kustantaja != "" && kuvaus != "" && luokittelu != "") {
            m.push(kirjaSarja);
            m.push(kustantaja);
            m.push(kuvaus);
            m.push(luokittelu);

            setLisaaQuery(m); // työntää tiedot databaseen vain jos kaikki kentät ei tyhjiä
        }
    }

    useEffect( () => {

        const haeKirjaSarja = async () => {

            let response = await fetch("http://localhost:3004/omatsarjat/" + query);

            let c = await response.json();

            setKirjaSarjaTable(c);
            

        }
        

        haeKirjaSarja();

    },[])

    const poistaKokoelma = (id) => {
        fetch("http://localhost:3004/deleteOmatKokoelma/"+id,{method : 'DELETE'})
    }



    const toggleMuokkaaKokoelma = (id) => {
        setMuokkaaKokoelmat(!muokkaaKokoelmat);
        setKokoelmaId(id);
        
    }

    const peruMuokkaus = () => {
        toggleMuokkaaKokoelma();
        setMuokkaaKirjaSarja("");
        setMuokkaaKustantaja("");
        setMuokkaaKuvaus("");
        setMuokkaaLuokittelu("");

    }

    const handleSubmit = () => {
        setLaskuri(laskuri+1)
    }

    const poistaDialog = () => {
        setPoistaVarmistus(!poistaVarmistus);
        
        

    }

    const muokkaaDialog = () => {
        setMuokkaaVarmistus(!muokkaaVarmistus);
        
    }

    const handleMuokkaa = () => {
        if (muokkaaKirjaSarja != "" && muokkaaKustantaja != "" && muokkaaKuvaus != "" && muokkaaLuokittelu != "") {
            muokkaaDialog();
        }
    }

    const muokkaaDialogForm = () => {
        setLaskuri(laskuri+1)
        muokkaaDialog()
    }

    const poistaDialogForm = () => {
        poistaKokoelma(poistettavaId)
        poistaDialog()
    }

    return (
      
        <>
            <Container maxWidth={false} sx={{bgcolor: "#D4EBEC", height: "100vh"}}>
                <Container>
                
                <Typography variant="h6" align="center">Tämä on oma kokoelma</Typography>
                
                {!muokkaaKokoelmat ? 
                    
                        <Container>
                    <form>
                        <Typography variant="h6" align="center">Muokkaus</Typography>
                        <TextField required id="outlined-kirjasarja" label="Kirjasarja"  defaultValue={muokkaaKirjaSarja} onChange={(e) => setMuokkaaKirjaSarja(e.target.value)} />
                        <TextField  required id="outlined-kustantaja" label="Kustantaja" defaultValue={muokkaaKustantaja} onChange={(e) => setMuokkaaKustantaja(e.target.value)} />
                        <TextField  required id="outlined-kuvaus" label="Kuvaus" defaultValue={muokkaaKuvaus} onChange={(e) => setMuokkaaKuvaus(e.target.value)} />
                        <TextField  required id="outlined-luokittelu" label="Luokittelu" defaultValue={muokkaaLuokittelu} onChange={(e) => setMuokkaaLuokittelu(e.target.value)} />
                            <Button variant="outlined" onClick={() => {handleMuokkaa()}} >Muokkaa kokoelma</Button>
                            <Button variant="outlined" onClick={() => {peruMuokkaus()}}>Peru muokkaus</Button>
                    </form>
                    </Container>
                    :
                    <Container>
                        <div>
                        <form onSubmit={handlePost}>
                            <Container sx={{ml: 10}}>
                                <TextField sx={{m: 1}} required id="outlined-kirjasarja" label="Kirjasarja" onChange={(e) => setKirjaSarja(e.target.value)} />
                                <TextField sx={{m: 1}} required id="outlined-kustantaja" label="Kustantaja" onChange={(e) => setKustantaja(e.target.value)} />
                                <TextField sx={{m: 1}} required id="outlined-kuvaus" label="Kuvaus" onChange={(e) => setKuvaus(e.target.value)} />
                                <TextField sx={{m: 1}} required id="outlined-luokittelu" label="Luokittelu" onChange={(e) => setLuokittelu(e.target.value)} />
                                <Button sx={{ml: 55, mb: 1}} variant="outlined" type="submit">Lisää kokoelma</Button>
                            </Container>
                        </form>
                        </div>

                        <TableContainer component={Paper} sx={{width: "100vh", height: "65vh", ml: 13}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nimi</TableCell>
                                        <TableCell>Kuvaus {/* Oli julkaisuvuosi? Vaihdettiin olemaan kuvaus */ }</TableCell>
                                        <TableCell>{/* Namiskukkelit */}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{"& tr:nth-of-type(2n+1)": {backgroundColor: "grey.100"}}}>
                                    {kirjaSarjaTable.map && kirjaSarjaTable.map((row,index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                            <TableCell component="th" scope="row">
                                                <NavLink to ='/omankokoelmankirjat' onClick={() => props.setId(row.idomatsarjat)}>{row.kirjasarja}</NavLink>
                                            </TableCell>
                                            <TableCell>{row.kuvaus}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => {toggleMuokkaaKokoelma(row.idomatsarjat) ; setMuokkaaKirjaSarja(row.kirjasarja) ; setMuokkaaKustantaja(row.kustantaja) ; setMuokkaaKuvaus(row.kuvaus) ; setMuokkaaLuokittelu(row.luokittelu)}}>Muokkaa</Button>
                                                    <Button onClick={() => {poistaDialog() ; setPoistettavaId(row.idomatsarjat)}}>Poista</Button>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                }

                <Dialog open={muokkaaVarmistus}>
                    <DialogTitle>Muokkaa kokoelmaa</DialogTitle>
                    <DialogActions>
                        <form onSubmit={muokkaaDialogForm}>
                            <Button type="submit">Muokkaa</Button>
                            <Button onClick={() => {peruMuokkaus() ; muokkaaDialog() }}>Peru muokkaus</Button>
                        </form>
                        
                    </DialogActions>
               </Dialog>

               <Dialog open={poistaVarmistus}>
                    <DialogTitle>Poista kokoelma</DialogTitle>
                    <DialogActions>
                        <form onSubmit={poistaDialogForm}>
                            <Button type="submit">Poista kokoelma</Button>
                            <Button onClick={() => {poistaDialog() ; setPoistettavaId("")}}>Peru poisto</Button>
                        </form>
                    </DialogActions>
               </Dialog>
               </Container>

            </Container>
        
        
        </>
    )
  }

  export {OmaKokoelma}