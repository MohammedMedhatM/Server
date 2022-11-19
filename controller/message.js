import Message from "../models/message.js";

export const getMessage = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    const messages = await Message.find({ sender: userId, receiver: id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
