// @flow
import {Command, flags} from 'cli-engine-heroku'
import url from 'url';
import credentials from '../credentials';
import { spawn, execSync } from 'child_process';

export default class HelloWorld extends Command {
  static topic = 'pocus'
  static command = 'mysqldump'
  static description = 'mysqldump client connected to a heroku app database.'
  static flags = {
    app: flags.app({required: true}),
  }
  static args = [
    {name: 'tables', optional: true}
  ]

  async run () {

    const config = await this.heroku.get(`/apps/${this.flags.app}/config-vars`)

    let cred = credentials(config)

    let tables = this.args.tables || ''

    let cmd = `mysqldump --single-transaction -u ${cred.user} -p${cred.pwd} -h ${cred.host} ${cred.database} ${tables}`

    execSync(cmd, {stdio: 'inherit'});

  }
}
