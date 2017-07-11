
# Herokus Pocus Plugin

This repo contains some usefull Herokus plugin commands that we at Äventyret AB use regularly.

## Installtion

Make sure that you have installed the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) package.


```
heroku plugins:install herokus-pocus-plugin
```

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




