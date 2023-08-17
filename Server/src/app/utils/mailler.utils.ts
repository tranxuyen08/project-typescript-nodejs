import nodemailer from 'nodemailer';
import mailerConfig from '../../configs/maillerConfigs';

interface User {
  lastName: string;
  email: string;
}

// Cấu hình transporter
const transporter = nodemailer.createTransport({
  service: mailerConfig.service,
  auth: {
    user: mailerConfig.user,
    pass: mailerConfig.password,
  },
});

// Hàm gửi email thông báo cho người dùng
const sendRegistrationEmail = async (user: User): Promise<void> => {
  const { lastName, email } = user;

  // Nội dung email
  const mailOptions = {
    from: mailerConfig.user,
    to: email,
    subject: 'Registration Successful',
    html: `
      <html>
        <head>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
            }
          </style>
        </head>
        <body>
          <h1>Chúc mừng ${lastName} đã đăng ký thành công!</h1>
          <p>Hãy khám phá chúng tôi và trải nghiệm những sản phẩm tuyệt vời của chúng tôi.</p>
        </body>
      </html>
    `,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
};

export default sendRegistrationEmail;
