const fs = require ("fs")
const { createClient } = require("@astrajs/collections")

const collection = 'posts'

exports.handler = async function (event, context, callback) {
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    });

    const posts = astraClient
        .namespace(process.env.ASTRA_DB_KEYSPACE)
        .collection(collection)

    const data = JSON.parse(fs.readFileSync('/workspace/resources/data.json'))

    try {
        for (let i = 0; i < data.length; i++) {
            await posts.create(data[i].id.toString(), data[i])
        }
        return {
            statusCode: 200,
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        }
    }
}