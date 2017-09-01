
# Herokus Pocus Plugin

This repo contains a Heroku plugin with some usefull commands that we at [Äventyret AB](https://aventyret.com) use regularly.


## Prerequisite

1. Make sure that the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) package is installed.
2. Login to the Herkou CLI service. 

## Installtion

As any Heroku plugin, you install them via the `heroku` command

```
heroku plugins:install herokus-pocus-plugin
```

After that, you can list the available command by
```
heroku help pocus
```


## Commands

The mysql commands use the Herkou app env settings to determine database credentials. The following variables are examined `DATABASE_URL`, `JAWSDB_URL`, `CLEARDB_URL`. 

### `mysql` 

This command is used to open a mysql command promt session to a Heroku database for given app.

```
heroku pocus:mysql --app [your heroku app]
```
### `mysqldump`

This command is used to execute a mysqldump command on a Heroku database for given app.

```
heroku pocus:mysqldump --app [your heroku app] 
```




