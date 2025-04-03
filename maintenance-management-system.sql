-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2025 at 10:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maintenance-management-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `requesting_spare_parts`
--

CREATE TABLE `requesting_spare_parts` (
  `request_id` int(11) NOT NULL,
  `spare_part_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `machine_code` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_and_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `spare_parts`
--

CREATE TABLE `spare_parts` (
  `id` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `item` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spare_parts`
--

INSERT INTO `spare_parts` (`id`, `department`, `type`, `item`, `quantity`) VALUES
(1, 'Macanical', 'MAC', 'abcd', 148),
(2, 'Electrical', 'el', 'abcd', 100),
(3, 'Machanical', 'abc', 'ihn', 30);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `position` varchar(50) NOT NULL DEFAULT 'Technician',
  `status` varchar(100) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`user_id`, `email`, `password`, `user_name`, `position`, `status`) VALUES
(9, 'johndoe@example.com', '$2b$10$CWlaxS5xbayuFlwkFkgWJ.3Cc.Y3Pdydford9DBQiotiabMXXF94K', 'John Doe', 'Engineer', 'pending'),
(11, 'mac10@gmail.com', '$2b$10$ieVYCNh72rnJRlVewglJ4uxbOomKs/3zEippilGNnGO7vrqGGfOjK', 'mac', 'admin', 'pending'),
(12, 'tech1@gmail.com', '$2b$10$Mnm1K1c4j9UcwJNc.NCrWOA9bz/Qo4dxeUWac03.HYS9z.rqpoiXy', 'tech1', 'Technician', 'pending'),
(13, 'engineer@gmail.com', '$2b$10$w1cmtWnBEJaW6L85xFigse0zv6C/GZoB0Tzpirtvd0blIuoqZuLw2', 'engineer1', 'Engineer', 'pending'),
(14, 'eng1@gmail.com', '$2b$10$UCs2iZhJEm6toLY5vzFNW.NTeX/R5j1DUw0lBNjw2o8ZEr0hrolXG', 'eng1', 'Engineer', 'pending'),
(15, 'imshan1@gmail.com', '$2b$10$zWCaxMU1v7enfS/ieKmnZ.keIWoKYHqc0AzpUiPDdSGsOfcjBTzsC', 'imshan', 'Engineer', 'pending'),
(16, 'admin@gmail.com', '$2b$10$wU5Ox0VgHGX44tAYXYIAO.nmF5WsXNhmk.l/NGz2SS7qFYpI3NdH.', 'admin01', 'Engineer', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requesting_spare_parts`
--
ALTER TABLE `requesting_spare_parts`
  ADD PRIMARY KEY (`request_id`,`spare_part_id`),
  ADD KEY `spare_part_id` (`spare_part_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spare_parts`
--
ALTER TABLE `spare_parts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `spare_parts`
--
ALTER TABLE `spare_parts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `requesting_spare_parts`
--
ALTER TABLE `requesting_spare_parts`
  ADD CONSTRAINT `requesting_spare_parts_ibfk_1` FOREIGN KEY (`spare_part_id`) REFERENCES `spare_parts` (`id`),
  ADD CONSTRAINT `requesting_spare_parts_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
