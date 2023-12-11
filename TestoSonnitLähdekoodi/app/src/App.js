import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppiBaari } from './komponentit/Appbar';
import { Etusivu } from './komponentit/Etusivu';
import { Kirja } from './komponentit/kirja';
import { Kirjautuminen } from './komponentit/Kirjautuminen';
import { Kokoelma } from './komponentit/kokoelma';
import { Kokoelmat } from './komponentit/Kokoelmat';
import { OmaKirja }  from './komponentit/omakirja';
import { OmaKokoelma } from './komponentit/omakokoelma';
import { Omankokoelmankirjat } from './komponentit/omankokoelmankirjat';
import { Rekisteroityminen } from './komponentit/Rekisteroityminen';
import { Tietoa } from './komponentit/Tietoa';
import { Valikko } from './komponentit/Valikko';


function App() {

  const [laskuri,setLaskuri] = useState(0);

  const [kirjaSarjaId,setKirjaSarjaId] = useState(() => {
    const saved = sessionStorage.getItem("kirjaSarjaId");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  } );

  const [kirjaId,setKirjaId] = useState(() => {
    const saved = sessionStorage.getItem("kirjaId");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [kirjautumisToken,setKirjautumisToken] = useState(() => {
    const saved = sessionStorage.getItem("kirjautumisToken");
    const initialValue = saved !== undefined ? JSON.parse(saved) : false;
    return initialValue || "";
  });

  const [kayttajaId,setKayttajaId] = useState(() => {
    const saved = sessionStorage.getItem("kayttajaId");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [idOmatSarjat,setIdOmatSarjat] = useState(() => {
    const saved = sessionStorage.getItem("idOmatSarjat");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [idOmaKirja,setIdOmaKirja] = useState(() => {
    const saved = sessionStorage.getItem("idOmaKirja");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [admin,setAdmin] = useState(() => {
    const saved = sessionStorage.getItem("admin");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [kirjaSarjaTable,setKirjaSarjaTable] = useState(() => {
    const saved = sessionStorage.getItem("kokoelmat");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
});

const [kirjatTable,setKirjatTable] = useState(() => {
  const saved = sessionStorage.getItem("kirja");
  const initialValue = JSON.parse(saved);
  return initialValue || "";
});

  useEffect( () => {
    window.sessionStorage.setItem("kirjaSarjaId", JSON.stringify(kirjaSarjaId));
  },[kirjaSarjaId])

  useEffect(() => {
    window.sessionStorage.setItem("kirjautumisToken", JSON.stringify(kirjautumisToken));
  },[kirjautumisToken])

  useEffect( () => {
    window.sessionStorage.setItem("kayttajaId", JSON.stringify(kayttajaId));
  },[kayttajaId])

  useEffect(() => {
    window.sessionStorage.setItem("idOmatSarjat", JSON.stringify(idOmatSarjat));
  },[idOmatSarjat])

  useEffect(() => {
    window.sessionStorage.setItem("kirjaId", JSON.stringify(kirjaId));
  },[kirjaId])

  useEffect( () => {
    window.sessionStorage.setItem("idOmaKirja", JSON.stringify(idOmaKirja));
  },[idOmaKirja])

  useEffect(() => {
    window.sessionStorage.setItem("admin", JSON.stringify(admin));
  },[admin])

  useEffect ( () => {
    window.sessionStorage.setItem('kokoelmat', JSON.stringify(kirjaSarjaTable));
},[kirjaSarjaTable])

useEffect ( () => {
  window.sessionStorage.setItem('kirja', JSON.stringify(kirjatTable));
},[kirjatTable])

  return (

    <>

      <AppiBaari kirjautumisToken={kirjautumisToken} setKirjautumisToken={setKirjautumisToken} setAdmin={setAdmin} />
      <Valikko setLaskuri={setLaskuri} kirjautumisToken={kirjautumisToken} laskuri={laskuri} />

      <Routes>
        <Route path='/' element={<Etusivu />} />
        <Route path='tietoa' element={<Tietoa laskuri={laskuri} />} />
        <Route path='kokoelmat' element={<Kokoelmat  laskuri={laskuri} setId={setKirjaSarjaId} admin={admin} kirjaSarjaTable={kirjaSarjaTable} setKirjaSarjaTable={setKirjaSarjaTable} />} />
        <Route path='kirjautuminen' element={<Kirjautuminen setKirjautumisToken={setKirjautumisToken} kirjautumisToken={kirjautumisToken} setKayttajaId={setKayttajaId} setAdmin={setAdmin} />} />
        <Route path='rekisteroityminen' element={<Rekisteroityminen />} />
        <Route path='kokoelma' element={<Kokoelma id={kirjaSarjaId} setKirjaId={setKirjaId} admin={admin} kirjatTable={kirjatTable} setKirjatTable={setKirjatTable}/>} />
        <Route path='kirja' element={<Kirja  id={kirjaId} admin={admin}/>} />
        <Route path='omakokoelma' element={<OmaKokoelma kayttajaId={kayttajaId} laskuri={laskuri} setId={setIdOmatSarjat} />} />
        <Route path='omankokoelmankirjat' element={<Omankokoelmankirjat idOmatSarjat={idOmatSarjat} setIdOmatSarjat={setIdOmatSarjat} setIdOmaKirja={setIdOmaKirja}/>} />
        <Route path='omakirja' element={<OmaKirja idOmaKirja={idOmaKirja} />} />  
      </Routes>
    
    </>
    
    
  );
}

export {App}
