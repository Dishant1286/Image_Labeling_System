# Image Labeling System using Amazon Rekognition

This project is an image labeling application built with Amazon Rekognition. It automatically recognizes and labels objects in images, providing a quick and accurate way to identify various elements in photos. For example, if you upload a photo of a cat, Amazon Rekognition will label the image as "Cat."

## Features

- **Image Recognition**: Uses Amazon Rekognition to analyze and label images.
- **Accurate Labeling**: Identifies various objects, animals, scenes, and more.
- **AWS Integration**: Leverages Amazon S3 for image storage and Amazon Rekognition for image analysis.

## Tech Stack

- **Amazon Rekognition** - Image analysis and labeling service
- **Amazon S3** - Stores images uploaded for recognition
- **AWS Lambda** (optional) - Automates image labeling upon upload to S3

## Setup

1. **AWS Setup**:
   - Enable Amazon Rekognition in your AWS account.
   - Create an S3 bucket to store images for analysis.

2. **IAM Role**:
   - Ensure your IAM role has permissions for both S3 and Rekognition.
   - Attach policies for S3 read access and Rekognition labeling.

3. **Lambda Function (Optional)**:
   - If you want automatic labeling, set up an AWS Lambda function to trigger on S3 uploads.
   - Configure the Lambda function to call Amazon Rekognition when an image is uploaded to the bucket.

## Usage

1. **Upload an Image**:
   - Upload an image file (e.g., .jpg, .png) to the S3 bucket.
   
2. **Run Image Analysis**:
   - Trigger the Rekognition API to analyze the image and return labels.
   
3. **View Labels**:
   - The labels (like "Cat," "Dog," "Tree," etc.) will be generated based on the image content and can be stored in an S3 metadata file or retrieved directly from Rekognition's output.

## Example

- **Input Image**: A photo of a cat.
- **Expected Output**:
  ```json
  {
    "Labels": [
      {
        "Name": "Cat",
        "Confidence": 98.5
      },
      {
        "Name": "Animal",
        "Confidence": 99.2
      }
    ]
  }
