-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: evofit-db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `exercise_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `main_muscle_id` int DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  KEY `main_muscle_id` (`main_muscle_id`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`main_muscle_id`) REFERENCES `main_muscles` (`main_muscle_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'Bench Press','A chest exercise using a barbell or dumbbells to press weights upwards.',1),(2,'Incline Bench Press','A chest exercise using a barbell or dumbbells to press weights upwards.',1),(3,'Decline Bench Press','A variation of the bench press with a decline angle to target the lower chest.',1),(4,'Dumbbell Fly','A chest exercise that isolates the chest muscles using dumbbells.',1),(5,'Cable Fly','A cable exercise for the chest that involves bringing the hands together in front of the body.',1),(6,'Push-Up','A bodyweight exercise that targets the chest and triceps.',1),(7,'Incline Push-Up','A variation of the push-up with the hands elevated to target the upper chest.',1),(8,'Chest Dips','A bodyweight exercise where the chest is targeted by lowering and raising the body on parallel bars.',1),(9,'Pec Deck Machine','A machine exercise that isolates the chest by bringing the arms together in front of the body.',1),(10,'Svend Press','A chest exercise involving a pressing motion with a plate or hands.',1),(11,'Squat','A compound leg exercise targeting the quadriceps, hamstrings, and glutes.',3),(12,'Front Squat','A squat variation targeting the quadriceps and glutes.',3),(13,'Hack Squat','A machine-based squat targeting the quadriceps and glutes.',3),(14,'Leg Press','A machine exercise to strengthen the quadriceps, hamstrings, and glutes.',3),(15,'Lunge','A lower-body exercise targeting the quadriceps, hamstrings, and glutes.',3),(16,'Bulgarian Split Squat','A single-leg squat with the rear foot elevated to target the quads and glutes.',3),(17,'Step-Up','An exercise that involves stepping onto a raised platform to target the legs and glutes.',3),(18,'Leg Curl','A machine exercise to target the hamstrings by curling the legs upward.',3),(19,'Leg Extension','A machine exercise that isolates the quadriceps by extending the legs.',3),(20,'Romanian Deadlift','A hamstring exercise that involves lowering the barbell to the shins while keeping the legs straight.',3),(21,'Bicep Curl','A basic exercise that targets the biceps using a barbell or dumbbells.',4),(22,'Hammer Curl','A variation of the bicep curl with a neutral grip that also targets the brachialis muscle.',4),(23,'Concentration Curl','A focused bicep curl where the arm is braced against the inner thigh for maximum contraction.',4),(24,'Preacher Curl','An exercise using a preacher bench that isolates the biceps.',4),(25,'Cable Curl','A bicep curl using a cable machine to provide constant tension throughout the movement.',4),(26,'Tricep Pushdown','A cable machine exercise that targets the triceps by pushing a bar downward.',5),(27,'Tricep Kickback','An exercise that involves extending the arms behind the body to isolate the triceps.',5),(28,'Overhead Tricep Extension','An exercise targeting the long head of the triceps by extending the arms overhead.',5),(29,'Overhead Press','A pressing movement that targets the deltoid muscles, especially the front and middle heads.',6),(30,'Lateral Raise','An isolation exercise for the middle deltoid that involves lifting the arms out to the sides.',6),(31,'Front Raise','A raise targeting the front deltoids by lifting the arms in front of the body.',6),(32,'Crunch','A classic abdominal exercise that involves flexing the spine to engage the core.',7),(33,'Plank','An isometric exercise where the body is held in a push-up position to engage the entire core.',7),(34,'Leg Raise','An exercise that targets the lower abs by raising the legs off the ground while lying down.',7);
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_muscles`
--

DROP TABLE IF EXISTS `main_muscles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_muscles` (
  `main_muscle_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`main_muscle_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_muscles`
--

LOCK TABLES `main_muscles` WRITE;
/*!40000 ALTER TABLE `main_muscles` DISABLE KEYS */;
INSERT INTO `main_muscles` VALUES (7,'Abs'),(2,'Back'),(4,'Biceps'),(1,'Chest'),(3,'Legs'),(6,'Shoulders'),(5,'Triceps');
/*!40000 ALTER TABLE `main_muscles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int NOT NULL,
  `senderType` enum('user','assistant') NOT NULL,
  `content` text NOT NULL,
  `sender_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `messages_ibfk_15` FOREIGN KEY (`chat_id`) REFERENCES `user_chats` (`id_userChat`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_16` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,'user','Hola Ana, ¿cómo estás?',1,'2025-08-02 14:25:03','2025-08-02 14:25:03'),(2,1,'user','¡Hola Juan! Bien, ¿y vos?',2,'2025-08-02 14:25:03','2025-08-02 14:25:03'),(3,2,'user','¿Qué tarea dejamos para mañana?',1,'2025-08-02 14:25:03','2025-08-02 14:25:03'),(4,2,'user','La de historia creo',2,'2025-08-02 14:25:03','2025-08-02 14:25:03'),(5,2,'user','Sí, esa misma.',3,'2025-08-02 14:25:03','2025-08-02 14:25:03'),(6,3,'user','IA, ¿podés explicarme álgebra?',1,'2025-08-02 14:25:03','2025-08-02 14:25:03'),(7,3,'assistant','Claro Juan, álgebra es la rama de las matemáticas...',NULL,'2025-08-02 14:25:03','2025-08-02 14:25:03');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routine_exercise_detail`
--

DROP TABLE IF EXISTS `routine_exercise_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine_exercise_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `routine_exercise_id` int DEFAULT NULL,
  `exercise_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `routine_exercise_detail_exercise_id_routine_exercise_id_unique` (`routine_exercise_id`,`exercise_id`),
  KEY `exercise_id` (`exercise_id`),
  CONSTRAINT `routine_exercise_detail_ibfk_13` FOREIGN KEY (`routine_exercise_id`) REFERENCES `routine_exercises` (`routine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `routine_exercise_detail_ibfk_14` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine_exercise_detail`
--

LOCK TABLES `routine_exercise_detail` WRITE;
/*!40000 ALTER TABLE `routine_exercise_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `routine_exercise_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routine_exercises`
--

DROP TABLE IF EXISTS `routine_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine_exercises` (
  `routine_id` int NOT NULL,
  `exercise_id` int NOT NULL,
  `sets` int NOT NULL,
  `reps` int NOT NULL,
  `weight` float NOT NULL,
  PRIMARY KEY (`routine_id`,`exercise_id`),
  CONSTRAINT `routine_exercises_ibfk_1` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`routine_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine_exercises`
--

LOCK TABLES `routine_exercises` WRITE;
/*!40000 ALTER TABLE `routine_exercises` DISABLE KEYS */;
INSERT INTO `routine_exercises` VALUES (1,5,4,10,40);
/*!40000 ALTER TABLE `routine_exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routines`
--

DROP TABLE IF EXISTS `routines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routines` (
  `routine_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `weeks` int NOT NULL,
  `days` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`routine_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routines`
--

LOCK TABLES `routines` WRITE;
/*!40000 ALTER TABLE `routines` DISABLE KEYS */;
INSERT INTO `routines` VALUES (1,'routine1',4,5,1);
/*!40000 ALTER TABLE `routines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submuscles`
--

DROP TABLE IF EXISTS `submuscles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submuscles` (
  `submuscle_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `main_muscle_id` int NOT NULL,
  PRIMARY KEY (`submuscle_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  KEY `main_muscle_id` (`main_muscle_id`),
  CONSTRAINT `submuscles_ibfk_1` FOREIGN KEY (`main_muscle_id`) REFERENCES `main_muscles` (`main_muscle_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submuscles`
--

LOCK TABLES `submuscles` WRITE;
/*!40000 ALTER TABLE `submuscles` DISABLE KEYS */;
INSERT INTO `submuscles` VALUES (1,'Pectoralis Major',1),(2,'Pectoralis Middle',1),(3,'Pectoralis Minor',1),(4,'Latissimus Dorsi',2),(5,'Trapezius',2),(6,'Rhomboids',2),(7,'Erector Spinae',2),(8,'Quadriceps',3),(9,'Hamstrings',3),(10,'Calves',3),(11,'Glutes',3),(12,'Biceps Brachii',4),(13,'Brachialis',4),(14,'Brachioradialis',4),(15,'Triceps Brachii',5),(16,'Triceps Long Head',5),(17,'Triceps Lateral Head',5),(18,'Triceps Medial Head',5),(19,'Deltoids',6),(20,'Medial Deltoid',6),(21,'Anterior Deltoid',6),(22,'Lateral Deltoid',6),(23,'Posterior Deltoid',6),(24,'Rectus Abdominis',7),(25,'Obliques',7),(26,'Transverse Abdominis',7),(27,'Lower Abs',7),(28,'Upper Abs',7);
/*!40000 ALTER TABLE `submuscles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submuscules_exercise`
--

DROP TABLE IF EXISTS `submuscules_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submuscules_exercise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exercise_id` int DEFAULT NULL,
  `sub_muscle_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercise_id` (`exercise_id`),
  KEY `sub_muscle_id` (`sub_muscle_id`),
  CONSTRAINT `submuscules_exercise_ibfk_17` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`) ON UPDATE CASCADE,
  CONSTRAINT `submuscules_exercise_ibfk_18` FOREIGN KEY (`sub_muscle_id`) REFERENCES `submuscles` (`submuscle_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submuscules_exercise`
--

LOCK TABLES `submuscules_exercise` WRITE;
/*!40000 ALTER TABLE `submuscules_exercise` DISABLE KEYS */;
/*!40000 ALTER TABLE `submuscules_exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_chat_participants`
--

DROP TABLE IF EXISTS `user_chat_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_chat_participants` (
  `userId` int NOT NULL,
  `userChatId` int NOT NULL,
  PRIMARY KEY (`userId`,`userChatId`),
  UNIQUE KEY `user_chat_participants_userChatId_userId_unique` (`userId`,`userChatId`),
  KEY `userChatId` (`userChatId`),
  CONSTRAINT `user_chat_participants_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_chat_participants_ibfk_2` FOREIGN KEY (`userChatId`) REFERENCES `user_chats` (`id_userChat`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_chat_participants`
--

LOCK TABLES `user_chat_participants` WRITE;
/*!40000 ALTER TABLE `user_chat_participants` DISABLE KEYS */;
INSERT INTO `user_chat_participants` VALUES (1,1),(2,1),(1,2),(2,2),(3,2),(1,3);
/*!40000 ALTER TABLE `user_chat_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_chats`
--

DROP TABLE IF EXISTS `user_chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_chats` (
  `id_userChat` int NOT NULL AUTO_INCREMENT,
  `chatType` enum('IA','PRIVATE','GROUP') NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_userChat`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_chats`
--

LOCK TABLES `user_chats` WRITE;
/*!40000 ALTER TABLE `user_chats` DISABLE KEYS */;
INSERT INTO `user_chats` VALUES (1,'IA',NULL,'2025-08-02 14:20:38','2025-08-02 14:20:38'),(2,'PRIVATE',NULL,'2025-08-02 14:21:36','2025-08-02 14:21:36'),(3,'GROUP','Grupo de estudio','2025-08-02 14:21:36','2025-08-02 14:21:36');
/*!40000 ALTER TABLE `user_chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `birthdate` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'juan@example.com','hashed123','juanito','Juan','Pérez','user','1990-01-01 00:00:00'),(2,'ana@example.com','hashed123','anita','Ana','Gómez','user','1992-05-10 00:00:00'),(3,'lucas@example.com','hashed123','lucas','Lucas','Fernández','user','1995-11-22 00:00:00'),(4,'juann@example.com','$2b$10$6/bYmP8FLcyAA9k/c.Beme8FShVNYkdTd8.7fmcwVLK3vjdimLAIK','juann','juan','López','admin','1990-03-22 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-13 10:51:50
