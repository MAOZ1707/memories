const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
	accessKeyId: 'AKIARRJB7F3QKEXNZDSF',
	secretAccessKey: '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',
});
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
