import axios from 'axios';

export const modifyProfile = (req, res, next) => {
    req.body.message = req.body.message;
    next();
  };
export const performAsyncAction = async (req, res, next) => {
try {
    await axios.get('https://picsum.photos/id/0/info'); // await for calling api
    next();
} catch (err) {
    next(err);
}
};