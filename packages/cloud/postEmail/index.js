const { MongoClient } = require('mongodb');

async function main(args, context) {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    let newEmail = args.email;
    try {
        await client.connect();
        
        // Check if the email already exists in the database
        const existingEmail = await client.db("do-coffee").collection("email-list").findOne({ subscriber: newEmail });
        if (existingEmail) {
            console.log(`${newEmail} already exists in the database. Skipping insertion.`);
            context.status(400);
            Response = false;
            return  {
                "body" : "Hallo world"
              }
        }
        
        // If the email doesn't exist, insert it into the database
        await client.db("do-coffee").collection("email-list").insertOne({ subscriber: newEmail });
        console.log(`Added ${newEmail} to the database.`);
        return { "body" : "Hallo world" };
    } catch (e) {
        console.error(e);
        context.status(500).fail({ "error": "There was a problem adding the email address to the database." });
    } finally {
         client.close();
         return { "body" : "Hallo world" }; 
    }
     
}

module.exports.main = main;
