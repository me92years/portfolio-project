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


-- dev 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `dev`;

-- 테이블 dev.comments 구조 내보내기
CREATE TABLE IF NOT EXISTS `comments` (
  `pid` bigint(20) NOT NULL AUTO_INCREMENT,
  `mod_date` datetime NOT NULL,
  `reg_date` datetime NOT NULL,
  `inner_text` varchar(255) DEFAULT NULL,
  `parent_comment_pid` bigint(20) DEFAULT NULL,
  `post_pid` bigint(20) DEFAULT NULL,
  `user_pid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `FKofx3wmk85bv53tj938d46g9u2` (`parent_comment_pid`),
  KEY `FK8f56llytavgpbkkwxbihp31q0` (`post_pid`),
  KEY `FK70gpl4j990vaxchpbfoae3mob` (`user_pid`),
  CONSTRAINT `FK70gpl4j990vaxchpbfoae3mob` FOREIGN KEY (`user_pid`) REFERENCES `users` (`pid`),
  CONSTRAINT `FK8f56llytavgpbkkwxbihp31q0` FOREIGN KEY (`post_pid`) REFERENCES `posts` (`pid`),
  CONSTRAINT `FKofx3wmk85bv53tj938d46g9u2` FOREIGN KEY (`parent_comment_pid`) REFERENCES `comments` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 dev.posts 구조 내보내기
CREATE TABLE IF NOT EXISTS `posts` (
  `pid` bigint(20) NOT NULL AUTO_INCREMENT,
  `mod_date` datetime NOT NULL,
  `reg_date` datetime NOT NULL,
  `inner_text` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_pid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `FKj83siukst0sx7j7exmrys3nfl` (`user_pid`),
  CONSTRAINT `FKj83siukst0sx7j7exmrys3nfl` FOREIGN KEY (`user_pid`) REFERENCES `users` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 dev.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `pid` bigint(20) NOT NULL AUTO_INCREMENT,
  `mod_date` datetime NOT NULL,
  `reg_date` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_social` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL,
  `profile_name` varchar(255) NOT NULL,
  `refresh_jwt` longtext DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `sid` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_b0p381cdwsqqybu4otilkem9j` (`sid`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
