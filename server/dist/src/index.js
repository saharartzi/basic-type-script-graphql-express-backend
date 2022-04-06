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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongo_1 = require("./utils/mongo");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = require("./resolvers");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Build the schema
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: resolvers_1.resolvers,
        });
        // Init express
        const app = (0, express_1.default)();
        app.use((0, cookie_parser_1.default)());
        // Create the apollo server
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: (ctx) => {
                console.log(ctx);
                return ctx;
            },
            plugins: [
                process.env.NODE_ENV === "production"
                    ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)()
                    : (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
            ],
        });
        yield server.start();
        // apply middleware to server
        server.applyMiddleware({ app });
        // app.listen on express server
        app.listen({ port: 4000 }, () => {
            console.log("App is listening on http://localhost:4000/graphql");
        });
        (0, mongo_1.connectToMongo)();
    });
}
bootstrap();
//# sourceMappingURL=index.js.map