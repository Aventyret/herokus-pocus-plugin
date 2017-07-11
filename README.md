
# Herokus Pocus Plugin

This repo contains some usefull Herokus plugin commands that we at Äventyret AB use regularly.


## Prerequisite

1. Make sure that the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) package is installed.
2. Login to the Herkou CLI service. 
3. 

## Installtion

As any Heroku plugin, you install them via the `heroku` command

```
heroku plugins:install herokus-pocus-plugin
```

After that, you can run the Herokus Pocus commands.

## Commands

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




