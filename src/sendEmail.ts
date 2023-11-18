const { KintoneRestAPIClient } = require('@kintone/rest-api-client');
const aws = require('aws-sdk');
const ses = new aws.SES({ region: 'ap-northeast-1' });

class KintoneSetting {
  domain: string;
  apiToken: string;
  appId: number;

  constructor(domain: string, apiToken: string, appId: number) {
    this.domain = `https://${domain}.cybozu.com/`;
    this.apiToken = apiToken;
    this.appId = appId;
  }

  async getTemplate(recordId: number) {
    try {
      const client = new KintoneRestAPIClient({
        baseUrl: this.domain,
        auth: {
          apiToken: this.apiToken,
        },
      });
      const resp = await client.record.getRecord({
        app: this.appId,
        id: recordId,
      });
      return resp;
    } catch (err) {
      console.log('ERROR: テンプレートレコードの取得に失敗しました');
      return err;
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
      console.log('ERROR: メールの送信処理に失敗しました');
      console.log('ERROR:', err);
    }
  }
}
