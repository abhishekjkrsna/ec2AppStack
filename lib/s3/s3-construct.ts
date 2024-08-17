import { RemovalPolicy } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export default class S3Construct extends Construct {
    public readonly _bucket: Bucket;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const randomString = Math.random().toString(36).substring(2, 15);

        this._bucket = new Bucket(this, 'Bucket', {
            bucketName: `s3-bucket-${randomString}`,
            versioned: true,
            autoDeleteObjects:true,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
    public get bucket(): Bucket {
        return this._bucket;
    }
}