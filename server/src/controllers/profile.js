import Model from '../models/model';

const profileModel = new Model('profile');
export const profilePage = async (req, res) => {
  try {
    const data = await profileModel.select('username, userid');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addProfile = async (req, res) => {
    const { name, id } = req.body;
    const columns = 'username, userid';
    const values = `'${name}', '${id}'`;
    try {
      const data = await profileModel.insertWithReturn(columns, values);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  };