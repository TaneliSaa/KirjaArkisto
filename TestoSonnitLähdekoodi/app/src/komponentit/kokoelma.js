import { Button, Table, TableBody, TableCell, TableContainer, Paper, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Form, NavLink } from "react-router-dom";

const Kokoelma = (props) => {

    const [query,setQuery] = useState("?idkirjasarja=" + props.id);

    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero,setJarjestysnumero] = useState("");
    const [kuvausTeksti,setKuvausTeksti] = useState("");
    const [kirjailija,setKirjailija] = useState("");
    const [piirtajat,setPiirtajat] = useState("");
    const [ensipainovuosi,setEnsipainovuosi] = useState("");
    const [painokset,setPainokset] = useState("");
    const [etuKansiKuva,setEtuKansiKuva] = useState(null);
    const [takaKansiKuva,setTakaKansiKuva] = useState(null);
    const [lisaaQuery,setLisaaQuery] = useState([]);
    const [idKirjaSarja,setIdKirjaSarja] = useState(props.id);
    const [kirjatTable,setKirjatTable] = useState([props.kirjatTable]);
    let  kirja = new FormData();

    useEffect( () => {

        const haeKirjat = async () => {

            let response = await fetch("http://localhost:3004/kirja" + query);

            let c = await response.json();

            setKirjatTable(c);
        }

        haeKirjat();
    },[])
    
    useEffect( () => {

        const lisaaKirja = async () => {

            let formData = new FormData();
            formData.append("nimi", kirjanNimi);
            formData.append("jarjestysnumero", jarjestysnumero);
            formData.append("kuvausteksti", kuvausTeksti);
            formData.append("kirjailija",kirjailija);
            formData.append("piirtajat", piirtajat);
            formData.append("ensipainovuosi", ensipainovuosi);
            formData.append("painokset", painokset);
            formData.append("idkirjasarja", idKirjaSarja);
            formData.append("takakansikuva", takaKansiKuva);
            formData.append("etukansikuva", etuKansiKuva);

            fetch("http://localhost:3004/kirja/", {
                method : 'post',
                body : formData,
            });
        }


        if (lisaaQuery != "") {
            lisaaKirja();
        }
        
        setKirjanNimi("");
        setJarjestysnumero("");
        setKuvausTeksti("");
        setKirjailija("");
        setPiirtajat("");
        setEnsipainovuosi("");
        setPainokset("");
        setTakaKansiKuva(null);
        setEtuKansiKuva(null);

    },[lisaaQuery])

    const handlePost = () => {

        let m = [];

        if (kirjanNimi != "")
            kirja.append("nimi",kirjanNimi)
        
        if (jarjestysnumero != "")
            kirja.append("jarjestysnumero",jarjestysnumero)

        if (kuvausTeksti != "")
            kirja.append("kuvausteksti",kuvausTeksti)

        if (kirjailija != "")
            kirja.append("kirjailija",kirjailija)

        if (piirtajat != "")
            kirja.append("piirtajat",piirtajat)
        
        if (ensipainovuosi != "")
            kirja.append("ensipainovuosi",ensipainovuosi)

        if (painokset != "")
            kirja.append("painokset",painokset)

        if (idKirjaSarja != "")
            kirja.append("idkirjasarja",idKirjaSarja)
        
        
        kirja.append("takakansikuva",takaKansiKuva)
        
        
        kirja.append("etukansikuva",etuKansiKuva)

        setLisaaQuery(kirja);
    }

    const handleJarjestysnumero = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setJarjestysnumero(e.target.value);
        }
    }

    const handlePainoVuosi = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setEnsipainovuosi(e.target.value);
        }
    }

    const handlePainos = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setPainokset(e.target.value);
        }
    }

    return (

        <>
            <Container  maxWidth={false} sx={{bgcolor: "#D4EBEC", height: "100vh"}}>
                <Container>

                { props.admin == true &&
                    <div> 
                        <form onSubmit={handlePost}>
                            <TextField sx={{m: 1}} required id="outlined-nimi" label="Nimi" onChange={(e) => setKirjanNimi(e.target.value)}></TextField>
                            <TextField sx={{m: 1}} required id="outlined-jarjestysnumero" label="Järjestysnumero" value={jarjestysnumero} onChange={(e) => handleJarjestysnumero(e)}></TextField>
                            <TextField sx={{m: 1}} required id="outlined-kuvausteksti" label="Kuvausteksti" onChange={(e) => setKuvausTeksti(e.target.value)}></TextField>
                            <TextField sx={{m: 1}} required id="outlined-kirjailija" label="Kirjailija" onChange={(e) => setKirjailija(e.target.value)}></TextField>
                            <TextField sx={{m: 1}} required id="outlined-piirtajat" label="Piirtäjät" onChange={(e) => setPiirtajat(e.target.value)}></TextField>
                            <TextField sx={{m: 1}} required id="outlined-ensipainovuosi" label="Ensipainos" value={ensipainovuosi} onChange={(e) => handlePainoVuosi(e)}></TextField>
                            <TextField sx={{m: 1}} required id="outlined-painokset" label="Painokset" value={painokset} onChange={(e) => handlePainos(e)}></TextField>
                            <input type="file" name="takakansikuva" onChange={(e) => {setTakaKansiKuva(e.target.files[0])}}></input>
                            <input type="file" name="etukansikuva" onChange={(e) => setEtuKansiKuva(e.target.files[0])}></input>
                            <Button variant="outlined" type="submit">Lisää kirja</Button>
                        </form>               
                    

                    
                    
                    </div>
                }
                
                    
                        <TableContainer component={Paper} sx={{height: "65vh"}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nimi</TableCell>
                                    <TableCell>Järjestysnumero</TableCell>
                                    <TableCell>Kuvausteksti</TableCell>
                                    <TableCell>Kirjailija</TableCell>
                                    <TableCell>Piirtäjä</TableCell>
                                    <TableCell>Ensipainos</TableCell>
                                    <TableCell>Painokset</TableCell>
                                    <TableCell>{/* Namiskukkelit */}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kirjatTable.map && kirjatTable.map((row,index) =>(
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row"><NavLink to='/kirja' onClick={() => props.setKirjaId(row.id)}>{row.nimi}</NavLink></TableCell>
                                        <TableCell>{row.jarjestysnumero}</TableCell>
                                        <TableCell>{row.kuvausteksti}</TableCell>
                                        <TableCell>{row.kirjailija}</TableCell>
                                        <TableCell>{row.piirtajat}</TableCell>
                                        <TableCell>{row.ensipainovuosi}</TableCell>
                                        <TableCell>{row.painokset}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Container>
            </Container>
        </>
    )
}

export {Kokoelma}