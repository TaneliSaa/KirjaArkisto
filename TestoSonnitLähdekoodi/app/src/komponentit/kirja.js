import { Container, Typography, Button, TextField, Dialog, DialogActions, DialogTitle, Box } from "@mui/material";
import { useEffect, useState, Link } from "react";
import { useHref, useNavigate } from "react-router-dom";

const Kirja = (props) => {


    const [kirjanNimi,setKirjanNimi] = useState("");
    const [jarjestysnumero, setJarjestysnumero] = useState("")
    const [kirjailijat,setKirjailijat] = useState("");
    const [piirtajat,setPiirtajat] = useState("");
    const [ensipainovuosi,setEnsipainovuosi] = useState("");
    const [kuvausTeksti,setKuvausTeksti] = useState("");
    const [painokset,setPainokset] = useState("");
    const [painosVuosi, setPainosVuosi] = useState("");
    const [query,setQuery] = useState("?id=" + props.id);
    const [takaKansiKuva,setTakaKansiKuva] = useState({});
    const [etuKansiKuva,setEtuKansiKuva] = useState({});
    const [muokkaaKirja,setMuokkaaKirja] = useState(false);
    const [muokkaaIidee,setMuokkaaIidee] = useState(props.id);
    const [takaKannenSrc,setTakaKannenSrc] = useState("");
    const [etuKannenSrc,setEtuKannenSrc] = useState("");
    const takaKansi = window.location.origin + "/kuvat/" + takaKannenSrc;
    const etukansi = window.location.origin + "/kuvat/" + etuKannenSrc;
    const [muokkaaKirjanNimi, setMuokkaaKirjanNimi] = useState("Penishuora");
    const [muokkaaKirjanJärjestysNro, setMuokkaaKirjanJärjestysNro] = useState("")
    const [muokkaaKirjanKirjailija, setMuokkaaKirjanKirjailija] = useState("");
    const [muokkaaKirjanPiirtäjä, setMuokkaaKirjanPiirtäjä] = useState("");
    const [muokkaaKirjanPainoVuosi, setMuokkaaKirjanPainosVuosi] = useState("");
    const [muokkaaKirjanKuvaus, setMuokkaaKirjanKuvaus] = useState("");
    const [muokkaaKirjanPainos, setMuokkaaKirjanPainos] = useState("");
    const [muokkaaKirjanEnsiPainosVuosi, setMuokkaaKirjanEnsiPainosVuosi] = useState("")
    const [muokkaaLaskuri, setMuokkaaLaskuri] = useState(0);
    const [poistaLaskuri, setPoistaLaskuri] = useState(0);
    const [muokkaaVarmistus, setMuokkaaVarmistus] = useState("");
    const [poistaVarmistus, setPoistaVarmistus] = useState("");
  
    const navigoi = useNavigate("");


    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/kirja" + query);

            let c = await response.json();

            c.map((item,index) => {

                setKirjanNimi(item.nimi);
                setJarjestysnumero(item.jarjestysnumero);
                setKirjailijat(item.kirjailija);
                setPiirtajat(item.piirtajat);
                setEnsipainovuosi(item.ensipainovuosi);
                setKuvausTeksti(item.kuvausteksti);
                setPainokset(item.painokset);
                setPainosVuosi(item.ensipainovuosi);
                setTakaKannenSrc(item.takakansikuva);
                setEtuKannenSrc(item.etukansikuva);
                
            });

        }


        haeTiedot();

    },[props.id])

    useEffect( () => {

        const Muokkaa = async () => {
            
            fetch("http://localhost:3004/kirja/"+props.id, {
                
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    nimi : muokkaaKirjanNimi,
                    jarjestysnumero : muokkaaKirjanJärjestysNro,
                    kuvausteksti : muokkaaKirjanKuvaus,
                    kirjailija : muokkaaKirjanKirjailija,
                    piirtajat : muokkaaKirjanPiirtäjä,
                    ensipainovuosi : muokkaaKirjanPainoVuosi,
                    painokset : muokkaaKirjanPainos,
                })
            });
        }

        if (muokkaaLaskuri > 0) {
            Muokkaa();     
        }

        setMuokkaaKirjanNimi("")
        setMuokkaaKirjanJärjestysNro("")
        setMuokkaaKirjanKuvaus("")
        setMuokkaaKirjanKirjailija("")
        setMuokkaaKirjanPiirtäjä("")
        setMuokkaaKirjanPainosVuosi("")
        setMuokkaaKirjanPainos("")

    },[muokkaaLaskuri])

    const fileOnChangeTakaKansi = (event) => {
        setTakaKansiKuva(event.target.files[0]);
        
    }

    const sendTakaKansi = (event) => {
        let formData = new FormData();
        formData.append('takakansi', takaKansiKuva);
        fetch("http://localhost:3004/kirja/" + muokkaaIidee, {
          method : "put",
          body : formData,
        });

        
    }

    const fileOnChangeEtuKansi = (event) => {
        setTakaKansiKuva(event.target.files[0]);
        
    }

    const sendEtuKansi = (event) => {
        let formData = new FormData();
        formData.append('etukansi', etuKansiKuva);
        fetch("http://localhost:3004/kirja/" + muokkaaIidee, {
          method : "put",
          body : formData,
        });

        
    }

    
    /*
    const handleMuokkaus = () => {
        setMuokkaa(true);
    }
    */
    
    const toggleMuokkaaKirja = () => {
        setMuokkaaKirja(!muokkaaKirja)

    }

    const peruKirjaMuokkaus = () => {
        setMuokkaaKirjanNimi("")
        setMuokkaaKirjanKirjailija("")
        setMuokkaaKirjanPiirtäjä("")
        setMuokkaaKirjanPainosVuosi("")
        setMuokkaaKirjanKuvaus("")
        setMuokkaaKirjanPainos("")

        toggleMuokkaaKirja()
    }

    const handleSubmit = () => {
        setMuokkaaLaskuri(muokkaaLaskuri+1)
    }

    const poistaKirja = () => {
        fetch("http://localhost:3004/kirja/"+props.id,{

            method : 'DELETE'}).then((response)=> {
            })
    }

    const poistaDialog = () => {
        setPoistaVarmistus(!poistaVarmistus);
    }

    const muokkaaDialog = () => {
        setMuokkaaVarmistus(!muokkaaVarmistus);  
    }

    const muokkaaDialogForm = () => {
        setMuokkaaLaskuri(muokkaaLaskuri+1)
        muokkaaDialog()
    }

    const poistaDialogForm = () => {
        poistaKirja()
        navigoi("/kokoelma")
    }
    

    return (

        <>
            <Container maxWidth={false} sx={{ bgcolor: "#D4EBEC", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {!muokkaaKirja ? 
                <div>
                    <Typography variant="subtitle1" align="center" sx={{fontWeight: "bold"}}>{kirjanNimi}</Typography>
                    <Typography variant="subtitle1" align="center">järjestysnumero: {jarjestysnumero}</Typography>
                    <Typography variant="subtitle1" align="center">kirjailijat: {kirjailijat}</Typography>
                    <Typography variant="subtitle1" align="center">piirtäjät: {piirtajat}</Typography>
                    <Typography variant="subtitle1" align="center">ensipainos: {ensipainovuosi}</Typography>
                    <Typography variant="subtitle1" align="center">kuvausteksti: {kuvausTeksti}</Typography>
                    <Typography variant="subtitle1" align="center">painokset: {painokset}</Typography>

                    { props.admin &&
                        <div>
                            
                            <Button sx={{ml: 15}} variant="contained" onClick={() => {toggleMuokkaaKirja() ; setMuokkaaKirjanNimi(kirjanNimi) ; setMuokkaaKirjanJärjestysNro(jarjestysnumero) ; setMuokkaaKirjanKirjailija(kirjailijat) ; setMuokkaaKirjanPiirtäjä(piirtajat) ; setMuokkaaKirjanPainosVuosi(ensipainovuosi) ; setMuokkaaKirjanKuvaus(kuvausTeksti) ;setMuokkaaKirjanPainos(painokset)}}>Muokkaa</Button>
                            <Button sx={{ml: 0}} variant="contained" onClick={() => poistaDialog()}>Poista</Button>
                        </div>

                    }

                    <img src={takaKansi} height={200} width={200} />
                    <img src={etukansi} height={200} width={200} />
                </div>
                : 
                
                <Container sx={{ml: 90}}> 

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan nimi" defaultValue={muokkaaKirjanNimi} onChange={(e) => setMuokkaaKirjanNimi(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan järjestysnro" defaultValue={muokkaaKirjanJärjestysNro} onChange={(e) => setMuokkaaKirjanJärjestysNro(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan kuvausteksti" defaultValue={muokkaaKirjanKuvaus} onChange={(e) => setMuokkaaKirjanKuvaus(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan kirjailijat" defaultValue={muokkaaKirjanKirjailija} onChange={(e) => setMuokkaaKirjanKirjailija(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan piirtäjät" defaultValue={muokkaaKirjanPiirtäjä} onChange={(e) => setMuokkaaKirjanPiirtäjä(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan ensipainosvuosi" defaultValue={muokkaaKirjanPainoVuosi} onChange={(e) => setMuokkaaKirjanPainosVuosi(e.target.value)}></TextField>
                </div>

                <div>
                    <TextField sx={{ml: 1,p: 2}} label="Kirjan painokset" defaultValue={muokkaaKirjanPainos} onChange={(e) => setMuokkaaKirjanPainos(e.target.value)}></TextField>
                </div>

                        <div>
                        <Button sx={{ml: 1}} variant="contained" onClick={() => muokkaaDialog()}>Muokkaa</Button>    
                        </div>
                        <div>   
                        <Button sx={{ml: 1}} variant="contained" onClick={() => peruKirjaMuokkaus()}>Peru muokkaus</Button>
                        </div> 
                
                </Container>}
                
                
                
                
                {/*
                {muokkaa == true &&
                    <div>
                        <input type="file" onChange={fileOnChangeTakaKansi}></input>
                        <button onClick={sendTakaKansi}>Päivitä Takakansi</button>
                        <input type="file" onChange={fileOnChangeEtuKansi}></input>
                        <button onClick={sendEtuKansi}>Päivitä Etukansi</button>
                        

                        <button onClick={() => setMuokkaa(false)}>Sulje muokkaus</button>
                    </div>

                }
                */}

                <Dialog open={muokkaaVarmistus}>
                    <DialogTitle>Muokkaa kirjaa</DialogTitle>
                    <DialogActions>
                        <form onSubmit={muokkaaDialogForm}>
                            <Button type="submit">Muokkaa</Button>
                            <Button onClick={() => {peruKirjaMuokkaus() ; muokkaaDialog() ; muokkaaKirja() }}>Peru muokkaus</Button>
                        </form>
                    </DialogActions>
               </Dialog>

               <Dialog open={poistaVarmistus}>
                    <DialogTitle>Poista kirja</DialogTitle>
                    <DialogActions>
                        <form onSubmit={poistaDialogForm}>
                            <Button type="submit">Poista kirja</Button>
                            <Button onClick={() => {poistaDialog()}}>Peru poisto</Button>
                        </form>
                    </DialogActions>
               </Dialog>
                

                
            </Container>
        
        
        </>

    )
}

export {Kirja}