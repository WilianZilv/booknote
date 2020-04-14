CREATE DATABASE booknote;
use booknote;

CREATE TABLE bn_users(
id int primary key auto_increment,
username varchar
(26) unique,
password varchar
(100),
picture varchar
(1024),
uniqueid varchar
(1024)
);

    


-- CREATE TABLE %username%_posts(id int primary key auto_increment, likes int,subject varchar(100), content varchar(1024))