import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677fe6d200040222b560');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
