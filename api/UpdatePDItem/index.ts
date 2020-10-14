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

    const pdItem = req.body;
    const { id, author } = pdItem;

    let { resource } = await container.item(id, author).replace(pdItem);

    context.res = {
      body: resource
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    };
  }
};

export default httpTrigger;