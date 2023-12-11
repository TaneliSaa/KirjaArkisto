import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

const AppiBaari = (props) =>  {

    const [naytaRekisteroityminen,setNaytaRekisteroityminen] = useState(true);

    useEffect( () => {


        if (props.kirjautumisToken == true) {

            setNaytaRekisteroityminen(false);
        }

    },[props.kirjautumisToken])

    const handleKirjautumisToken = () => {

        props.setKirjautumisToken(false);
    }

    const handleAdmin = () => {
        props.setAdmin(false);
    }
    return (

        <AppBar position="relative" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#00487C"}}>
            <Toolbar>
                <Box display='flex' flexGrow={1}>
                    <Button variant="h6" href="/" >Kirja-arkisto</Button>
                </Box>

                { naytaRekisteroityminen &&
                    <Button variant="h6" href="rekisteroityminen">Rekisteröidy</Button>
                }
                    
                {props.kirjautumisToken == false  &&
                    <Button data-testid="appbar_kirjaudu" variant="h6" href="kirjautuminen">Kirjaudu sisään</Button>
                }

                { props.kirjautumisToken == true  &&
                    <Button data-testid="appbar_kirjaudu_ulos" variant="h6" href="kirjautuminen" onClick={() => {handleKirjautumisToken() ; handleAdmin()}}>Kirjaudu ulos</Button>

                }
            </Toolbar>
        </AppBar>
    )
}
export {AppiBaari}