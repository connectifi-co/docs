#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { ConnectifiDocsStack } from '../lib/connectifi-docs-stack';
import { namespaceIt } from '../lib/utils';

const app = new App();

new ConnectifiDocsStack(app, namespaceIt('ConnectifiDocsStack'), {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
  },
});
