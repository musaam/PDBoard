/* import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {

    const client = new CosmosClient(process.env.CONNECTION_STRING);

    const database = client.database("SampleDB");
    const container = database.container("Persons");

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

export default httpTrigger; */

// "scriptFile": "../dist/GetPDItems/index.js"  This goes to the function.json file

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {           
            const client = new cosmos_1.CosmosClient(process.env.CONNECTION_STRING);
            const database = client.database("SampleDB");
            const container = database.container("Persons");
            let iterator = container.items.readAll();
            let { resources } = yield iterator.fetchAll();
            context.res = {                
                body: resources
            };
        }
        catch (err) {
            context.res = {
                status: 500,
                body: err.message
            };
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map