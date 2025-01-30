import { MongoClient } from "mongodb";

export async function GET(req, { params }) {
    const { id } = params;// Extract the snippet ID from the request parameters

    if (!id) {
        return new Response(JSON.stringify({message: "Snippet ID is required"}), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    let client;

    try {
        client = new MongoClient(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connect();
        const database = client.db("code-sharing-app"); //choose the name of your database
        const collection = database.collection("code-snippets"); // choose the name of your collection

        const snippet = await collection.findOne({ id }); // fetch the snippet from the database

        if (!snippet) {
            return new Response(JSON.stringify({message: "Code not found"}), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return new Response(JSON.stringify(snippet), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }); // return the snippet if it is found
    } catch (error) {
        console.error("Error: ", error);
        return new Response(JSON.stringify({message: "Internal Server Error"}), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
}