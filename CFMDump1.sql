CREATE DATABASE  IF NOT EXISTS `dbcfm` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dbcfm`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dbpsm
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblanswers`
--

-- DROP TABLE IF EXISTS `tblanswers`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tblanswers` (
--   `intAnswerID` int(11) NOT NULL AUTO_INCREMENT,
--   `strAnswerSNum` char(15) NOT NULL,
--   `intAnswer` int(3) NOT NULL,
--   PRIMARY KEY (`intAnswerID`),
--   KEY `strAnswerSNum_idx` (`strAnswerSNum`),
--   KEY `intAnswer_idx` (`intAnswer`),
--   CONSTRAINT `intAnswer` FOREIGN KEY (`intAnswer`) REFERENCES `tblchoices` (`intChID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `strAnswerSNum` FOREIGN KEY (`strAnswerSNum`) REFERENCES `tbluser` (`strSNum`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblanswers`
--

-- INSERT INTO `tblanswers` VALUES (51,'2015-04593-MN-0',90),(52,'2015-04593-MN-0',65),(53,'2015-04593-MN-0',95),(54,'2015-04593-MN-0',53),(55,'2015-04593-MN-0',38),(56,'2015-04593-MN-0',2),(57,'2015-04593-MN-0',26),(58,'2015-04593-MN-0',41),(59,'2015-04593-MN-0',46),(60,'2015-04593-MN-0',14),(61,'2015-01216-MN-0',69),(62,'2015-01216-MN-0',2),(63,'2015-01216-MN-0',17),(64,'2015-01216-MN-0',24),(65,'2015-01216-MN-0',26),(66,'2015-01216-MN-0',33),(67,'2015-01216-MN-0',46),(68,'2015-01216-MN-0',53),(69,'2015-01216-MN-0',60),(70,'2015-01216-MN-0',65),(71,'2015-04834-MN-0',82),(72,'2015-04834-MN-0',8),(73,'2015-04834-MN-0',11),(74,'2015-04834-MN-0',41),(75,'2015-04834-MN-0',46),(76,'2015-04834-MN-0',51),(77,'2015-04834-MN-0',53),(78,'2015-04834-MN-0',60),(79,'2015-04834-MN-0',63),(80,'2015-04834-MN-0',65),(81,'2015-01341-MN-0',95),(82,'2015-01341-MN-0',8),(83,'2015-01341-MN-0',14),(84,'2015-01341-MN-0',24),(85,'2015-01341-MN-0',38),(86,'2015-01341-MN-0',41),(87,'2015-01341-MN-0',51),(88,'2015-01341-MN-0',69),(89,'2015-01341-MN-0',82),(90,'2015-01341-MN-0',87),(91,'2015-04253-MN-0',90),(92,'2015-04253-MN-0',8),(93,'2015-04253-MN-0',17),(94,'2015-04253-MN-0',32),(95,'2015-04253-MN-0',33),(96,'2015-04253-MN-0',51),(97,'2015-04253-MN-0',53),(98,'2015-04253-MN-0',63),(99,'2015-04253-MN-0',65),(100,'2015-04253-MN-0',87),(101,'2015-11114-MN-0',8),(102,'2015-11114-MN-0',11),(103,'2015-11114-MN-0',14),(104,'2015-11114-MN-0',26),(105,'2015-11114-MN-0',38),(106,'2015-11114-MN-0',60),(107,'2015-11114-MN-0',63),(108,'2015-11114-MN-0',65),(109,'2015-11114-MN-0',87),(110,'2015-11114-MN-0',95),(111,'2015-05757-MN-0',82),(112,'2015-05757-MN-0',14),(113,'2015-05757-MN-0',17),(114,'2015-05757-MN-0',24),(115,'2015-05757-MN-0',26),(116,'2015-05757-MN-0',32),(117,'2015-05757-MN-0',33),(118,'2015-05757-MN-0',38),(119,'2015-05757-MN-0',53),(120,'2015-05757-MN-0',73),(121,'2015-02766-MN-0',90),(122,'2015-02766-MN-0',2),(123,'2015-02766-MN-0',24),(124,'2015-02766-MN-0',32),(125,'2015-02766-MN-0',41),(126,'2015-02766-MN-0',53),(127,'2015-02766-MN-0',63),(128,'2015-02766-MN-0',60),(129,'2015-02766-MN-0',65),(130,'2015-02766-MN-0',82),(131,'2015-02820-MN-0',87),(132,'2015-02820-MN-0',2),(133,'2015-02820-MN-0',6),(134,'2015-02820-MN-0',11),(135,'2015-02820-MN-0',36),(136,'2015-02820-MN-0',53),(137,'2015-02820-MN-0',65),(138,'2015-02820-MN-0',74),(139,'2015-02820-MN-0',82),(140,'2015-02820-MN-0',69),(141,'2015-08887-MN-0',90),(142,'2015-08887-MN-0',6),(143,'2015-08887-MN-0',11),(144,'2015-08887-MN-0',26),(145,'2015-08887-MN-0',33),(146,'2015-08887-MN-0',46),(147,'2015-08887-MN-0',53),(148,'2015-08887-MN-0',69),(149,'2015-08887-MN-0',74),(150,'2015-08887-MN-0',82),(151,'2015-02043-MN-0',95),(152,'2015-02043-MN-0',14),(153,'2015-02043-MN-0',24),(154,'2015-02043-MN-0',26),(155,'2015-02043-MN-0',32),(156,'2015-02043-MN-0',60),(157,'2015-02043-MN-0',74),(158,'2015-02043-MN-0',79),(159,'2015-02043-MN-0',82),(160,'2015-02043-MN-0',87),(161,'2015-01234-MN-0',90),(162,'2015-01234-MN-0',2),(163,'2015-01234-MN-0',6),(164,'2015-01234-MN-0',17),(165,'2015-01234-MN-0',46),(166,'2015-01234-MN-0',63),(167,'2015-01234-MN-0',65),(168,'2015-01234-MN-0',69),(169,'2015-01234-MN-0',79),(170,'2015-01234-MN-0',82);

-- --
-- -- Table structure for table `tblcategories`
-- --

-- DROP TABLE IF EXISTS `tblcategories`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tblcategories` (
--   `intCatID` int(1) NOT NULL,
--   `strCatName` varchar(30) NOT NULL,
--   PRIMARY KEY (`intCatID`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcategories`
--

-- INSERT INTO `tblcategories` VALUES (1,'Books'),(2,'School Supplies'),(3,'Food'),(4,'Misc.');

-- --
-- -- Table structure for table `tblchoices`
-- --

-- DROP TABLE IF EXISTS `tblchoices`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tblchoices` (
--   `intChID` int(3) NOT NULL,
--   `intChQuestionID` int(2) NOT NULL,
--   `strChoice` varchar(100) NOT NULL,
--   `boolCorrect` int(1) NOT NULL,
--   PRIMARY KEY (`intChID`),
--   KEY `intChQuestionID_idx` (`intChQuestionID`),
--   CONSTRAINT `intChQuestionID` FOREIGN KEY (`intChQuestionID`) REFERENCES `tblquestions` (`intQuestionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblchoices`
--

-- INSERT INTO `tblchoices` VALUES (1,1,'Beside the gym',0),(2,1,'Freedom Park',1),(3,1,'Beside the Chapel',0),(4,1,'Inside the Field',0),(5,2,'5',0),(6,2,'4',1),(7,2,'3',0),(8,2,'6',0),(9,3,'Jose Rizal',0),(10,3,'Gregorio Del Pilar',0),(11,3,'Apolinario Mabini',1),(12,3,'Emilio Aguinaldo',0),(13,4,'A well known professor',0),(14,4,'The mascot of PUP',1),(15,4,'The president of PUP',0),(16,4,'A seller of cooked lunch',0),(17,5,'Beside the Library/NALLRC',1),(18,5,'Beside the main building',0),(19,5,'Inside the lagoon',0),(20,5,'In front of the chapel',0),(21,6,'SM Megamall',0),(22,6,'SM North',0),(23,6,'Market! Market!',0),(24,6,'SM Centerpoint',1),(25,7,'Fish, Egg With Apple',0),(26,7,'Footlong, Egg Wrap Around',1),(27,7,'Fried Espasol with Almond',0),(28,7,'Fried eggplant with Atsara',0),(29,8,'2',0),(30,8,'1',0),(31,8,'4',0),(32,8,'3',1),(33,9,'2',1),(34,9,'1',0),(35,9,'4',0),(36,9,'3',0),(37,10,'Polytechnic University of the Philippines',0),(38,10,'Philippine School of Commerce',1),(39,10,'Polytechnic College',0),(40,10,'Unibersidad de Politekniko',0),(41,11,'1904',1),(42,11,'1910',0),(43,11,'1907',0),(44,11,'1969',0),(45,12,'Sit on the floor',0),(46,12,'Get a chair from other classrooms',1),(47,12,'Just stand',0),(48,12,'Burn more chairs as a protest',0),(49,13,'Emmanuel Malto',0),(50,13,'Angelito Casasis',0),(51,13,'Ruben Madridejos',1),(52,13,'Albert dela Cruz',0),(53,14,'Emanuel de Guzman',1),(54,14,'Perry David Solosa',0),(55,14,'Dante Gueverra',0),(56,14,'Samuel Salvador',0),(57,15,'15',0),(58,15,'10',0),(59,15,'11',0),(60,15,'12',1),(61,16,'Oblation Run',0),(62,16,'Naked Run',0),(63,16,'Pylon Run',1),(64,16,'Fanservice Run',0),(65,17,'6',1),(66,17,'4',0),(67,17,'5',0),(68,17,'7',0),(69,18,'FEWA',1),(70,18,'ID Lace',0),(71,18,'School Supplies',0),(72,18,'Spaghetti',0),(73,19,'Park',0),(74,19,'Lagoon',1),(75,19,'Building',0),(76,19,'Fountain',0),(77,20,'Silog',0),(78,20,'Red Panda',0),(79,20,'Submarine',1),(80,20,'Kalog',0),(81,21,'Inside the main building',0),(82,21,'NALLRC building',1),(83,21,'Inside Charlie del Rosario',0),(84,21,'At the middle of the oval',0),(85,22,'1/3 of the class time',1),(86,22,'1/2 of the class time',0),(87,22,'1/4 of the class time',0),(88,22,'None of the choices',0),(89,23,'11:00 pm',0),(90,23,'9:00 pm',1),(91,23,'10:30 pm',0),(92,23,'8:00 pm',0),(93,24,'Outside PUP',0),(94,24,'1st floor',0),(95,24,'6th floor',1),(96,24,'3rd floor',0);

-- --
-- -- Table structure for table `tblitem`
-- --

-- DROP TABLE IF EXISTS `tblitem`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tblitem` (
--   `intItemID` int(11) NOT NULL AUTO_INCREMENT,
--   `strItemTitle` varchar(50) NOT NULL,
--   `fltItemPrice` float NOT NULL,
--   `strItemSNum` char(15) NOT NULL,
--   `datPostDate` date NOT NULL,
--   `txtItemDesc` varchar(250) DEFAULT NULL,
--   `strOrderPass` varchar(45) NOT NULL,
--   `strFirstPic` varchar(100) DEFAULT NULL,
--   `strSecondPic` varchar(100) DEFAULT NULL,
--   `strThirdPic` varchar(100) DEFAULT NULL,
--   `intItemCat` int(1) NOT NULL,
--   PRIMARY KEY (`intItemID`),
--   KEY `strItemSNum_idx` (`strItemSNum`),
--   KEY `intItemCat_idx` (`intItemCat`),
--   CONSTRAINT `intItemCat` FOREIGN KEY (`intItemCat`) REFERENCES `tblcategories` (`intCatID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `strItemSNum` FOREIGN KEY (`strItemSNum`) REFERENCES `tbluser` (`strSNum`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblitem`
--

-- INSERT INTO `tblitem` VALUES (24,'Drawstrings',200,'2015-04593-MN-0','2017-10-17','Drawstring Bags','drwastrings','2015-04593-MN-0-EgHdMIDqE4D7ngNVwbTZJYq86XncY1bHDXZAyazrEvXtrOGkvY-1.jpg','2015-04593-MN-0-EgHdMIDqE4D7ngNVwbTZJYq86XncY1bHDXZAyazrEvXtrOGkvY-2.jpg','2015-04593-MN-0-EgHdMIDqE4D7ngNVwbTZJYq86XncY1bHDXZAyazrEvXtrOGkvY-3.jpg',4),(25,'History Book',450.5,'2015-04593-MN-0','2017-10-17','World History Book\r\nslightly used\r\npresentable','hitorybooks','2015-04593-MN-0-zbzbJvG5ciR13lPypYt2K2hvGJEhNQMwJn0ENDQMb9SrmYtz26-1.jpg','2015-04593-MN-0-zbzbJvG5ciR13lPypYt2K2hvGJEhNQMwJn0ENDQMb9SrmYtz26-2.jpg','2015-04593-MN-0-zbzbJvG5ciR13lPypYt2K2hvGJEhNQMwJn0ENDQMb9SrmYtz26-3.jpg',1),(26,'Samyang Spicy Noodles',70,'2015-04834-MN-0','2017-10-17','Samyang Spicy noodles','spicysamyang','2015-04834-MN-0-XcebpzTjPws0j7RlEMAq2FSgJrWXQPsLuhjTNpXYjJaq8hB5uN-1.jpg','2015-04834-MN-0-XcebpzTjPws0j7RlEMAq2FSgJrWXQPsLuhjTNpXYjJaq8hB5uN-2.jpg','2015-04834-MN-0-XcebpzTjPws0j7RlEMAq2FSgJrWXQPsLuhjTNpXYjJaq8hB5uN-3.jpg',3),(27,'Frixion Pen',30,'2015-04834-MN-0','2017-10-17','Erasable Pen\r\n.5\r\nreffilable','erasable','2015-04834-MN-0-SZAZgCvtxpEpUAQGzKGg4FSJVUy00d2mXZ9jFd3FUPxPBrCKqV-1.jpg','2015-04834-MN-0-SZAZgCvtxpEpUAQGzKGg4FSJVUy00d2mXZ9jFd3FUPxPBrCKqV-2.jpg','2015-04834-MN-0-SZAZgCvtxpEpUAQGzKGg4FSJVUy00d2mXZ9jFd3FUPxPBrCKqV-3.jpg',2),(28,'Sunflower',250,'2015-01341-MN-0','2017-10-17','Sunflower \r\n250 each\r\n400 (2pcs)','flowersun','2015-01341-MN-0-3dkTyi7cWeXCWkNbladGjzCHSuNRbbSqhiu2F7AWFoCUOzmYm4-1.jpg','2015-01341-MN-0-3dkTyi7cWeXCWkNbladGjzCHSuNRbbSqhiu2F7AWFoCUOzmYm4-2.jpg','2015-01341-MN-0-3dkTyi7cWeXCWkNbladGjzCHSuNRbbSqhiu2F7AWFoCUOzmYm4-3.jpg',4),(29,'Moon Necklace',185,'2015-02820-MN-0','2017-10-17','MOON NECKLACE \r\nNow Available! \r\n-Stainless Steel \r\n-Glow in the dark\r\n-size: pendant 2cm,Chain 41cm\r\n185 only! W/box na po ','moonlight','2015-02820-MN-0-LOQQng0zYlA2EycAjZR3LoWjKE5UqVXrPwYAmZln5gT3RLx18z-1.jpg','2015-02820-MN-0-LOQQng0zYlA2EycAjZR3LoWjKE5UqVXrPwYAmZln5gT3RLx18z-2.jpg','2015-02820-MN-0-LOQQng0zYlA2EycAjZR3LoWjKE5UqVXrPwYAmZln5gT3RLx18z-3.jpg',4),(30,'MSA College Admission Tests Reviewer',499,'2015-01216-MN-0','2017-10-17','Reviewer for UPCAT, ACET, De la salle, UST, UA&P and other college entrance exams with ANSWERS AND SOLUTIONS MANUAL.\r\n\r\nIn good condition(with plastic cover pa!!!)\r\n\r\nOriginally bought it for  648.Now selling both books for only  499 !!!','reviewer','2015-01216-MN-0-IvgMO1QKXK1Aav65nPTSGKfqrLPghdsdplbd9wqA4O560IqWRS-1.jpg','2015-01216-MN-0-IvgMO1QKXK1Aav65nPTSGKfqrLPghdsdplbd9wqA4O560IqWRS-2.jpg','2015-01216-MN-0-IvgMO1QKXK1Aav65nPTSGKfqrLPghdsdplbd9wqA4O560IqWRS-3.jpg',1),(31,'SHIRTS',160,'2015-05757-MN-0','2017-10-17','160\r\nClip art Shirts! \r\nFor only Php 160.00\r\nAvail size: Small - XXL ','cliparts','2015-05757-MN-0-3QhPIp78MhYfE20SyAF4ynImhsqYKZbne4uQJljTV5ITs19q9o-1.jpg','blank.jpg','blank.jpg',4),(32,'Zenfone 3',5000,'2015-11114-MN-0','2017-10-17','for sale asus zenfone 3 max 5.2 no issie 2months old. more info about nasa picture posted.\r\n\r\nneed cash for upgrade.','asusnuma1','2015-11114-MN-0-RyiUl0cLPtYextUlM4xttS3s0g2INDGDFzO8ot8STX3tfH1wrk-1.jpg','2015-11114-MN-0-RyiUl0cLPtYextUlM4xttS3s0g2INDGDFzO8ot8STX3tfH1wrk-2.jpg','2015-11114-MN-0-RyiUl0cLPtYextUlM4xttS3s0g2INDGDFzO8ot8STX3tfH1wrk-3.jpg',4),(33,'Oreo cheesecake',85,'2015-04253-MN-0','2017-10-17','Guys sno pa po hahabol? Order na po  solid na creamcheese po ang nasa gitna, at ang lasa niya e parang white chocolate  bukas po available mga bessywap.\r\n\r\nAvalable monday&tuesday!\r\n\r\nMeetup pureza lrt station / nso','cheesecake','2015-04253-MN-0-GCMJJCNmJ1YFBCDqgqlIfIAwSpbJYe2C6b547MmCoINEfZfBrJ-1.jpg','2015-04253-MN-0-GCMJJCNmJ1YFBCDqgqlIfIAwSpbJYe2C6b547MmCoINEfZfBrJ-2.jpg','blank.jpg',3),(34,'Hershey\'s Syrup',100,'2015-04253-MN-0','2017-10-17','Hershey\'s syrup for sale!!! 100 pesos only!\r\n\r\n-Legit \r\n-Minimum 2pcs','Hershey\'s','2015-04253-MN-0-eu9EdSyNcmtuN293LxlzHHsHAn0e3SrMbDbqpSOw8rLjZ0d1tV-1.jpg','2015-04253-MN-0-eu9EdSyNcmtuN293LxlzHHsHAn0e3SrMbDbqpSOw8rLjZ0d1tV-2.jpg','blank.jpg',3),(35,'Dante\'s inferno',200,'2015-08887-MN-0','2017-10-17','200php each without sf\r\n600php set with sf\r\n500php pick up at pureza lrt\r\nVisit kelzshoppe for more book titles','infernob','2015-08887-MN-0-XeYfamNC9Zzu0zoNm6EzxkJ4kj1sOfrK2cNAbLFv5pk5czzKbK-1.jpg','blank.jpg','blank.jpg',1),(36,'100% original casio watches',1299,'2015-02766-MN-0','2017-10-17','101% authentic\r\n101% legit\r\nbrandnew/onhand\r\ncomplete with casio box,manual,tag and warranty\r\n1299-2999 depende po sa unit\r\ntriple ur money back pag fake\r\ndi po eto oem,replica or class a \r\nfree delivery/ cod around pasig\r\n','123456789','2015-02766-MN-0-Cyq66ZiEMXNopqtBgvN7SITXKsqniVFFHM7eTbarOK57xWEThU-1.jpg','2015-02766-MN-0-Cyq66ZiEMXNopqtBgvN7SITXKsqniVFFHM7eTbarOK57xWEThU-2.jpg','2015-02766-MN-0-Cyq66ZiEMXNopqtBgvN7SITXKsqniVFFHM7eTbarOK57xWEThU-3.jpg',4);

-- --
-- -- Table structure for table `tblquestions`
-- --

-- DROP TABLE IF EXISTS `tblquestions`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tblquestions` (
--   `intQuestionID` int(2) NOT NULL,
--   `strQuestion` varchar(150) NOT NULL,
--   `boolUsed` int(1) NOT NULL,
--   PRIMARY KEY (`intQuestionID`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `tblquestions`
-- --

-- INSERT INTO `tblquestions` VALUES (1,'Where is the Obelisk located at?',1),(2,'How many wings does the main building have?',1),(3,'Who is the national hero that has a \"tahanan\" in our Sintang Paaralan?',0),(4,'Who is Ted Pylon?',0),(5,'Where is the UFO/Watertank located at in PUP?',1),(6,'The favorite mall of students when there are no professors',0),(7,'What does \"FEWA\" mean?',0),(8,'How many basketball courts does PUP Sta. Mesa have?',0),(9,'How many 7/11 branches are there near PUP Sta. Mesa?',0),(10,'What is the first name of PUP?',0),(11,'What year did PUP officially become a university?',0),(12,'What would you do if there is a shortage of chairs in your room?',1),(13,'Who is the \"Einstein\" of PUP Sta. Mesa?',0),(14,'Who is the current president of PUP?',0),(15,'How many characters does the student number have (excluding dashes)?',0),(16,'What is the real name of the event \"Kikiam run\"?',1),(17,'How many floors does the PUP main building have?',1),(18,'What does \"Virgin\" sell?',1),(19,'Currently, what does \"Intramuros\" behold inside?',0),(20,'Other than the FEWA, what is the other famous food from PUP?',1),(21,'Where is the most presentable comfort room located at in PUP Sta. Mesa?',1),(22,'How long do you have to wait until you could safely assume that your professor is absent?',0),(23,'What is the latest end of classes in PUP?',1),(24,'When you were a freshie, how long did the line go during registration?',0);

-- --
-- -- Table structure for table `tblreport`
-- --

-- DROP TABLE IF EXISTS `tblreport`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tblreport` (
--   `intReportID` int(11) NOT NULL AUTO_INCREMENT,
--   `intReportItemID` int(11) NOT NULL,
--   `strReportSNum` char(15) NOT NULL,
--   PRIMARY KEY (`intReportID`),
--   KEY `intReportItemID_idx` (`intReportItemID`),
--   KEY `strReportSNum_idx` (`strReportSNum`),
--   CONSTRAINT `intReportItemID` FOREIGN KEY (`intReportItemID`) REFERENCES `tblitem` (`intItemID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `strReportSNum` FOREIGN KEY (`strReportSNum`) REFERENCES `tbluser` (`strSNum`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `tblreport`
-- --


-- --
-- -- Table structure for table `tbltransaction`
-- --

-- DROP TABLE IF EXISTS `tbltransaction`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tbltransaction` (
--   `intTransID` int(11) NOT NULL AUTO_INCREMENT,
--   `intTransItemID` int(11) NOT NULL,
--   `strBuyerSNum` char(15) NOT NULL,
--   `datDateStarted` date NOT NULL,
--   `strTransStatus` varchar(20) NOT NULL,
--   `datDateFinished` date DEFAULT NULL,
--   PRIMARY KEY (`intTransID`),
--   KEY `intTransItemID_idx` (`intTransItemID`),
--   KEY `strBuyerSNum_idx` (`strBuyerSNum`),
--   CONSTRAINT `intTransItemID` FOREIGN KEY (`intTransItemID`) REFERENCES `tblitem` (`intItemID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `strBuyerSNum` FOREIGN KEY (`strBuyerSNum`) REFERENCES `tbluser` (`strSNum`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `tbltransaction`
-- --

-- INSERT INTO `tbltransaction` VALUES (15,24,'2015-02766-MN-0','2017-10-17','Ongoing',NULL);

-- --
-- -- Table structure for table `tbluser`
-- --
-- DROP TABLE IF EXISTS `tbluser`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `tbluser` (
--   `strSNum` char(15) NOT NULL,
--   `strName` varchar(100) NOT NULL,
--   `strEmail` varchar(45) NOT NULL,
--   `txtContact` varchar(250) DEFAULT NULL,
--   `strPassword` varchar(50) NOT NULL,
--   `strStatus` varchar(20) NOT NULL,
--   `intCommend` int(6) NOT NULL,
--   `intReport` int(6) NOT NULL,
--   `strProfilePicture` varchar(100) DEFAULT NULL,
--   PRIMARY KEY (`strSNum`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- /*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tbltransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltransaction` (
  `intTransID` int(6) NOT NULL  AUTO_INCREMENT,
  `intTransID_intID` int(6) NOT NULL,
  `strTransDetails` varchar(250),
  `intTransID_intCID` int(6), 
  `datDateTrans` date NOT NULL,
  `timTimeTrans` time NOT NULL,
  `intTransID_intID2` int(6) NOT NULL,
  `strTransStatus` varchar(20) NOT NULL,
  PRIMARY KEY (`intTransID`),
  KEY `intTransID_intID_idx`(`intTransID_intID`),
  KEY `intTransID_intID2_idx`(`intTransID_intID2`),
  KEY `intTransID_intCID_idx`(`intTransID_intCID`),
  CONSTRAINT `intTransID_intID` FOREIGN KEY (`intTransID_intID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intTransID_intID2` FOREIGN KEY (`intTransID_intID2`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intTransID_intCID` FOREIGN KEY (`intTransID_intCID`) REFERENCES `tblcoffeeshop` (`intCID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `tbltransaction` VALUES ('900001','10000','Hi Een! Lance to, sana makarating ka..','30000','2018-05-26','2:30','10001', 'ongoing'),
									('900002','10000','Oi Een! Celebrate natin bday mo!','30000','2018-02-25','2:30','10001', 'finished'),
									('900003','10001','','30000','2018-02-27','1:00','10000', 'ongoing'),
                                    ('900004','10001','','30000','2018-05-26','1:00','10000', 'ongoing');

--
DROP TABLE IF EXISTS `tblcoffeeshop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcoffeeshop` (
  `intCID` int(6) NOT NULL  AUTO_INCREMENT,
  `intCID_intID` int(6) NOT NULL	,
  `strCName` varchar(100) NOT NULL,
  `strCAddress` varchar(100) NOT NULL,
  `strCTnumber` varchar(20),
  `intCRating` int,
  `strSpecial` varchar(100),
  `strDetails` varchar(100),
  `strPermit` varchar (100) NOT NULL,
  `strStatus` varchar(20) NOT NULL,
  `strPicture` varchar(100),
  `strPicture2` varchar(100),
  `strPicture3` varchar(100),
  `strPicture4` varchar(100),
  `strPicture5` varchar(100),
  `strMenu` varchar(100),
  `strMenu2` varchar(100),
  `strMenu3` varchar(100),
  `strMenu4` varchar(100),
  `strMenu5` varchar(100),
  PRIMARY KEY (`intCID`),
  KEY `intCID_intID_idx`(`intCID_intID`),
  CONSTRAINT `intCID_intID` FOREIGN KEY (`intCID_intID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `tblcoffeeshop` VALUES ('30000','10004','Star BOX','231 Sta. Mesa Manila','7778888','0', 'coffeejelly','OPEN 24 hrs','blank.png','registered','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','Frap1','Frap2','Frap3','Frap4','Frap5'),
									('30001','10005','Kape Tayo','SM Mega Mall','1233333','0', 'Frap','OPEN 24 hrs','blank.png','registered','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','','','','',''),
                                    ('30002','10004','Star BOX','PUP Lagoon','7778888','0', 'Dark','OPEN 24 hrs','blank.png','registered','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','blankcoffeeshop.png','','','','','');
DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `intID` int(6) NOT NULL  AUTO_INCREMENT,
  `strName` varchar(50) NOT NULL,
  `datBirthday` date NOT NULL,
  `strAddress` varchar(100),
  `strEmail` varchar(45) NOT NULL,
  `strPassword` varchar(50) NOT NULL,
  `strGender` varchar(6) NOT NULL,
  `strFavCoffee` varchar(50),
  `strBio` varchar(250),
  `strType` varchar(1) NOT NULL,
  `strStatus` varchar(20) NOT NULL,
  `strPicture` varchar(100),
  `strPicture2` varchar(100),
  `strPicture3` varchar(100),
  `strPicture4` varchar(100),
  `strPicture5` varchar(100),
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;	
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--


INSERT INTO `tbluser` VALUES ('10000','Lance San Pablo','1999-05-26','Makati','lancejeron26@gmail.com','pass','Male','Coffee Jelly','','1','verified','lance1.jpg','lance2.jpg','lance3.jpg','lance4.jpg','blank.jpg'),
							               ('10001','Een Mercado','2000-01-15','Pasay','e@xyz.com','pass','Female','3 in 1 coffee','','1','verified','een1.jpg','een2.jpg','een3.jpg','een4.jpg','blank.jpg'),
                             ('10007','Jethro Samson','2000-01-15','Pasay','jethro@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10008','Jon Ervin Balmaceda','2000-01-15','Pasay','jon@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10009','John Carlo Doronilla','2000-01-15','Pasay','carlo@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10010','Vince Miguel Oreta','2000-01-15','Pasay','vince@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10011','Matthew Victore','2000-01-15','Pasay','matthew@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10012','Jerevon Carreon','2000-01-15','Pasay','jerevon@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10013','Joshua Ganilla','2000-01-15','Pasay','joshua@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10014','Roberto Zulueta','2000-01-15','Pasay','roberto@xyz.com','pass','Male','3 in 1 coffee','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10002','Sendo De Guia','1999-08-21','Makati','s@xyz.com','pass','Male','Kapeng Barako','','1','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10004','Jon Loven','1999-12-03','Makati','j@xyz.com','pass','Male','Coffee jelly','','2','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10005','Hannah Cordero','1999-03-23','Makati','h@xyz.com','pass','Female','Frap','','2','verified','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('10006','Abceedee','2010-02-02','Makati','a@xyz.com','pass','Male','Coffee jelly','','2','banned','blank.jpg','blank.jpg','blank.jpg','blank.jpg','blank.jpg'),
                             ('1','admin','0000-00-00','Uknown','admin@xyz.com','admin','Male','death','','0','admin','blank.jpg',null,null,null,null);

DROP TABLE IF EXISTS `tblfriend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfriend` (
  
  `intID_Me` int(6) NOT NULL,
  `intID_Friend` int(6) NOT NULL,
  `strRelasyon` varchar(20),
  KEY `intID_Me_idx`(`intID_Me`),
  KEY `intID_Friend_idx`(`intID_Friend`),
  CONSTRAINT `intID_Me` FOREIGN KEY (`intID_Me`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intID_Friend` FOREIGN KEY (`intID_Friend`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `tblrating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblrating` (
  `intRating_intCID` int(6),
  `intRating_intID` int(6),
  `intRating` int,
  KEY `intRating_intCID_idx`(`intRating_intCID`),
  KEY `intRating_intID_idx`(`intRating_intID`),
  CONSTRAINT `intRating_intID` FOREIGN KEY (`intRating_intID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intRating_intCID` FOREIGN KEY (`intRating_intCID`) REFERENCES `tblcoffeeshop` (`intCID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -- Dump completed