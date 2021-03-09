const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'memories-photos',
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString());
		},
	}),
});

module.exports = uploadS3;
