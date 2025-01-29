import { ParameterType, SSM } from '@aws-sdk/client-ssm';

const region = process.env.AWS_REGION || 'us-east-1';
const ssm = new SSM({ region });

export interface ParameterOptions {
  certArn?: string;
  dnsSuffix?: string;
  zoneId?: string;
}

// check for existence of appropriate stack SSM params
export const checkParams = async (stackName: string = 'docs'): Promise<void> => {
  const params: string[] = paramPaths(stackName);

  for (const path of params) {
    try {
      console.log(`checking param: ${path}`);
      const pout = await ssm.getParameter({ Name: path });
      console.log(`SSM param: ${path} = ${pout.Parameter.Value}`);
    } catch (e) {
      if (e.toString().indexOf('ParameterNotFound') > -1) {
        console.log(`Missing required SSM param: ${path}`);
      } else {
        console.log(`Error getting SSM param: ${path}, error: ${e}`);
      }
    }
  }
};

// set the appropriate stack SSM params
export const setParams = async (
  stackName: string = 'docs',
  certArn?: string,
  dnsSuffix?: string,
  zoneId?: string
): Promise<void> => {
  const keyVals = [
    [paramPath(stackName, ParamNames.DNSSuffix), dnsSuffix],
    [paramPath(stackName, ParamNames.CertificateARN), certArn],
    [paramPath(stackName, ParamNames.HostedZoneID), zoneId],
  ];

  for (const kv of keyVals) {
    const [path, value] = kv;
    console.error(`try to set ${path} param to ${value}`);
    try {
      await ssm.putParameter({
        Name: path,
        Value: value,
        Type: ParameterType.STRING,
        Overwrite: true,
      });
      console.error(`set ${path} param to ${value}`);
    } catch (e) {
      console.error(`error setting ${path} param`, e);
    }
  }
};

enum ParamNames {
  DNSSuffix = 'DNSSuffix',
  CertificateARN = 'certificateARN',
  HostedZoneID = 'hostedZoneID',
}

// creates stacks required SSM param paths like: /connectifi/demos/DNSSuffix
const paramPaths = (stackName: string): string[] => {
  return [
    paramPath(stackName, ParamNames.DNSSuffix),
    paramPath(stackName, ParamNames.CertificateARN),
    paramPath(stackName, ParamNames.HostedZoneID),
  ];
};

const paramPath = (stackName: string, paramName: string): string => {
  return `/connectifi/${stackName}/${paramName}`;
};
