import { SecurityGroup, Vpc, Port, Peer } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export default class SecurityGroupConstruct extends Construct {
    public readonly _securityGroup: SecurityGroup;

    constructor(scope: Construct, id: string, vpc: Vpc) {
        super(scope, id);

        this._securityGroup = new SecurityGroup(this, 'SecurityGroup', {
            vpc: vpc,
            description: 'Allow http and https access',
            securityGroupName: 'ec2app-sg',
            allowAllOutbound: true
        });

        this._securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(80), 'Allow HTTP access');
        this._securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(443), 'Allow HTTPS access');
        // add ssh access
        this._securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), 'Allow SSH access');
    }

    public get securityGroup(): SecurityGroup {
        return this._securityGroup;
    }
}