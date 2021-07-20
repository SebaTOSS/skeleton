import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserDTO } from "../users/dtos";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  send(user: UserDTO): void {
    this.mailerService
      .sendMail({
        to: "",
        from: "noreply@crm.com",
        subject: "With engine",
        template: __dirname + "/templates" + "/welcome",
        context: {
          user,
        },
      })
      .then(() => {
        console.log("OK");
      })
      .catch((e) => {
        console.log("Fail ", e);
      });
  }
}
