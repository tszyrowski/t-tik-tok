const { getCollection } = require("./utils/astraClient");

exports.handler = async function (event) {
  const users = await getCollection();
  const body = JSON.parse(event.body);

  try {
    let response = await users.update(body.userId, body.data);
    console.log(response)
    return {
      statusCode: 200,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body.userId)
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
