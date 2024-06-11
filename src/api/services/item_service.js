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

// Lấy item theo id
exports.get = async (id) => {
    try {
        return await items.findByPk(id);

    } catch (error) {
        console.error('Lỗi khi lấy item:', error);
        return null;
    }
}

// Lưu: cập nhật nếu đã tồn tại và tạo mới khi chưa tồn tại
exports.save = async (itemData, itemDetailDatas) => {
    try {
        // Khai báo
        let item;
        const itemDetails = [];
        let url;

        // Lấy url
        for (const itemDetail of itemDetailDatas) {
            if (itemDetail.is_primary_key == true) {
                url = itemDetail.value;

                break;
            }
        }

        // Kiểm tra item đã tồn tại
        const itemId =  await getIdItemExist(url);

        // Nếu đã tồn tại, cập nhật
        if (itemId) {
            // Lấy thông tin item
            item = await this.get(itemId);

            // Cập nhật chi tiết item
            const itemDetail = await this.updateItemDetails(itemId, itemDetailDatas);

            // Thêm vào kết quả trả về
            itemDetails.push(itemDetail);
        }
        // Thêm mới
        else {
            // Tạo item
            item = await this.create(itemData);

            // Tạo các chi tiết item
            for (const itemDetail of itemDetailDatas) {
                const newItemDetail = await itemDetailService.add(item.id, itemDetail)
                
                // Thêm vào kết quả trả về
                itemDetails.push(newItemDetail);
            }
        }

        return {item, item_details: itemDetails };
    } catch (error) {
        console.error('Lỗi khi lưu item:', error);
        return null;
    }
}

// Thêm mới
exports.create = async (itemData) => {
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
exports.updateItemDetails = async (itemId, newItemDetails) => {
    try {
        const results = [];

        // Lấy item cần cập nhật
        let item = await items.findByPk(itemId);

        // Lấy danh sách itemDetails của item cần cập nhật
        let itemDetails = await itemDetailService.getListItemDetailsByItemId(itemId);

        // Duyệt danh sách itemDetail, cập nhật từng thuộc tính (trùng tên)
        for (let i = 0; i < newItemDetails.length; i++) {
            // Biến kiểm tra chi tiết item có được lưu hay chưa
            let saved = false;

            // kiểm tra, nếu đã tồn tại thì cập nhật
            for (let j = 0; j < itemDetails.length; j++) {
                if (itemDetails[j].name === newItemDetails[i].name) {
                    const updatedItemDetail = await itemDetailService.update(itemDetails[j].id, newItemDetails[i]);

                    saved = true;

                    // Lưu vào kết quả trả về
                    results.push(updatedItemDetail);

                    break;
                }
            }

            // Thêm mới nếu chưa tồn tại
            if (!saved) {
                const newItemDetail = await itemDetailService.add(item, newItemDetails[i]);

                // Lưu vào kết quả trả về
                results.push(newItemDetail);
            }
        }
        
        // Cập nhật lại thời gian cập nhật (nếu có)
        item.update_at = Date.now();

        await item.save();

        return results;
    } catch (error) {
        console.error('Lỗi khi cập nhật item:', error);
        return null;
    }
}

// Lấy id item đã tồn tại hay chưa
const getIdItemExist = async (url) => {
    try {
        // Lấy danh sách tất cả id trong bảng items
        const itemIds  = await getAllItemId();

        for (const itemId of itemIds) {
            // Lấy chi tiết item chứa url trang chi tiết của từng item
            const itemDetail = await itemDetailService.getItemDetailContainUrl(itemId);

            // Trả về itemId nếu có
            if (itemDetail && itemDetail.value === url) {
                return itemId;
            }
        }

        return null;
    } catch (error) {
        console.error('Lỗi khi kiểm tra item đã tồn tại:', error);
        return null;
    }
};

// Lấy danh sách tất cả id trong bảng items
const getAllItemId = async () => {
    try {
        const itemIds = await items.findAll({
            attributes: ['id']
        });

        return itemIds.map(item => item.id);
    } catch (error) {
        console.error('Lỗi khi Lấy danh sách tất cả id trong bảng items:', error);
        return [];
    }
};
