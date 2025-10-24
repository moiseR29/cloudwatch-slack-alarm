import { Message } from './Message';
import { SlackService } from './service/Slack';

export interface SNSTopicNotification {
  Records: Array<{
    EventSource: string;
    EventVersion: string;
    EventSubscriptionArn: string;
    Sns: {
      Type: string;
      MessageId: 'string';
      TopicArn: string;
      Subject: string;
      Message: string;
      Timestamp: string;
      SignatureVersion: string;
      Signature: string;
      SigningCertURL: string;
      unsubscribeURL: string;
    };
  }>;
}

export class SNSHandlers {
  constructor(private readonly _snsPayload: SNSTopicNotification) {}

  async cloudWatch(): Promise<any> {
    const payload = this._snsPayload.Records[0];

    const timestamp = new Date(payload.Sns.Timestamp).getTime() / 1000;
    const message = JSON.parse(payload.Sns.Message);

    const region = payload.EventSubscriptionArn.split(':')[3];
    const subject = 'AWS CloudWatch Notification';

    const alarmName = message.AlarmName;
    const metricName = message.Trigger.MetricName;
    const oldState = message.OldStateValue;
    const newState = message.NewStateValue;
    const alarmDescription = message.AlarmDescription;
    const trigger = message.Trigger;
    let color = 'warning';

    if (message.NewStateValue === 'ALARM') color = 'danger';
    else if (message.NewStateValue === 'OK') color = 'good';

    const slackMessage: Message = {
      text: `* ${subject} *`,
      attachments: [
        {
          color,
          fields: [
            { title: 'Alarm Name', value: alarmName, short: true },
            {
              title: 'Alarm Description',
              value: alarmDescription,
              short: false,
            },
            {
              title: 'Trigger',
              value:
                trigger.Statistic +
                ' ' +
                metricName +
                ' ' +
                trigger.ComparisonOperator +
                ' ' +
                trigger.Threshold +
                ' for ' +
                trigger.EvaluationPeriods +
                ' period(s) of ' +
                trigger.Period +
                ' seconds.',
              short: false,
            },
            {
              title: 'Old State',
              value: oldState,
              short: true,
            },
            {
              title: 'Current State',
              value: newState,
              short: true,
            },
            {
              title: 'Link to Alarm',
              value: `https://console.aws.amazon.com/cloudwatch/home?regio=${region}#alarm:alarmFilter=ANY;name=${alarmName}`,
              short: false,
            },
          ],
          ts: timestamp,
        },
      ],
    };

    await SlackService.sendMessage(slackMessage);
  }
}
