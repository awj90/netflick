-- local development
drop database if exists moviedb;
create database moviedb;
use moviedb;

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `id` int NOT NULL auto_increment,
  `genre_name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
);

insert into genres
values 
(1, 'Action'), (2, 'Adventure'), (3, 'Comedy'), (4, 'Drama'), (5, 'Family'), (6, 'Horror'), (7, 'Romance'), (8, 'Sci-Fi'), (9, 'Thriller'), (10, 'War');

DROP TABLE IF EXISTS `languages`;
CREATE TABLE `languages` (
  `id` int NOT NULL auto_increment,
  `language_code` varchar(255) NOT NULL,
  `language_name` varchar(255) NOT NULL,
  unique (`language_code`),
  PRIMARY KEY  (`id`)
);

insert into languages
values (1, 'en', 'English'), (2, 'en-US', 'English (American)'), (3, 'en-GB', 'English (British)');

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `description` TEXT NOT NULL,
  `video_id` char(11) NOT NULL,
  `language_id` int NOT NULL,
  `video_duration` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`),
  unique (`video_id`),
	foreign key(`language_id`) references languages(`id`)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/movies.csv' 
INTO TABLE movies 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;
