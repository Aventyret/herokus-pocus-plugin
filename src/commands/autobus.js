import { Command, flags } from 'cli-engine-heroku'
import { execSync } from 'child_process'
import fetch from 'node-fetch'

export default class AutobusCommand extends Command {
  static topic = 'pocus'
  static command = 'autobus'
  static description = 'Fetch latest dump from Autobus.'
  static flags = {
    app: flags.app({required: true}),
    nouser: flags.boolean({description: 'Exclude alla user tables.', required: false}),
    domain: flags.string({default: false, description: 'Replace wp domain to given domain value.', required: false}),
    alldatabases: flags.boolean({default: false, description: 'Get dump for all JawsDB daabases, not only wp database.', required: false})
  }
  static args = [
    {name: 'tables', optional: true}
  ]

  async run () {
    const config = await this.heroku.get(`/apps/${this.flags.app}/config-vars`)

    const url = await fetch('https://www.autobus.io/api/snapshots/latest/?token=' + config.AUTOBUS_TOKEN)
      .then(function (res) {
        return res.text()
      })

    let cmd = `curl "${url}" | gunzip `
    if (this.flags.nouser) {
      cmd += " | sed 's|DROP TABLE IF EXISTS `kjellk0dz_user|DROP TABLE IF EXISTS `tmp_kjellk0dz_user|g' "
      cmd += " | sed 's|CREATE TABLE `kjellk0dz_user|CREATE TABLE `tmp_kjellk0dz_user|g' "
      cmd += " | grep -v '`kjellk0dz_users`' | grep -v '`kjellk0dz_usermeta`' "
    }
    if (this.flags.domain) {
      // Replace domain for certian sql rows.
      cmd += ` | sed -e 's|chef.se|${this.flags.domain}|g' `
    }
    if (!this.flags.alldatabases) {
      // Get sql lines for the primary_app_db database.
      cmd += " | awk 'NR < 10 || /^USE `primary_app_db`/{f=1;next} /^CREATE DATABASE/{f=0} f || NR < 16' "
    }

    execSync(cmd, {stdio: 'inherit'})
  }
}
