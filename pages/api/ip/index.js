import getDate from "./utility/ipSearch";

export default async function handler(req, res) {
  try {
    const data = await getDate();
    res.status(200).json({ statusCode: 200, data });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
