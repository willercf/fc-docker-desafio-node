FROM mysql:5.7

COPY ./create-tables.sql /tmp

CMD [ "mysqld", "--init-file=/tmp/create-tables.sql" ]
