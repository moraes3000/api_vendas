# api_vendas

```term
Criar container docker
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=apivendas  -p 5432:5432 -d postgres

```


### Criar migrate

```term
 yarn typeorm migration:create -n NomeDoAPP

## Fazer os ajustes  no migrate gerado
 yarn typeorm migration:run
```

## Install redis

```term
Criar container docker
docker  run --name redis -p 6379:6379  -d -t redis:alpine
```

```term
 docker run  --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest

 ```

 ## entrando no redis
Criar container docker
```term
docker exec -it redis sh
 ```
Acessando o  redis pelo cli
 ```term
redis-cli
 ```

Test para ver se funciona
 ```term
get api-vendas-PRODUCT_LIST

 ```







