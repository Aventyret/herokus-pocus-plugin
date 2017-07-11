// @flow
import {Command, flags} from 'cli-engine-heroku'
import url from 'url';
import credentials from '../credentials';
import { spawn, execSync } from 'child_process';

export default class HelloWorld extends Command {
  static topic = 'pocus'
  static command = 'mysql'
  static description = 'mysql client connected to a heroku app database.'
  static flags = {
    app: flags.app({required: true}),
  }

  async run () {

    var config = await this.heroku.get(`/apps/${this.flags.app}/config-vars`)

    let cred = credentials(config)

    let cmd = `mysql -A -u ${cred.user} -p${cred.pwd} -h ${cred.host} ${cred.database}`

    execSync(cmd, {stdio: 'inherit'});

  }
}
