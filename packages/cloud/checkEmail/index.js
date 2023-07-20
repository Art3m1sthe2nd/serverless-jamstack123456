const { MongoClient } = require('mongodb');

async function main(args) {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    const newName = args.name; // Access the 'name' property from args
    const newContactEmail = args.email; // Access the 'email' property from args
    const newAbteilung = args.Abteilung; // Access the 'Abteilung' property from args
    const newAnliegen = args.anliegen; // Access the 'anliegen' property from args

    try {
        await client.connect();

        // If the email doesn't exist, insert it into the database
        await client.db("do-coffee").collection("contact-forms").insertOne({
            name: newName,
            contactEmail: newContactEmail,
            abteilung: newAbteilung,
            anliegen: newAnliegen
        });
        
        console.log(`Added ${newName} to the database.`);
        return { message: `Added ${newName} to the database.`, inserted: true };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the entry to the database." },
            "statusCode": 400
        };
    } finally {
        await client.close();
    }
}

module.exports.main = main;
