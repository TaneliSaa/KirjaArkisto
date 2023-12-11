const app = require('../serveri')
const supertest = require('supertest')
const request = supertest(app)

//Käyttäjän testi data
let testinimi = "Testikeissi1";
let testisalasana = "Testikeissi2";
let testiadmin = 0;

//Kokoelman testi data
  let testikirjasarja = "Spiderman";
  let testikustantaja = "Stan Lee";
  let testikuvaus = "Spiderman seikkailee";
  let testiluokittelu = "Sarjakuva";

//Kirjan testi data
  let testikirjannimi = "testi";
  let testikirjanjarjestysnumero = 2;
  let testikirjankuvausteksti = "testi";
  let testikirjankirjailija = "testi";
  let testikirjanpiirtajat = "testi";
  let testikirjanensipainovuosi = 2023;
  let testikirjanpainokset = 2;
  let testikirjanidkirjasarja = 1;
  let testikirjantakakansikuva = '';
  let testikirjanetukansikuva = '';

//Oman kirjasarjan testi data
  let testiomakirjasarja = "Spiderman";
  let testiomakustantaja = "Stan Lee";
  let testiomakuvaus = "Spiderman seikkailee";
  let testiomaluokittelu = "Sarjakuva";
  

//Oman kirjan testi data
let testiomanimi = "Jau";
let testiomajarjestysnumero = 3;
let testiomakirjailija = "Jau";
let testiomaidomatsarjat = 3;
let testiomakuntoluokka = 4;
let testiomatakakansikuva = "";
let testiomaetukansikuva = "";
let testiomahankintahinta = 10
let testiomahankintaaika = "01.01.2010";
let testiomaesittelyteksti = "Jou"
let testiomapainovuosi = 1969;
let testiomapainos = 5;



describe("Käyttäjä testit eli rekisteröityminen", () => {

  test('Lisätään käyttäjä', async () => {

    let nimi = testinimi;
    let salasana = testisalasana;
    let admin = testiadmin;

    const response = await request.post("/kayttaja")
      .set('Content-type', 'application/json')
      .send({nimi: nimi, salasana : salasana, admin : admin});

    expect(response.status).toBe(201);


  })

  test('Haetaan kaikki käyttäjät ja tarkistetaan viimeksi lisätyn käyttäjän tiedot.', async () => {

    let nimi = testinimi;
    let salasana = testisalasana;
    let admin = testiadmin;

    const response = await request.get("/kayttaja");
    
    expect(response.status).toBe(200)

    const data = response.body;

    let kayttajat = null;

    if ( data.status  )
    {
        expect(data.status).toBe("OK");
        expect(data.message).toBe("");

        kayttajat = data.data;
    }
    else {
      kayttajat= data;
    }

    expect(kayttajat.length).toBeGreaterThan(0);

    //Tarkastetaan viimeisen käyttäjän tiedot
    const a = kayttajat[kayttajat.length - 1];
    console.log("a:", a)

    expect(a.nimi).toBe(nimi);
    expect(a.salasana).toBe(salasana);
    expect(a.admin).toBe(admin);
    
  });
});

describe("Käyttäjä testit tällä kertaa kirjautuminen", () => {

  test("Haetaan annetun käyttäjän tiedot tietokannasta ja katotaan täsmääkö ne.", async () => {


    let nimi = testinimi;
    let salasana = testisalasana;
    let admin = testiadmin;

    const response = await request.get('/kayttaja?nimi=' + nimi + '&salasana=' + salasana + '&admin=' + admin);

    expect(response.status).toBe(200)

    const data = response.body;

    let kayttajat = null;

    if ( data.status  )
    {
        expect(data.status).toBe("OK");
        expect(data.message).toBe("");

        kayttajat = data.data;
    }
    else {
      kayttajat = data;
    }

    expect(kayttajat.length).toBe(1);

    const a = kayttajat[0];
    console.log("a:", a)

    expect(a.nimi).toBe(nimi);
    expect(a.salasana).toBe(salasana);
    expect(a.admin).toBe(admin);

  })

})

describe("Kokoelmien lisääminen", () => {

  test("Lisätään uusi kokoelma", async () =>  {

    let kirjasarja = testikirjasarja;
    let kustantaja = testikustantaja;
    let kuvaus = testikuvaus;
    let luokittelu = testiluokittelu;

    const response = await request.post("/kirjasarja")
      .set('Content-type', 'application/json')
      .send({kirjasarja: kirjasarja, kustantaja : kustantaja, kuvaus : kuvaus, luokittelu : luokittelu});

    expect(response.status).toBe(201);

  })

})



describe("Kokoelmien hakeminen", () => {

  test("Haetaan kaikki kokoelmat ja tarkastetaan viimeksi lisätyn tiedot", async () => {


    let kirjasarja = testikirjasarja;
    let kustantaja = testikustantaja;
    let kuvaus = testikuvaus;
    let luokittelu = testiluokittelu;

    const response = await request.get("/kirjasarja");

    expect(response.status).toBe(200);

    const data = response.body;

    let kirjasarjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      kirjasarjat = data.data;
    } else {
      kirjasarjat = data;
    }

    expect(kirjasarjat.length).toBeGreaterThan(0);

    const a = kirjasarjat[kirjasarjat.length - 1];
    console.log("a:", a)

    expect(a.kirjasarja).toBe(kirjasarja);
    expect(a.kustantaja).toBe(kustantaja);
    expect(a.kuvaus).toBe(kuvaus);
    expect(a.luokittelu).toBe(luokittelu);

  })
})



describe("Kokoelmien muokkaaminen", () => {

  test("Testataan kirjasarjan muokkaamista", async () => {

    let kirjasarja = testikirjasarja;
    let kustantaja = testikustantaja;
    let kuvaus = testikuvaus;
    let luokittelu = testiluokittelu;
    let id = "";

    const response1 = await request.get("/kirjasarja");

    expect(response1.status).toBe(200);

    const data = response1.body;

    let kirjasarjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      kirjasarjat = data.data;
    } else {
      kirjasarjat = data;
    }

    expect(kirjasarjat.length).toBeGreaterThan(0);

    const a = kirjasarjat[kirjasarjat.length - 1];
    console.log("a:", a)
    id = a.idkirjasarja;

    expect(a.kirjasarja).toBe(kirjasarja);
    expect(a.kustantaja).toBe(kustantaja);
    expect(a.kuvaus).toBe(kuvaus);
    expect(a.luokittelu).toBe(luokittelu);

    testikirjasarja = "Hulk";
    testikustantaja = "Marvel";
    testikuvaus = "Hulk paiskoo tavaroita";
    testiluokittelu = "Dokkari";

    const response2 = await request.put("/kirjasarja/" + id)
      .set('Content-Type', 'application/json')
      .send({kirjasarja : testikirjasarja, kustantaja : testikustantaja, kuvaus : testikuvaus, luokittelu : testiluokittelu});

    expect(response2.status).toBe(204);

    const b = response2.body;

    console.log(b);

    expect(b).toStrictEqual({});


  })
})



describe("Testataan kokoelman poistamista", () => {

  test("Poistetaan kokoelma", async () => {

    let kirjasarja = testikirjasarja;
    let kustantaja = testikustantaja;
    let kuvaus = testikuvaus;
    let luokittelu = testiluokittelu;
    let id = "";

    const response1 = await request.get("/kirjasarja");

    expect(response1.status).toBe(200);

    const data = response1.body;

    let kirjasarjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      kirjasarjat = data.data;
    } else {
      kirjasarjat = data;
    }

    expect(kirjasarjat.length).toBeGreaterThan(0);

    const a = kirjasarjat[kirjasarjat.length - 1];
    console.log("a:", a)
    id = a.idkirjasarja;

    expect(a.kirjasarja).toBe(kirjasarja);
    expect(a.kustantaja).toBe(kustantaja);
    expect(a.kuvaus).toBe(kuvaus);
    expect(a.luokittelu).toBe(luokittelu);

    const response2 = await request.delete("/deleteKokoelma/" + id);

    expect(response2.status).toBe(204);


  })
})



describe("Testataan kirjan lisäämistä", () => {
  test("Kirjan lisäys", async () => {
    
    let nimi = testikirjannimi;
    let jarjestysnumero = testikirjanjarjestysnumero
    let kuvausteksti = testikirjankuvausteksti;
    let kirjailija = testikirjankirjailija;
    let piirtajat = testikirjanpiirtajat;
    let ensipainovuosi = testikirjanensipainovuosi;
    let painokset = testikirjanpainokset;
    let takakansikuva = '';
    let etukansikuva = '';

    const response = await request.post("/kirja")
      .set('Content-type', 'application/json')
      .field({nimi: nimi, jarjestysnumero: jarjestysnumero, kuvausteksti: kuvausteksti, kirjailija: kirjailija, piirtajat: piirtajat, ensipainovuosi: ensipainovuosi, painokset: painokset,takakansikuva: takakansikuva, etukansikuva: etukansikuva});

    expect(response.status).toBe(201);
    const data = response.body;
    
  });

});


describe("Kirjan testit", () => {

  test("Testataan kirjan hakemista", async () => {

    let nimi = testikirjannimi;
    let jarjestysnumero = testikirjanjarjestysnumero;
    let kuvausteksti = testikirjankuvausteksti;
    let kirjailija = testikirjankirjailija;
    let piirtajat = testikirjanpiirtajat;
    let ensipainovuosi = testikirjanensipainovuosi;
    let painokset = testikirjanpainokset;

    const response = await request.get("/kirja");

    expect(response.status).toBe(200)

    const data = response.body;

    let kirjat = null;

    if ( data.status  )
    {
        expect(data.status).toBe("OK");
        expect(data.message).toBe("");

        kirjat = data.data;
    }
    else {
      kirjat= data;
    }

    expect(kirjat.length).toBeGreaterThan(0);

    //Tarkastetaan viimeisen kirjan tiedot
    const a = kirjat[kirjat.length - 1];
    console.log("a:", a)

    expect(a.nimi).toBe(nimi);
    expect(a.jarjestysnumero).toBe(jarjestysnumero);
    expect(a.kuvausteksti).toBe(kuvausteksti);
    expect(a.kirjailija).toBe(kirjailija);
    expect(a.piirtajat).toBe(piirtajat);
    expect(a.ensipainovuosi).toBe(ensipainovuosi);
    expect(a.painokset).toBe(painokset);
   
  })
})



describe("Kirjan muokkaaminen", () => {

  test("Testataan kirjan muokkaamista", async () => {

    let nimi = testikirjannimi;
    let jarjestysnumero = testikirjanjarjestysnumero;
    let kuvausteksti = testikirjankuvausteksti;
    let kirjailija = testikirjankirjailija;
    let piirtajat = testikirjanpiirtajat;
    let ensipainovuosi = testikirjanensipainovuosi;
    let painokset = testikirjanpainokset;
    let id = "";

    const response1 = await request.get("/kirja");

    expect(response1.status).toBe(200);

    const data = response1.body;

    let kirjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      kirjat = data.data;
    } else {
      kirjat = data;
    }

    expect(kirjat.length).toBeGreaterThan(0);

    const a = kirjat[kirjat.length - 1];
    console.log("a:", a)
    id = a.id;

    expect(a.nimi).toBe(nimi);
    expect(a.jarjestysnumero).toBe(jarjestysnumero);
    expect(a.kuvausteksti).toBe(kuvausteksti);
    expect(a.kirjailija).toBe(kirjailija);
    expect(a.piirtajat).toBe(piirtajat);
    expect(a.ensipainovuosi).toBe(ensipainovuosi);
    expect(a.painokset).toBe(painokset);

    testikirjannimi = "muokattu";
    testikirjanjarjestysnumero = 5;
    testikirjankuvausteksti = "muokattu";
    testikirjankirjailija = "muokattu";
    testikirjanpiirtajat = "muokattu";
    testikirjanensipainovuosi = 2020;
    testikirjanpainokset = 1;
    
    const response2 = await request.put("/kirja/" + id)
      .set('Content-Type', 'application/json')
      .send({nimi: testikirjannimi, jarjestysnumero: testikirjanjarjestysnumero, kuvausteksti: testikirjankuvausteksti, kirjailija: testikirjankirjailija, piirtajat: testikirjanpiirtajat, ensipainovuosi: testikirjanensipainovuosi, painokset: testikirjanpainokset});


    expect(response2.status).toBe(204);

    const b = response2.body;

    console.log(b);

    expect(b).toStrictEqual({});

  })
})


describe("Testataan kirjan poistamista", () => {

  test("Poistetaan kirja", async () => {

    let nimi = testikirjannimi;
    let jarjestysnumero = testikirjanjarjestysnumero;
    let kuvausteksti = testikirjankuvausteksti;
    let kirjailija = testikirjankirjailija;
    let piirtajat = testikirjanpiirtajat;
    let ensipainovuosi = testikirjanensipainovuosi;
    let painokset = testikirjanpainokset;
    let id = "";

    const response1 = await request.get("/kirja");

    expect(response1.status).toBe(200);

    const data = response1.body;

    let kirjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      kirjat = data.data;
    } else {
      kirjat = data;
    }

    expect(kirjat.length).toBeGreaterThan(0);

    const a = kirjat[kirjat.length - 1];
    console.log("a:", a)
    id = a.id;
    
    expect(a.nimi).toBe(nimi);
    expect(a.jarjestysnumero).toBe(jarjestysnumero);
    expect(a.kuvausteksti).toBe(kuvausteksti);
    expect(a.kirjailija).toBe(kirjailija);
    expect(a.piirtajat).toBe(piirtajat);
    expect(a.ensipainovuosi).toBe(ensipainovuosi);
    expect(a.painokset).toBe(painokset);
    

    const response2 = await request.delete("/kirja/" + id);

    expect(response2.status).toBe(204);

  })
})



describe("Oman kirjasarjan lisääminen", () => {

  test("Lisätään uusi oma kirjasarja", async () =>  {

    const response2 = await request.get("/kayttaja");
    
    const data = response2.body;

    let kayttajat = null;
    kayttajat = data;
    const a = kayttajat[kayttajat.length - 1];
    
    
    let kirjasarja = testiomakirjasarja;
    let kustantaja = testiomakustantaja;
    let kuvaus = testiomakuvaus;
    let luokittelu = testiomaluokittelu;
    let kayttajaid = a.id;

    const response = await request.post("/omatsarjat")
      .set('Content-type', 'application/json')
      .send({kirjasarja: kirjasarja, kustantaja : kustantaja, kuvaus : kuvaus, luokittelu : luokittelu, kayttajaid : kayttajaid});

    expect(response.status).toBe(201);

  })

})

describe("Oman kirjasarjan hakeminen", () => {

  test("Haetaan oma kirjasarja", async () => {

    const response2 = await request.get("/kayttaja");
    
    const data2 = response2.body;

    let kayttajat = null;
    kayttajat = data2;
    const b = kayttajat[kayttajat.length - 1];
    

    let kirjasarja = testiomakirjasarja;
    let kustantaja = testiomakustantaja;
    let kuvaus = testiomakuvaus;
    let luokittelu = testiomaluokittelu;
    let kayttajaid = b.id;

    const response = await request.get("/omatsarjat?kayttajaid=" + kayttajaid);

    expect(response.status).toBe(200);

    const data = response.body;

    let omatsarjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      omatsarjat = data.data;
    } else {
      omatsarjat = data;
    }

    expect(omatsarjat.length).toBeGreaterThan(0);

    const a = omatsarjat[omatsarjat.length - 1];
    console.log("a:", a)

    expect(a.kirjasarja).toBe(kirjasarja);
    expect(a.kustantaja).toBe(kustantaja);
    expect(a.kuvaus).toBe(kuvaus);
    expect(a.luokittelu).toBe(luokittelu);
    expect(a.kayttajaid).toBe(kayttajaid);

  })
})



describe("Oman kirjasarjan muokkaaminen", () => {

  test("Testataan oman kirjasarjan muokkaamista", async () => {

    const response3 = await request.get("/kayttaja");
    
    const data3 = response3.body;

    let kayttajat = null;
    kayttajat = data3;
    const c = kayttajat[kayttajat.length - 1];
    
    let kirjasarja = testiomakirjasarja;
    let kustantaja = testiomakustantaja;
    let kuvaus = testiomakuvaus;
    let luokittelu = testiomaluokittelu;
    let kayttajaid = c.id;
    let id ="";
    

    const response1 = await request.get("/omatsarjat?kayttajaid=" + kayttajaid);

    expect(response1.status).toBe(200);

    const data = response1.body;

    let omatsarjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      omatsarjat = data.data;
    } else {
      omatsarjat = data;
    }

    expect(omatsarjat.length).toBeGreaterThan(0);

    const a = omatsarjat[omatsarjat.length - 1];
    console.log("a:", a)
    id = a.idomatsarjat;

    expect(a.kirjasarja).toBe(kirjasarja);
    expect(a.kustantaja).toBe(kustantaja);
    expect(a.kuvaus).toBe(kuvaus);
    expect(a.luokittelu).toBe(luokittelu);
    expect(a.kayttajaid).toBe(kayttajaid);

    testiomakirjasarja = "Muokattu omakirja";
    testiomakustantaja = "Muokattu omakustantaja";
    testiomakuvaus = "Muokattu kuvaus";
    testiomaluokittelu = "Muokattu luokittelu";

    const response2 = await request.put("/omatsarjat/" + id)
      .set('Content-Type', 'application/json')
      .send({kirjasarja : testiomakirjasarja, kustantaja : testiomakustantaja, kuvaus : testiomakuvaus, luokittelu : testiomaluokittelu});

    expect(response2.status).toBe(204);

    const b = response2.body;

    console.log(b);

    expect(b).toStrictEqual({});


  })
})



describe("Testataan oman kirjasarjan poistamista", () => {

  test("Poistetaan oma kirjasarja", async () => {

    const response4 = await request.get("/kayttaja");
    
    const data4 = response4.body;

    let kayttajat = null;
    kayttajat = data4;
    const v = kayttajat[kayttajat.length - 1];
    
    let kirjasarja = testiomakirjasarja;
    let kustantaja = testiomakustantaja;
    let kuvaus = testiomakuvaus;
    let luokittelu = testiomaluokittelu;
    let kayttajaid = v.id;
    let id= "";

    const response = await request.get("/omatsarjat?kayttajaid=" + kayttajaid);

    expect(response.status).toBe(200);

    const data = response.body;

    let omatsarjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      omatsarjat = data.data;
    } else {
      omatsarjat = data;
    }

    expect(omatsarjat.length).toBeGreaterThan(0);

    const a = omatsarjat[omatsarjat.length - 1];
    id = a.idomatsarjat;
    console.log("a:", a)

    expect(a.kirjasarja).toBe(kirjasarja);
    expect(a.kustantaja).toBe(kustantaja);
    expect(a.kuvaus).toBe(kuvaus);
    expect(a.luokittelu).toBe(luokittelu);
    expect(a.kayttajaid).toBe(kayttajaid);

    const response2 = await request.delete("/deleteOmatKokoelma/" + id);

    expect(response2.status).toBe(204);

  })
})



describe("Testataan omankirjan lisäämistä", () => {

  test("Oman kirjan lisäys", async () => {
    
    let nimi = testiomanimi;
    let jarjestysnumero = testiomajarjestysnumero;
    let kirjailija = testiomakirjailija;
    let idomatsarjat = testiomaidomatsarjat;
    let kuntoluokka = testiomakuntoluokka;
    let takakansikuva = "";
    let etukansikuva = "";
    let hankintahinta = testiomahankintahinta
    let hankintaaika = testiomahankintaaika;
    let esittelyteksti = testiomaesittelyteksti
    let painovuosi = testiomapainovuosi;
    let painos = testiomapainos;

    const response = await request.post("/omakirja")
      .set('Content-type', 'application/json')
      .field({nimi: nimi, jarjestysnumero: jarjestysnumero, kirjailija: kirjailija, kuntoluokka : kuntoluokka, takakansikuva : takakansikuva, etukansikuva : etukansikuva, hankintahinta : hankintahinta, hankintaaika : hankintaaika, esittelyteksti : esittelyteksti, painovuosi : painovuosi, painos : painos});

    expect(response.status).toBe(201);
    const data = response.body;
    
  });

});



describe("Omankirjan testit", () => {

  test("Testataan omankirjan hakemista", async () => {

    let nimi = testiomanimi;
    let jarjestysnumero = testiomajarjestysnumero;
    let kirjailija = testiomakirjailija;
    let idomatsarjat = testiomaidomatsarjat;
    let kuntoluokka = testiomakuntoluokka;
    let takakansikuva = "";
    let etukansikuva = "";
    let hankintahinta = testiomahankintahinta
    let hankintaaika = "2001-01-20"
    let esittelyteksti = testiomaesittelyteksti
    let painovuosi = testiomapainovuosi;
    let painos = testiomapainos;

    const response = await request.get("/omakirja");

    expect(response.status).toBe(200)

    const data = response.body;

    let omatkirjat = null;

    if ( data.status  )
    {
        expect(data.status).toBe("OK");
        expect(data.message).toBe("");

        omatkirjat = data.data;
    }
    else {
      omatkirjat= data;
    }

    expect(omatkirjat.length).toBeGreaterThan(0);

    //Tarkastetaan viimeisen kirjan tiedot
    const a = omatkirjat[omatkirjat.length - 1];
    console.log("a:", a)

    expect(a.nimi).toBe(nimi);
    expect(a.jarjestysnumero).toBe(jarjestysnumero);
    expect(a.kirjailija).toBe(kirjailija);
    //expect(a.idomatsarjat).toBe(idomatsarjat);
    expect(a.kuntoluokka).toBe(kuntoluokka);
    expect(a.hankintahinta).toBe(hankintahinta);
    expect(a.hankintaaika).toBe(hankintaaika);
    expect(a.esittelyteksti).toBe(esittelyteksti);
    expect(a.painovuosi).toBe(painovuosi);
    expect(a.painos).toBe(painos);
   
  })
})



describe("Omankirjan muokkaaminen", () => {

  test("Testataan omankirjan muokkaamista", async () => {

    let nimi = testiomanimi;
    let jarjestysnumero = testiomajarjestysnumero;
    let kirjailija = testiomakirjailija;
    let idomatsarjat = testiomaidomatsarjat;
    let kuntoluokka = testiomakuntoluokka;
    let takakansikuva = "";
    let etukansikuva = "";
    let hankintahinta = testiomahankintahinta
    let hankintaaika = "2001-01-20";
    let esittelyteksti = testiomaesittelyteksti
    let painovuosi = testiomapainovuosi;
    let painos = testiomapainos;
    let id = "";

    const response1 = await request.get("/omakirja");

    expect(response1.status).toBe(200);

    const data = response1.body;

    let omatkirjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      omatkirjat = data.data;
    } else {
      omatkirjat = data;
    }

    expect(omatkirjat.length).toBeGreaterThan(0);

    const a = omatkirjat[omatkirjat.length - 1];
    console.log("a:", a)
    id = a.id;

    expect(a.nimi).toBe(nimi);
    expect(a.jarjestysnumero).toBe(jarjestysnumero);
    expect(a.kirjailija).toBe(kirjailija);
    //expect(a.idomatsarjat).toBe(idomatsarjat);
    expect(a.kuntoluokka).toBe(kuntoluokka);
    expect(a.hankintahinta).toBe(hankintahinta);
    expect(a.hankintaaika).toBe(hankintaaika);
    expect(a.esittelyteksti).toBe(esittelyteksti);
    expect(a.painovuosi).toBe(painovuosi);
    expect(a.painos).toBe(painos);

    testiomanimi = "Muokattu";
    testiomajarjestysnumero = 5;
    testiomakirjailija = "Muokattu";
    testiomakuntoluokka = 2;
    testiomahankintahinta = 8
    testiomahankintaaika = null;
    testiomaesittelyteksti = "Muokattu"
    testiomapainovuosi = 1900;
    testiomapainos = 2;
    
    const response2 = await request.put("/omakirja/" + id)
      .set('Content-Type', 'application/json')
      .send({nimi: testiomanimi, jarjestysnumero: testiomajarjestysnumero, kirjailija: testiomakirjailija, kuntoluokka : testiomakuntoluokka, hankintahinta : testiomahankintahinta, hankintaaika : testiomahankintaaika, esittelyteksti : testiomaesittelyteksti, painovuosi : testiomapainovuosi, painos : testiomapainos});


    expect(response2.status).toBe(204);

    const b = response2.body;

    console.log(b);

    expect(b).toStrictEqual({});

  })
})



describe("Testataan omankirjan poistamista", () => {

  test("Poistetaan omakirja", async () => {

    let nimi = testiomanimi;
    let jarjestysnumero = testiomajarjestysnumero;
    let kirjailija = testiomakirjailija;
    let idomatsarjat = testiomaidomatsarjat;
    let kuntoluokka = testiomakuntoluokka;
    let takakansikuva = "";
    let etukansikuva = "";
    let hankintahinta = testiomahankintahinta
    let hankintaaika = testiomahankintaaika;
    let esittelyteksti = testiomaesittelyteksti
    let painovuosi = testiomapainovuosi;
    let painos = testiomapainos;
    let id = "";

    
    const response1 = await request.get("/omakirja");

    expect(response1.status).toBe(200);

    const data = response1.body;

    let omatkirjat = null;

    if (data.status) {
      expect(data.status).toBe("OK");
      expect(data.message).toBe("");
      omatkirjat = data.data;
    } else {
      omatkirjat = data;
    }

    expect(omatkirjat.length).toBeGreaterThan(0);

    const a = omatkirjat[omatkirjat.length - 1];
    console.log("a:", a)
    id = a.id;
    

    expect(a.nimi).toBe(nimi);
    expect(a.jarjestysnumero).toBe(jarjestysnumero);
    expect(a.kirjailija).toBe(kirjailija);
    //expect(a.idomatsarjat).toBe(idomatsarjat);
    expect(a.kuntoluokka).toBe(kuntoluokka);
    expect(a.hankintahinta).toBe(hankintahinta);
    expect(a.hankintaaika).toBe(hankintaaika);
    expect(a.esittelyteksti).toBe(esittelyteksti);
    expect(a.painovuosi).toBe(painovuosi);
    expect(a.painos).toBe(painos);

    const response2 = await request.delete("/omakirja/" + id);

    expect(response2.status).toBe(204);

  })
})

describe("Poistetaan käyttäjä testien takia", () => {

  test("Haetaan annetun käyttäjän tiedot tietokannasta ja poistetaan se.", async () => {


    let nimi = testinimi;
    let salasana = testisalasana;
    let admin = testiadmin;
    let id = "";

    const response = await request.get('/kayttaja?nimi=' + nimi + '&salasana=' + salasana + '&admin=' + admin);

    expect(response.status).toBe(200)

    const data = response.body;

    let kayttajat = null;

    if ( data.status  )
    {
        expect(data.status).toBe("OK");
        expect(data.message).toBe("");

        kayttajat = data.data;
    }
    else {
      kayttajat = data;
    }

    expect(kayttajat.length).toBe(1);

    const a = kayttajat[kayttajat.length -1];
    console.log("a:", a)
    id = a.id;

    expect(a.nimi).toBe(nimi);
    expect(a.salasana).toBe(salasana);
    expect(a.admin).toBe(admin);

    const response2 = await request.delete("/kayttaja/" + id);

    expect(response2.status).toBe(204);
  })
})