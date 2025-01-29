import { Command, Option } from 'commander';
import { checkParams, setParams } from './aws';

const program = new Command();

program
  .command('checkParams')
  .description('check/show stack params and values')
  .argument('[stack-name]')
  .action(async (stackName) => {
    await checkParams(stackName);
  });

program
  .command('setParams')
  .description('create stack params with values')
  .argument('[stack-name]')
  .addOption(new Option('-s, --suffix [suffix]', 'DNS Suffix for the stack').default('replace-me'))
  .addOption(new Option('-c, --cert-arn [cert-arn]', 'Certificate ARN for the stack').default('replace-me'))
  .addOption(new Option('-z, --zone [zone]', 'Hosted Zone ID for the stack').default('replace-me'))
  .action(async (stackName, options) => {
    await setParams(stackName, options.certArn, options.suffix, options.zone);
  });

program.parse(process.argv);
