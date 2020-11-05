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

    let iterator = container.items.readAll();
    let { resources } = await iterator.fetchAll();

    context.res = {    
      body: resources
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    };
  }
};

export default httpTrigger;