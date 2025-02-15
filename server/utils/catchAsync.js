// This file is for removing the duplicate code of try , catch block from controllers file to reduce web code size

module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};