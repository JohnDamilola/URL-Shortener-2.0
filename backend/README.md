Steps to run the backend project

### Initial Project setup
1. python -m venv env
2. source env/bin/activate
3. pip install -r requirements.txt

### Local DB setup
4. psql
```Install PostgreSQL
create database url_shortener;
\q
```
5. flask db init 
6. flask db migrate -m "initial migration"
7. flask db upgrade

### Heroku setup
8. git remote add heroku https://git.heroku.com/url-shortener-server-api.git

### Heroku deployment
9. cd ../ && git subtree push --prefix backend heroku main
10. heroku run flask db upgrade