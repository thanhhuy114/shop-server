const items = require('../models/items_model');
const typeService = require('../services/type_service');
const itemDetailService = require('../services/item_detail_service');

// Lấy tất cả item
exports.getAll = async () => {
    try {
        // Khai báo mảng kết quả
        const results = [];

        // Lấy danh sách item (cần lấy id, website_id, item_type_id)
        const allItems = await items.findAll({
            attributes: ['id', 'website_id', 'item_type_id']
        });

        // Duyệt danh sách item và lấy danh sách chi tiết item (name, value) của từng item
        for (const item of allItems){
            // Lấy tên loại item
            const itemType = await typeService.getItemType(item.item_type_id);

            // Lấy website
            const website = await typeService.getWebsite(item.website_id);

            const itemDetails = await itemDetailService.getListItemDetailsByItemId(item.id);
            const itemDetailResults = [];

            // Lấy chi tiết item
            for (const itemDetail of itemDetails) {
                // Lưu vào mảng để trả về
                itemDetailResults.push({
                    name: itemDetail.name, 
                    value: itemDetail.value
                });
            }

            // Lưu item vào kết quả trả về
            results.push({
                id: item.id,
                item_type_name: itemType.type, 
                websiteName: website.name, 
                website_url: website.url, 
                item_details: itemDetailResults
            });
        }

        // Trả về kết quả
        return { items: results };
    } catch (error) {
        console.error('Lỗi khi lấy tất cả item:', error);
        return [];
    }
}

// Lấy danh sách item theo loại item
exports.getListItemByItemType = async (itemTypeId) => {
    try {
        // Khai báo mảng kết quả
        const results = [];

        // Lấy danh sách item (cần lấy id, website_id, item_type_id)
        const allItems = await items.findAll({
            where: { item_type_id: itemTypeId },
            attributes: ['id', 'website_id', 'item_type_id']
        });

        // Duyệt danh sách item và lấy danh sách chi tiết item (name, value) của từng item
        for (const item of allItems){
            // Lấy tên loại item
            const itemType = await typeService.getItemType(item.item_type_id);

            // Lấy website
            const website = await typeService.getWebsite(item.website_id);

            const itemDetails = await itemDetailService.getListItemDetailsByItemId(item.id);
            const itemDetailResults = [];

            // Lấy chi tiết item
            for (const itemDetail of itemDetails) {
                // Lưu vào mảng để trả về
                itemDetailResults.push({
                    name: itemDetail.name, 
                    value: itemDetail.value
                });
            }

            // Lưu item vào kết quả trả về
            results.push({
                id: item.id,
                item_type_name: itemType.type, 
                websiteName: website.name, 
                website_url: website.url, 
                item_details: itemDetailResults
            });
        }

        // Trả về kết quả
        return { items: results };
    } catch (error) {
        console.error('Lỗi khi lấy tất cả item:', error);
        return [];
    }
}

// Thêm mới
exports.add = async (itemData) => {
    try {
        return await items.create({
            item_type_id: itemData.item_type_id,
            website_id: itemData.website_id,
            crawl_config_id: itemData.crawl_config_id,
            update_at: Date.now()
        });
    } catch (error) {
        console.error('Lỗi khi thêm mới item:', error);
        return null;
    }
}

// Cập nhật
exports.update = async (data) => {
    try {
        let item = await items.findOne({
            where: {
                id: data.id
            }
        });

        item.item_type_id = data.item_type_id;
        item.website_id = data.website_id;
        item.crawl_config_id = data.crawlconfig_id;
        item.update_at = Date.now();

        await item.save();

        return item;
    } catch (error) {
        console.error('Lỗi khi cập nhật item:', error);
        return null
    }
}
