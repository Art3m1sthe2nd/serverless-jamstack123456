const { MongoClient } = require('mongodb');

async function main(args) {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    let newEmail = args.email;
    try {
        await client.connect();
        
        // Check if the email already exists in the database
        if (existingEmail) {
            console.log(`${newEmail} already exists in the database. Skipping insertion.`);
            return { message: `${newEmail} already exists in the database. Skipping insertion.`, inserted: false };
        }
        
        // If the email doesn't exist, insert it into the database
        await client.db("do-coffee").collection("email-list").insertOne({ subscriber: newEmail });
        console.log(`Added ${newEmail} to the database.`);
        return { message: `Added ${newEmail} to the database.`, inserted: true };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the email address to the database." },
            "statusCode": 400
        };
    } finally {
        await client.close();
    }
}

module.exports.main = main;
