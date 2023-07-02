-- local development
drop database if exists moviedb;
create database moviedb;
use moviedb;

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `id` int NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
);

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `description` TEXT NOT NULL,
  `video_id` char(11) NOT NULL,
  `default_audio_language` varchar(255) NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY  (`id`),
  unique (`video_id`),
	foreign key(`genre_id`) references genres(`id`)
);
