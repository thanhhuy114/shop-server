-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2024 at 06:28 AM
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
-- Database: `crawling_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `crawl_action_details`
--

CREATE TABLE `crawl_action_details` (
  `id` int(11) NOT NULL,
  `crawl_config_id` int(11) NOT NULL,
  `action_type_id` int(11) NOT NULL,
  `selector` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crawl_action_types`
--

CREATE TABLE `crawl_action_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `is_textfield` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_action_types`
--

INSERT INTO `crawl_action_types` (`id`, `type`, `description`, `is_textfield`) VALUES
(1, 'Click when appear', 'Ấn mỗi khi phần tử này xuất hiện trên màn hình', 1),
(2, 'Show all', 'Ấn liên tục vào phần tử này cho đến khi tất cả dữ liệu hiện ra hoặc phần tử này không còn xuất hiện nữa rồi mới thực hiện lấy dữ liệu', 1);

-- --------------------------------------------------------

--
-- Table structure for table `crawl_configs`
--

CREATE TABLE `crawl_configs` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `crawl_type_id` int(11) DEFAULT NULL,
  `result_type_id` int(11) DEFAULT NULL,
  `item_selector` text DEFAULT NULL,
  `item_type_id` int(11) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `website_id` int(11) DEFAULT NULL,
  `is_complete` tinyint(1) NOT NULL,
  `update_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crawl_data_types`
--

CREATE TABLE `crawl_data_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `is_textfield` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_data_types`
--

INSERT INTO `crawl_data_types` (`id`, `type`, `description`, `is_textfield`) VALUES
(1, 'content', 'Lấy nội dung của thẻ', 0),
(2, 'count', 'Đếm số lượng thẻ này', 0),
(3, 'attribute', 'Lấy nội dung của một thuộc tính trong thẻ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `crawl_details`
--

CREATE TABLE `crawl_details` (
  `id` int(11) NOT NULL,
  `crawl_config_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `selector` text NOT NULL,
  `attribute` text DEFAULT NULL,
  `data_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crawl_option_condition_types`
--

CREATE TABLE `crawl_option_condition_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `is_textfield` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_option_condition_types`
--

INSERT INTO `crawl_option_condition_types` (`id`, `type`, `description`, `is_textfield`) VALUES
(1, 'Start with', 'Kiểm tra xem kết quả có bắt đầu bằng <chuỗi đầu vào>', 1),
(2, 'End with', 'Kiểm tra xem kết quả có kết thúc bằng <chuỗi đầu vào>', 1),
(3, 'Contain', 'Kiểm tra xem kết quả có chứa<chuỗi đầu vào>', 1);

-- --------------------------------------------------------

--
-- Table structure for table `crawl_option_details`
--

CREATE TABLE `crawl_option_details` (
  `id` int(11) NOT NULL,
  `crawl_detail_id` int(11) NOT NULL,
  `option_type_id` int(11) NOT NULL,
  `option_condition_type_id` int(11) DEFAULT NULL,
  `condition_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crawl_option_types`
--

CREATE TABLE `crawl_option_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `is_textfield` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_option_types`
--

INSERT INTO `crawl_option_types` (`id`, `type`, `description`, `is_textfield`) VALUES
(1, 'prepend', 'Thêm một chuỗi vào đầu kết quả', 1),
(2, 'append', 'Thêm một chuỗi vào cuối kết quả', 1),
(3, 'to number', 'Xóa các ký tự không phải số trong kết quả', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crawl_result_types`
--

CREATE TABLE `crawl_result_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `is_textfield` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_result_types`
--

INSERT INTO `crawl_result_types` (`id`, `type`, `description`, `is_textfield`) VALUES
(1, 'single', 'Lựa chọn này sẽ trả về kết quả kiểu 1 item', 0),
(2, 'multi', 'Lựa chọn này sẽ trả về kết quả là danh sách các item', 1);

-- --------------------------------------------------------

--
-- Table structure for table `crawl_types`
--

CREATE TABLE `crawl_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_types`
--

INSERT INTO `crawl_types` (`id`, `type`, `description`) VALUES
(1, 'HTML', 'Thu thập dữ liệu bằng cách truy xuất các selector trong trang HTML'),
(2, 'API', 'Thu thập dữ liệu bằng cách truy xuất các API được  trang web cung cấp'),
(3, 'RSS', 'Thu thập dữ liệu bằng RSS');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `website_id` int(11) NOT NULL,
  `crawl_config_id` int(11) NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_details`
--

CREATE TABLE `item_details` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `value` text NOT NULL,
  `is_primary_key` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`id`, `type`, `description`) VALUES
(1, 'Điện thoại', 'Loại của các item là điện thoại, điện thoại thông minh, máy tính bảng...');

-- --------------------------------------------------------

--
-- Table structure for table `websites`
--

CREATE TABLE `websites` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `websites`
--

INSERT INTO `websites` (`id`, `name`, `url`) VALUES
(1, 'CellphoneS', 'https://cellphones.com.vn/'),
(2, 'Tiki', 'https://tiki.vn/');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crawl_action_details`
--
ALTER TABLE `crawl_action_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_action_types`
--
ALTER TABLE `crawl_action_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_configs`
--
ALTER TABLE `crawl_configs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_data_types`
--
ALTER TABLE `crawl_data_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_details`
--
ALTER TABLE `crawl_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_option_condition_types`
--
ALTER TABLE `crawl_option_condition_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_option_details`
--
ALTER TABLE `crawl_option_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_option_types`
--
ALTER TABLE `crawl_option_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_result_types`
--
ALTER TABLE `crawl_result_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crawl_types`
--
ALTER TABLE `crawl_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_details`
--
ALTER TABLE `item_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `websites`
--
ALTER TABLE `websites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crawl_action_details`
--
ALTER TABLE `crawl_action_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crawl_action_types`
--
ALTER TABLE `crawl_action_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `crawl_configs`
--
ALTER TABLE `crawl_configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `crawl_data_types`
--
ALTER TABLE `crawl_data_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `crawl_details`
--
ALTER TABLE `crawl_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crawl_option_condition_types`
--
ALTER TABLE `crawl_option_condition_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `crawl_option_details`
--
ALTER TABLE `crawl_option_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crawl_option_types`
--
ALTER TABLE `crawl_option_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `crawl_result_types`
--
ALTER TABLE `crawl_result_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `crawl_types`
--
ALTER TABLE `crawl_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=285;

--
-- AUTO_INCREMENT for table `item_details`
--
ALTER TABLE `item_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1699;

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `websites`
--
ALTER TABLE `websites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
