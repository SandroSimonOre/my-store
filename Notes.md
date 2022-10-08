### Para ejecutar las instrucciones contenidas en el .yml:
docker compose up -d
Con esto se creará los contenedores.
Para este ejemplo con este archivo se levantan dos contenedores cada uno ejecutando un servicio: pgadmin y postgres.
Para loguarse en la base de datos previamente se debe acceder a pgadmin. Una vez en pg admin se debe crear un nuevo server:
- Add new server
- Poner un nombre al servidor, el que se prefiera (en la pestaña general)
- Luego pasar a la pestaña Connection: en Host poner el nombre del contenedor postgres en este caso. No se pone localhost, pues realmente no es localhost, es un contenedor.
- Los demás datos son de acuerdo a lo que indica el archivo .yml


### Para executar comandos en el contenedor

docker compose  exec -it pg_store_db bash

Esto abrirá el bash linux. Allí podremos ejecutar comandos como si estuvieramos en Linux. 

psql -h postgres -U sandrosimon -d store

Teclear password cuando te lo pida.


### Ejecutar comandos en psql
Cerrar conexión	\q
Cambiar de Base de datos	\c __base_datos__
Listar Bases de datos	\l
Ver Definiciones	\d __table__
Listar Schemas	\dn
Listar funciones	\df
Listar Vistas	\dv
Ver código SLQ de la función	\df+ __function
Pretty-format	\x

## Copiar un archivo desde la maquina host hacia la carpeta sql del contenedor (se ejecuta en la máquina host)
docker cp ./sql/create_tables.sql pg_store_db:/sql

## Para ejecutar un script sql (dentro del container)
psql -f /sql/create_tables.sql -h postgres -U sandrosimon -d my_store

