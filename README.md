# Microservice Notification CloudWatch - Slack

## Arquitecture

![AWS Microservices Arquitecture](https://github.com/moiseR29/cloudwatch-slack-alarm/blob/main/docs/cloudwatch_slack_lambda.png)

## Requirements

- NodeJs > 14.xx

## Starting

1. Create a .env file

```
cat .env.example > .env
```

2. replace <SLACK_SERVICE_ID> with the Slack ID channel ( cloudwatch-alarms )

3. configure your .aws

In your $HOME, create .aws folder then create config and credentials files

- crendential

```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY>
aws_secret_access_key = <YOUR_SECRET_KEY>
```

- config

```
[default]
region = us-east-1
output = json
```

4. Execute

- Build
```
yarn && yarn build
```

- Test
```
yarn test
```

- Deploy
```
yarn deploy
```
