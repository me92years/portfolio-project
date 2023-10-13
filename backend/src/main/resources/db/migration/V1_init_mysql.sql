-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.1.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- mediadb 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `mediadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `mediadb`;

-- 테이블 mediadb.medias 구조 내보내기
CREATE TABLE IF NOT EXISTS `medias` (
  `media_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `running_time` varchar(255) DEFAULT NULL,
  `synopsis` varchar(255) DEFAULT NULL,
  `tag_line` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`media_id`)
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mediadb.medias_poster 구조 내보내기
CREATE TABLE IF NOT EXISTS `medias_poster` (
  `media_media_id` bigint(20) NOT NULL,
  `poster_poster_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_8hotkwxg3kej38ss8deqd1v7i` (`poster_poster_id`),
  KEY `FKxoymeexkp6sm5rmh4svmhj2o` (`media_media_id`),
  CONSTRAINT `FKjenict1s1luoh94i0cj4cscaa` FOREIGN KEY (`poster_poster_id`) REFERENCES `posters` (`poster_id`),
  CONSTRAINT `FKxoymeexkp6sm5rmh4svmhj2o` FOREIGN KEY (`media_media_id`) REFERENCES `medias` (`media_id`)
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mediadb.media_genre 구조 내보내기
CREATE TABLE IF NOT EXISTS `media_genre` (
  `media_media_id` bigint(20) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  KEY `FKd8uovsu33eu3rv9uvonj963rn` (`media_media_id`),
  CONSTRAINT `FKd8uovsu33eu3rv9uvonj963rn` FOREIGN KEY (`media_media_id`) REFERENCES `medias` (`media_id`)
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mediadb.posters 구조 내보내기
CREATE TABLE IF NOT EXISTS `posters` (
  `poster_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `poster_file_name` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`poster_id`)
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mediadb.profiles 구조 내보내기
CREATE TABLE IF NOT EXISTS `profiles` (
  `profile_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  UNIQUE KEY `UK_lnk8iosvsrn5614xw3lgnybgk` (`email`),
  KEY `FK410q61iev7klncmpqfuo85ivh` (`user_id`),
  CONSTRAINT `FK410q61iev7klncmpqfuo85ivh` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 mediadb.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_account_non_expired` bit(1) NOT NULL,
  `is_account_non_locked` bit(1) NOT NULL,
  `is_credentials_non_expired` bit(1) NOT NULL,
  `is_enabled` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `social` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
);

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
