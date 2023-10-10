CREATE TABLE IF NOT EXISTS `users` (
	`user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`is_account_non_expired` BIT(1) NOT NULL,
	`is_account_non_locked` BIT(1) NOT NULL,
	`is_credentials_non_expired` BIT(1) NOT NULL,
	`is_enabled` BIT(1) NOT NULL,
	`password` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`refresh_token` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`role` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`social` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`username` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`user_id`) USING BTREE,
	UNIQUE INDEX `UK_r43af9ap4edm43mmtq01oddj6` (`username`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE IF NOT EXISTS `medias` (
	`media_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`category` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`rating` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`release_date` DATETIME NULL DEFAULT NULL,
	`running_time` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`synopsis` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`tag_line` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`title` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`media_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE IF NOT EXISTS `profiles` (
	`profile_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`image_url` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`user_id` BIGINT(20) NULL DEFAULT NULL,
	PRIMARY KEY (`profile_id`) USING BTREE,
	UNIQUE INDEX `UK_lnk8iosvsrn5614xw3lgnybgk` (`email`) USING BTREE,
	INDEX `FK410q61iev7klncmpqfuo85ivh` (`user_id`) USING BTREE,
	CONSTRAINT `FK410q61iev7klncmpqfuo85ivh` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE IF NOT EXISTS `posters` (
	`poster_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`path` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`poster_file_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`uuid` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`poster_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE IF NOT EXISTS `medias_poster` (
	`media_media_id` BIGINT(20) NOT NULL,
	`poster_poster_id` BIGINT(20) NOT NULL,
	UNIQUE INDEX `UK_8hotkwxg3kej38ss8deqd1v7i` (`poster_poster_id`) USING BTREE,
	INDEX `FKxoymeexkp6sm5rmh4svmhj2o` (`media_media_id`) USING BTREE,
	CONSTRAINT `FKjenict1s1luoh94i0cj4cscaa` FOREIGN KEY (`poster_poster_id`) REFERENCES `posters` (`poster_id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `FKxoymeexkp6sm5rmh4svmhj2o` FOREIGN KEY (`media_media_id`) REFERENCES `medias` (`media_id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


CREATE TABLE IF NOT EXISTS `media_genre` (
	`media_media_id` BIGINT(20) NOT NULL,
	`genre` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	INDEX `FKd8uovsu33eu3rv9uvonj963rn` (`media_media_id`) USING BTREE,
	CONSTRAINT `FKd8uovsu33eu3rv9uvonj963rn` FOREIGN KEY (`media_media_id`) REFERENCES `medias` (`media_id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
