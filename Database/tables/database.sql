-- Create database
CREATE DATABASE IF NOT EXISTS inventory_system;
USE inventory_system;

-- Table: "user"
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `password_hash` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `admin` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: "provider"
CREATE TABLE IF NOT EXISTS `provider` (
  `provider_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `phone_number` VARCHAR(20),
  `email` VARCHAR(255) UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: "customer"
CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(20),
  `email` VARCHAR(255) UNIQUE,
  `document` VARCHAR(45) NOT NULL UNIQUE,
  `address` VARCHAR(255),
  `state` VARCHAR(45),
  `city` VARCHAR(45),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: "category"
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: "article"
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `brand` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL,
  `purchase_price` INT NOT NULL,
  `sale_price` INT NOT NULL,
  `weight` VARCHAR(20),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `provider_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`provider_id`) REFERENCES `provider`(`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: "purchase"
CREATE TABLE IF NOT EXISTS `purchase` (
  `purchase_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `total_value` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `provider_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`provider_id`) REFERENCES `provider`(`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: "purchase_detail"
CREATE TABLE IF NOT EXISTS `purchase_detail` (
  `purchase_id` INT UNSIGNED NOT NULL,
  `article_id` INT UNSIGNED NOT NULL,
  `article_quantity` INT NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`purchase_id`, `article_id`),
  FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`purchase_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`article_id`) REFERENCES `article`(`article_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: "sale"
CREATE TABLE IF NOT EXISTS `sale` (
  `sale_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `total_value` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: "sale_detail"
CREATE TABLE IF NOT EXISTS `sale_detail` (
  `sale_id` INT UNSIGNED NOT NULL,
  `article_id` INT UNSIGNED NOT NULL,
  `article_quantity` INT NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`sale_id`, `article_id`),
  FOREIGN KEY (`sale_id`) REFERENCES `sale`(`sale_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`article_id`) REFERENCES `article`(`article_id`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Insert default admin user
INSERT INTO `user` (`name`, `username`, `password_hash`, `phone_number`, `email`, `admin`) VALUES
('Admin', 'admin', '$2a$10$zieG5gmvhTZghHVPB6prk.gRKAB6979Od/wO/HEDFfZkbaduue4AK', '0000000000', 'admin@gmail.com', TRUE);
