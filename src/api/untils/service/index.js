const fs = require('fs');


async function removeToken(userId, deviceId) {
  fs.readFile('data.json', 'utf8', (error, data) => {
    if (error) return

    data = JSON.parse(data)
    delete data[userId][deviceId]

    var jsonString = JSON.stringify(data, null, 2);

    fs.writeFile('./data.json', jsonString, (error) => {
      if (error) {
        console.error('Lỗi khi ghi dữ liệu vào tệp JSON:', err);
      } else {
        console.log('Đã xó');
      }
    })
  })
}

function getDate() {
  const currentDate = new Date();

  // Lấy thông tin ngày, tháng và năm
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();

  const housrs = currentDate.getHours();
  const minuite = currentDate.getMinutes(); 
  const second = currentDate.getSeconds();

  // In ra ngày hiện tại
  return `${year}-${month}-${day} ${housrs}:${minuite}:${second}`
}

async function saveToken(jsonData) {
  fs.readFile('data.json', 'utf8', (error, data) => {
    if (error) return

    data = JSON.parse(data)

    console.log(jsonData.deviceId)

    data[jsonData.id] ??= {}
    data[jsonData.id][jsonData.deviceId] = {
      token: jsonData.token,
      deviceModel: jsonData.deviceModel,
      androidVersion: jsonData.androidVersion,
      isAdmin: jsonData.isAdmin,
      loginTime: getDate()
    }

    var jsonString = JSON.stringify(data, null, 2);

    fs.writeFile('./data.json', jsonString, (error) => {
      if (error) {
        console.error('Lỗi khi ghi dữ liệu vào tệp JSON:', err);
      } else {
        console.log('Đã lưu ');
        // console.log(data)
      }
    })
  })
}

async function checkToken(callback) {
  fs.readFile('data.json', 'utf8', (error, data) => {
    callback(error, JSON.parse(data))
  })
}


function chuyenDoiChuoiThanhSoNguyen(chuoiTien) {
  // Loại bỏ ký tự "₫" và dấu phẩy, giữ lại chỉ số
  const so = parseInt(chuoiTien.replace(/[₫,\.]/g, ''), 10);

  return so;
}

module.exports = { saveToken, checkToken, removeToken }