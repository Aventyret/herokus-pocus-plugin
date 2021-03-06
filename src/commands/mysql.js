
import { Command, flags } from 'cli-engine-heroku'
import credentials from '../credentials'
import { execSync } from 'child_process'

export default class MysqlCommand extends Command {
  static topic = 'pocus'
  static command = 'mysql'
  static description = 'Opens a mysql shell, connected to the Heroku app database.'
  static flags = {
    app: flags.app({required: true})
  }

  async run () {
    var config = await this.heroku.get(`/apps/${this.flags.app}/config-vars`)
    let cred = credentials(config)
    let cmd = `mysql -A -u ${cred.user} -p${cred.pwd} -h ${cred.host} ${cred.database}`
    execSync(cmd, {stdio: 'inherit'})
  }
}
