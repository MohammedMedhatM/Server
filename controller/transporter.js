import nodemailer from "nodemailer";

const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohdmedhat13@gmail.com",
    pass: "gcyigmmouocdgzdn",
  },
});

export default Transporter;
