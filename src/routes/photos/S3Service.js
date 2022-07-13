require("dotenv").config()
const uuid = require("uuid").v4;
const { S3 } = require("aws-sdk");

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME } = process.env;



exports.s3Uploadv2 = async (files, id) => {
    const s3 =  new S3()

    const params = files.map(file => {
        return {
            Bucket: AWS_BUCKET_NAME,
            Key: `dbImages${id}/${file.originalname}-${uuid()}.${file.type.split("/")[1]}`,
            Body: file.data
        }
    })

    

    return await Promise.all(
        params.map((param) => s3.upload(param).promise())
    );
}