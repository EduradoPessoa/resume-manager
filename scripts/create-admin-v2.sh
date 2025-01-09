#!/bin/bash

PROJECT_ID="677fe6d200040222b560"
DATABASE_ID="default"
API_KEY="standard_a1efc72a7f37e3f0097b11e2af983b796a1425a43430c3257ab794137e7d55780af8c5edc7ff46e3d45c83b6ac92ade2cbfbdb6c9119bb74f46ae91940b3c9dd06bffe8ac2712c9ef1caffe1e4dba3bb343e9114eff0d10593834212f2532062046d7497024247efed81b5f1edfc985114b148f114cd975a71cc0bc1fa1c039f"
ENDPOINT="https://cloud.appwrite.io/v1"

# Criar usuário admin
echo "Criando usuário admin..."
curl -X POST "$ENDPOINT/users" \
    -H "Content-Type: application/json" \
    -H "X-Appwrite-Project: $PROJECT_ID" \
    -H "X-Appwrite-Key: $API_KEY" \
    -d '{
        "userId": "admin",
        "email": "admin@phoenyx.com.br",
        "password": "Admin@123",
        "name": "Admin"
    }'

echo -e "\nCriando documento do usuário admin..."
curl -X POST "$ENDPOINT/databases/$DATABASE_ID/collections/users/documents" \
    -H "Content-Type: application/json" \
    -H "X-Appwrite-Project: $PROJECT_ID" \
    -H "X-Appwrite-Key: $API_KEY" \
    -d '{
        "documentId": "admin",
        "data": {
            "email": "admin@phoenyx.com.br",
            "name": "Admin",
            "isAdmin": true,
            "isBlocked": false,
            "isPremium": true
        }
    }'

echo -e "\nUsuário admin criado com sucesso!"
