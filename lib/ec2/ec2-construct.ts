import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import IamConstruct from "../iam/iam-construct";

export default class Ec2Construct extends Construct {
    public readonly _instance: ec2.Instance;

    constructor(scope: Construct, id: string, vpc: ec2.Vpc, sg: ec2.SecurityGroup, bucketName: string) {
        super(scope, id);

        const userData = ec2.UserData.forLinux();

        userData.addCommands(
            "sudo yum install -y nginx",
            "sudo yum install -y git",
            "sudo service nginx start",
            "aws s3 cp s3://" + bucketName + " /usr/share/nginx/html --recursive",
        )

        const keyPair = ec2.KeyPair.fromKeyPairName(this, "KeyPair", "abc");

        this._instance = new ec2.Instance(this, 'Instance', {
            instanceName: "vCard-Instance",
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
            machineImage: new ec2.AmazonLinuxImage(),
            role: new IamConstruct(this, "RoleConstruct").role,
            vpc: vpc,
            securityGroup: sg,
            associatePublicIpAddress: true,
            userData: userData,
            keyPair: keyPair,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC
            }
        });
    }
    public get instance(): ec2.Instance {
        return this._instance;
    }
}