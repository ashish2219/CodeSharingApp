import { MongoClient } from "mongodb";


export async function GET(req) {
    if (req.method === "GET") {
        const client = new MongoClient(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
            await client.connect();

            //choose a name for database
            const database = client.db("code-sharing-app");

            //choose a name for your collection
            const collection = database.collection("code-snippets");
            const allData = await collection.find({}).toArray();

            return new Response(
                JSON.stringify(allData),
                {
                    status: 200,
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
        }
    } else {
        return new Response(
            JSON.stringify({message: "Method not allowed"}),
            {
                status: 405,
            }
        );
    }
}