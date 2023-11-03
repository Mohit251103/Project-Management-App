import { Client,Databases,Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('653fb744b3ffd792e43a');

export const account = new Account(client);
export const databases = new Databases(client);