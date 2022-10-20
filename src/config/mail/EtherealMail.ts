import nodemailer from 'nodemailer';

import HandleBarsMailTemplate from './HandleBarsMailTemplate';

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass, // generated ethereal password
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Suporte equipeApi',
        address: from?.email || 'equipe@equipes.com ',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
