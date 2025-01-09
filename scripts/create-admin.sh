#!/bin/bash

PROJECT_ID="677fe6d200040222b560"
DATABASE_ID="default"
API_KEY="standard_a1efc72a7f37e3f0097b11e2af983b796a1425a43430c3257ab794137e7d55780af8c5edc7ff46e3d45c83b6ac92ade2cbfbdb6c9119bb74f46ae91940b3c9dd06bffe8ac2712c9ef1caffe1e4dba3bb343e9114eff0d10593834212f2532062046d7497024247efed81b5f1edfc985114b148f114cd975a71cc0bc1fa1c039f"
ENDPOINT="https://cloud.appwrite.io/v1"

# Função para fazer requisições HTTP
make_request() {
    local method=$1
    local path=$2
    local data=$3

    curl -X $method \
        -H "Content-Type: application/json" \
        -H "X-Appwrite-Project: $PROJECT_ID" \
        -H "X-Appwrite-Key: $API_KEY" \
        ${data:+-d "$data"} \
        "$ENDPOINT$path"
}

# Criar usuário admin
echo "Criando usuário admin..."
ADMIN_RESPONSE=$(make_request "POST" "/users" '{
    "userId": "admin",
    "email": "admin@phoenyx.com.br",
    "password": "Admin@123",
    "name": "Admin"
}')

ADMIN_ID=$(echo $ADMIN_RESPONSE | jq -r '.$id')
echo "Admin ID: $ADMIN_ID"

# Criar documento do usuário admin na coleção users
echo "Criando documento do usuário admin..."
make_request "POST" "/databases/$DATABASE_ID/collections/users/documents" '{
    "documentId": "'$ADMIN_ID'",
    "data": {
        "email": "admin@phoenyx.com.br",
        "name": "Admin",
        "isAdmin": true,
        "isBlocked": false,
        "isPremium": true
    }
}'

echo "Usuário admin criado com sucesso!"
