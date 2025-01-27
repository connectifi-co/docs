import { App, assertions } from 'aws-cdk-lib';
import { ConnectifiDocsStack } from '../lib/connectifi-docs-stack';

describe.each([['apps-dev'], ['apps']])('%s environment is setup correctly', (prefix) => {
  let template: assertions.Template;

  beforeEach(() => {
    process.env.STACK_PREFIX = prefix;
    const app = new App();
    const stack = new ConnectifiDocsStack(app, `${prefix}-ConnectifiApps`);
    template = assertions.Template.fromStack(stack);
  });

  describe('stack resources are created', () => {
    it('create S3 bucket', () => {
      template.resourceCountIs('AWS::S3::Bucket', 2);
    });

    it('create cloudfront distro', () => {
      template.hasResource('AWS::CloudFront::Distribution', {
        Properties: {
          DistributionConfig: {
            CustomErrorResponses: [
              {
                ErrorCode: 404,
                ResponseCode: 200,
                ResponsePagePath: '/404.html',
              },
            ],
            DefaultRootObject: 'index.html',
          },
        },
      });
    });
  });
});
