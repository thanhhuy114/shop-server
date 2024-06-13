-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2024 at 05:38 AM
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

--
-- Dumping data for table `crawl_action_details`
--

INSERT INTO `crawl_action_details` (`id`, `crawl_config_id`, `action_type_id`, `selector`) VALUES
(23, 51, 1, '.cancel-button-top');

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

--
-- Dumping data for table `crawl_configs`
--

INSERT INTO `crawl_configs` (`id`, `name`, `description`, `crawl_type_id`, `result_type_id`, `item_selector`, `item_type_id`, `url`, `website_id`, `is_complete`, `update_at`) VALUES
(51, 'tên của cấu hình thu thập', 'mô tả', 1, 2, '.product-info-container.product-item', 1, 'https://cellphones.com.vn/mobile.html', 1, 0, '2024-06-13 03:33:42');

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

--
-- Dumping data for table `crawl_details`
--

INSERT INTO `crawl_details` (`id`, `crawl_config_id`, `name`, `selector`, `attribute`, `data_type_id`) VALUES
(105, 51, 'Link chi tiết sản phẩm', 'a.product__link', 'href', 3),
(106, 51, 'Tên sản phẩm', 'h3', NULL, 1),
(107, 51, 'Giá sản phẩm', '.product__price--show', NULL, 1),
(108, 51, 'Khuyến mãi', '.product__price--percent-detail', NULL, 1),
(109, 51, 'url ảnh', 'img.product__img', 'src', 3),
(110, 51, 'Số sao đánh giá', '.icon-star.is-active', NULL, 2);

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
  `condition_value` text DEFAULT NULL,
  `option_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crawl_option_details`
--

INSERT INTO `crawl_option_details` (`id`, `crawl_detail_id`, `option_type_id`, `option_condition_type_id`, `condition_value`, `option_value`) VALUES
(116, 105, 1, NULL, '/iphone', 'https://cellphones.com.vn/'),
(117, 107, 3, NULL, NULL, NULL);

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

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `item_type_id`, `website_id`, `crawl_config_id`, `update_at`) VALUES
(325, 1, 1, 51, '2024-06-13 03:33:54'),
(326, 1, 1, 51, '2024-06-13 03:33:54'),
(327, 1, 1, 51, '2024-06-13 03:33:54'),
(328, 1, 1, 51, '2024-06-13 03:33:54'),
(329, 1, 1, 51, '2024-06-13 03:33:54'),
(330, 1, 1, 51, '2024-06-13 03:33:54'),
(331, 1, 1, 51, '2024-06-13 03:33:54'),
(332, 1, 1, 51, '2024-06-13 03:33:54'),
(333, 1, 1, 51, '2024-06-13 03:33:54'),
(334, 1, 1, 51, '2024-06-13 03:33:54'),
(335, 1, 1, 51, '2024-06-13 03:33:55'),
(336, 1, 1, 51, '2024-06-13 03:33:55'),
(337, 1, 1, 51, '2024-06-13 03:33:55'),
(338, 1, 1, 51, '2024-06-13 03:33:55'),
(339, 1, 1, 51, '2024-06-13 03:33:55'),
(340, 1, 1, 51, '2024-06-13 03:33:55'),
(341, 1, 1, 51, '2024-06-13 03:33:55'),
(342, 1, 1, 51, '2024-06-13 03:33:55'),
(343, 1, 1, 51, '2024-06-13 03:33:55'),
(344, 1, 1, 51, '2024-06-13 03:33:56'),
(345, 1, 1, 51, '2024-06-13 03:22:26'),
(346, 1, 1, 51, '2024-06-13 03:22:26'),
(347, 1, 1, 51, '2024-06-13 03:22:27'),
(348, 1, 1, 51, '2024-06-13 03:22:27'),
(349, 1, 1, 51, '2024-06-13 03:22:27'),
(350, 1, 1, 51, '2024-06-13 03:22:27'),
(351, 1, 1, 51, '2024-06-13 03:22:27'),
(352, 1, 1, 51, '2024-06-13 03:22:27'),
(353, 1, 1, 51, '2024-06-13 03:22:27'),
(354, 1, 1, 51, '2024-06-13 03:22:28'),
(355, 1, 1, 51, '2024-06-13 03:22:28'),
(356, 1, 1, 51, '2024-06-13 03:22:28'),
(357, 1, 1, 51, '2024-06-13 03:22:28'),
(358, 1, 1, 51, '2024-06-13 03:22:28'),
(359, 1, 1, 51, '2024-06-13 03:22:28'),
(360, 1, 1, 51, '2024-06-13 03:22:29'),
(361, 1, 1, 51, '2024-06-13 03:22:29'),
(362, 1, 1, 51, '2024-06-13 03:22:29'),
(363, 1, 1, 51, '2024-06-13 03:22:29'),
(364, 1, 1, 51, '2024-06-13 03:22:30'),
(365, 1, 1, 51, '2024-06-13 03:34:25'),
(366, 1, 1, 51, '2024-06-13 03:34:25'),
(367, 1, 1, 51, '2024-06-13 03:34:25'),
(368, 1, 1, 51, '2024-06-13 03:34:25'),
(369, 1, 1, 51, '2024-06-13 03:34:26'),
(370, 1, 1, 51, '2024-06-13 03:34:26'),
(371, 1, 1, 51, '2024-06-13 03:34:26'),
(372, 1, 1, 51, '2024-06-13 03:34:26'),
(373, 1, 1, 51, '2024-06-13 03:34:27'),
(374, 1, 1, 51, '2024-06-13 03:34:27'),
(375, 1, 1, 51, '2024-06-13 03:34:27'),
(376, 1, 1, 51, '2024-06-13 03:34:28'),
(377, 1, 1, 51, '2024-06-13 03:34:28'),
(378, 1, 1, 51, '2024-06-13 03:34:28'),
(379, 1, 1, 51, '2024-06-13 03:34:28'),
(380, 1, 1, 51, '2024-06-13 03:34:29'),
(381, 1, 1, 51, '2024-06-13 03:34:29'),
(382, 1, 1, 51, '2024-06-13 03:34:29'),
(383, 1, 1, 51, '2024-06-13 03:34:30'),
(384, 1, 1, 51, '2024-06-13 03:34:30');

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

--
-- Dumping data for table `item_details`
--

INSERT INTO `item_details` (`id`, `item_id`, `name`, `value`, `is_primary_key`) VALUES
(1699, 285, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(1700, 285, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(1701, 285, 'Giá sản phẩm', '13890000', 0),
(1702, 285, 'Khuyến mãi', '\n          Giảm 27%\n        ', 0),
(1703, 285, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(1704, 285, 'Số sao đánh giá', '5', 0),
(1705, 286, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(1706, 286, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(1707, 286, 'Giá sản phẩm', '29690000', 0),
(1708, 286, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1709, 286, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(1710, 286, 'Số sao đánh giá', '5', 0),
(1711, 287, 'Link chi tiết sản phẩm', '/samsung-galaxy-s24-ultra.html', 1),
(1712, 287, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(1713, 287, 'Giá sản phẩm', '29990000', 0),
(1714, 287, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(1715, 287, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(1716, 287, 'Số sao đánh giá', '5', 0),
(1717, 288, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13-pro-plus.html', 1),
(1718, 288, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(1719, 288, 'Giá sản phẩm', '9290000', 0),
(1720, 288, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1721, 288, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(1722, 288, 'Số sao đánh giá', '5', 0),
(1723, 289, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(1724, 289, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(1725, 289, 'Giá sản phẩm', '19590000', 0),
(1726, 289, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1727, 289, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(1728, 289, 'Số sao đánh giá', '5', 0),
(1729, 290, 'Link chi tiết sản phẩm', '/samsung-galaxy-m34-5g.html', 1),
(1730, 290, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(1731, 290, 'Giá sản phẩm', '5790000', 0),
(1732, 290, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(1733, 290, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(1734, 290, 'Số sao đánh giá', '5', 0),
(1735, 291, 'Link chi tiết sản phẩm', '/dien-thoai-oppo-reno-11-f.html', 1),
(1736, 291, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(1737, 291, 'Giá sản phẩm', '8490000', 0),
(1738, 291, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(1739, 291, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(1740, 291, 'Số sao đánh giá', '5', 0),
(1741, 292, 'Link chi tiết sản phẩm', '/samsung-galaxy-s23-128gb.html', 1),
(1742, 292, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(1743, 292, 'Giá sản phẩm', '13790000', 0),
(1744, 292, 'Khuyến mãi', '\n          Giảm 40%\n        ', 0),
(1745, 292, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(1746, 292, 'Số sao đánh giá', '5', 0),
(1747, 293, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(1748, 293, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(1749, 293, 'Giá sản phẩm', '26590000', 0),
(1750, 293, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(1751, 293, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(1752, 293, 'Số sao đánh giá', '5', 0),
(1753, 294, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13-pro.html', 1),
(1754, 294, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(1755, 294, 'Giá sản phẩm', '6590000', 0),
(1756, 294, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(1757, 294, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(1758, 294, 'Số sao đánh giá', '5', 0),
(1759, 295, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(1760, 295, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(1761, 295, 'Giá sản phẩm', '22290000', 0),
(1762, 295, 'Khuyến mãi', '\n          Giảm 14%\n        ', 0),
(1763, 295, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(1764, 295, 'Số sao đánh giá', '5', 0),
(1765, 296, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13.html', 1),
(1766, 296, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(1767, 296, 'Giá sản phẩm', '4690000', 0),
(1768, 296, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(1769, 296, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(1770, 296, 'Số sao đánh giá', '5', 0),
(1771, 297, 'Link chi tiết sản phẩm', '/dien-thoai-xiaomi-poco-x6-pro.html', 1),
(1772, 297, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(1773, 297, 'Giá sản phẩm', '8290000', 0),
(1774, 297, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(1775, 297, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(1776, 297, 'Số sao đánh giá', '5', 0),
(1777, 298, 'Link chi tiết sản phẩm', '/samsung-galaxy-a54.html', 1),
(1778, 298, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(1779, 298, 'Giá sản phẩm', '8290000', 0),
(1780, 298, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(1781, 298, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(1782, 298, 'Số sao đánh giá', '5', 0),
(1783, 299, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(1784, 299, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(1785, 299, 'Giá sản phẩm', '25490000', 0),
(1786, 299, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(1787, 299, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(1788, 299, 'Số sao đánh giá', '5', 0),
(1789, 300, 'Link chi tiết sản phẩm', '/samsung-galaxy-a15.html', 1),
(1790, 300, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(1791, 300, 'Giá sản phẩm', '4490000', 0),
(1792, 300, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(1793, 300, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(1794, 300, 'Số sao đánh giá', '5', 0),
(1795, 301, 'Link chi tiết sản phẩm', '/samsung-galaxy-s23-ultra.html', 1),
(1796, 301, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(1797, 301, 'Giá sản phẩm', '23990000', 0),
(1798, 301, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(1799, 301, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(1800, 301, 'Số sao đánh giá', '0', 0),
(1801, 302, 'Link chi tiết sản phẩm', '/samsung-galaxy-z-flip-5-256gb.html', 1),
(1802, 302, 'Tên sản phẩm', 'Samsung Galaxy Z Flip5 256GB', 0),
(1803, 302, 'Giá sản phẩm', '16990000', 0),
(1804, 302, 'Khuyến mãi', '\n          Giảm 35%\n        ', 0),
(1805, 302, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-lip5_3_.png', 0),
(1806, 302, 'Số sao đánh giá', '0', 0),
(1807, 303, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(1808, 303, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(1809, 303, 'Giá sản phẩm', '8590000', 0),
(1810, 303, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(1811, 303, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(1812, 303, 'Số sao đánh giá', '5', 0),
(1813, 304, 'Link chi tiết sản phẩm', '/nubia-neo-2.html', 1),
(1814, 304, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(1815, 304, 'Giá sản phẩm', '4990000', 0),
(1816, 304, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(1817, 304, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(1818, 304, 'Số sao đánh giá', '5', 0),
(1819, 305, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(1820, 305, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(1821, 305, 'Giá sản phẩm', '13890000', 0),
(1822, 305, 'Khuyến mãi', '\n          Giảm 27%\n        ', 0),
(1823, 305, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(1824, 305, 'Số sao đánh giá', '5', 0),
(1825, 306, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(1826, 306, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(1827, 306, 'Giá sản phẩm', '29690000', 0),
(1828, 306, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1829, 306, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(1830, 306, 'Số sao đánh giá', '5', 0),
(1831, 307, 'Link chi tiết sản phẩm', '/samsung-galaxy-s24-ultra.html', 1),
(1832, 307, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(1833, 307, 'Giá sản phẩm', '29990000', 0),
(1834, 307, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(1835, 307, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(1836, 307, 'Số sao đánh giá', '5', 0),
(1837, 308, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13-pro-plus.html', 1),
(1838, 308, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(1839, 308, 'Giá sản phẩm', '9290000', 0),
(1840, 308, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1841, 308, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(1842, 308, 'Số sao đánh giá', '5', 0),
(1843, 309, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(1844, 309, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(1845, 309, 'Giá sản phẩm', '19590000', 0),
(1846, 309, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1847, 309, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(1848, 309, 'Số sao đánh giá', '5', 0),
(1849, 310, 'Link chi tiết sản phẩm', '/samsung-galaxy-m34-5g.html', 1),
(1850, 310, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(1851, 310, 'Giá sản phẩm', '5790000', 0),
(1852, 310, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(1853, 310, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(1854, 310, 'Số sao đánh giá', '5', 0),
(1855, 311, 'Link chi tiết sản phẩm', '/dien-thoai-oppo-reno-11-f.html', 1),
(1856, 311, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(1857, 311, 'Giá sản phẩm', '8490000', 0),
(1858, 311, 'Khuyến mãi', '\n          Giảm 6%\n        ', 0),
(1859, 311, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(1860, 311, 'Số sao đánh giá', '5', 0),
(1861, 312, 'Link chi tiết sản phẩm', '/samsung-galaxy-s23-128gb.html', 1),
(1862, 312, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(1863, 312, 'Giá sản phẩm', '13790000', 0),
(1864, 312, 'Khuyến mãi', '\n          Giảm 40%\n        ', 0),
(1865, 312, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(1866, 312, 'Số sao đánh giá', '5', 0),
(1867, 313, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(1868, 313, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(1869, 313, 'Giá sản phẩm', '26590000', 0),
(1870, 313, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(1871, 313, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(1872, 313, 'Số sao đánh giá', '5', 0),
(1873, 314, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13-pro.html', 1),
(1874, 314, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(1875, 314, 'Giá sản phẩm', '6590000', 0),
(1876, 314, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(1877, 314, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(1878, 314, 'Số sao đánh giá', '5', 0),
(1879, 315, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(1880, 315, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(1881, 315, 'Giá sản phẩm', '22290000', 0),
(1882, 315, 'Khuyến mãi', '\n          Giảm 14%\n        ', 0),
(1883, 315, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(1884, 315, 'Số sao đánh giá', '5', 0),
(1885, 316, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13.html', 1),
(1886, 316, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(1887, 316, 'Giá sản phẩm', '4690000', 0),
(1888, 316, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(1889, 316, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(1890, 316, 'Số sao đánh giá', '5', 0),
(1891, 317, 'Link chi tiết sản phẩm', '/dien-thoai-xiaomi-poco-x6-pro.html', 1),
(1892, 317, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(1893, 317, 'Giá sản phẩm', '8290000', 0),
(1894, 317, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(1895, 317, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(1896, 317, 'Số sao đánh giá', '5', 0),
(1897, 318, 'Link chi tiết sản phẩm', '/samsung-galaxy-a54.html', 1),
(1898, 318, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(1899, 318, 'Giá sản phẩm', '8290000', 0),
(1900, 318, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(1901, 318, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(1902, 318, 'Số sao đánh giá', '5', 0),
(1903, 319, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(1904, 319, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(1905, 319, 'Giá sản phẩm', '25490000', 0),
(1906, 319, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(1907, 319, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(1908, 319, 'Số sao đánh giá', '5', 0),
(1909, 320, 'Link chi tiết sản phẩm', '/samsung-galaxy-a15.html', 1),
(1910, 320, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(1911, 320, 'Giá sản phẩm', '4490000', 0),
(1912, 320, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(1913, 320, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(1914, 320, 'Số sao đánh giá', '5', 0),
(1915, 321, 'Link chi tiết sản phẩm', '/samsung-galaxy-s23-ultra.html', 1),
(1916, 321, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(1917, 321, 'Giá sản phẩm', '23990000', 0),
(1918, 321, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(1919, 321, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(1920, 321, 'Số sao đánh giá', '0', 0),
(1921, 322, 'Link chi tiết sản phẩm', '/samsung-galaxy-z-flip-5-256gb.html', 1),
(1922, 322, 'Tên sản phẩm', 'Samsung Galaxy Z Flip5 256GB', 0),
(1923, 322, 'Giá sản phẩm', '16990000', 0),
(1924, 322, 'Khuyến mãi', '\n          Giảm 35%\n        ', 0),
(1925, 322, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-lip5_3_.png', 0),
(1926, 322, 'Số sao đánh giá', '0', 0),
(1927, 323, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(1928, 323, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(1929, 323, 'Giá sản phẩm', '8590000', 0),
(1930, 323, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(1931, 323, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(1932, 323, 'Số sao đánh giá', '5', 0),
(1933, 324, 'Link chi tiết sản phẩm', '/nubia-neo-2.html', 1),
(1934, 324, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(1935, 324, 'Giá sản phẩm', '4990000', 0),
(1936, 324, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(1937, 324, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(1938, 324, 'Số sao đánh giá', '5', 0),
(1939, 325, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 1),
(1940, 325, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(1941, 325, 'Giá sản phẩm', '13890000', 0),
(1942, 325, 'Khuyến mãi', '\n          Giảm 27%\n        ', 0),
(1943, 325, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(1944, 325, 'Số sao đánh giá', '5', 0),
(1945, 326, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 1),
(1946, 326, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(1947, 326, 'Giá sản phẩm', '29690000', 0),
(1948, 326, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1949, 326, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(1950, 326, 'Số sao đánh giá', '5', 0),
(1951, 327, 'Link chi tiết sản phẩm', '/samsung-galaxy-s24-ultra.html', 1),
(1952, 327, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(1953, 327, 'Giá sản phẩm', '29990000', 0),
(1954, 327, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(1955, 327, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(1956, 327, 'Số sao đánh giá', '5', 0),
(1957, 328, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13-pro-plus.html', 1),
(1958, 328, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(1959, 328, 'Giá sản phẩm', '9290000', 0),
(1960, 328, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1961, 328, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(1962, 328, 'Số sao đánh giá', '5', 0),
(1963, 329, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 1),
(1964, 329, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(1965, 329, 'Giá sản phẩm', '19590000', 0),
(1966, 329, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(1967, 329, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(1968, 329, 'Số sao đánh giá', '5', 0),
(1969, 330, 'Link chi tiết sản phẩm', '/samsung-galaxy-m34-5g.html', 1),
(1970, 330, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(1971, 330, 'Giá sản phẩm', '5790000', 0),
(1972, 330, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(1973, 330, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(1974, 330, 'Số sao đánh giá', '5', 0),
(1975, 331, 'Link chi tiết sản phẩm', '/dien-thoai-oppo-reno-11-f.html', 1),
(1976, 331, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(1977, 331, 'Giá sản phẩm', '8090000', 0),
(1978, 331, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(1979, 331, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(1980, 331, 'Số sao đánh giá', '5', 0),
(1981, 332, 'Link chi tiết sản phẩm', '/samsung-galaxy-s23-128gb.html', 1),
(1982, 332, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(1983, 332, 'Giá sản phẩm', '13790000', 0),
(1984, 332, 'Khuyến mãi', '\n          Giảm 40%\n        ', 0),
(1985, 332, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(1986, 332, 'Số sao đánh giá', '5', 0),
(1987, 333, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 1),
(1988, 333, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(1989, 333, 'Giá sản phẩm', '26590000', 0),
(1990, 333, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(1991, 333, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(1992, 333, 'Số sao đánh giá', '5', 0),
(1993, 334, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13-pro.html', 1),
(1994, 334, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(1995, 334, 'Giá sản phẩm', '6590000', 0),
(1996, 334, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(1997, 334, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(1998, 334, 'Số sao đánh giá', '5', 0),
(1999, 335, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 1),
(2000, 335, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(2001, 335, 'Giá sản phẩm', '22290000', 0),
(2002, 335, 'Khuyến mãi', '\n          Giảm 14%\n        ', 0),
(2003, 335, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(2004, 335, 'Số sao đánh giá', '5', 0),
(2005, 336, 'Link chi tiết sản phẩm', '/xiaomi-redmi-note-13.html', 1),
(2006, 336, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(2007, 336, 'Giá sản phẩm', '4690000', 0),
(2008, 336, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(2009, 336, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(2010, 336, 'Số sao đánh giá', '5', 0),
(2011, 337, 'Link chi tiết sản phẩm', '/dien-thoai-xiaomi-poco-x6-pro.html', 1),
(2012, 337, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(2013, 337, 'Giá sản phẩm', '8290000', 0),
(2014, 337, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(2015, 337, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(2016, 337, 'Số sao đánh giá', '5', 0),
(2017, 338, 'Link chi tiết sản phẩm', '/samsung-galaxy-a54.html', 1),
(2018, 338, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(2019, 338, 'Giá sản phẩm', '8290000', 0),
(2020, 338, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(2021, 338, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(2022, 338, 'Số sao đánh giá', '5', 0),
(2023, 339, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 1),
(2024, 339, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(2025, 339, 'Giá sản phẩm', '25490000', 0),
(2026, 339, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(2027, 339, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(2028, 339, 'Số sao đánh giá', '5', 0),
(2029, 340, 'Link chi tiết sản phẩm', '/samsung-galaxy-a15.html', 1),
(2030, 340, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(2031, 340, 'Giá sản phẩm', '4490000', 0),
(2032, 340, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2033, 340, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(2034, 340, 'Số sao đánh giá', '5', 0),
(2035, 341, 'Link chi tiết sản phẩm', '/samsung-galaxy-s23-ultra.html', 1),
(2036, 341, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(2037, 341, 'Giá sản phẩm', '23990000', 0),
(2038, 341, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(2039, 341, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(2040, 341, 'Số sao đánh giá', '0', 0),
(2041, 342, 'Link chi tiết sản phẩm', '/samsung-galaxy-z-flip-5-256gb.html', 1),
(2042, 342, 'Tên sản phẩm', 'Samsung Galaxy Z Flip5 256GB', 0),
(2043, 342, 'Giá sản phẩm', '16990000', 0),
(2044, 342, 'Khuyến mãi', '\n          Giảm 35%\n        ', 0),
(2045, 342, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-lip5_3_.png', 0),
(2046, 342, 'Số sao đánh giá', '0', 0),
(2047, 343, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 1),
(2048, 343, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(2049, 343, 'Giá sản phẩm', '8590000', 0),
(2050, 343, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(2051, 343, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(2052, 343, 'Số sao đánh giá', '5', 0),
(2053, 344, 'Link chi tiết sản phẩm', '/nubia-neo-2.html', 1),
(2054, 344, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(2055, 344, 'Giá sản phẩm', '4990000', 0),
(2056, 344, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(2057, 344, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(2058, 344, 'Số sao đánh giá', '5', 0),
(2059, 345, 'Link chi tiết sản phẩm', 'undefined/iphone-13.html', 0),
(2060, 345, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(2061, 345, 'Giá sản phẩm', '13890000', 0),
(2062, 345, 'Khuyến mãi', '\n          Giảm 27%\n        ', 0),
(2063, 345, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(2064, 345, 'Số sao đánh giá', '5', 0),
(2065, 346, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-s24-ultra.html', 0),
(2066, 346, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(2067, 346, 'Giá sản phẩm', '29990000', 0),
(2068, 346, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(2069, 346, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(2070, 346, 'Số sao đánh giá', '5', 0),
(2071, 347, 'Link chi tiết sản phẩm', 'undefined/iphone-15-pro-max.html', 0),
(2072, 347, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(2073, 347, 'Giá sản phẩm', '29690000', 0),
(2074, 347, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(2075, 347, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(2076, 347, 'Số sao đánh giá', '5', 0),
(2077, 348, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-s23-128gb.html', 0),
(2078, 348, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(2079, 348, 'Giá sản phẩm', '13790000', 0),
(2080, 348, 'Khuyến mãi', '\n          Giảm 40%\n        ', 0),
(2081, 348, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(2082, 348, 'Số sao đánh giá', '5', 0),
(2083, 349, 'Link chi tiết sản phẩm', 'undefined/iphone-15.html', 0),
(2084, 349, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(2085, 349, 'Giá sản phẩm', '19590000', 0),
(2086, 349, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(2087, 349, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(2088, 349, 'Số sao đánh giá', '5', 0),
(2089, 350, 'Link chi tiết sản phẩm', 'undefined/xiaomi-redmi-note-13-pro-plus.html', 0),
(2090, 350, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(2091, 350, 'Giá sản phẩm', '9290000', 0),
(2092, 350, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(2093, 350, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(2094, 350, 'Số sao đánh giá', '5', 0),
(2095, 351, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-m34-5g.html', 0),
(2096, 351, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(2097, 351, 'Giá sản phẩm', '5790000', 0),
(2098, 351, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(2099, 351, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(2100, 351, 'Số sao đánh giá', '5', 0),
(2101, 352, 'Link chi tiết sản phẩm', 'undefined/dien-thoai-oppo-reno-11-f.html', 0),
(2102, 352, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(2103, 352, 'Giá sản phẩm', '8090000', 0),
(2104, 352, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2105, 352, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(2106, 352, 'Số sao đánh giá', '5', 0),
(2107, 353, 'Link chi tiết sản phẩm', 'undefined/iphone-14-pro-max.html', 0),
(2108, 353, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(2109, 353, 'Giá sản phẩm', '26590000', 0),
(2110, 353, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(2111, 353, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(2112, 353, 'Số sao đánh giá', '5', 0),
(2113, 354, 'Link chi tiết sản phẩm', 'undefined/xiaomi-redmi-note-13-pro.html', 0),
(2114, 354, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(2115, 354, 'Giá sản phẩm', '6590000', 0),
(2116, 354, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2117, 354, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(2118, 354, 'Số sao đánh giá', '5', 0),
(2119, 355, 'Link chi tiết sản phẩm', 'undefined/iphone-15-plus.html', 0),
(2120, 355, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(2121, 355, 'Giá sản phẩm', '22290000', 0),
(2122, 355, 'Khuyến mãi', '\n          Giảm 14%\n        ', 0),
(2123, 355, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(2124, 355, 'Số sao đánh giá', '5', 0),
(2125, 356, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-s23-ultra.html', 0),
(2126, 356, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(2127, 356, 'Giá sản phẩm', '23990000', 0),
(2128, 356, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(2129, 356, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(2130, 356, 'Số sao đánh giá', '0', 0),
(2131, 357, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-a54.html', 0),
(2132, 357, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(2133, 357, 'Giá sản phẩm', '8290000', 0),
(2134, 357, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(2135, 357, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(2136, 357, 'Số sao đánh giá', '5', 0),
(2137, 358, 'Link chi tiết sản phẩm', 'undefined/xiaomi-redmi-note-13.html', 0),
(2138, 358, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(2139, 358, 'Giá sản phẩm', '4690000', 0),
(2140, 358, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(2141, 358, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(2142, 358, 'Số sao đánh giá', '5', 0),
(2143, 359, 'Link chi tiết sản phẩm', 'undefined/iphone-15-pro.html', 0),
(2144, 359, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(2145, 359, 'Giá sản phẩm', '25490000', 0),
(2146, 359, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(2147, 359, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(2148, 359, 'Số sao đánh giá', '5', 0),
(2149, 360, 'Link chi tiết sản phẩm', 'undefined/dien-thoai-xiaomi-poco-x6-pro.html', 0),
(2150, 360, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(2151, 360, 'Giá sản phẩm', '8290000', 0),
(2152, 360, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(2153, 360, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(2154, 360, 'Số sao đánh giá', '5', 0),
(2155, 361, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-a15.html', 0),
(2156, 361, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(2157, 361, 'Giá sản phẩm', '4490000', 0),
(2158, 361, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2159, 361, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(2160, 361, 'Số sao đánh giá', '5', 0),
(2161, 362, 'Link chi tiết sản phẩm', 'undefined/samsung-galaxy-z-flip-5-256gb.html', 0),
(2162, 362, 'Tên sản phẩm', 'Samsung Galaxy Z Flip5 256GB', 0),
(2163, 362, 'Giá sản phẩm', '16990000', 0),
(2164, 362, 'Khuyến mãi', '\n          Giảm 35%\n        ', 0),
(2165, 362, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-lip5_3_.png', 0),
(2166, 362, 'Số sao đánh giá', '0', 0),
(2167, 363, 'Link chi tiết sản phẩm', 'undefined/iphone-11.html', 0),
(2168, 363, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(2169, 363, 'Giá sản phẩm', '8590000', 0),
(2170, 363, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(2171, 363, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(2172, 363, 'Số sao đánh giá', '5', 0),
(2173, 364, 'Link chi tiết sản phẩm', 'undefined/nubia-neo-2.html', 0),
(2174, 364, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(2175, 364, 'Giá sản phẩm', '4990000', 0),
(2176, 364, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(2177, 364, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(2178, 364, 'Số sao đánh giá', '5', 0),
(2179, 365, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-13.html', 0),
(2180, 365, 'Tên sản phẩm', 'iPhone 13 128GB | Chính hãng VN/A', 0),
(2181, 365, 'Giá sản phẩm', '13890000', 0),
(2182, 365, 'Khuyến mãi', '\n          Giảm 27%\n        ', 0),
(2183, 365, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png', 0),
(2184, 365, 'Số sao đánh giá', '5', 0),
(2185, 366, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s24-ultra.html', 0),
(2186, 366, 'Tên sản phẩm', 'Samsung Galaxy S24 Ultra 12GB 256GB', 0),
(2187, 366, 'Giá sản phẩm', '29990000', 0),
(2188, 366, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(2189, 366, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png', 0),
(2190, 366, 'Số sao đánh giá', '5', 0),
(2191, 367, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro-max.html', 0),
(2192, 367, 'Tên sản phẩm', 'iPhone 15 Pro Max 256GB | Chính hãng VN/A', 0),
(2193, 367, 'Giá sản phẩm', '29690000', 0),
(2194, 367, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(2195, 367, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 0),
(2196, 367, 'Số sao đánh giá', '5', 0),
(2197, 368, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-128gb.html', 0),
(2198, 368, 'Tên sản phẩm', 'Samsung Galaxy S23 8GB 128GB - Chỉ có tại CellphoneS', 0),
(2199, 368, 'Giá sản phẩm', '13790000', 0),
(2200, 368, 'Khuyến mãi', '\n          Giảm 40%\n        ', 0),
(2201, 368, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 0),
(2202, 368, 'Số sao đánh giá', '5', 0),
(2203, 369, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15.html', 0),
(2204, 369, 'Tên sản phẩm', 'iPhone 15 128GB | Chính hãng VN/A', 0),
(2205, 369, 'Giá sản phẩm', '19590000', 0),
(2206, 369, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(2207, 369, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png', 0),
(2208, 369, 'Số sao đánh giá', '5', 0),
(2209, 370, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro-plus.html', 0),
(2210, 370, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro Plus 5G 8GB 256GB', 0),
(2211, 370, 'Giá sản phẩm', '9290000', 0),
(2212, 370, 'Khuyến mãi', '\n          Giảm 15%\n        ', 0),
(2213, 370, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-plus_9_.png', 0),
(2214, 370, 'Số sao đánh giá', '5', 0),
(2215, 371, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-m34-5g.html', 0),
(2216, 371, 'Tên sản phẩm', 'Samsung Galaxy M34 5G 8GB 128GB', 0),
(2217, 371, 'Giá sản phẩm', '5790000', 0),
(2218, 371, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(2219, 371, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png', 0),
(2220, 371, 'Số sao đánh giá', '5', 0),
(2221, 372, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-oppo-reno-11-f.html', 0),
(2222, 372, 'Tên sản phẩm', 'OPPO Reno11 F 5G 8GB 256GB', 0),
(2223, 372, 'Giá sản phẩm', '8090000', 0),
(2224, 372, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2225, 372, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png', 0),
(2226, 372, 'Số sao đánh giá', '5', 0),
(2227, 373, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-14-pro-max.html', 0),
(2228, 373, 'Tên sản phẩm', 'iPhone 14 Pro Max 128GB | Chính hãng VN/A', 0),
(2229, 373, 'Giá sản phẩm', '26590000', 0),
(2230, 373, 'Khuyến mãi', '\n          Giảm 11%\n        ', 0),
(2231, 373, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png', 0),
(2232, 373, 'Số sao đánh giá', '5', 0),
(2233, 374, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13-pro.html', 0),
(2234, 374, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 Pro 4G', 0),
(2235, 374, 'Giá sản phẩm', '6590000', 0),
(2236, 374, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2237, 374, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png', 0),
(2238, 374, 'Số sao đánh giá', '5', 0),
(2239, 375, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-plus.html', 0),
(2240, 375, 'Tên sản phẩm', 'iPhone 15 Plus 128GB | Chính hãng VN/A', 0),
(2241, 375, 'Giá sản phẩm', '22290000', 0),
(2242, 375, 'Khuyến mãi', '\n          Giảm 14%\n        ', 0),
(2243, 375, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png', 0),
(2244, 375, 'Số sao đánh giá', '5', 0),
(2245, 376, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-s23-ultra.html', 0),
(2246, 376, 'Tên sản phẩm', 'Samsung Galaxy S23 Ultra 256GB', 0),
(2247, 376, 'Giá sản phẩm', '23990000', 0),
(2248, 376, 'Khuyến mãi', '\n          Giảm 25%\n        ', 0),
(2249, 376, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png', 0),
(2250, 376, 'Số sao đánh giá', '0', 0),
(2251, 377, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a54.html', 0),
(2252, 377, 'Tên sản phẩm', 'Samsung Galaxy A54 5G 8GB 128GB', 0),
(2253, 377, 'Giá sản phẩm', '8290000', 0),
(2254, 377, 'Khuyến mãi', '\n          Giảm 21%\n        ', 0),
(2255, 377, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-a54.png', 0),
(2256, 377, 'Số sao đánh giá', '5', 0),
(2257, 378, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//xiaomi-redmi-note-13.html', 0),
(2258, 378, 'Tên sản phẩm', 'Xiaomi Redmi Note 13 6GB 128GB', 0),
(2259, 378, 'Giá sản phẩm', '4690000', 0),
(2260, 378, 'Khuyến mãi', '\n          Giảm 4%\n        ', 0),
(2261, 378, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png', 0),
(2262, 378, 'Số sao đánh giá', '5', 0),
(2263, 379, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-15-pro.html', 0),
(2264, 379, 'Tên sản phẩm', 'iPhone 15 Pro 128GB | Chính hãng VN/A', 0),
(2265, 379, 'Giá sản phẩm', '25490000', 0),
(2266, 379, 'Khuyến mãi', '\n          Giảm 12%\n        ', 0),
(2267, 379, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4.png', 0),
(2268, 379, 'Số sao đánh giá', '5', 0),
(2269, 380, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//dien-thoai-xiaomi-poco-x6-pro.html', 0),
(2270, 380, 'Tên sản phẩm', 'Xiaomi POCO X6 Pro 5G 8GB 256GB - Chỉ có tại CellphoneS', 0),
(2271, 380, 'Giá sản phẩm', '8290000', 0),
(2272, 380, 'Khuyến mãi', '\n          Giảm 17%\n        ', 0),
(2273, 380, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_22__6.png', 0),
(2274, 380, 'Số sao đánh giá', '5', 0),
(2275, 381, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-a15.html', 0),
(2276, 381, 'Tên sản phẩm', 'Samsung Galaxy A15 LTE 8GB 128GB', 0),
(2277, 381, 'Giá sản phẩm', '4490000', 0),
(2278, 381, 'Khuyến mãi', '\n          Giảm 10%\n        ', 0),
(2279, 381, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png', 0),
(2280, 381, 'Số sao đánh giá', '5', 0),
(2281, 382, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//samsung-galaxy-z-flip-5-256gb.html', 0),
(2282, 382, 'Tên sản phẩm', 'Samsung Galaxy Z Flip5 256GB', 0),
(2283, 382, 'Giá sản phẩm', '16990000', 0),
(2284, 382, 'Khuyến mãi', '\n          Giảm 35%\n        ', 0),
(2285, 382, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-lip5_3_.png', 0),
(2286, 382, 'Số sao đánh giá', '0', 0),
(2287, 383, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//iphone-11.html', 0),
(2288, 383, 'Tên sản phẩm', 'iPhone 11 64GB | Chính hãng VN/A ', 0),
(2289, 383, 'Giá sản phẩm', '8590000', 0),
(2290, 383, 'Khuyến mãi', '\n          Giảm 28%\n        ', 0),
(2291, 383, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11.png', 0),
(2292, 383, 'Số sao đánh giá', '5', 0),
(2293, 384, 'Link chi tiết sản phẩm', 'https://cellphones.com.vn//nubia-neo-2.html', 0),
(2294, 384, 'Tên sản phẩm', 'Điện thoại Nubia Neo 2', 0),
(2295, 384, 'Giá sản phẩm', '4990000', 0),
(2296, 384, 'Khuyến mãi', '\n          Giảm 9%\n        ', 0),
(2297, 384, 'url ảnh', 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/u/nubia-neo-2_1_.png', 0),
(2298, 384, 'Số sao đánh giá', '5', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `crawl_action_types`
--
ALTER TABLE `crawl_action_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `crawl_configs`
--
ALTER TABLE `crawl_configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `crawl_data_types`
--
ALTER TABLE `crawl_data_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `crawl_details`
--
ALTER TABLE `crawl_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `crawl_option_condition_types`
--
ALTER TABLE `crawl_option_condition_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `crawl_option_details`
--
ALTER TABLE `crawl_option_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=385;

--
-- AUTO_INCREMENT for table `item_details`
--
ALTER TABLE `item_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2299;

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
