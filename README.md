# Laravel and React News API
This project is an example project made using Laravel and React to pull articles via multiple APIs and display them on a platform.

### Techstack:
- Laravel
- React
- TailwindCSS
- Nginx
- Supervisor
- Postgresql

### APIs used:
- newsapi
- theguardian
- nytimes

##### Design inspired by: https://dribbble.com/shots/3138126-Mongollist-News
##### Example record: https://www.loom.com/share/fcc1a53d2cf248408a22ae166c89885b
##### Demo: https://news-app.serkan.space

## Installation and configuration:
In this project, we orchestrated multiple containers using docker compose.

To install the project, you need to configure the env files for `backend` and `frontend`. Example file is in the repository.

After that configuration, you need to run this code:
```
docker compose up -d
```

After the installation process, you need to run migration command for db init.

You can connect the backend service with this code
```
docker exec -it backend sh
```
and run these
```
composer install
php artisan migrate
```
To configure nginx file, open `.cloud/nginx/conf.d/default.conf` and make your configuration in it.