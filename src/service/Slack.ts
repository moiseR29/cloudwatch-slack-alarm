import axios, { AxiosRequestConfig } from 'axios';
import { Message } from '../Message';

const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Content-type': 'application/json',
  },
};

class SlackService {
  private _token!: string;
  private _url = 'https://hooks.slack.com/services';

  configure(token: string): void {
    this._token = token;
  }

  async sendMessage(message: Message): Promise<any> {
    try {
      const { data, status } = await axios.post(
        `${this._url}/${this._token}`,
        message,
        axiosConfig,
      );

      if (status !== 200 && status !== 201) {
        throw new Error(
          JSON.stringify(data) || 'Error on Send Message To Slack',
        );
      }

      return 'Success';
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return error.message;
    }
  }
}

const i: SlackService = new SlackService();
export { i as SlackService };
