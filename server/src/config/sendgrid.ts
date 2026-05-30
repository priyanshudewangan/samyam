import sgMail from "@sendgrid/mail";
import { serverConfig } from ".";

sgMail.setApiKey(serverConfig.SENDGRID_API_KEY!);

export default sgMail;
