import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const client = new CosmosClient(process.env.CONNECTION_STRING);

    const database = client.database("SampleDB");
    const container = database.container("PDItems");

    const id = req.params.id;
    const author = req.params.author;

    console.log(id);
    console.log(author);

    const result = await container.item(id, author).delete();

    context.res = {
      body: result.resource
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    };
  }
};

export default httpTrigger;