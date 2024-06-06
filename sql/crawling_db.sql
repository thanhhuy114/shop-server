-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 06, 2024 lúc 05:47 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `crawling_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_action_details`
--

CREATE TABLE `crawl_action_details` (
  `id` int(11) NOT NULL,
  `crawl_config_id` int(11) NOT NULL,
  `action_type_id` int(11) NOT NULL,
  `selector` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_action_types`
--

CREATE TABLE `crawl_action_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_action_types`
--

INSERT INTO `crawl_action_types` (`id`, `type`, `description`) VALUES
(1, 'Click when appear', 'Ấn mỗi khi phần tử này xuất hiện trên màn hình'),
(2, 'Show all', 'Ấn liên tục vào phần tử này cho đến khi tất cả dữ liệu hiện ra hoặc phần tử này không còn xuất hiện nữa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_configs`
--

CREATE TABLE `crawl_configs` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `crawl_type_id` int(11) NOT NULL,
  `result_type_id` int(11) NOT NULL,
  `item_selector` text DEFAULT NULL,
  `item_type_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `website_id` int(11) NOT NULL,
  `is_complete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_configs`
--

INSERT INTO `crawl_configs` (`id`, `name`, `description`, `crawl_type_id`, `result_type_id`, `item_selector`, `item_type_id`, `url`, `website_id`, `is_complete`) VALUES
(1, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(2, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(3, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(4, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(5, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(6, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(7, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(8, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(9, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(10, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(11, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(12, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(13, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(14, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(15, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(16, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(17, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0),
(18, 'Crawl danh sách sản phẩm CellphoneS', 'Thu thập dữ liệu từ trang danh sách sản phẩm', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_data_types`
--

CREATE TABLE `crawl_data_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_data_types`
--

INSERT INTO `crawl_data_types` (`id`, `type`, `description`) VALUES
(1, 'content', 'Lấy nội dung của thẻ'),
(2, 'count', 'Đếm số lượng thẻ này'),
(3, 'attribute', 'Lấy nội dung của một thuộc tính trong thẻ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_details`
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
-- Cấu trúc bảng cho bảng `crawl_option_condition_types`
--

CREATE TABLE `crawl_option_condition_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_option_condition_types`
--

INSERT INTO `crawl_option_condition_types` (`id`, `type`, `description`) VALUES
(1, 'Start with', 'Kiểm tra xem kết quả có bắt đầu bằng <chuỗi đầu vào>'),
(2, 'End with', 'Kiểm tra xem kết quả có kết thúc bằng <chuỗi đầu vào>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_option_details`
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
-- Cấu trúc bảng cho bảng `crawl_option_types`
--

CREATE TABLE `crawl_option_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_option_types`
--

INSERT INTO `crawl_option_types` (`id`, `type`, `description`) VALUES
(1, 'prepend', 'Thêm một chuỗi vào đầu kết quả'),
(2, 'append', 'Thêm một chuỗi vào cuối kết quả'),
(3, 'to number', 'Xóa các ký tự không phải số trong kết quả');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_result_types`
--

CREATE TABLE `crawl_result_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_result_types`
--

INSERT INTO `crawl_result_types` (`id`, `type`, `description`) VALUES
(1, 'single', 'Lựa chọn này sẽ trả về kết quả kiểu 1 item'),
(2, 'multi', 'Lựa chọn này sẽ trả về kết quả là danh sách các item');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crawl_types`
--

CREATE TABLE `crawl_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `crawl_types`
--

INSERT INTO `crawl_types` (`id`, `type`, `description`) VALUES
(1, 'HTML', 'Thu thập dữ liệu bằng cách truy xuất các selector trong trang HTML'),
(2, 'API', 'Thu thập dữ liệu bằng cách truy xuất các API được  trang web cung cấp'),
(3, 'RSS', 'Thu thập dữ liệu bằng RSS');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `website_id` int(11) NOT NULL,
  `crawl_config_id` int(11) NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `items`
--

INSERT INTO `items` (`id`, `item_type_id`, `website_id`, `crawl_config_id`, `update_at`) VALUES
(1, 1, 1, 4, '2024-06-05 16:25:03'),
(2, 1, 1, 5, '2024-06-05 16:38:44'),
(3, 1, 1, 5, '2024-06-05 16:39:09'),
(4, 1, 1, 5, '2024-06-05 16:39:09'),
(5, 1, 1, 5, '2024-06-05 16:39:10'),
(6, 1, 1, 5, '2024-06-05 16:39:10'),
(7, 1, 1, 5, '2024-06-05 16:39:10'),
(8, 1, 1, 5, '2024-06-05 16:39:10'),
(9, 1, 1, 5, '2024-06-05 16:39:10'),
(10, 1, 1, 5, '2024-06-05 16:39:10'),
(11, 1, 1, 5, '2024-06-05 16:39:10'),
(12, 1, 1, 5, '2024-06-05 16:39:10'),
(13, 1, 1, 5, '2024-06-05 16:39:10'),
(14, 1, 1, 5, '2024-06-05 16:39:10'),
(15, 1, 1, 5, '2024-06-05 16:39:10'),
(16, 1, 1, 5, '2024-06-05 16:39:11'),
(17, 1, 1, 5, '2024-06-05 16:39:11'),
(18, 1, 1, 5, '2024-06-05 16:39:11'),
(19, 1, 1, 5, '2024-06-05 16:39:11'),
(20, 1, 1, 5, '2024-06-05 16:39:11'),
(21, 1, 1, 5, '2024-06-05 16:39:11'),
(22, 1, 1, 6, '2024-06-05 16:41:11'),
(23, 1, 1, 6, '2024-06-05 16:41:12'),
(24, 1, 1, 6, '2024-06-05 16:41:12'),
(25, 1, 1, 6, '2024-06-05 16:41:12'),
(26, 1, 1, 6, '2024-06-05 16:41:12'),
(27, 1, 1, 6, '2024-06-05 16:41:12'),
(28, 1, 1, 6, '2024-06-05 16:41:12'),
(29, 1, 1, 6, '2024-06-05 16:41:13'),
(30, 1, 1, 6, '2024-06-05 16:41:13'),
(31, 1, 1, 6, '2024-06-05 16:41:13'),
(32, 1, 1, 6, '2024-06-05 16:41:13'),
(33, 1, 1, 6, '2024-06-05 16:41:13'),
(34, 1, 1, 6, '2024-06-05 16:41:13'),
(35, 1, 1, 6, '2024-06-05 16:41:13'),
(36, 1, 1, 6, '2024-06-05 16:41:13'),
(37, 1, 1, 6, '2024-06-05 16:41:13'),
(38, 1, 1, 6, '2024-06-05 16:41:13'),
(39, 1, 1, 6, '2024-06-05 16:41:13'),
(40, 1, 1, 6, '2024-06-05 16:41:13'),
(41, 1, 1, 6, '2024-06-05 16:41:13'),
(42, 1, 1, 7, '2024-06-06 13:12:52'),
(43, 1, 1, 7, '2024-06-06 13:12:52'),
(44, 1, 1, 7, '2024-06-06 13:12:52'),
(45, 1, 1, 7, '2024-06-06 13:12:52'),
(46, 1, 1, 7, '2024-06-06 13:12:52'),
(47, 1, 1, 7, '2024-06-06 13:12:53'),
(48, 1, 1, 7, '2024-06-06 13:12:53'),
(49, 1, 1, 7, '2024-06-06 13:12:53'),
(50, 1, 1, 7, '2024-06-06 13:12:53'),
(51, 1, 1, 7, '2024-06-06 13:12:53'),
(52, 1, 1, 7, '2024-06-06 13:12:53'),
(53, 1, 1, 7, '2024-06-06 13:12:53'),
(54, 1, 1, 7, '2024-06-06 13:12:53'),
(55, 1, 1, 7, '2024-06-06 13:12:53'),
(56, 1, 1, 7, '2024-06-06 13:12:53'),
(57, 1, 1, 7, '2024-06-06 13:12:53'),
(58, 1, 1, 7, '2024-06-06 13:12:53'),
(59, 1, 1, 7, '2024-06-06 13:12:53'),
(60, 1, 1, 7, '2024-06-06 13:12:53'),
(61, 1, 1, 7, '2024-06-06 13:12:53'),
(62, 1, 1, 15, '2024-06-06 14:04:00'),
(63, 1, 1, 15, '2024-06-06 14:04:11'),
(64, 1, 1, 15, '2024-06-06 14:04:12'),
(65, 1, 1, 15, '2024-06-06 14:04:12'),
(66, 1, 1, 15, '2024-06-06 14:04:12'),
(67, 1, 1, 15, '2024-06-06 14:04:12'),
(68, 1, 1, 15, '2024-06-06 14:04:12'),
(69, 1, 1, 15, '2024-06-06 14:04:12'),
(70, 1, 1, 15, '2024-06-06 14:04:12'),
(71, 1, 1, 15, '2024-06-06 14:04:12'),
(72, 1, 1, 15, '2024-06-06 14:04:12'),
(73, 1, 1, 15, '2024-06-06 14:04:12'),
(74, 1, 1, 15, '2024-06-06 14:04:12'),
(75, 1, 1, 15, '2024-06-06 14:04:12'),
(76, 1, 1, 15, '2024-06-06 14:04:12'),
(77, 1, 1, 15, '2024-06-06 14:04:12'),
(78, 1, 1, 15, '2024-06-06 14:04:12'),
(79, 1, 1, 15, '2024-06-06 14:04:13'),
(80, 1, 1, 15, '2024-06-06 14:04:13'),
(81, 1, 1, 15, '2024-06-06 14:04:13'),
(82, 1, 1, 16, '2024-06-06 14:08:41'),
(83, 1, 1, 16, '2024-06-06 14:08:41'),
(84, 1, 1, 16, '2024-06-06 14:08:41'),
(85, 1, 1, 16, '2024-06-06 14:08:42'),
(86, 1, 1, 16, '2024-06-06 14:08:42'),
(87, 1, 1, 16, '2024-06-06 14:08:42'),
(88, 1, 1, 16, '2024-06-06 14:08:42'),
(89, 1, 1, 16, '2024-06-06 14:08:42'),
(90, 1, 1, 16, '2024-06-06 14:08:42'),
(91, 1, 1, 16, '2024-06-06 14:08:42'),
(92, 1, 1, 16, '2024-06-06 14:08:42'),
(93, 1, 1, 16, '2024-06-06 14:08:42'),
(94, 1, 1, 16, '2024-06-06 14:08:42'),
(95, 1, 1, 16, '2024-06-06 14:08:42'),
(96, 1, 1, 16, '2024-06-06 14:08:42'),
(97, 1, 1, 16, '2024-06-06 14:08:42'),
(98, 1, 1, 16, '2024-06-06 14:08:42'),
(99, 1, 1, 16, '2024-06-06 14:08:42'),
(100, 1, 1, 16, '2024-06-06 14:08:42'),
(101, 1, 1, 16, '2024-06-06 14:08:42'),
(102, 1, 1, 17, '2024-06-06 14:10:10'),
(103, 1, 1, 17, '2024-06-06 14:10:10'),
(104, 1, 1, 17, '2024-06-06 14:10:11'),
(105, 1, 1, 17, '2024-06-06 14:10:11'),
(106, 1, 1, 17, '2024-06-06 14:10:11'),
(107, 1, 1, 17, '2024-06-06 14:10:11'),
(108, 1, 1, 17, '2024-06-06 14:10:11'),
(109, 1, 1, 17, '2024-06-06 14:10:11'),
(110, 1, 1, 17, '2024-06-06 14:10:11'),
(111, 1, 1, 17, '2024-06-06 14:10:11'),
(112, 1, 1, 17, '2024-06-06 14:10:11'),
(113, 1, 1, 17, '2024-06-06 14:10:11'),
(114, 1, 1, 17, '2024-06-06 14:10:11'),
(115, 1, 1, 17, '2024-06-06 14:10:11'),
(116, 1, 1, 17, '2024-06-06 14:10:11'),
(117, 1, 1, 17, '2024-06-06 14:10:11'),
(118, 1, 1, 17, '2024-06-06 14:10:11'),
(119, 1, 1, 17, '2024-06-06 14:10:11'),
(120, 1, 1, 17, '2024-06-06 14:10:11'),
(121, 1, 1, 17, '2024-06-06 14:10:11'),
(122, 1, 1, 18, '2024-06-06 14:12:10'),
(123, 1, 1, 18, '2024-06-06 14:12:10'),
(124, 1, 1, 18, '2024-06-06 14:12:10'),
(125, 1, 1, 18, '2024-06-06 14:12:10'),
(126, 1, 1, 18, '2024-06-06 14:12:10'),
(127, 1, 1, 18, '2024-06-06 14:12:10'),
(128, 1, 1, 18, '2024-06-06 14:12:10'),
(129, 1, 1, 18, '2024-06-06 14:12:10'),
(130, 1, 1, 18, '2024-06-06 14:12:10'),
(131, 1, 1, 18, '2024-06-06 14:12:10'),
(132, 1, 1, 18, '2024-06-06 14:12:10'),
(133, 1, 1, 18, '2024-06-06 14:12:10'),
(134, 1, 1, 18, '2024-06-06 14:12:10'),
(135, 1, 1, 18, '2024-06-06 14:12:10'),
(136, 1, 1, 18, '2024-06-06 14:12:10'),
(137, 1, 1, 18, '2024-06-06 14:12:10'),
(138, 1, 1, 18, '2024-06-06 14:12:10'),
(139, 1, 1, 18, '2024-06-06 14:12:10'),
(140, 1, 1, 18, '2024-06-06 14:12:10'),
(141, 1, 1, 18, '2024-06-06 14:12:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `item_details`
--

CREATE TABLE `item_details` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `value` text NOT NULL,
  `is_primary_key` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `item_details`
--

INSERT INTO `item_details` (`id`, `item_id`, `name`, `value`, `is_primary_key`) VALUES
(1, 2, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(2, 2, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(3, 2, 'Giá sản phẩm', '13490000', 0),
(4, 2, 'Khuyến mãi', '\n          Giảm 29%\n        ', 0),
(5, 2, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(6, 2, 'Số sao đánh giá', '5', 0),
(7, 3, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(8, 3, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(9, 3, 'Giá sản phẩm', '29990000', 0),
(10, 3, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(11, 3, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(12, 3, 'Số sao đánh giá', '0', 0),
(13, 4, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(14, 4, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(15, 4, 'Giá sản phẩm', '19190000', 0),
(16, 4, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(17, 4, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(18, 4, 'Số sao đánh giá', '5', 0),
(19, 5, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(20, 5, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(21, 5, 'Giá sản phẩm', '9990000', 0),
(22, 5, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(23, 5, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(24, 5, 'Số sao đánh giá', '5', 0),
(25, 6, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(26, 6, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(27, 6, 'Giá sản phẩm', '4690000', 0),
(28, 6, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(29, 6, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(30, 6, 'Số sao đánh giá', '5', 0),
(31, 7, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(32, 7, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(33, 7, 'Giá sản phẩm', '23990000', 0),
(34, 7, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(35, 7, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(36, 7, 'Số sao đánh giá', '5', 0),
(37, 8, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(38, 8, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(39, 8, 'Giá sản phẩm', '29390000', 0),
(40, 8, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(41, 8, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(42, 8, 'Số sao đánh giá', '5', 0),
(43, 9, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(44, 9, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(45, 9, 'Giá sản phẩm', '8490000', 0),
(46, 9, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(47, 9, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(48, 9, 'Số sao đánh giá', '5', 0),
(49, 10, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(50, 10, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(51, 10, 'Giá sản phẩm', '26590000', 0),
(52, 10, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(53, 10, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(54, 10, 'Số sao đánh giá', '5', 0),
(55, 11, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(56, 11, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(57, 11, 'Giá sản phẩm', '5990000', 0),
(58, 11, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(59, 11, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(60, 11, 'Số sao đánh giá', '5', 0),
(61, 12, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(62, 12, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(63, 12, 'Giá sản phẩm', '25690000', 0),
(64, 12, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(65, 12, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(66, 12, 'Số sao đánh giá', '5', 0),
(67, 13, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(68, 13, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(69, 13, 'Giá sản phẩm', '21990000', 0),
(70, 13, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(71, 13, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(72, 13, 'Số sao đánh giá', '5', 0),
(73, 14, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(74, 14, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(75, 14, 'Giá sản phẩm', '5590000', 0),
(76, 14, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(77, 14, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(78, 14, 'Số sao đánh giá', '5', 0),
(79, 15, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(80, 15, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(81, 15, 'Giá sản phẩm', '4990000', 0),
(82, 15, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(83, 15, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(84, 15, 'Số sao đánh giá', '5', 0),
(85, 16, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(86, 16, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(87, 16, 'Giá sản phẩm', '8690000', 0),
(88, 16, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(89, 16, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(90, 16, 'Số sao đánh giá', '5', 0),
(91, 17, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(92, 17, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(93, 17, 'Giá sản phẩm', '29990000', 0),
(94, 17, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(95, 17, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(96, 17, 'Số sao đánh giá', '5', 0),
(97, 18, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13-pro-max.html', 1),
(98, 18, 'Tên sản phẩm', 'iPhone 13 Pro Max 128GB | Chính hãng VN/A', 0),
(99, 18, 'Giá sản phẩm', '22990000', 0),
(100, 18, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(101, 18, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png', 0),
(102, 18, 'Số sao đánh giá', '5', 0),
(103, 19, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(104, 19, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(105, 19, 'Giá sản phẩm', '8290000', 0),
(106, 19, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(107, 19, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(108, 19, 'Số sao đánh giá', '5', 0),
(109, 20, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a15.html', 1),
(110, 20, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(111, 20, 'Giá sản phẩm', '4490000', 0),
(112, 20, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(113, 20, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(114, 20, 'Số sao đánh giá', '5', 0),
(115, 21, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(116, 21, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(117, 21, 'Giá sản phẩm', '8290000', 0),
(118, 21, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(119, 21, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(120, 21, 'Số sao đánh giá', '5', 0),
(121, 22, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(122, 22, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(123, 22, 'Giá sản phẩm', '13490000', 0),
(124, 22, 'Khuyến mãi', '\n          Giảm 29%\n        ', 0),
(125, 22, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(126, 22, 'Số sao đánh giá', '5', 0),
(127, 23, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(128, 23, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(129, 23, 'Giá sản phẩm', '29990000', 0),
(130, 23, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(131, 23, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(132, 23, 'Số sao đánh giá', '0', 0),
(133, 24, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(134, 24, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(135, 24, 'Giá sản phẩm', '19190000', 0),
(136, 24, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(137, 24, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(138, 24, 'Số sao đánh giá', '5', 0),
(139, 25, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(140, 25, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(141, 25, 'Giá sản phẩm', '9990000', 0),
(142, 25, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(143, 25, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(144, 25, 'Số sao đánh giá', '5', 0),
(145, 26, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(146, 26, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(147, 26, 'Giá sản phẩm', '4690000', 0),
(148, 26, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(149, 26, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(150, 26, 'Số sao đánh giá', '5', 0),
(151, 27, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(152, 27, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(153, 27, 'Giá sản phẩm', '23990000', 0),
(154, 27, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(155, 27, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(156, 27, 'Số sao đánh giá', '5', 0),
(157, 28, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(158, 28, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(159, 28, 'Giá sản phẩm', '29390000', 0),
(160, 28, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(161, 28, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(162, 28, 'Số sao đánh giá', '5', 0),
(163, 29, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(164, 29, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(165, 29, 'Giá sản phẩm', '8490000', 0),
(166, 29, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(167, 29, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(168, 29, 'Số sao đánh giá', '5', 0),
(169, 30, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(170, 30, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(171, 30, 'Giá sản phẩm', '26590000', 0),
(172, 30, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(173, 30, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(174, 30, 'Số sao đánh giá', '5', 0),
(175, 31, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(176, 31, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(177, 31, 'Giá sản phẩm', '5990000', 0),
(178, 31, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(179, 31, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(180, 31, 'Số sao đánh giá', '5', 0),
(181, 32, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(182, 32, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(183, 32, 'Giá sản phẩm', '25690000', 0),
(184, 32, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(185, 32, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(186, 32, 'Số sao đánh giá', '5', 0),
(187, 33, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(188, 33, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(189, 33, 'Giá sản phẩm', '21990000', 0),
(190, 33, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(191, 33, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(192, 33, 'Số sao đánh giá', '5', 0),
(193, 34, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(194, 34, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(195, 34, 'Giá sản phẩm', '5590000', 0),
(196, 34, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(197, 34, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(198, 34, 'Số sao đánh giá', '5', 0),
(199, 35, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(200, 35, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(201, 35, 'Giá sản phẩm', '4990000', 0),
(202, 35, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(203, 35, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(204, 35, 'Số sao đánh giá', '5', 0),
(205, 36, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(206, 36, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(207, 36, 'Giá sản phẩm', '8690000', 0),
(208, 36, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(209, 36, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(210, 36, 'Số sao đánh giá', '5', 0),
(211, 37, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(212, 37, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(213, 37, 'Giá sản phẩm', '29990000', 0),
(214, 37, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(215, 37, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(216, 37, 'Số sao đánh giá', '5', 0),
(217, 38, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13-pro-max.html', 1),
(218, 38, 'Tên sản phẩm', 'iPhone 13 Pro Max 128GB | Chính hãng VN/A', 0),
(219, 38, 'Giá sản phẩm', '22990000', 0),
(220, 38, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(221, 38, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png', 0),
(222, 38, 'Số sao đánh giá', '5', 0),
(223, 39, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(224, 39, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(225, 39, 'Giá sản phẩm', '8290000', 0),
(226, 39, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(227, 39, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(228, 39, 'Số sao đánh giá', '5', 0),
(229, 40, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a15.html', 1),
(230, 40, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(231, 40, 'Giá sản phẩm', '4490000', 0),
(232, 40, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(233, 40, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(234, 40, 'Số sao đánh giá', '5', 0),
(235, 41, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(236, 41, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(237, 41, 'Giá sản phẩm', '8290000', 0),
(238, 41, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(239, 41, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(240, 41, 'Số sao đánh giá', '5', 0),
(241, 42, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(242, 42, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(243, 42, 'Giá sản phẩm', '13590000', 0),
(244, 42, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(245, 42, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(246, 42, 'Số sao đánh giá', '5', 0),
(247, 43, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(248, 43, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(249, 43, 'Giá sản phẩm', '29390000', 0),
(250, 43, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(251, 43, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(252, 43, 'Số sao đánh giá', '5', 0),
(253, 44, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(254, 44, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(255, 44, 'Giá sản phẩm', '29990000', 0),
(256, 44, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(257, 44, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(258, 44, 'Số sao đánh giá', '0', 0),
(259, 45, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(260, 45, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(261, 45, 'Giá sản phẩm', '19190000', 0),
(262, 45, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(263, 45, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(264, 45, 'Số sao đánh giá', '5', 0),
(265, 46, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(266, 46, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(267, 46, 'Giá sản phẩm', '9990000', 0),
(268, 46, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(269, 46, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(270, 46, 'Số sao đánh giá', '5', 0),
(271, 47, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(272, 47, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(273, 47, 'Giá sản phẩm', '4690000', 0),
(274, 47, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(275, 47, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(276, 47, 'Số sao đánh giá', '5', 0),
(277, 48, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(278, 48, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(279, 48, 'Giá sản phẩm', '8490000', 0),
(280, 48, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(281, 48, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(282, 48, 'Số sao đánh giá', '5', 0),
(283, 49, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(284, 49, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(285, 49, 'Giá sản phẩm', '23990000', 0),
(286, 49, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(287, 49, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(288, 49, 'Số sao đánh giá', '0', 0),
(289, 50, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(290, 50, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(291, 50, 'Giá sản phẩm', '5590000', 0),
(292, 50, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(293, 50, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(294, 50, 'Số sao đánh giá', '5', 0),
(295, 51, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(296, 51, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(297, 51, 'Giá sản phẩm', '26590000', 0),
(298, 51, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(299, 51, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(300, 51, 'Số sao đánh giá', '5', 0),
(301, 52, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(302, 52, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(303, 52, 'Giá sản phẩm', '6590000', 0),
(304, 52, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(305, 52, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(306, 52, 'Số sao đánh giá', '5', 0),
(307, 53, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(308, 53, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(309, 53, 'Giá sản phẩm', '25490000', 0),
(310, 53, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(311, 53, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(312, 53, 'Số sao đánh giá', '5', 0),
(313, 54, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(314, 54, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(315, 54, 'Giá sản phẩm', '21990000', 0),
(316, 54, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(317, 54, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(318, 54, 'Số sao đánh giá', '5', 0),
(319, 55, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(320, 55, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(321, 55, 'Giá sản phẩm', '4990000', 0),
(322, 55, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(323, 55, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(324, 55, 'Số sao đánh giá', '5', 0),
(325, 56, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(326, 56, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(327, 56, 'Giá sản phẩm', '8680000', 0),
(328, 56, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(329, 56, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(330, 56, 'Số sao đánh giá', '5', 0),
(331, 57, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(332, 57, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(333, 57, 'Giá sản phẩm', '8290000', 0),
(334, 57, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(335, 57, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(336, 57, 'Số sao đánh giá', '5', 0),
(337, 58, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(338, 58, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(339, 58, 'Giá sản phẩm', '26990000', 0),
(340, 58, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(341, 58, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(342, 58, 'Số sao đánh giá', '5', 0),
(343, 59, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13-pro-max.html', 1),
(344, 59, 'Tên sản phẩm', 'iPhone 13 Pro Max 128GB | Chính hãng VN/A', 0),
(345, 59, 'Giá sản phẩm', '22990000', 0),
(346, 59, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(347, 59, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png', 0),
(348, 59, 'Số sao đánh giá', '5', 0),
(349, 60, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-128gb.html', 1),
(350, 60, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(351, 60, 'Giá sản phẩm', '13490000', 0),
(352, 60, 'Khuyến mãi', '\n          Giảm 41%\n        ', 0),
(353, 60, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(354, 60, 'Số sao đánh giá', '5', 0),
(355, 61, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(356, 61, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(357, 61, 'Giá sản phẩm', '8290000', 0),
(358, 61, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(359, 61, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(360, 61, 'Số sao đánh giá', '5', 0),
(361, 62, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(362, 62, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(363, 62, 'Giá sản phẩm', '13590000', 0),
(364, 62, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(365, 62, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(366, 62, 'Số sao đánh giá', '5', 0),
(367, 63, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(368, 63, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(369, 63, 'Giá sản phẩm', '29390000', 0),
(370, 63, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(371, 63, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(372, 63, 'Số sao đánh giá', '5', 0),
(373, 64, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(374, 64, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(375, 64, 'Giá sản phẩm', '29990000', 0),
(376, 64, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(377, 64, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(378, 64, 'Số sao đánh giá', '0', 0),
(379, 65, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(380, 65, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(381, 65, 'Giá sản phẩm', '19190000', 0),
(382, 65, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(383, 65, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(384, 65, 'Số sao đánh giá', '5', 0),
(385, 66, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(386, 66, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(387, 66, 'Giá sản phẩm', '9990000', 0),
(388, 66, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(389, 66, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(390, 66, 'Số sao đánh giá', '5', 0),
(391, 67, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(392, 67, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(393, 67, 'Giá sản phẩm', '4690000', 0),
(394, 67, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(395, 67, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(396, 67, 'Số sao đánh giá', '5', 0),
(397, 68, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(398, 68, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(399, 68, 'Giá sản phẩm', '8490000', 0),
(400, 68, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(401, 68, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(402, 68, 'Số sao đánh giá', '5', 0),
(403, 69, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(404, 69, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(405, 69, 'Giá sản phẩm', '23990000', 0),
(406, 69, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(407, 69, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(408, 69, 'Số sao đánh giá', '0', 0),
(409, 70, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(410, 70, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(411, 70, 'Giá sản phẩm', '5590000', 0),
(412, 70, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(413, 70, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(414, 70, 'Số sao đánh giá', '5', 0),
(415, 71, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(416, 71, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(417, 71, 'Giá sản phẩm', '26590000', 0),
(418, 71, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(419, 71, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(420, 71, 'Số sao đánh giá', '5', 0),
(421, 72, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(422, 72, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(423, 72, 'Giá sản phẩm', '6590000', 0),
(424, 72, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(425, 72, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(426, 72, 'Số sao đánh giá', '5', 0),
(427, 73, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(428, 73, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(429, 73, 'Giá sản phẩm', '25490000', 0),
(430, 73, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(431, 73, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(432, 73, 'Số sao đánh giá', '5', 0),
(433, 74, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(434, 74, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(435, 74, 'Giá sản phẩm', '21990000', 0),
(436, 74, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(437, 74, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(438, 74, 'Số sao đánh giá', '5', 0),
(439, 75, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(440, 75, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(441, 75, 'Giá sản phẩm', '4990000', 0),
(442, 75, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(443, 75, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(444, 75, 'Số sao đánh giá', '5', 0),
(445, 76, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(446, 76, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(447, 76, 'Giá sản phẩm', '8680000', 0),
(448, 76, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(449, 76, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(450, 76, 'Số sao đánh giá', '5', 0),
(451, 77, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(452, 77, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(453, 77, 'Giá sản phẩm', '8290000', 0),
(454, 77, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(455, 77, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(456, 77, 'Số sao đánh giá', '5', 0),
(457, 78, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(458, 78, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(459, 78, 'Giá sản phẩm', '26990000', 0),
(460, 78, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(461, 78, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(462, 78, 'Số sao đánh giá', '5', 0),
(463, 79, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-128gb.html', 1),
(464, 79, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(465, 79, 'Giá sản phẩm', '13490000', 0),
(466, 79, 'Khuyến mãi', '\n          Giảm 41%\n        ', 0),
(467, 79, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(468, 79, 'Số sao đánh giá', '5', 0),
(469, 80, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(470, 80, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(471, 80, 'Giá sản phẩm', '8290000', 0),
(472, 80, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(473, 80, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(474, 80, 'Số sao đánh giá', '5', 0),
(475, 81, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//tecno-spark-20-pro-plus.html', 1),
(476, 81, 'Tên sản phẩm', 'TECNO SPARK 20PRO+', 0),
(477, 81, 'Giá sản phẩm', '5000000', 0),
(478, 81, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(479, 81, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/tecno-spark-20-pro-plus_1__2.png', 0),
(480, 81, 'Số sao đánh giá', '5', 0),
(481, 82, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(482, 82, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(483, 82, 'Giá sản phẩm', '13590000', 0),
(484, 82, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(485, 82, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(486, 82, 'Số sao đánh giá', '5', 0),
(487, 83, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(488, 83, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(489, 83, 'Giá sản phẩm', '29390000', 0),
(490, 83, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(491, 83, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(492, 83, 'Số sao đánh giá', '5', 0),
(493, 84, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(494, 84, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(495, 84, 'Giá sản phẩm', '29990000', 0),
(496, 84, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(497, 84, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(498, 84, 'Số sao đánh giá', '0', 0),
(499, 85, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(500, 85, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(501, 85, 'Giá sản phẩm', '19190000', 0),
(502, 85, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(503, 85, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(504, 85, 'Số sao đánh giá', '5', 0),
(505, 86, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(506, 86, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(507, 86, 'Giá sản phẩm', '9990000', 0),
(508, 86, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(509, 86, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(510, 86, 'Số sao đánh giá', '5', 0),
(511, 87, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(512, 87, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(513, 87, 'Giá sản phẩm', '4690000', 0),
(514, 87, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(515, 87, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(516, 87, 'Số sao đánh giá', '5', 0),
(517, 88, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(518, 88, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(519, 88, 'Giá sản phẩm', '8490000', 0),
(520, 88, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(521, 88, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(522, 88, 'Số sao đánh giá', '5', 0),
(523, 89, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(524, 89, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(525, 89, 'Giá sản phẩm', '23990000', 0),
(526, 89, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(527, 89, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(528, 89, 'Số sao đánh giá', '0', 0),
(529, 90, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(530, 90, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(531, 90, 'Giá sản phẩm', '5590000', 0),
(532, 90, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(533, 90, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(534, 90, 'Số sao đánh giá', '5', 0),
(535, 91, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(536, 91, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(537, 91, 'Giá sản phẩm', '26590000', 0),
(538, 91, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(539, 91, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(540, 91, 'Số sao đánh giá', '5', 0),
(541, 92, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(542, 92, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(543, 92, 'Giá sản phẩm', '6590000', 0),
(544, 92, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(545, 92, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(546, 92, 'Số sao đánh giá', '5', 0),
(547, 93, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(548, 93, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(549, 93, 'Giá sản phẩm', '25490000', 0),
(550, 93, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(551, 93, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(552, 93, 'Số sao đánh giá', '5', 0),
(553, 94, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(554, 94, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(555, 94, 'Giá sản phẩm', '21990000', 0),
(556, 94, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(557, 94, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(558, 94, 'Số sao đánh giá', '5', 0),
(559, 95, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(560, 95, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(561, 95, 'Giá sản phẩm', '4990000', 0),
(562, 95, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(563, 95, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(564, 95, 'Số sao đánh giá', '5', 0),
(565, 96, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(566, 96, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(567, 96, 'Giá sản phẩm', '8680000', 0),
(568, 96, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(569, 96, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(570, 96, 'Số sao đánh giá', '5', 0),
(571, 97, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(572, 97, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(573, 97, 'Giá sản phẩm', '8290000', 0),
(574, 97, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(575, 97, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(576, 97, 'Số sao đánh giá', '5', 0),
(577, 98, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(578, 98, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(579, 98, 'Giá sản phẩm', '26990000', 0),
(580, 98, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(581, 98, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(582, 98, 'Số sao đánh giá', '5', 0),
(583, 99, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-128gb.html', 1),
(584, 99, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(585, 99, 'Giá sản phẩm', '13490000', 0),
(586, 99, 'Khuyến mãi', '\n          Giảm 41%\n        ', 0),
(587, 99, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(588, 99, 'Số sao đánh giá', '5', 0),
(589, 100, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(590, 100, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(591, 100, 'Giá sản phẩm', '8290000', 0),
(592, 100, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(593, 100, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(594, 100, 'Số sao đánh giá', '5', 0),
(595, 101, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//tecno-spark-20-pro-plus.html', 1),
(596, 101, 'Tên sản phẩm', 'TECNO SPARK 20PRO+', 0),
(597, 101, 'Giá sản phẩm', '5000000', 0),
(598, 101, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(599, 101, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/tecno-spark-20-pro-plus_1__2.png', 0),
(600, 101, 'Số sao đánh giá', '5', 0),
(601, 102, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(602, 102, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(603, 102, 'Giá sản phẩm', '13590000', 0),
(604, 102, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(605, 102, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(606, 102, 'Số sao đánh giá', '5', 0),
(607, 103, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(608, 103, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(609, 103, 'Giá sản phẩm', '29390000', 0),
(610, 103, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(611, 103, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(612, 103, 'Số sao đánh giá', '5', 0),
(613, 104, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(614, 104, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(615, 104, 'Giá sản phẩm', '29990000', 0),
(616, 104, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(617, 104, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(618, 104, 'Số sao đánh giá', '0', 0),
(619, 105, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(620, 105, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(621, 105, 'Giá sản phẩm', '19190000', 0),
(622, 105, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(623, 105, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(624, 105, 'Số sao đánh giá', '5', 0),
(625, 106, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(626, 106, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(627, 106, 'Giá sản phẩm', '9990000', 0),
(628, 106, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(629, 106, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(630, 106, 'Số sao đánh giá', '5', 0),
(631, 107, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(632, 107, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(633, 107, 'Giá sản phẩm', '4690000', 0),
(634, 107, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(635, 107, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(636, 107, 'Số sao đánh giá', '5', 0),
(637, 108, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(638, 108, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(639, 108, 'Giá sản phẩm', '8490000', 0),
(640, 108, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(641, 108, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(642, 108, 'Số sao đánh giá', '5', 0),
(643, 109, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(644, 109, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(645, 109, 'Giá sản phẩm', '23990000', 0);
INSERT INTO `item_details` (`id`, `item_id`, `name`, `value`, `is_primary_key`) VALUES
(646, 109, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(647, 109, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(648, 109, 'Số sao đánh giá', '0', 0),
(649, 110, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(650, 110, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(651, 110, 'Giá sản phẩm', '5590000', 0),
(652, 110, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(653, 110, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(654, 110, 'Số sao đánh giá', '5', 0),
(655, 111, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(656, 111, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(657, 111, 'Giá sản phẩm', '26590000', 0),
(658, 111, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(659, 111, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(660, 111, 'Số sao đánh giá', '5', 0),
(661, 112, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(662, 112, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(663, 112, 'Giá sản phẩm', '6590000', 0),
(664, 112, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(665, 112, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(666, 112, 'Số sao đánh giá', '5', 0),
(667, 113, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(668, 113, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(669, 113, 'Giá sản phẩm', '25490000', 0),
(670, 113, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(671, 113, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(672, 113, 'Số sao đánh giá', '5', 0),
(673, 114, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(674, 114, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(675, 114, 'Giá sản phẩm', '21990000', 0),
(676, 114, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(677, 114, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(678, 114, 'Số sao đánh giá', '5', 0),
(679, 115, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(680, 115, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(681, 115, 'Giá sản phẩm', '4990000', 0),
(682, 115, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(683, 115, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(684, 115, 'Số sao đánh giá', '5', 0),
(685, 116, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(686, 116, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(687, 116, 'Giá sản phẩm', '8680000', 0),
(688, 116, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(689, 116, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(690, 116, 'Số sao đánh giá', '5', 0),
(691, 117, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(692, 117, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(693, 117, 'Giá sản phẩm', '8290000', 0),
(694, 117, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(695, 117, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(696, 117, 'Số sao đánh giá', '5', 0),
(697, 118, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(698, 118, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(699, 118, 'Giá sản phẩm', '26990000', 0),
(700, 118, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(701, 118, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(702, 118, 'Số sao đánh giá', '5', 0),
(703, 119, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-128gb.html', 1),
(704, 119, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(705, 119, 'Giá sản phẩm', '13490000', 0),
(706, 119, 'Khuyến mãi', '\n          Giảm 41%\n        ', 0),
(707, 119, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(708, 119, 'Số sao đánh giá', '5', 0),
(709, 120, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(710, 120, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(711, 120, 'Giá sản phẩm', '8290000', 0),
(712, 120, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(713, 120, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(714, 120, 'Số sao đánh giá', '5', 0),
(715, 121, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//tecno-spark-20-pro-plus.html', 1),
(716, 121, 'Tên sản phẩm', 'TECNO SPARK 20PRO+', 0),
(717, 121, 'Giá sản phẩm', '5000000', 0),
(718, 121, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(719, 121, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/tecno-spark-20-pro-plus_1__2.png', 0),
(720, 121, 'Số sao đánh giá', '5', 0),
(721, 122, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(722, 122, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(723, 122, 'Giá sản phẩm', '13590000', 0),
(724, 122, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(725, 122, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(726, 122, 'Số sao đánh giá', '5', 0),
(727, 123, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(728, 123, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(729, 123, 'Giá sản phẩm', '29390000', 0),
(730, 123, 'Khuyến mãi', '\n          Giảm 16%\n        ', 0),
(731, 123, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(732, 123, 'Số sao đánh giá', '5', 0),
(733, 124, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 1),
(734, 124, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(735, 124, 'Giá sản phẩm', '29990000', 0),
(736, 124, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(737, 124, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(738, 124, 'Số sao đánh giá', '0', 0),
(739, 125, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(740, 125, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(741, 125, 'Giá sản phẩm', '19190000', 0),
(742, 125, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(743, 125, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(744, 125, 'Số sao đánh giá', '5', 0),
(745, 126, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 1),
(746, 126, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(747, 126, 'Giá sản phẩm', '9990000', 0),
(748, 126, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(749, 126, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(750, 126, 'Số sao đánh giá', '5', 0),
(751, 127, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 1),
(752, 127, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(753, 127, 'Giá sản phẩm', '4690000', 0),
(754, 127, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(755, 127, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(756, 127, 'Số sao đánh giá', '5', 0),
(757, 128, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 1),
(758, 128, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(759, 128, 'Giá sản phẩm', '8490000', 0),
(760, 128, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(761, 128, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(762, 128, 'Số sao đánh giá', '5', 0),
(763, 129, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 1),
(764, 129, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(765, 129, 'Giá sản phẩm', '23990000', 0),
(766, 129, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(767, 129, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(768, 129, 'Số sao đánh giá', '0', 0),
(769, 130, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 1),
(770, 130, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(771, 130, 'Giá sản phẩm', '5590000', 0),
(772, 130, 'Khuyến mãi', '\n          Giảm 30%\n        ', 0),
(773, 130, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(774, 130, 'Số sao đánh giá', '5', 0),
(775, 131, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(776, 131, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(777, 131, 'Giá sản phẩm', '26590000', 0),
(778, 131, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(779, 131, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(780, 131, 'Số sao đánh giá', '5', 0),
(781, 132, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 1),
(782, 132, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(783, 132, 'Giá sản phẩm', '6590000', 0),
(784, 132, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(785, 132, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(786, 132, 'Số sao đánh giá', '5', 0),
(787, 133, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(788, 133, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(789, 133, 'Giá sản phẩm', '25490000', 0),
(790, 133, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(791, 133, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(792, 133, 'Số sao đánh giá', '5', 0),
(793, 134, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(794, 134, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(795, 134, 'Giá sản phẩm', '21990000', 0),
(796, 134, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(797, 134, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(798, 134, 'Số sao đánh giá', '5', 0),
(799, 135, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 1),
(800, 135, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(801, 135, 'Giá sản phẩm', '4990000', 0),
(802, 135, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(803, 135, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(804, 135, 'Số sao đánh giá', '5', 0),
(805, 136, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(806, 136, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(807, 136, 'Giá sản phẩm', '8680000', 0),
(808, 136, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(809, 136, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(810, 136, 'Số sao đánh giá', '5', 0),
(811, 137, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 1),
(812, 137, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(813, 137, 'Giá sản phẩm', '8290000', 0),
(814, 137, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(815, 137, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(816, 137, 'Số sao đánh giá', '5', 0),
(817, 138, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-14-ultra.html', 1),
(818, 138, 'Tên sản phẩm', 'Xiaomi 14 Ultra 5G (16GB 512GB)', 0),
(819, 138, 'Giá sản phẩm', '26990000', 0),
(820, 138, 'Khuyến mãi', '\n          Giảm 18%\n        ', 0),
(821, 138, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png', 0),
(822, 138, 'Số sao đánh giá', '5', 0),
(823, 139, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-128gb.html', 1),
(824, 139, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(825, 139, 'Giá sản phẩm', '13490000', 0),
(826, 139, 'Khuyến mãi', '\n          Giảm 41%\n        ', 0),
(827, 139, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(828, 139, 'Số sao đánh giá', '5', 0),
(829, 140, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 1),
(830, 140, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(831, 140, 'Giá sản phẩm', '8290000', 0),
(832, 140, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(833, 140, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(834, 140, 'Số sao đánh giá', '5', 0),
(835, 141, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//tecno-spark-20-pro-plus.html', 1),
(836, 141, 'Tên sản phẩm', 'TECNO SPARK 20PRO+', 0),
(837, 141, 'Giá sản phẩm', '5000000', 0),
(838, 141, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(839, 141, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/tecno-spark-20-pro-plus_1__2.png', 0),
(840, 141, 'Số sao đánh giá', '5', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `item_types`
--

CREATE TABLE `item_types` (
  `id` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `item_types`
--

INSERT INTO `item_types` (`id`, `type`, `description`) VALUES
(1, 'Điện thoại', 'Loại của các item là điện thoại, điện thoại thông minh, máy tính bảng...');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `websites`
--

CREATE TABLE `websites` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `websites`
--

INSERT INTO `websites` (`id`, `name`, `url`) VALUES
(1, 'CellphoneS', 'https://cellphones.com.vn/'),
(2, 'Tiki', 'https://tiki.vn/');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `crawl_action_details`
--
ALTER TABLE `crawl_action_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_action_types`
--
ALTER TABLE `crawl_action_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_configs`
--
ALTER TABLE `crawl_configs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_data_types`
--
ALTER TABLE `crawl_data_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_details`
--
ALTER TABLE `crawl_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_option_condition_types`
--
ALTER TABLE `crawl_option_condition_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_option_details`
--
ALTER TABLE `crawl_option_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_option_types`
--
ALTER TABLE `crawl_option_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_result_types`
--
ALTER TABLE `crawl_result_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `crawl_types`
--
ALTER TABLE `crawl_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `item_details`
--
ALTER TABLE `item_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `websites`
--
ALTER TABLE `websites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `crawl_action_details`
--
ALTER TABLE `crawl_action_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `crawl_action_types`
--
ALTER TABLE `crawl_action_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `crawl_configs`
--
ALTER TABLE `crawl_configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `crawl_data_types`
--
ALTER TABLE `crawl_data_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `crawl_details`
--
ALTER TABLE `crawl_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `crawl_option_condition_types`
--
ALTER TABLE `crawl_option_condition_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `crawl_option_details`
--
ALTER TABLE `crawl_option_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `crawl_option_types`
--
ALTER TABLE `crawl_option_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `crawl_result_types`
--
ALTER TABLE `crawl_result_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `crawl_types`
--
ALTER TABLE `crawl_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT cho bảng `item_details`
--
ALTER TABLE `item_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=841;

--
-- AUTO_INCREMENT cho bảng `item_types`
--
ALTER TABLE `item_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `websites`
--
ALTER TABLE `websites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
