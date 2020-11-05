import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const client = new CosmosClient(process.env.CONNECTION_STRING);

    const database = client.database("PdboardDB");
    const container = database.container("ItemsContainer");

    const pdItem = req.body;
    const { id, partitionkey } = pdItem;

    let { resource } = await container.item(id, partitionkey).replace(pdItem);

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