import { App } from 'aws-cdk-lib';
import { ConnectifiDocsStack } from '../lib/connectifi-docs-stack';

jest.mock('aws-cdk-lib');
jest.mock('../lib/connectifi-docs-stack');

describe('AWS CDK App', () => {
  const region = undefined;
  beforeAll(() => {
    process.env.CDK_DEPLOY_REGION = region;
    return require('./connectifi-docs');
  });

  it('should create an instance of the AWS CDK App', () => {
    expect(App).toHaveBeenCalled();
  });

  it('should create an instance of ConnectifiAppsStack', () => {
    expect(ConnectifiDocsStack).toHaveBeenCalledWith(
      expect.any(App),
      expect.any(String),
      expect.objectContaining({
        env: expect.objectContaining({
          region,
        }),
      })
    );
  });
});
