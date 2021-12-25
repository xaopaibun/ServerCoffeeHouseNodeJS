/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');

const UploadImages = (processedFile) => {
  let orgName = processedFile.originalname || '';
  orgName = orgName.trim().replace(/ /g, '-');
  const fullPathInServ = processedFile.path;
  const newFullPath = `${fullPathInServ}-${orgName}`;
  fs.renameSync(fullPathInServ, newFullPath);
  return newFullPath.replace('public', '');
};

module.exports = UploadImages;
