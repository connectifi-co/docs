import { resolve } from 'path';
import {
  aws_certificatemanager as certificatemanager,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
  aws_ssm as ssm,
  CfnOutput,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { namespaceIt, getStackPrefix } from './utils';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';

const DNSSuffix = 'connectifi.app';

export const makeSSMParamPath = (paramName: string) => {
  return `/connectifi/${namespaceIt(paramName, '/')}`;
};

export const uiOutDir = resolve(__dirname, '../../ui/out');

export class ConnectifiDocsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const certArn = ssm.StringParameter.valueForStringParameter(this, makeSSMParamPath('certificateARN'));
    const hostedZoneId = ssm.StringParameter.valueForStringParameter(this, makeSSMParamPath('hostedZoneID'));
    const cert = certificatemanager.Certificate.fromCertificateArn(this, 'distributionCertificate', certArn);

    // create s3AccessLogs bucket
    const logsBucket = new s3.Bucket(this, 's3AccessLogs', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.RETAIN,
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
    });

    // create the bucket
    const siteBucket = new s3.Bucket(this, 'connectifyDocsBucket', {
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: logsBucket,
      serverAccessLogsPrefix: 'app/',
    });

    // create the CF distro
    const distribution = new cloudfront.Distribution(this, 'SiteDistro', {
      comment: `${getStackPrefix()} distro`,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/404.html',
        },
      ],
      certificate: cert,
      domainNames: [`${namespaceIt(DNSSuffix, '.')}`],
    });

    const hostedZone = route53.PublicHostedZone.fromHostedZoneAttributes(this, 'webSiteZone', {
      hostedZoneId,
      zoneName: DNSSuffix,
    });
    new route53.ARecord(this, 'webSiteDNSAlias', {
      zone: hostedZone,
      recordName: getStackPrefix(),
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    // create the bucket deployment
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(uiOutDir)],
      destinationBucket: siteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'SiteBucket', {
      value: siteBucket.bucketName,
      description: 'The name of the UI bucket used by the distribution',
    });

    new CfnOutput(this, 'SiteDistroURL', {
      value: 'https://' + distribution.distributionDomainName,
      description: 'The domain name of the cloudfront distribution',
    });
  }
}
