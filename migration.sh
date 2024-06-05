#!/bin/bash
docker compose -f "docker-compose.yml" up -d --build 

container_id=$(docker-compose ps -q pomme-api)

echo "Waiting for pomme-api ($container_id) service... "
sleep 1

while [ "$(docker inspect -f '{{.State.Running}}' $container_id)" != "true" ]; do
  echo "Waiting for pomme-api service..."
  sleep 1
done

# Set the GraphQL endpoint URL
endpoint="https://curly-goggles-975rjqjw77x2xj9v-3000.app.github.dev/"

# Set the mutation query
mutation=''

# Send the mutation request
response=$(curl -X POST -H "Content-Type: application/json" -d '{"query": "mutation{ createQuiz( name: \"Hello World\" quiz: \"[]\" userId: \"1\" ) { id }}"}' $endpoint)

echo $response