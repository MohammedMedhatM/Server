import Request from "../models/request.js";
import User from "../models/user.js";
import Transpoter from "./transporter.js";
import Expo from "expo-server-sdk";

const expo = Expo.Expo;
let expo2 = new expo();

export const postRequest = async (req, res) => {
  const id = req.userId;

  const data = req.body;
  const { department, image } = req.body;
  try {
    const requestOrder = new Request({
      ...data,
      department: department,
      image: image,
      sender: id,
    });

    await requestOrder.save();

    res.status(200).json({ requestOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getRequests = async (req, res) => {
  const id = req.userId;
  try {
    const userDep = await User.findById(id);
    const requests = await Request.find({
      department: userDep.department,
    }).populate("sender");

    let messages = [];

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: "ExponentPushToken[FAnrlyHDMsVx1jdngxiUNR]",
      sound: "default",
      body: "This is a test notification",
      data: { withSome: "This is a new message to send" },
    });
    let ticket = await expo2.sendPushNotificationsAsync(messages);

    console.log(ticket);

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRequest = async (req, res) => {
  const { accept, reply, receiver } = req.body;
  const { id } = req.params;
  try {
    const updatedRequest = { accept, reply, _id: id, receiver };

    await Request.findByIdAndUpdate(id, updatedRequest, { new: true });

    const request = await Request.findById(id);

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json(error);
  }
};
