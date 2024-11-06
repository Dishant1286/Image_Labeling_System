const AWS = require('aws-sdk');
const fs = require('fs');
const sharp = require('sharp');

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // Replace with your region
  accessKeyId: 'AKIAVRUVTJKOVXHGHDXA', // Replace with your Access Key
  secretAccessKey: '4xB6ccg8M5XuA4n0CGObZqTfaDElLLGAORBD4spg', // Replace with your Secret Key
});

// Create Rekognition and S3 clients
const rekognition = new AWS.Rekognition();
const s3 = new AWS.S3();

async function detectLabels(photo, bucket) {
  // Call Rekognition to detect labels
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      }
    },
    MaxLabels: 10
  };

  try {
    const response = await rekognition.detectLabels(params).promise();

    // Print the labels
    console.log('Detected labels for ' + photo);
    response.Labels.forEach(label => {
      console.log("Label:", label.Name);
      console.log("Confidence:", label.Confidence);
    });

    // Load the image from S3
    const imageParams = {
      Bucket: bucket,
      Key: photo
    };

    const s3Object = await s3.getObject(imageParams).promise();
    const imageBuffer = s3Object.Body;

    // Process and display the image
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const labels = response.Labels;

    labels.forEach(label => {
      label.Instances.forEach(instance => {
        const bbox = instance.BoundingBox;
        const left = bbox.Left * metadata.width;
        const top = bbox.Top * metadata.height;
        const width = bbox.Width * metadata.width;
        const height = bbox.Height * metadata.height;

        console.log(`Bounding Box - Left: ${left}, Top: ${top}, Width: ${width}, Height: ${height}`);
      });
    });
  } catch (error) {
    console.error('Error detecting labels:', error);
  }
}

function main() {
  const photo = 'image789.jpg';
  const bucket = 'aws-recognition-label-images2';
  detectLabels(photo, bucket);
}

main();
