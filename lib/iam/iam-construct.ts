import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export default class IamConstruct extends Construct {
    public readonly _role: iam.Role;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this._role = new iam.Role(this, 'Role', {
            roleName: 'EC2Role',
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess')
            ]
        });
    }
    public get role(): iam.Role {
        return this._role;
    }
}