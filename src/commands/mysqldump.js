import { Command, flags } from 'cli-engine-heroku'
import credentials from '../credentials'
import { execSync } from 'child_process'

export default class MysqlDumpCommand extends Command {
  static topic = 'pocus'
  static command = 'mysqldump'
  static description = 'Executes a mysqldump, connected to the Heroku app database.'
  static flags = {
    app: flags.app({required: true})
  }
  static args = [
    {name: 'tables', optional: true}
  ]

  async run () {
    const config = await this.heroku.get(`/apps/${this.flags.app}/config-vars`)
    let cred = credentials(config)
    let tables = this.args.tables || ''
    let cmd = `mysqldump --single-transaction -u ${cred.user} -p${cred.pwd} -h ${cred.host} ${cred.database} ${tables}`
    execSync(cmd, {stdio: 'inherit'})
  }
}
