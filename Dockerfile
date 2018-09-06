FROM mysql:5.7

ADD . /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=focuskuy
ENV MYSQL_DATABASE=IBC_97 
ENV MYSQL_USER=ibc 
ENV MYSQL_PASSWORD=60year

EXPOSE 3307

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["mysqld"]

