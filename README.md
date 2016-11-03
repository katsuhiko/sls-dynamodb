# Sls DynamoDB

To use the DynamoDB in Serverless Framework.

## Installation

Make sure that you use Serverless v1.

1. Run `serverless install --url https://github.com/katsuhiko/sls-dynamodb` to install the service in your current working directory
2. Next up cd into the service with `cd sls-dynamodb`
3. Run `npm install`
4. Deploy with `serverless deploy`

## How to use

Simply perform requests against the exposed endpoints:

### Read all

```bash
curl https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/todos
```

### Read one

```bash
curl https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/todos/<id>
```

### Create

```bash
curl -X POST https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/todos --data '{ "content" : "Learn Serverless" }'
```

### Update

```bash
curl -X PATCH https://1h5fk4zhch.execute-api.ap-northeast-1.amazonaws.com/dev/todos/<id> --data '{ "content" : "Understand Serverless" }'
```

### Delete

```bash
curl -X DELETE https://1h5fk4zhch.execute-api.ap-northeast-1.amazonaws.com/dev/todos/<id>
```
