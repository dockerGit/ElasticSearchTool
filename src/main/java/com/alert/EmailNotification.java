package main.java.com.alert;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

/**
 * Created by ankur on 13/12/16.
 */
public class EmailNotification {

    public void emailNotif(String email_to, String subject_line) {

        Logger LOG = LoggerFactory.getLogger(EmailNotification.class);
        //Get the session object
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "587");
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "587");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                        return new javax.mail.PasswordAuthentication("appsupport@bankbazaar.com","Test@123");
                    }
                });

        //compose message
        try {
            LOG.info("Configuring email....");
            String url = "https://prod-kibana.bankbazaar.com";
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("appsupport@bankbazaar.com"));
            message.addRecipient(Message.RecipientType.TO,new InternetAddress(email_to));
            message.setSubject(subject_line);
            message.setHeader("X-Priority", "High");
            StringBuilder sb = new StringBuilder();
            //sb.append("The number of hits for the "+message_text+" messages are greater than the threshold for index "+ index + "  "+type).append(System.lineSeparator());
            sb.append("Please find more details on the below URL").append(System.lineSeparator());
            sb.append(url);
            message.setText(sb.toString());

            //send message
            Transport.send(message);

            LOG.info("Mail sent successfully.....");

        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
