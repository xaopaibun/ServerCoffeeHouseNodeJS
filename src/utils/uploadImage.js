/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const fileUploader = require('../config/cloudinary.config');
const UploadImages = (processedFile) => {
  let orgName = processedFile.originalname || '';
  orgName = orgName.trim().replace(/ /g, '-');
  const fullPathInServ = processedFile.path;
  const newFullPath = `${fullPathInServ}-${orgName}`;
  fs.renameSync(fullPathInServ, newFullPath);
  const image = fileUploader.single(processedFile);
  console.log('image', image);
  return newFullPath.replace('public', '');
};

module.exports = UploadImages;
