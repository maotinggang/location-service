CREATE DATABASE  IF NOT EXISTS `smartspace` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `smartspace`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smartspace
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `beacon`
--

DROP TABLE IF EXISTS `beacon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beacon` (
  `id` varchar(45) NOT NULL,
  `lati` double NOT NULL,
  `longi` double NOT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT '0',
  `alti_accuracy` float DEFAULT NULL,
  `calibration` int(4) DEFAULT '-61',
  `soc` int(4) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `type` varchar(15) DEFAULT 'beacon',
  `company` varchar(45) DEFAULT NULL,
  `info` varchar(45) DEFAULT NULL,
  `regist_code` varchar(64) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Beacon information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `regist_code`
--

DROP TABLE IF EXISTS `regist_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regist_code` (
  `id` varchar(45) NOT NULL,
  `regist_code` varchar(45) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`regist_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `type` varchar(15) DEFAULT 'user',
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `privilege` varchar(10) DEFAULT 'user',
  `regist_code` varchar(45) DEFAULT NULL,
  `info` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`id`),
  KEY `code_INDEX` (`regist_code`,`id`),
  KEY `password_INDEX` (`id`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='User information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_config`
--

DROP TABLE IF EXISTS `user_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_config` (
  `id` varchar(45) NOT NULL,
  `map` varchar(20) DEFAULT 'amap',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_1`
--

DROP TABLE IF EXISTS `user_location_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_1` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_10`
--

DROP TABLE IF EXISTS `user_location_10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_10` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_11`
--

DROP TABLE IF EXISTS `user_location_11`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_11` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_12`
--

DROP TABLE IF EXISTS `user_location_12`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_12` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_2`
--

DROP TABLE IF EXISTS `user_location_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_2` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_3`
--

DROP TABLE IF EXISTS `user_location_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_3` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_4`
--

DROP TABLE IF EXISTS `user_location_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_4` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_5`
--

DROP TABLE IF EXISTS `user_location_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_5` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_6`
--

DROP TABLE IF EXISTS `user_location_6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_6` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_7`
--

DROP TABLE IF EXISTS `user_location_7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_7` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_8`
--

DROP TABLE IF EXISTS `user_location_8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_8` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_location_9`
--

DROP TABLE IF EXISTS `user_location_9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location_9` (
  `timestamp` datetime NOT NULL,
  `id` varchar(45) NOT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `alti` double DEFAULT NULL,
  `alti_accuracy` float DEFAULT NULL,
  `heading` float DEFAULT NULL,
  `velocity` float DEFAULT NULL,
  `locate_type` varchar(20) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`timestamp`,`id`),
  KEY `zone_INDEX` (`lati`,`longi`,`alti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'smartspace'
--

--
-- Dumping routines for database 'smartspace'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-18 16:26:21
