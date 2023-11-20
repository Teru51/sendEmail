![SendEmail logo](./img/icon.png)

## Getting Started

### Overview

```JavaScript
// SetUp
const sender = new KintoneSetting({
  domain: 'example', // https://example.cybozu.com
  apiToken: '******',  // メールテンプレートアプリの閲覧権限のあるAPIトークン
  appId: 1, // メールテンプレートアプリID
});

// Gets  a MailTemplate
const template = await sender.getTemplate(1); // 引数には取得するレコードIDを指定

// Sends an e-mail
const toAddress = ['***@***.com', ...];
const fromAddress = 'info@***.com';
const subject = template.record.subject.value; // 件名フィールドを指定
const content = template.record.content.value; // 内容フィールドを指定

await sender.sendEmail(toAddress, fromAddress, subject, content);
```

### Installation

```node
$ npm install @terunet/send-email
```

aws-sdk および kintone-rest-api-client も同時にインストールが必要です。

```node
$ npm install aws-sdk
$ npm install @kintone/rest-api-client
```

### Usage

0. import を行う

```JavaScript
const { KintoneSetting } = require('@terunet/send-email');
```

1. kintone の接続設定を行う

```JavaScript
const sender = new KintoneSetting({
  domain: 'example', // https://example.cybozu.com
  apiToken: '******',  // メールテンプレートアプリの閲覧権限のあるAPIトークン
  appId: 1, // メールテンプレートアプリID
});
```

2. メールテンプレートを取得する

```JavaScript
// Gets  a MailTemplate
const template = await sender.getTemplate(1); // 引数には取得するレコードIDを指定

```

- メールテンプレートは「件名」「内容」が別フィールドに分けられている構成を想定しています。

3. メールを送信する

```JavaScript
const toAddress = ['***@***.com', ...];
const fromAddress = 'info@***.com';
const subject = template.record.subject.value; // 件名フィールドを指定
const content = template.record.content.value; // 内容フィールドを指定

await sender.sendEmail(toAddress, fromAddress, subject, content);
```

- toAddress(第一引数)は配列であることに注意してください
- async 関数内で実行してください
