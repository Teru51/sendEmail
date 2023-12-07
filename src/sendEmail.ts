const { KintoneRestAPIClient } = require('@kintone/rest-api-client');
const aws = require('aws-sdk');
const ses = new aws.SES({ region: 'ap-northeast-1' });

export class KintoneSetting {
  domain: string;
  apiToken: string;
  appId: number;
  client: any;

  constructor(domain: string, apiToken: string, appId: number) {
    this.domain = `https://${domain}.cybozu.com/`;
    this.apiToken = apiToken;
    this.appId = appId;
    this.client = new KintoneRestAPIClient({
      baseUrl: this.domain,
      auth: {
        apiToken: this.apiToken,
      },
    });
  }

  async getTemplate(recordId: number) {
    try {
      const resp = await this.client.record.getRecord({
        app: this.appId,
        id: recordId,
      });
      return resp;
    } catch (err) {
      console.error('Failed to get template record:', err);
    }
  }

  async sendEmail(
    toAddresses: Array<string>,
    fromAddress: string,
    subject: string,
    content: string
  ) {
    try {
      const params = {
        Destination: {
          ToAddresses: toAddresses,
        },
        Message: {
          Body: {
            Text: { Data: content },
          },

          Subject: { Data: subject },
        },
        Source: fromAddress,
      };

      return ses.sendEmail(params).promise();
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  }
}
