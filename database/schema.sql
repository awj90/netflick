-- local development
drop database if exists moviedb;
create database moviedb;
use moviedb;

-- genres
DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `id` int NOT NULL auto_increment,
  `genre_name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
);

insert into genres
values 
(1, 'action'), (2, 'adventure'), (3, 'comedy'), (4, 'drama'), (5, 'family'), (6, 'horror'), (7, 'romance'), (8, 'sci-fi'), (9, 'thriller');

-- languages
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

-- movies
DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `description` TEXT NOT NULL,
  `video_id` char(11) NOT NULL,
  `language_id` int NOT NULL,
  `video_duration` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  unique (`video_id`),
	foreign key(`language_id`) references languages(`id`)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/movies.csv' 
INTO TABLE movies 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

-- countries
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int NOT NULL auto_increment,
  `code` char(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  unique (`code`)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/countries.csv' 
INTO TABLE countries 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

-- states
DROP TABLE IF EXISTS `states`;
CREATE TABLE `states` (
  `id` int NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  `country_id` int NOT NULL,
  PRIMARY KEY (`id`),
  foreign key(`country_id`) references countries(`id`)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/states.csv' 
INTO TABLE states 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

-- donors
DROP TABLE IF EXISTS `donors`;
CREATE TABLE `donors` (
  `id` int NOT NULL auto_increment,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  unique (`email`),
  PRIMARY KEY (`id`)
);

-- donations
DROP TABLE IF EXISTS `donations`;
CREATE TABLE `donations` (
  `id` int NOT NULL auto_increment,
  `amount` int NOT NULL,
  `wishlist` TEXT,
  `transaction_id` varchar(255) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `donor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  unique (`transaction_id`),
  foreign key(`donor_id`) references donors(`id`)
);