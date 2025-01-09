import { Client, Databases, Users } from 'node-appwrite';

// Init SDK
const client = new Client();
const databases = new Databases(client);
const users = new Users(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('677fe6d200040222b560')
    .setKey('standard_a1efc72a7f37e3f0097b11e2af983b796a1425a43430c3257ab794137e7d55780af8c5edc7ff46e3d45c83b6ac92ade2cbfbdb6c9119bb74f46ae91940b3c9dd06bffe8ac2712c9ef1caffe1e4dba3bb343e9114eff0d10593834212f2532062046d7497024247efed81b5f1edfc985114b148f114cd975a71cc0bc1fa1c039f');

async function setup() {
    try {
        // Criar banco de dados
        console.log('Criando banco de dados...');
        const database = await databases.create('resume_manager', 'Resume Manager');
        const databaseId = database.$id;

        // Criar coleção users
        console.log('Criando coleção users...');
        const usersCollection = await databases.createCollection(
            databaseId,
            'users',
            'Users',
            [],
            true
        );

        // Adicionar atributos para users
        await databases.createStringAttribute(
            databaseId,
            'users',
            'email',
            255,
            true
        );

        await databases.createStringAttribute(
            databaseId,
            'users',
            'name',
            255,
            true
        );

        await databases.createStringAttribute(
            databaseId,
            'users',
            'phone',
            50,
            false
        );

        await databases.createBooleanAttribute(
            databaseId,
            'users',
            'isAdmin',
            true,
            false
        );

        await databases.createBooleanAttribute(
            databaseId,
            'users',
            'isBlocked',
            true,
            false
        );

        await databases.createBooleanAttribute(
            databaseId,
            'users',
            'isPremium',
            true,
            false
        );

        // Criar índices para users
        await databases.createIndex(
            databaseId,
            'users',
            'email',
            'key',
            ['email'],
            ['ASC']
        );

        await databases.createIndex(
            databaseId,
            'users',
            'isAdmin',
            'key',
            ['isAdmin'],
            ['ASC']
        );

        // Criar coleção resumes
        console.log('Criando coleção resumes...');
        const resumesCollection = await databases.createCollection(
            databaseId,
            'resumes',
            'Resumes',
            [],
            true
        );

        // Adicionar atributos para resumes
        await databases.createStringAttribute(
            databaseId,
            'resumes',
            'userId',
            255,
            true
        );

        await databases.createStringAttribute(
            databaseId,
            'resumes',
            'title',
            255,
            true
        );

        await databases.createEnumAttribute(
            databaseId,
            'resumes',
            'template',
            ['minimalist', 'modern'],
            true
        );

        await databases.createBooleanAttribute(
            databaseId,
            'resumes',
            'isPublic',
            true,
            false
        );

        // Criar índices para resumes
        await databases.createIndex(
            databaseId,
            'resumes',
            'userId',
            'key',
            ['userId'],
            ['ASC']
        );

        await databases.createIndex(
            databaseId,
            'resumes',
            'isPublic',
            'key',
            ['isPublic'],
            ['ASC']
        );

        // Criar usuário admin
        console.log('Criando usuário admin...');
        const admin = await users.create(
            'unique()',
            'admin@phoenyx.com.br',
            undefined,
            'Admin@123',
            'Admin'
        );

        // Atualizar usuário admin para ter privilégios
        await databases.updateDocument(
            databaseId,
            'users',
            admin.$id,
            {
                isAdmin: true,
                isPremium: true
            }
        );

        // Atualizar permissões das coleções
        console.log('Atualizando permissões das coleções...');
        await databases.updateCollection(
            databaseId,
            'users',
            'Users',
            ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
            true
        );

        await databases.updateCollection(
            databaseId,
            'resumes',
            'Resumes',
            ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
            true
        );

        console.log('Configuração concluída!');
    } catch (error) {
        console.error('Erro:', error);
    }
}

setup();
