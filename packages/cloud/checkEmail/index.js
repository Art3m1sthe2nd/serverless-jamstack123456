const { Console } = require('console');
const { MongoClient } = require('mongodb');

async function main(args, context) {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);
    
    let newName = args.name;
    let newContactEmail = args.contactEmail;
    let newAbteilung = args.Abteilung;
    let newAnliegen = args.anliegen;
    try {
        let inDB;
        await client.connect();
        await client.db("do-coffee").collection("contact-forms").insertOne({  Name: newName ,
             Email: newContactEmail, 
             Abteilung: newAbteilung, 
             Anliegen: newAnliegen  });
            console.log(`Added ${newEmail} to the database.`);
        }
     catch (e) {
        console.error(e);
        context.status(500).fail({ "error": "There was a problem adding the email address to the database." });
    } finally {
        console.log("inDB ", inDB);
         client.close();
         return { "body" : inDB }; 
    }

}

module.exports.main = main;
