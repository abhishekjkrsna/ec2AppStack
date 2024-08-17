import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import path = require("path");

export default class S3DeployConstruct extends Construct {
    constructor(scope: Construct, id: string, bucketName: Bucket) {
        super(scope, id);

        new BucketDeployment(this, 'DeployWebsite', {
            sources: [Source.asset(path.join(__dirname, '../../vCard-personal-portfolio'))],
            destinationBucket: bucketName
        });
    }
}