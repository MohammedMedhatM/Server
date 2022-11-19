import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Transpoter from "./transporter.js";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "InValid Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "10h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const passForget = async (req, res) => {
  const { formData } = req.body;
  const currentUrl = "exp://192.168.1.5:19000";
  try {
    User.find({ email: formData }, function (err, docs) {
      if (docs.length === 0) {
        return res.json({ message: "Such Email doesn't exist" });
      } else {
        var mailOptions = {
          from: "mohdmedhat13@gmail.com",
          to: formData,
          subject: "Recovery Email Passoword ",
          text: `Dear ${
            docs[0].toObject().name
          }, click the link below to update your password, if you didn't issue a new password protocol, please ignore this email. ${currentUrl}`,
        };

        Transpoter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Password doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: firstName + " " + lastName,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "10h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });

    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    req.userId = id;
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { _id, phone, department, position } = req.body;
  const id = _id;
  try {
    const updatedUser = { phone, department, position };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    const user = await User.findById(id);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
