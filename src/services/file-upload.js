 const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new aws.S3()

aws.config.update({
  secretAccessKey: process.env.SECRETKEY,
  accessKeyId:'AKIAJM57UEUYEHNG5QCA',
  region: 'ca-central-1',
});

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: 'rentful-images',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      try {
        cb(null, (req.session.passport.user._id + "-" + Date.now().toString()));
      } catch  {
        cb(null, Date.now().toString());
      }
    },
  }),
});

module.exports = upload