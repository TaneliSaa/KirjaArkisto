var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const multer = require('multer');
const path = require('path');

let portti = 3004;
let osoite = "127.0.0.1";
// http osoite: http://localhost:3004/kirja/

const storage = multer.diskStorage({
    destination:'./public/kuvat/',
    filename:(req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer( {
    storage : storage
});


app.use(bodyParser.json());

var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'kirjaarkisto',
    dateStrings : true,
});

app.post('/kuva', upload.fields([{name: 'takakansi', maxCount : 1}, {name: 'etukansi', maxCount : 1}]), (req, res) => {
    const name = req.files.filename;
    const query = 'INSERT INTO kuva (kuvanimi)  VALUES (?)';
    const query2 = 'INSERT INTO kuva SET?';

    let kuva = {
        "kuvanimi" : req.files.takakansi[0].filename,
        "tiedostonimi" : req.files.etukansi[0].filename
    }
    
  
    connection.query(query2, kuva, (error, result) => {
        
        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {
            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, name : name});
        }
    });
});

connection.connect((err)=>{
    if(err) {
        console.log("[Testosonnit] Yhteys vituillaan :(",err)
    } else {
        console.log("[Testosonnit] Yhteys pelittää...")
}
});

app.get('/kirjasarja', function (req,res) {
    let query2 = "SELECT * FROM kirjasarja WHERE idkirjasarja = ?"
    let query = "SELECT * from kirjasarja";
    let id = req.body.idkirjasarja;

    connection.query(query, function(error, result){

        if (error) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti: "Virhe koodissa."});

            console.log(query);

        } else {

            res.statusCode = 200;

            res.json(result);
        }
    });
});

app.get('/omatsarjat', function (req,res) {

    let query = "SELECT * from omatsarjat WHERE 1=1";

    let kayttajaid = req.query.kayttajaid;

    if (kayttajaid != "" )
        query = query+ " AND kayttajaid like '" + kayttajaid + "'";

    connection.query(query, function(error, result){

        if (error) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti: "Virhe koodissa."});

            console.log(query);

        } else {

            res.statusCode = 200;

            res.json(result);
        }
    });
});

app.post('/omatsarjat', (req,res) => {

    let kirjasarja = req.body.kirjasarja;
    let kuvaus = req.body.kuvaus;
    let kustantaja = req.body.kustantaja;
    let luokittelu = req.body.luokittelu;
    let kayttajaid = req.body.kayttajaid;

    let query = "INSERT INTO omatsarjat (kirjasarja, kuvaus, kustantaja, luokittelu, kayttajaid) values (?, ?, ?, ?, ?)";

    connection.query(query, [kirjasarja, kuvaus, kustantaja, luokittelu, kayttajaid], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {
            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, kirjasarja : kirjasarja, kuvaus : kuvaus, kustantaja : kustantaja, luokittelu : luokittelu, kayttajaid : kayttajaid});
        }

    });



})

app.post('/kirjasarja', (req,res) => {

    let kirjasarja = req.body.kirjasarja;
    let kuvaus = req.body.kuvaus;
    let kustantaja = req.body.kustantaja;
    let luokittelu = req.body.luokittelu;
    let query = "INSERT INTO kirjasarja (kirjasarja, kuvaus, kustantaja, luokittelu) values (?, ?, ?, ?)";

    connection.query(query, [kirjasarja, kuvaus, kustantaja, luokittelu], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {
            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, kirjasarja : kirjasarja, kuvaus : kuvaus, kustantaja : kustantaja, luokittelu : luokittelu});
        }

    });
})

app.post('/kayttaja', (req,res) => {

    console.log("/asiakas. BODY:" ,req.body);

    let kayttajaNimi = req.body.nimi;
    let kayttajaSalasana = req.body.salasana;

    let query = "INSERT INTO kayttaja (nimi, salasana) values (?, ?)";

    console.log("Post query:" + query);

    connection.query(query, [kayttajaNimi,kayttajaSalasana], function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json({id: result.insertid, kayttajaNimi : kayttajaNimi, kayttajaSalasana : kayttajaSalasana})
        }
    })


});

app.get('/kayttaja', function (req,res) {

    let nimi = req.query.nimi || '';

    let salasana = req.query.salasana || '';

    let admin = req.query.admin || '';

    let id = req.query.id;

    let query = "SELECT * from kayttaja WHERE 1=1";

    if (nimi != '') 
        
        query = query + " AND nimi= '" +  nimi + "'";

    if (salasana != '')

        query=query + " AND salasana= '" + salasana + "'";

    if (admin != '')

        query=query + " AND admin= '" + admin + "'";

    console.log("GET QUERY:" + query);
    

    connection.query(query, function(error, result){

        if ( error || result.length < 1  ) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti : "Virhe koodissa."});

            console.log(query);
            console.log(result)

        } else {


            

            res.statusCode = 200;

            res.json(result);
            console.log(result)

            
            
        }
    });
});



app.get('/kirja', function (req,res) {
    
    let idkirjasarja = req.query.idkirjasarja || "";

    let id = req.query.id || "";

    let query = "SELECT * from kirja WHERE 1=1";

    if (idkirjasarja != "")
        query=query + " AND idkirjasarja = '" + idkirjasarja + "'";

    if (id != "")
        query=query + " AND id='" + id + "'";    


    connection.query(query, function(error, result){

        if ( error ) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti : "Virhe koodissa."});

            console.log(query);

        } else {

            res.statusCode = 200;

            res.json(result);
            
        }
    });
    
});

app.get('/omakirja', function (req,res) {
    
    let idomatsarjat = req.query.idomatsarjat || "";

    let id = req.query.id || "";

    let query = "SELECT * from omakirja WHERE 1=1";

    if (idomatsarjat != "")
        query=query + " AND idomatsarjat = '" + idomatsarjat + "'";

    if (id != "")
        query=query + " AND id='" + id + "'";


    connection.query(query, function(error, result){

        if ( error ) {

            res.statusCode = 400;

            res.json({ tila: "Virhetila", viesti : "Virhe koodissa."});

            console.log(query);

        } else {

            res.statusCode = 200;

            res.json(result);
            
        }
    });
    
});

app.post('/omakirja',upload.fields([{name: 'takakansikuva', maxCount : 1}, {name: 'etukansikuva', maxCount : 1}]), (req,res) => {

    let nimi = req.body.nimi;
    let jarjestysnumero = req.body.jarjestysnumero;
    let kuvausTeksti = req.body.kuvausteksti;
    let kirjailija = req.body.kirjailija;
    let piirtajat = req.body.piirtajat;
    let ensipainovuosi = req.body.ensipainovuosi;
    let painokset = req.body.ensipainovuosi;
    let idomatsarjat = req.body.idomatsarjat;
    let takakansikuva = req.files.takakansikuva ? req.files.takakansikuva[0].filename : '';
    let etukansikuva = req.files.etukansikuva ? req.files.etukansikuva[0].filename : '';

    let kirja = {
        "nimi" : req.body.nimi,
        "jarjestysnumero" : req.body.jarjestysnumero,
        "kirjailija" : req.body.kirjailija,
        "idomatsarjat" : req.body.idomatsarjat,
        "kuntoluokka" : req.body.kuntoluokka,
        "takakansikuva" : takakansikuva,
        "etukansikuva" : etukansikuva,
        "hankintahinta" : req.body.hankintahinta,
        "hankintaaika" : req.body.hankintaaika,
        "esittelyteksti" : req.body.esittelyteksti,
        "painovuosi" : req.body.painovuosi,
        "painos" : req.body.painos
    }

    let query = "INSERT INTO omakirja (nimi, jarjestysnumero, kuvausteksti, kirjailija, piirtajat, ensipainovuosi, painokset, idomatsarjat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let query2 = "INSERT INTO omakirja SET?"

    connection.query(query2, kirja, function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json();
        }
    })

})

app.post('/kirja',upload.fields([{name: 'takakansikuva', maxCount : 1}, {name: 'etukansikuva', maxCount : 1}]), (req,res) => {


    console.log(req.files);
    let takakansikuva = req.files.takakansikuva ? req.files.takakansikuva[0].filename : '';
    let etukansikuva = req.files.etukansikuva ? req.files.etukansikuva[0].filename : '';

    

    
    let kirja = {
        "nimi" : req.body.nimi,
        "jarjestysnumero" : req.body.jarjestysnumero,
        "kuvausteksti" : req.body.kuvausteksti,
        "kirjailija" : req.body.kirjailija,
        "piirtajat" : req.body.piirtajat,
        "ensipainovuosi" : req.body.ensipainovuosi,
        "painokset" : req.body.painokset,
        "idkirjasarja" : req.body.idkirjasarja,
        "takakansikuva" : takakansikuva,
        "etukansikuva" : etukansikuva
    }
   
    let query2 = "INSERT INTO kirja SET?"

    connection.query(query2, kirja, function(error,result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 201;
            res.json(result);
        }
    })

})

app.delete('/deleteKokoelma/:id', (req, res) => {
    const id = req.params.id
    connection.query("DELETE FROM kirjasarja WHERE idkirjasarja = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.statusCode = 204;
            res.send(result);
        }
    })
})

app.put('/kirjasarja/:id', (req, res) => {
    let kirjasarja = req.body.kirjasarja;
    let kustantaja = req.body.kustantaja;
    let kuvaus = req.body.kuvaus;
    let luokittelu = req.body.luokittelu;
    let id = req.params.id;
    console.log("Päästiin servulle puttaamaan")

    let query = "UPDATE kirjasarja SET kirjasarja = ?, kustantaja = ?, kuvaus = ?, luokittelu = ? WHERE idkirjasarja = ?"

    connection.query(query,[kirjasarja,kustantaja,kuvaus, luokittelu, id], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.statusCode = 204;
            res.send(result);
            console.log(kirjasarja,kustantaja,kuvaus,luokittelu,id);
        }
    })
})

app.delete('/deleteOmatKokoelma/:id', (req, res) => {
    const id = req.params.id
    connection.query("DELETE FROM omatsarjat WHERE idomatsarjat = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.statusCode = 204;
            res.send(result);
        }
    })
})

app.put('/omatsarjat/:id', (req, res) => {
    let kirjasarja = req.body.kirjasarja;
    let kustantaja = req.body.kustantaja;
    let kuvaus = req.body.kuvaus;
    let luokittelu = req.body.luokittelu;
    let id = req.params.id;
    console.log("Päästiin servulle puttaamaan")

    let query = "UPDATE omatsarjat SET kirjasarja = ?, kustantaja = ?, kuvaus = ?, luokittelu = ? WHERE idomatsarjat = ?"

    connection.query(query,[kirjasarja,kustantaja,kuvaus, luokittelu, id], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.statusCode = 204;
            res.send(result);
            console.log(kirjasarja,kustantaja,kuvaus,luokittelu,id);
        }
    })
})

app.put('/omatsarjat/:id', (req, res) => {
    let kirjasarja = req.body.kirjasarja;
    let kustantaja = req.body.kustantaja;
    let kuvaus = req.body.kuvaus;
    let luokittelu = req.body.luokittelu;
    let id = req.params.id;
    console.log("Päästiin servulle puttaamaan")

    let query = "UPDATE omatsarjat SET kirjasarja = ?, kustantaja = ?, kuvaus = ?, luokittelu = ? WHERE idomatsarjat = ?"

    connection.query(query,[kirjasarja,kustantaja,kuvaus, luokittelu, id], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.statusCode = 204;
            res.send(result);
            console.log(kirjasarja,kustantaja,kuvaus,luokittelu,id);
        }
    })
})

app.put('/omakirja/:id', (req, res) => {

    let nimi = req.body.nimi;
    let jarjestysnumero = req.body.jarjestysnumero;
    let kirjailija = req.body.kirjailija;
    let kuntoluokka = req.body.kuntoluokka;
    let hankintahinta = req.body.hankintahinta;
    let hankintaaika = req.bodyhankintaaika;
    let esittelyteksti = req.body.esittelyteksti;
    let painovuosi = req.body.painovuosi;
    let painos = req.body.painos;
    let id = req.params.id;
    let query = "UPDATE omakirja SET nimi = ?, jarjestysnumero = ?, kirjailija = ?, kuntoluokka = ?, hankintahinta = ?, hankintaaika = ?, esittelyteksti = ?, painovuosi = ?, painos = ? where id = ?"

    connection.query(query,[nimi, jarjestysnumero, kirjailija, kuntoluokka, hankintahinta, hankintaaika, esittelyteksti, painovuosi, painos, id], function(error, result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 204;
            res.json(result);
        }
    })
})

app.delete('/omakirja/:id', (req, res) => {

    let id = req.params.id
    let query = "DELETE FROM omakirja WHERE id = ?";
    connection.query(query, id, (error, result) => {

         if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 204;
            res.json(result);
        }
    })
})

app.put('/kirja/:id', (req, res) => {
    let nimi = req.body.nimi;
    let jarjestysnumero = req.body.jarjestysnumero;
    let kuvausteksti = req.body.kuvausteksti;
    let kirjalija = req.body.kirjailija;
    let piirtajat = req.body.piirtajat;
    let ensipainovuosi = req.body.ensipainovuosi;
    let painokset = req.body.painokset;
    let id = req.params.id

    let query = "UPDATE kirja SET nimi = ?, jarjestysnumero = ?, kuvausteksti = ?, kirjailija = ?, piirtajat = ?, ensipainovuosi = ?, painokset = ? WHERE id = ?"
    
    connection.query(query, [nimi, jarjestysnumero, kuvausteksti, kirjalija, piirtajat, ensipainovuosi, painokset, id], function(error, result) {

        if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila: "Virhetila", viesti: "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 204;
            res.json(result);
        }
    })
})

app.delete('/kirja/:id', (req, res) => {

    let id = req.params.id
    let query = "DELETE FROM kirja WHERE id = ?";
    connection.query(query, id, (error, result) => {

         if (error) {

            console.log("VIRHE", error);
            res.statusCode = 400;
            res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
        }

        else {

            console.log("Tulos:" , result);
            res.statusCode = 204;
            res.json(result);
        }
    })
})

app.delete('/kayttaja/:id', (req,res) => {

    let id = req.params.id;
    let query = "DELETE FROM kayttaja WHERE id= ?";

    connection.query(query, id, (error, result) => {

        if (error) {

           console.log("VIRHE", error);
           res.statusCode = 400;
           res.json({tila : "Virhetila", viesti : "Virhe koodissa."});
       }

       else {

           console.log("Tulos:" , result);
           res.statusCode = 204;
           res.json(result);
       }
   })

})

app.listen(portti, osoite, () => {

});

module.exports = app