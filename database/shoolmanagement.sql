-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2019 at 06:50 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoolmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni_register`
--

CREATE TABLE `alumni_register` (
  `register_id` int(11) NOT NULL,
  `ssc_roll_no` varchar(32) NOT NULL,
  `full_name` varchar(256) NOT NULL,
  `nick_name` varchar(256) DEFAULT NULL,
  `passing_year` int(11) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender_id` int(11) NOT NULL,
  `blood_group` varchar(16) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `country` varchar(256) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `mobile_no` varchar(256) DEFAULT NULL,
  `password` varchar(256) NOT NULL,
  `confirm_password` varchar(256) NOT NULL,
  `profession` varchar(256) DEFAULT NULL,
  `designation` varchar(256) DEFAULT NULL,
  `company` varchar(256) DEFAULT NULL,
  `company_address` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alumni_register`
--

INSERT INTO `alumni_register` (`register_id`, `ssc_roll_no`, `full_name`, `nick_name`, `passing_year`, `date_of_birth`, `gender_id`, `blood_group`, `address`, `city`, `country`, `email`, `mobile_no`, `password`, `confirm_password`, `profession`, `designation`, `company`, `company_address`) VALUES
(1, '581085', 'Mizanur Rahman', 'Milon', 2003, '1987-12-27', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(2, '', 'abcd', 'dbd', 2015, '2016-02-16', 0, '', '', '', '', '', '+8801722509237', 'beautyful', 'beautyful', '', '', '', ''),
(3, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(4, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(5, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(6, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(7, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(8, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(9, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(10, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(11, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(12, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(13, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(14, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(15, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(16, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(17, '581001', 'Full Name1', 'Nick Name1', 2015, '2016-02-01', 1, 'o+', 'Nikunja-2, Khilkhet, Dhaka-1229', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(18, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(19, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(20, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(21, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(22, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(23, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(24, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(25, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(26, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(27, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(28, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(29, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(30, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(31, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(32, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(33, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(34, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(35, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(36, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(37, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(38, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(39, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(40, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(41, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(42, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(43, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(44, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(45, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(46, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(47, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(48, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(49, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(50, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(51, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(52, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(53, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(54, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(55, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(56, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(57, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(58, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(59, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(60, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(61, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(62, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(63, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka'),
(64, '581085', 'Mizanur Rahman', 'Milon', 2002, '1986-08-06', 1, 'o+', 'Sabdalpur', 'Dhaka', 'Bangladesh', 'mr.milonku@gmail.com', '+8801722509237', 'beautyful', 'beautyful', 'Service Holder', 'Software Engineer', 'OscilloSoft Pty Limited', 'Dhaka');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `class_name` varchar(16) NOT NULL,
  `class_roman_name` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `class_name`, `class_roman_name`) VALUES
(1, 'Six', 'VI'),
(2, 'Seven', 'VII'),
(3, 'Eight', 'VIII'),
(4, 'Nine', 'IX'),
(5, 'Ten', 'X');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `designation_id` int(11) NOT NULL,
  `designation` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`designation_id`, `designation`) VALUES
(1, 'Head Teacher'),
(2, 'Assistant Teacher'),
(3, 'Assistant Head');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `event_location` varchar(256) NOT NULL,
  `event_name` varchar(256) NOT NULL,
  `event_details` text NOT NULL,
  `event_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `member_id`, `start_date`, `end_date`, `start_time`, `end_time`, `event_location`, `event_name`, `event_details`, `event_date`) VALUES
(1, 1, '2016-02-10', '2016-02-20', '10:30:00', '16:30:00', 'Sonaichadi School', '50 year anniversary registration', 'We are cordially requesting all our current and passed student to register for the 50 year anniversary event to make success.', '2016-02-07'),
(2, 1, '2016-02-23', '2016-02-24', '10:30:00', '17:30:00', 'School Field', 'Annual Sport', 'This is a annual sport event going', '0000-00-00'),
(3, 0, '2016-02-27', '2016-02-27', '10:30:00', '05:35:00', 'School Field', 'National Flag Rasing', 'This is a start of event in the morning with the raise of national flag.', '0000-00-00'),
(4, 0, '2016-02-27', '2016-02-27', '11:30:00', '12:30:00', 'School Field', 'National Anthem', 'We cordially announce that our all student should make sure  their presence.', '0000-00-00'),
(5, 0, '2016-02-27', '2016-02-27', '14:10:00', '16:30:00', 'School Field', 'School Field', 'this is a event edit test', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `exam_id` int(11) NOT NULL,
  `exam_name` varchar(256) NOT NULL,
  `exam_type` varchar(256) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `exam_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`exam_id`, `exam_name`, `exam_type`, `start_date`, `end_date`, `exam_year`) VALUES
(1, 'Half Yearly Exam', 'Test Exam', '2014-08-01', '2014-08-30', 2014),
(2, 'Half Yearly Exam', 'Test Exam', '2015-08-26', '2015-08-25', 2015),
(3, 'Half Yearly Exam', 'Test Exam', '2013-07-31', '2013-08-30', 2013);

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `gender_id` int(11) NOT NULL,
  `gender_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`gender_id`, `gender_name`) VALUES
(1, 'Male'),
(2, 'Female');

-- --------------------------------------------------------

--
-- Table structure for table ` grade_system`
--

CREATE TABLE ` grade_system` (
  `grade_id` int(11) NOT NULL,
  `range_of_mark` varchar(64) NOT NULL,
  `grade_point` float NOT NULL,
  `letter_grade` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table ` grade_system`
--

INSERT INTO ` grade_system` (`grade_id`, `range_of_mark`, `grade_point`, `letter_grade`) VALUES
(1, '80-100', 5, 'A+'),
(2, '70-79', 4, 'A'),
(3, '60-69', 3.5, 'A-'),
(4, '50-59', 3, 'B'),
(5, '40-49', 2, 'C'),
(6, '33-39', 1, 'D'),
(7, '00-32', 0, 'F');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `member_id` int(11) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `email_address` varchar(256) NOT NULL,
  `user_name` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `user_role` varchar(64) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`member_id`, `first_name`, `last_name`, `email_address`, `user_name`, `password`, `user_role`) VALUES
(1, 'Mr', 'Admin', 'admin@sonaichandihighschool.edu.bd', 'superadmin', 'shspassword123', 'admin'),
(2, 'Mr', 'Teacher', 'teacher@sonaichandihighschool.edu.bd', 'teacher', 'passwordabc123', 'teacher'),
(3, 'Mr', 'Student', 'student@sonaichandihighschool.edu.bd', 'student', 'passwordbc123', 'student'),
(4, 'Mr', 'Parent', 'parent@sonaichandihighschool.edu.bd', 'parent', 'passwordac123', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `msg_title` varchar(256) NOT NULL,
  `msg_details` text NOT NULL,
  `msg_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `member_id`, `msg_title`, `msg_details`, `msg_date`) VALUES
(1, 1, '50 Year Anniversary ', 'We are very glade to passed 50 year with our school successfully. Now time to celebrate 50 year successful journey.  ', '2016-02-07'),
(2, 1, 'This is a test message', 'This is a test message and it update now<br>', '2016-02-08'),
(3, 1, 'This is another test messages', '<br><ol><li>&nbsp;Test message one</li><li>Test message two</li><li>Test message three<br></li></ol>', '2016-02-08');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `head_line` varchar(256) NOT NULL,
  `details` text NOT NULL,
  `news_photo` varchar(256) NOT NULL,
  `post_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `member_id`, `head_line`, `details`, `news_photo`, `post_on`) VALUES
(1, 1, 'Test News Head Line', 'This is test news', '', '2016-02-28 12:43:23'),
(2, 1, 'Another Test News Head Line', 'This is a another test news addition test', '', '2016-02-28 21:09:23'),
(3, 1, 'Test News Head Line 01', 'This is test news 01', '', '2016-02-28 21:09:04'),
(4, 1, 'Physics Lab: the basis of what scientists believe', 'Science is different than other subjects. It is not just the subject of science that is different; the entire process of doing science is different. The basis of what scientists believe is the result of the careful collection and analysis of laboratory evidence. In any physics class, the differences of science will be most evident when it comes time for lab.\n\nIn physics class, lab is central. Integral. Sacred. More than a mere place in the back of the classroom, the laboratory is the place where physics students do physics. It is in the laboratory that physics students learn to practice the activities of scientists - asking questions, performing procedures, collecting data, analyzing data, answering questions, and thinking of new questions to explore.', '', '2016-02-28 21:08:32');

-- --------------------------------------------------------

--
-- Table structure for table `parents`
--

CREATE TABLE `parents` (
  `parents_id` int(11) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `adress` text NOT NULL,
  `gender_id` int(11) NOT NULL,
  `religion_id` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `phone_number` varchar(256) DEFAULT NULL,
  `mobile_number` varchar(256) NOT NULL,
  `joining_date` date NOT NULL,
  `profession` varchar(256) NOT NULL,
  `email_address` varchar(256) DEFAULT NULL,
  `profile_photo` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parents`
--

INSERT INTO `parents` (`parents_id`, `first_name`, `last_name`, `adress`, `gender_id`, `religion_id`, `birthday`, `phone_number`, `mobile_number`, `joining_date`, `profession`, `email_address`, `profile_photo`) VALUES
(1, 'Tariqul', 'Islam', 'Rajshahi', 1, 1, '1965-02-16', '723671463274', '762376746723', '2016-01-13', 'Business', 't.islam@gmail.com', 'sdafds');

-- --------------------------------------------------------

--
-- Table structure for table `prefixes`
--

CREATE TABLE `prefixes` (
  `prefix_id` int(11) NOT NULL,
  `prefix_year` year(4) NOT NULL,
  `prefix_value` varchar(8) NOT NULL,
  `prefix_index` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prefixes`
--

INSERT INTO `prefixes` (`prefix_id`, `prefix_year`, `prefix_value`, `prefix_index`) VALUES
(1, 2015, '1927', 1),
(2, 2016, '1927', 11);

-- --------------------------------------------------------

--
-- Table structure for table `religions`
--

CREATE TABLE `religions` (
  `religion_id` int(11) NOT NULL,
  `religion_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `religions`
--

INSERT INTO `religions` (`religion_id`, `religion_name`) VALUES
(1, 'Muslims'),
(2, 'Hinduism'),
(3, 'Christianity');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `section_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `section_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`section_id`, `class_id`, `section_name`) VALUES
(1, 1, 'A'),
(2, NULL, 'B'),
(3, NULL, 'Science'),
(4, NULL, 'Humanities');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status`) VALUES
(1, 'New'),
(2, 'Completed'),
(3, 'Current'),
(4, 'Published');

-- --------------------------------------------------------

--
-- Table structure for table `student_attendance`
--

CREATE TABLE `student_attendance` (
  `student_attendance_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `number_of_attendance` int(11) NOT NULL,
  `attendance_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `student_detail_id` int(11) NOT NULL,
  `enrolment_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `section_id` varchar(256) NOT NULL,
  `student_session` varchar(256) NOT NULL,
  `study_year` int(11) DEFAULT NULL,
  `merit_position` int(11) NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_enrolment`
--

CREATE TABLE `student_enrolment` (
  `enrolment_id` int(11) NOT NULL,
  `roll_no` int(11) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `parents_id` int(11) NOT NULL,
  `father_name` varchar(256) NOT NULL,
  `mother_name` varchar(256) NOT NULL,
  `address` text NOT NULL,
  `mobile_no` varchar(16) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `religion_id` int(11) NOT NULL,
  `date_of_birth` date NOT NULL,
  `profile_photo` varchar(256) DEFAULT NULL,
  `enrolment_year` year(4) NOT NULL,
  `status_id` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_enrolment`
--

INSERT INTO `student_enrolment` (`enrolment_id`, `roll_no`, `first_name`, `last_name`, `parents_id`, `father_name`, `mother_name`, `address`, `mobile_no`, `gender_id`, `religion_id`, `date_of_birth`, `profile_photo`, `enrolment_year`, `status_id`) VALUES
(1, 161927001, 'Mizanur', 'Rahman', 1, 'Tariqul Islam', 'Kohinur Begom', 'Sabdalpur', '+8801722509237', 1, 1, '1987-12-27', NULL, 2016, 1),
(2, 161927002, 'Ashad', 'Zaman1', 1, '', '', '', '', 1, 1, '1987-12-25', NULL, 2016, 1),
(3, 161927003, 'Masud', 'Rana', 1, '', '', '', '', 1, 1, '1987-12-31', 'no image', 2016, 1),
(4, 161927004, 'dsafdsfd', 'sdafdsfads', 1, '', '', '', '', 1, 1, '2016-01-20', 'no image', 2016, 1),
(5, 161927005, 'sadfasd', 'sdfasddf', 1, '', '', '', '', 1, 1, '2016-01-13', 'no image', 2016, 1),
(6, 161927006, 'sdafds', 'sdfsd', 1, '', '', '', '', 1, 1, '2016-01-19', 'no image', 2016, 1),
(7, 161927007, 'sdafds', 'sdafsd', 1, '', '', '', '', 1, 1, '2016-01-18', 'no image', 2016, 1),
(8, 161927008, 'sdfasd', 'fsdafsdfds', 1, '', '', '', '', 1, 1, '2016-01-04', 'no image', 2016, 1),
(9, 161927009, 'dsafds', 'sdafsdafd', 1, '', '', '', '', 1, 1, '2016-01-18', 'no image', 2016, 1),
(10, 161927010, 'safdsd', 'sdfasdf', 1, '', '', '', '', 1, 1, '2016-01-19', 'no image', 2016, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(256) NOT NULL,
  `subject_code` varchar(256) DEFAULT NULL,
  `class_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT '0',
  `is_optional` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_name`, `subject_code`, `class_id`, `section_id`, `is_optional`) VALUES
(1, 'Bangla', 'B101', 1, 1, b'0'),
(2, 'English', 'E56', 2, 1, b'1'),
(3, 'English Grammer', 'E91', 4, 1, b'0'),
(4, 'Bangla Grammer', 'BG23', 4, 3, b'1'),
(5, 'Physics', 'PH32', 3, 3, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `address` text NOT NULL,
  `gender_id` int(32) NOT NULL,
  `religion_id` int(11) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` varchar(16) DEFAULT NULL,
  `mobile_number` varchar(16) NOT NULL,
  `joining_date` date NOT NULL,
  `leaving_date` date DEFAULT NULL,
  `designation_id` int(11) NOT NULL,
  `profile_photo` varchar(256) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `about` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `first_name`, `last_name`, `address`, `gender_id`, `religion_id`, `date_of_birth`, `phone_number`, `mobile_number`, `joining_date`, `leaving_date`, `designation_id`, `profile_photo`, `is_active`, `about`) VALUES
(1, 'Abdur', 'Rahim', 'Sonaichandi Hat, Nachole, Chapai Nawabgonj', 1, 1, '1975-01-10', NULL, '+8801740547235', '1995-01-10', '0000-00-00', 3, NULL, b'1', 'A teacher\'s professional duties may extend beyond formal teaching. Outside of the classroom teachers may accompany students on field trips, supervise study halls, help with the organization of school functions, and serve as supervisors for extracurricular activities. In some education systems, teachers may have responsibility for student discipline.'),
(31, 'Abdus', 'Salam', 'sonaichandi hut', 1, 1, '1958-01-10', NULL, '0172509237', '1981-09-10', '0000-00-00', 1, '', b'0', 'The role of teacher is often formal and ongoing, carried out at a school or other place of formal education. A teachers role may vary among cultures. Teachers may provide instruction in literacy and numeracy, craftsmanship or vocational training, the arts, religion, civics, community roles, or life skills.A teacher who facilitates education for an individual may also be described as a personal tutor, or, largely historically, a governess.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni_register`
--
ALTER TABLE `alumni_register`
  ADD PRIMARY KEY (`register_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`designation_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`exam_id`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`gender_id`);

--
-- Indexes for table ` grade_system`
--
ALTER TABLE ` grade_system`
  ADD PRIMARY KEY (`grade_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`parents_id`);

--
-- Indexes for table `prefixes`
--
ALTER TABLE `prefixes`
  ADD PRIMARY KEY (`prefix_id`);

--
-- Indexes for table `religions`
--
ALTER TABLE `religions`
  ADD PRIMARY KEY (`religion_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`section_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD PRIMARY KEY (`student_attendance_id`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`student_detail_id`);

--
-- Indexes for table `student_enrolment`
--
ALTER TABLE `student_enrolment`
  ADD PRIMARY KEY (`enrolment_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni_register`
--
ALTER TABLE `alumni_register`
  MODIFY `register_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `gender_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table ` grade_system`
--
ALTER TABLE ` grade_system`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parents`
--
ALTER TABLE `parents`
  MODIFY `parents_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prefixes`
--
ALTER TABLE `prefixes`
  MODIFY `prefix_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `religions`
--
ALTER TABLE `religions`
  MODIFY `religion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_attendance`
--
ALTER TABLE `student_attendance`
  MODIFY `student_attendance_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_details`
--
ALTER TABLE `student_details`
  MODIFY `student_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_enrolment`
--
ALTER TABLE `student_enrolment`
  MODIFY `enrolment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
