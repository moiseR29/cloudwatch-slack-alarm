import 'dotenv';
import { APIGatewayProxyResult } from 'aws-lambda';
import { SNSTopicNotification, SNSHandlers } from './Handlers';
import { SlackService } from './service/Slack';

const Log = (message: string) => console.log(message);

const lambdaServer = async (event: any): Promise<APIGatewayProxyResult> => {
  Log(`Received: ${JSON.stringify(event, null, 2)}`);
  SlackService.configure(process.env.SLACK_SERVICE_ID!);

  const notification = event as SNSTopicNotification;

  const handler = new SNSHandlers(notification);

  const result = await handler.cloudWatch();

  return {
    statusCode: 200,
    body: result,
  };
};

export const entrypoint = lambdaServer;
