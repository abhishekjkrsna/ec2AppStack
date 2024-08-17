import { Vpc, SubnetType } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export default class VpcConstruct extends Construct {
    public readonly _vpc: Vpc;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this._vpc = new Vpc(this, 'Vpc', {
            vpcName: 'ec2app-vpc',
            maxAzs: 1,
            subnetConfiguration: [{
                cidrMask: 24,
                name: 'public-subnet',
                subnetType: SubnetType.PUBLIC
            },
            {
                cidrMask: 24,
                name: 'private-subnet',
                subnetType: SubnetType.PRIVATE_ISOLATED
            }]
        });
    }

    public get vpc(): Vpc {
        return this._vpc;
    }
}