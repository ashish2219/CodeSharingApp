import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid"; //import UUID generator

export async function POST(req) {
    let client;

    try {
        const body = await req.json(); // Extract the request body
        const { data, language, theme, ContainerTheme } = body; // Extract the data from the request body

        if (!data) {
            return new Response(JSON.stringify({message: "Data is required"}), {
                status: 400,                                                        // return an error response if data is not provided
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        client = new MongoClient(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connect();

        //choose a name for database
        const database = client.db("code-sharing-app");

        //choose a name for your collection
        const collection = database.collection("code-snippets");

        const snippetId = uuidv4(); // generate a unique ID for the snippet
        const shareableLink = `${process.env.NEXT_PUBLIC_APP_URL}/view/${snippetId}`; // generate a shareable link for the snippet

        await collection.insertOne({ id: snippetId, data, language, theme, ContainerTheme }); // save the data to the database

        return new Response(JSON.stringify( 
            {message: "Data saved successfully", shareableLink}), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        }); // return a success response if the data is saved successfully
    } catch (error) {
        console.error("Error: ", error);
        return {
            status: 500,
            body: {
                message: "Internal Server Error"
            }
        };
    } finally {
        if (client) {
            await client.close();
        }
    }
}