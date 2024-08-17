import { Stack, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import Ec2Construct from "./ec2/ec2-construct";
import SecurityGroupConstruct from "./vpc/security-group-construct";
import VpcConstruct from "./vpc/vpc-construct";
import S3Construct from "./s3/s3-construct";
import S3DeployConstruct from "./s3/s3-deploy-construct";

export default class Ec2AppStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new S3Construct(this, 'S3Construct').bucket;
    new S3DeployConstruct(this, 'S3DeployConstruct', bucket);
    const vpc = new VpcConstruct(this, 'VpcConstruct');
    const sg = new SecurityGroupConstruct(this, 'SGConstruct', vpc.vpc);
    const ec2 = new Ec2Construct(this, 'Ec2Construct', vpc.vpc, sg.securityGroup, bucket.bucketName);

    new CfnOutput(this, 'PublicIp', {
      value: `http://${ec2.instance.instancePublicIp}`
    });

    new CfnOutput(this, 'BucketName', {
      value: bucket.bucketName
    });
  }
}