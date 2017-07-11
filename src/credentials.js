// @flow
import url from 'url';

export default (config) => {

    let dburl = ''
    if (config.hasOwnProperty('DATABASE_URL'))
    {
      dburl = config.DATABASE_URL
    }
    else if (config.hasOwnProperty('JAWSDB_URL'))
    {
      dburl = config.JAWSDB_URL
    }
    else if (config.hasOwnProperty('CLEARDB_URL'))
    {
      dburl = config.CLEARDB_URL
    }
    let u = url.parse(dburl)
    let [user, pwd] = u.auth.split(':',2)
    let path = u.path.replace(/\//, "")

    return {user, pwd, host: u.hostname, database: path}

}
