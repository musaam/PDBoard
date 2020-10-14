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

    const pdItemToCreate = req.body;

    let { resource } = await container.items.create(pdItemToCreate);

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