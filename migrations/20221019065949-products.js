const { Brands, Categories, Products } = require('../models');
const Constants = require('../constants');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    let data = [
      {
        "title": "CPU INTEL Core i5-10400F (6C/12T, 2.90 GHz - 4.30 GHz, 12MB) - 1200",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/e2Gutmov-wHaKEPdK3_5yKtn3_J7E1lJTEqBw-x-wtA1_N1xu_hGtP1dHZlkmczAYMZFi8ltXaLQe3GGNrc=w500-rw"
        ],
        "costPrice": "3839000",
        "salePrice": "3679000",
        "salePercent": 4.2,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.CPU }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.CPU }).then((data) => {
          return Brands.getOneByParams({ title: "Intel" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "INTEL"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Thương hiệu CPU",
            "content": "Intel"
          },
          {
            "title": "Nhu cầu",
            "content": "Gaming, Văn phòng, Đồ họa - Kỹ thuật, Doanh nghiệp, Học sinh - Sinh viên"
          },
          {
            "title": "CPU",
            "content": "Core i5-10400F"
          },
          {
            "title": "Series",
            "content": "Core i5"
          },
          {
            "title": "Socket",
            "content": "1200"
          },
          {
            "title": "Số nhân xử lý",
            "content": "6"
          },
          {
            "title": "Số luồng xử lý",
            "content": "12"
          },
          {
            "title": "Kiến trúc",
            "content": "Comet Lake"
          },
          {
            "title": "Code name",
            "content": "Comet Lake"
          },
          {
            "title": "Thế hệ",
            "content": "Intel Core thế hệ thứ 10"
          },
          {
            "title": "Tốc độ xử lý",
            "content": "2.90 GHz  - 4.30 GHz"
          },
          {
            "title": "Cache",
            "content": "12MB"
          },
          {
            "title": "TDP",
            "content": "65W"
          },
          {
            "title": "Bộ nhớ hỗ trợ",
            "content": "DDR4  Dual channel"
          }
        ]
      },
      {
        "title": "CPU AMD Ryzen 5 5600X (6C/12T, 3.70 GHz - 4.60 GHz, 32MB) - AM4",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/TJ9-IsZFwW8W5y-2jQ0TOE5OokShF0Rol8Xz-sKltLYMTF0d09L-HoLsk7LCn9Ap19NFr9r-Eka2u-vEJE4YqlNhHhmpo9I=w500-rw",
          "https://lh3.googleusercontent.com/CgUJP0Ac3HEcihgzib0kugsdEMOv9V8MD5CPaIuEKlxHnoGbq79BOooR5hmBtbShmalu-Gb4U2hT89Cj8AQ3VTDthd6yveHW=w500-rw"
        ],
        "salePrice": "5790000",
        "costPrice": "8099000",
        "salePercent": 28.5,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.CPU }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.CPU }).then((data) => {
          return Brands.getOneByParams({ title: "AMD" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "AMD"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Thương hiệu CPU",
            "content": "AMD"
          },
          {
            "title": "Nhu cầu",
            "content": "Gaming, Văn phòng, Đồ họa - Kỹ thuật, Doanh nghiệp, Học sinh - Sinh viên"
          },
          {
            "title": "CPU",
            "content": "Ryzen 5 5600X"
          },
          {
            "title": "Series",
            "content": "Ryzen 5"
          },
          {
            "title": "Socket",
            "content": "AM4"
          },
          {
            "title": "Số nhân xử lý",
            "content": "6"
          },
          {
            "title": "Số luồng xử lý",
            "content": "12"
          },
          {
            "title": "Thế hệ",
            "content": "AMD Ryzen thế hệ thứ 5"
          },
          {
            "title": "Tốc độ xử lý",
            "content": "3.70 GHz  - 4.60 GHz"
          },
          {
            "title": "Cache",
            "content": "32MB"
          },
          {
            "title": "TDP",
            "content": "65W"
          },
          {
            "title": "Bộ nhớ hỗ trợ",
            "content": "DDR4"
          }
        ]
      },
      {
        "title": "Mainboard ASUS Rog Strix Z490-F Gaming",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/D00QVXjm-2Q1BuDaGQNB02dHOj5cwmJoGX7coNvduiCIEKZ2Co2DR6DPYVfobA0ZufNGp6-0zVsC-SPihE7O=w500-rw",
          "https://lh3.googleusercontent.com/Cf30Ul1A848dcuB5Kz28TmVU21rdi2pHSFSO4GATnG1jjYS24HnVGBmT3V7oB6o4T1EGRiZaIjj9mkZdrm0=w500-rw",
          "https://lh3.googleusercontent.com/PuOSujvHGnymSakbHvckI-91P0GFctbvYr2hb3IhbQiT2APiomloplHDho6ixA8RYphMT8AjuFw8br7k-UVt=w500-rw",
          "https://lh3.googleusercontent.com/jpga8IQDx-f34oTHN-fD_iPemGIqe0pJEFUe3TW0UGHHUIc1mXRxrGO6yWKGEtt1xXQ0j9YYXacssvJ95Q=w500-rw",
          "https://lh3.googleusercontent.com/FKefiepUx9ddrpF4CZZ-igSkkA-FnIJMAF-3ykaQCyD1U6Uab9bTZX2ZoR0XJvXlWPskJsYsLYaWjbu66CP0=w500-rw"
        ],
        "costPrice": "7200000",
        "salePrice": "6099000",
        "salePercent": 15.3,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MAINBOARD }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MAINBOARD }).then((data) => {
          return Brands.getOneByParams({ title: "Asus" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "ASUS"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Series mainboard",
            "content": "ROG"
          },
          {
            "title": "Chipset",
            "content": "Z490"
          },
          {
            "title": "Socket",
            "content": "1200"
          },
          {
            "title": "Kích thước",
            "content": "ATX"
          },
          {
            "title": "Khe RAM tối đa",
            "content": "4 khe"
          },
          {
            "title": "Kiểu RAM hỗ trợ",
            "content": "DDR4"
          },
          {
            "title": "Hỗ trợ bộ nhớ tối đa",
            "content": "128GB"
          },
          {
            "title": "Bus RAM hỗ trợ",
            "content": "2800MHz, 2400MHz, 2666MHz, 3000MHz, 3200MHz, 3333MHz, 3600MHz, 3733MHz, 3866MHz, 4000MHz"
          },
          {
            "title": "Lưu trữ",
            "content": "1 x M.2 NVMe, 1 x M.2 SATA/NVMe, 6 x SATA 3 6Gb/s"
          },
          {
            "title": "Kiểu khe M.2 hỗ trợ",
            "content": "M.2 SATA/NVMe"
          },
          {
            "title": "Cổng xuất hình",
            "content": "1 x HDMI, 1 x DisplayPort"
          },
          {
            "title": "Khe PCI",
            "content": "- 3 x PCIe 3.0 x16\n- 3 x PCIe 3.0 x1"
          },
          {
            "title": "Multi-GPU",
            "content": "AMD CrossFire, NVIDIA SLI"
          },
          {
            "title": "Đèn LED",
            "content": "RGB"
          },
          {
            "title": "Số cổng USB",
            "content": "- 1 x USB Type-C( tối đa 2)\n- 5 x USB 3.2 ( tối đa 7)\n- 2 x USB 2.0 (tối đa 4)"
          },
          {
            "title": "LAN",
            "content": "1 x LAN 1 Gb/s"
          },
          {
            "title": "Âm thanh",
            "content": "ROG SupremeFX 8-Channel High Definition Audio CODEC S1220A"
          }
        ]
      },
      {
        "title": "Mainboard GIGABYTE B560M Gaming HD",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/f2RtbTp3-Ch2LFoRanlRPTquO32gZ3ODG5zgX73O29zJTOZBntXdHEGPBFTNyYge1i10DuyTxavTp7JHCwl_xKRHgnR48ujoRg=w500-rw",
          "https://lh3.googleusercontent.com/ZCY5Kt4dnrmgPIox9489zlSygUo1-pgjyvHNurxGomtiwvqajJc_xX185Hfh1NZUIJrfzSscT9MYf9XaEin0BQBFUJVAzoE=w500-rw",
          "https://lh3.googleusercontent.com/KYql3SuyTWx8DVLeQqSHen5ucLe6iOOOd-9tP9ZDyt1wahPwlNp772CPr1Fw8gf-xSl1svUWpj_bdV1bK6aDDjcwxOT-dNnU=w500-rw",
          "https://lh3.googleusercontent.com/iNhGcrWm3pzHHnZjyTjv5DfyYnSP_JhVS8OOFEwIW_y_iU-I0SgK0FibQ4HckWL5Isgq0hE3HCy60Ol38H3cuw8aATGw5iYB0w=w500-rw",
          "https://lh3.googleusercontent.com/ljYOYzIyTsXnQxQ6r7wLPFkousvDEJV7QkYvMqf3yQpwA-SS7ON7U4gRW8V7c_KJQa9eBsCZkw3mSSb2CexQapoqXicU0WjF=w500-rw"
        ],
        "salePrice": "2249000",
        "costPrice": "2350000",
        "salePercent": 4.3,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MAINBOARD }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MAINBOARD }).then((data) => {
          return Brands.getOneByParams({ title: "Gigabyte" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "GIGABYTE"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Nhu cầu",
            "content": "Gaming, Đồ họa - Kỹ thuật"
          },
          {
            "title": "Chipset",
            "content": "B560"
          },
          {
            "title": "Socket",
            "content": "1200"
          },
          {
            "title": "Kích thước",
            "content": "Micro-ATX"
          },
          {
            "title": "Khe RAM tối đa",
            "content": "2 khe"
          },
          {
            "title": "Kiểu RAM hỗ trợ",
            "content": "DDR4"
          },
          {
            "title": "Hỗ trợ bộ nhớ tối đa",
            "content": "64GB"
          },
          {
            "title": "Bus RAM hỗ trợ",
            "content": "2133MHz, 2400MHz, 2666MHz, 2933MHz"
          },
          {
            "title": "Lưu trữ",
            "content": "4 x SATA 3 6Gb/s, 1 x M.2 SATA/NVMe, 1 x M.2 NVMe, Hỗ trợ Intel Optane"
          },
          {
            "title": "Kiểu khe M.2 hỗ trợ",
            "content": "M.2 SATA/NVMe"
          },
          {
            "title": "Cổng xuất hình",
            "content": "1 x HDMI, 1 x VGA/D-sub"
          },
          {
            "title": "Khe PCI",
            "content": "- 1 x PCI Express x16\n- 1 x PCI Express x1"
          },
          {
            "title": "Số cổng USB",
            "content": "- 4 x USB 3.2 (tối đa 6)\n- 2 x USB 2.0 (tối đa 8)"
          },
          {
            "title": "LAN",
            "content": "1 x LAN 1 Gb/s"
          },
          {
            "title": "Âm thanh",
            "content": "Realtek® Audio CODEC\nHigh Definition Audio\n2/4/5.1/7.1-channel"
          }
        ]
      },
      {
        "title": "RAM desktop G.SKILL Trident Z F4-3200C16D-16GTZB (2x8GB) DDR4 3200MHz",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/259O4fEHW3h1FQH3w4SEkRYKZn87-8uRtaQufL-9U50qsrZzY-x-neqmSoAECj4ofYPFDcOYJDBy9tEwO4Y=w500-rw",
          "https://lh3.googleusercontent.com/Rk-MwGmQTdAr_4AhKSO8PYw1gCzqTZTDuThLssZlXhwU47sFOiCLAAtOLARRGf_LD2TKJDNkgHIDYUt1kQ=w500-rw",
          "https://lh3.googleusercontent.com/YorrpMmjkWvschQfaPxKnspe3smIGhg2ZrqYMw1V-YCe64zc8fAAvyOIVcOfG709OKqsb1QuM3SzgTvw7o0=w500-rw",
          "https://lh3.googleusercontent.com/8pIq-wpklYfEpj26qLH9q51oCO9Xaswj_L_JJKfDPfZmRCuJxYUJRDRjUoAZQDW3Ww9EjBbDDSSzmBsoYw=w500-rw"
        ],
        "salePrice": "2219000",
        "costPrice": "3330000",
        "salePercent": 33.4,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.RAM }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.RAM }).then((data) => {
          return Brands.getOneByParams({ title: "G.Skill" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "G.SKILL"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Part-number",
            "content": "F4-3200C16D-16GTZB"
          },
          {
            "title": "Màu sắc",
            "content": "Đen, Đỏ"
          },
          {
            "title": "Đèn LED",
            "content": "Không LED"
          },
          {
            "title": "Nhu cầu",
            "content": "Gaming, Đồ họa - Kỹ thuật, Doanh nghiệp"
          },
          {
            "title": "Dung lượng",
            "content": "2 x 8GB"
          },
          {
            "title": "Thế hệ",
            "content": "DDR4"
          },
          {
            "title": "Bus",
            "content": "3200MHz"
          },
          {
            "title": "Timing",
            "content": "16"
          }
        ]
      },
      {
        "title": "Ổ cứng HDD Western Digital Blue 1TB 3.5\" SATA 3 - WD10EZEX",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/3iFUySBKyqZiCbZZ71TmzdS8qFGG1mQe3HJU7Xzxqnlkp4TTZZOINRiQ21F6mD4aPMAF3miZFqhTJQOeBnc5lxJMYhH8sZCb=w500-rw",
          "https://lh3.googleusercontent.com/sL1pRFWTTtjiwqxQFMe8rcfXKcIBJFnGrGxQDDS6wa4ZMOt7l7OIk19CwqzQWYleQJ7_MGzxTFVhoLmUGffGeOOr1t8KntFp-w=w500-rw"
        ],
        "salePrice": "950000",
        "costPrice": "950000",
        "salePercent": 12.8,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.HDD }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.HDD }).then((data) => {
          return Brands.getOneByParams({ title: "WD" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "WD"
          },
          {
            "title": "Bảo hành",
            "content": "24"
          },
          {
            "title": "Kiểu ổ cứng",
            "content": "HDD"
          },
          {
            "title": "Màu sắc của ổ cứng",
            "content": "Xanh"
          },
          {
            "title": "Dung lượng",
            "content": "1TB"
          },
          {
            "title": "Kết nối",
            "content": "SATA 3"
          },
          {
            "title": "Bộ nhớ NAND",
            "content": "Không"
          },
          {
            "title": "Kích thước",
            "content": "3.5\""
          },
          {
            "title": "Tốc độ vòng quay",
            "content": "7200RPM"
          }
        ]
      },
      {
        "title": "Ổ cứng SSD Samsung 970 Evo Plus 1TB M.2 NVMe - MZ-V7S1T0BW",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/QvkjL4K3rTX5KnVTGXaeELB3QdcIigHBpPkWl4gKn072fU4zJf82mPVrJS5Wm9Wgz9CwrlPLb8Bo7cR8aLo=w500-rw",
          "https://lh3.googleusercontent.com/6b6ty_hpsl9W2_WK6s8L3oQ-cLKMb_sf014lT4B8D4XktQxT-Szfwo7UHnUmDLy5TfByZLXt-purbdV84HM=w500-rw",
          "https://lh3.googleusercontent.com/rD1MKVvE7QC6LKQZ_z14S1K307gAN6fkaCvFxH2HckTce9m2UQ1dRbWI3ESR44hZbCaz_tuksKuugj7CWqBv=w500-rw"
        ],
        "salePrice": "3869000",
        "costPrice": "4099000",
        "salePercent": 5.6,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.SSD }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.SSD }).then((data) => {
          return Brands.getOneByParams({ title: "Samsung" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "SAMSUNG"
          },
          {
            "title": "Bảo hành",
            "content": "60"
          },
          {
            "title": "Mô tả bảo hành",
            "content": "Bảo hành theo thời gian hoặc theo 600 TBW ( tùy thuộc yếu tố nào đến trước)"
          },
          {
            "title": "Kiểu ổ cứng",
            "content": "SSD"
          },
          {
            "title": "Màu sắc của ổ cứng",
            "content": "Đen"
          },
          {
            "title": "Dung lượng",
            "content": "1TB"
          },
          {
            "title": "Kết nối",
            "content": "M.2 NVMe"
          },
          {
            "title": "Bộ nhớ NAND",
            "content": "V-NAND"
          },
          {
            "title": "Kích thước",
            "content": "M.2"
          },
          {
            "title": "Tốc độ đọc",
            "content": "3500MB/s"
          },
          {
            "title": "Tốc độ ghi",
            "content": "3300MB/s"
          }
        ]
      },
      {
        "title": "Card màn hình GIGABYTE GeForce RTX 3070 EAGLE OC 8G (rev. 2.0) 8GB GDDR6 N3070EAGLE OC-8GD V2",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/wT__0-kRc5Xa_-D4QYmIVh_C734TQyvGZ77_6eI-N9L8UzOZc_mnrr8iuEVYQX8GQzkcv4kSVYpElDY_iMZ1Zq2gL9AD1i4=w500-rw",
          "https://lh3.googleusercontent.com/XIwUsQWv7Rfm1QFwhxkqHZrPXOLGfMOHo24j3rOMkZwNyKdgOX8M_k1LFGXq9VJll6C6L-u7aa9FLSXD9KddbP4zDmDSLo-zKg=w500-rw",
          "https://lh3.googleusercontent.com/PJz0L-160K3cbwUlt8-QGsPED2j8zhLqJoDIp7YuZrtD_3p9D_ZFfxmX331nMFehOSozaKS9T58DStEZBrJO3Efn0rVDR04=w500-rw",
          "https://lh3.googleusercontent.com/GbBNho-Z52II6959Y4pvvq1Xd5QbznEcVw_HQQXi1EfGzKsNBLmPiiBvZ8zW81BywokxTxFdeaamLlMSc8dt10wibkQP-ySUxw=w500-rw",
          "https://lh3.googleusercontent.com/ZXR-_k4Fmb5E-LC9XoReLvHBOIyVmihnu0Fum1-ZNsSFw5_1SbxnPJkXokeKA3L4YYizba7LEY6LpsuTABOtDvaGbhLbCLil=w500-rw",
          "https://lh3.googleusercontent.com/BzNgdiVT4KDu_88Z0V1HgVb5NZ11-kzqUOkBItEImmhgI8gHIwUTW1Yq2b-fyParqf0VC3TE4nBcmZwkZJzlmcRWy-mBhu4A=w1000-rw",
          "https://lh3.googleusercontent.com/H2NW3OUcQPQXK32m24O75WPDezintmhmukTK2ffKk_kvUNYgcaLxI-clYV0Yan1B9gFaub3MLY_XBXLi8Y8bmqZI36b3P75Gxw=w1000-rw",
          "https://lh3.googleusercontent.com/-EAEEl_Da4_W1olNqIrXtukWmLJa2T5PimpdSdfz6ovQw-AQYjG2v13IbJVqiKCufhU7WiwOsQgvo9_zAs0ohCsfkmRwKKE=w1000-rw"
        ],
        "salePrice": "14990000",
        "costPrice": "20489000",
        "salePercent": 26.8,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.VGA }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.VGA }).then((data) => {
          return Brands.getOneByParams({ title: "Gigabyte" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "GIGABYTE"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Nhà sản xuất chipset",
            "content": "NVIDIA"
          },
          {
            "title": "Series chip đồ họa",
            "content": "GeForce RTX 30 series"
          },
          {
            "title": "Tên",
            "content": "GeForce RTX 3070 EAGLE OC 8G (rev. 2.0)"
          },
          {
            "title": "Part-number",
            "content": "N3070EAGLE OC-8GD V2"
          },
          {
            "title": "GPU",
            "content": "GeForce RTX 3070"
          },
          {
            "title": "Bộ nhớ",
            "content": "8GB  GDDR6 ( 14000 MHz / 256-bit )"
          },
          {
            "title": "GPU clock",
            "content": "1770 MHz (Reference Card: 1725 MHz)"
          },
          {
            "title": "Giao tiếp PCI",
            "content": "PCI-E 4.0 x16"
          },
          {
            "title": "Số lượng đơn vị xử lý",
            "content": "5888  CUDA cores"
          },
          {
            "title": "Cổng kết nối",
            "content": "2 x HDMI 2.1 , 2 x DisplayPort 1.4a"
          },
          {
            "title": "Tản nhiệt",
            "content": "Tản nhiệt 3 quạt"
          },
          {
            "title": "Đèn LED",
            "content": "RGB"
          },
          {
            "title": "Đầu cấp nguồn",
            "content": "1 x 6-pin + 1 x 8-pin"
          },
          {
            "title": "Nguồn đề xuất",
            "content": "650W"
          },
          {
            "title": "Kích thước",
            "content": "28.2 x 11.5 x 4.1 cm"
          }
        ]
      },
      {
        "title": "Nguồn máy tính GIGABYTE P650B - 650W - 80 Plus Bronze",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/gpdzLo5FHwLifpdFi6jaUNevW4SGxUCs5pW0xXMbxDo7amMfgKnzUbb21BVL_GG3_WlfU1qlNNJABtA-A-k2=w500-rw",
          "https://lh3.googleusercontent.com/RzNlcMVxvGZmljwayy4kUOlNGB9lKlE8HPp7LLjzE2TZiuTOaHK-0LXv2GeqCTXbtLwmIb_hN9Iwmytcd5g=w500-rw",
          "https://lh3.googleusercontent.com/0ZhwK-0cc9-Mp3imiUPuLtH-Ar6t_agBdx22n1GjIqkwlrbFyma-sRacBDjKA1l3OMDqOGjLbcd5X5gvVTk=w500-rw",
          "https://lh3.googleusercontent.com/rVkl8BRhAiWwHM18nB1U3EVBULu8o5yBOxvGyKaHZurcoC9_E6H7DT4NxIXZclopmcOZj6EWtIjYD_7ETU0=w500-rw",
          "https://lh3.googleusercontent.com/367OSxXDBkfl4y3fStlPaYAziyhA-L233fzb-3coqCdnHMm4RimL65M9zJSLvr9-1NwU1HhXlOiKicEIcl0=w500-rw",
          "https://lh3.googleusercontent.com/10SIGSqFQMfTsIxp-SBPpCk9cuNb09-fKt09ZbFKkBHneinkn7yV6rsEnKEtjNCw3u9IJSd8-Kpjmf1Ly_9a=w500-rw"
        ],
        "salePrice": "1339000",
        "costPrice": "1459000",
        "salePercent": 8.2,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.POWER }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.POWER }).then((data) => {
          return Brands.getOneByParams({ title: "Gigabyte" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "GIGABYTE"
          },
          {
            "title": "Bảo hành",
            "content": "36"
          },
          {
            "title": "Tên",
            "content": "GP-P650B"
          },
          {
            "title": "Công suất tối đa",
            "content": "650W"
          },
          {
            "title": "Hiệu suất",
            "content": "80 Plus Bronze"
          },
          {
            "title": "Cáp rời",
            "content": "không hỗ trợ"
          },
          {
            "title": "Chuẩn kích thước",
            "content": "ATX"
          },
          {
            "title": "Số cổng cắm",
            "content": "1 x 8-pin (4+4) EPS, 6 x SATA, 3 x Peripheral (4-pin), 1 x FDD (4-pin), 4 x 8-pin (6+2) PCIE, 1 x 24-pin Main"
          },
          {
            "title": "Quạt làm mát",
            "content": "1 x 120 mm"
          },
          {
            "title": "Nguồn đầu vào",
            "content": "100 - 240VAC"
          },
          {
            "title": "PFC",
            "content": "Active"
          }
        ]
      },
      {
        "title": "Case máy tính Sama Combat",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/tYFZtdNp7XebB7DN2cflNxUQ9k_hVfGZiv4ayBTnAtXz20QZFxZ_Ulmpc4dGPM_HbFUfYLaBfh0s1I8gFpM=w500-rw",
          "https://lh3.googleusercontent.com/39tjw2UrIsk5HLqsI3j3wEIZ3YguFVKH1XWg4EyV_KtzAxiZQUj0iCVTJUCI1MM0N5sbacEFtNXlmypE3ZA=w500-rw",
          "https://lh3.googleusercontent.com/j5cgQSa7tfm4Jom0mtP5fCNhib5MCZET5M-SBr1xnJr8OWD-zA9OoPTdZ8sGRwSayw7rw-GqUZ0mKCGQe-ZI=w500-rw",
          "https://lh3.googleusercontent.com/Nr0GSTVIzsQUl--uruskQ-4NveVELEtemTr6pxaginBSWLx-H0ba1EvagOp_Bko8qVqylnMh0Pw7I1490Iw=w500-rw",
          "https://lh3.googleusercontent.com/eKTo_eKx6b98pkywzvF0aaf_d6RC_LPu68rxPAp2GYUkPJ-Ae6ymBa7wI6rd7UuAMVVOC7_mjuuUOtn9VnA=w500-rw"
        ],
        "salePrice": "890000",
        "costPrice": "990000",
        "salePercent": 10.1,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.CASE }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.CASE }).then((data) => {
          return Brands.getOneByParams({ title: "Xigmatek" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "SAMA"
          },
          {
            "title": "Bảo hành",
            "content": "0"
          },
          {
            "title": "Tên của case",
            "content": "Combat"
          },
          {
            "title": "Mô tả bảo hành",
            "content": "USB/ AUDIO/ NÚT POWER/ RESET/ FAN (Nếu có)/ DÂY RISER : Bảo hành 12 tháng"
          },
          {
            "title": "Màu sắc",
            "content": "Đen"
          },
          {
            "title": "Chất liệu",
            "content": "Thép"
          },
          {
            "title": "Chất liệu nắp hông",
            "content": "Kính cường lực"
          },
          {
            "title": "Kích thước",
            "content": "44.0 x 21.2 x 43.0 cm"
          },
          {
            "title": "Loại case",
            "content": "Mid Tower"
          },
          {
            "title": "Hỗ trợ mainboard",
            "content": "Micro-ATX, ATX"
          },
          {
            "title": "Số lượng ổ đĩa hỗ trợ",
            "content": "3 x 3.5\" , 2 x 2.5\""
          },
          {
            "title": "Cổng kết nối",
            "content": "2 x USB 2.0 , 1 x USB 3.0"
          },
          {
            "title": "Loại quạt hỗ trợ mặt trước",
            "content": "3 x 120 mm"
          },
          {
            "title": "Loại quạt hỗ trợ phía trên",
            "content": "1 x 120 mm"
          },
          {
            "title": "Số lượng quạt tặng kèm",
            "content": "4 x 120 mm LED"
          }
        ]
      },
      {
        "title": "Quạt CORSAIR ML120 RGB",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/c8DqLUhuU39ArkHUeFsc4qf5eM_hYhAYGrZa4YArILzCoNR9Ae8xiiHr7AWmmAiAmEopi8ShnThLCzMmMzo=w500-rw",
          "https://lh3.googleusercontent.com/X5XSN1CQk58o0b5CIp-A5NwfjtjD1Ilph8QHxTgHIlfzzVPfWg2yOGDhtLQSguF6I5xJGQ-_LEQYPtsIs08=w500-rw",
          "https://lh3.googleusercontent.com/pWsrdCzr0pDb1_A1wWn8UgE7CXNyW_hrQ1M50DaYlHC4TtLdeojqkbIGUCLGy7Wg0METOwXBQWSZboIqXuc=w500-rw",
          "https://lh3.googleusercontent.com/hYvfopG9bbfCXcSJw15au51zvkgzN0D1wJtLmMyJUf_56YLWAZqQKHi2VLGDQOY-sKkt_i57V_nQPmnItA=w500-rw",
          "https://lh3.googleusercontent.com/SnkvufG1w27SXmpzYyo4WD7n6PCLCujDeeSZNBS3HVwtdTEUcCY-RGpHnSB0WTUPcjXwCUhkf6cmVyN9a2w=w500-rw"
        ],
        "salePrice": "2619000",
        "costPrice": "2800000",
        "salePercent": 6.5,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.COOLER }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.COOLER }).then((data) => {
          return Brands.getOneByParams({ title: "Cooler Master" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "CORSAIR"
          },
          {
            "title": "Bảo hành",
            "content": "24"
          },
          {
            "title": "Dạng tản nhiệt",
            "content": "Quạt"
          },
          {
            "title": "Kích thước quạt (mm)",
            "content": "3 x 120 mm"
          },
          {
            "title": "Đèn LED",
            "content": "RGB"
          },
          {
            "title": "Màu sắc",
            "content": "Đen"
          },
          {
            "title": "Số vòng quay của quạt (RPM)",
            "content": "1600RPM"
          },
          {
            "title": "Lưu lượng không khí (CFM)",
            "content": "47.3 CFM"
          },
          {
            "title": "Độ ồn (dBA)",
            "content": "25 dBA"
          }
        ]
      },
      {
        "title": "Màn hình LCD ASUS TUF GAMING VG27VQ (1920 x 1080/VA/165Hz/1 ms/FreeSync)",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/ZAjqnXLB8nnq53qQ9d3Pmta8V0qpFQXzDv-n5zOpUBCRyNC5B7Sv-lZh7Sk0VqZHYmXra_f6iRvJkKm7Kws=w500-rw",
          "https://lh3.googleusercontent.com/WfwFXsRY71ARqhx8JVq_DEbruWi_s8MT01oa3vj68V61mggY9AstCYWl9LqQH2nD6ColwRIL41wa6ju3Du6V=w500-rw",
          "https://lh3.googleusercontent.com/JG-NMCL6d455vJMJyillmgS7yS8zvFQNHzH-GGndCGzQxo0zxXSGQ-FGG8URiENezQyGuwfHGumFDBKEmi0=w500-rw",
          "https://lh3.googleusercontent.com/Fapz-OrmqcUSWePg9xr5K_o7F6LFihhukUJ6CbSHJceJkHnEBohFuatE4WQU6ysgKOKlNimethl1HHR5QlN-=w500-rw"
        ],
        "salePrice": "5690000",
        "costPrice": "6910000",
        "salePercent": 17.7,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MONITOR }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MONITOR }).then((data) => {
          return Brands.getOneByParams({ title: "Asus" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "CORSAIR"
          },
          {
            "title": "Bảo hành",
            "content": "24"
          },
          {
            "title": "Dạng tản nhiệt",
            "content": "Quạt"
          },
          {
            "title": "Kích thước quạt (mm)",
            "content": "3 x 120 mm"
          },
          {
            "title": "Đèn LED",
            "content": "RGB"
          },
          {
            "title": "Màu sắc",
            "content": "Đen"
          },
          {
            "title": "Số vòng quay của quạt (RPM)",
            "content": "1600RPM"
          },
          {
            "title": "Lưu lượng không khí (CFM)",
            "content": "47.3 CFM"
          },
          {
            "title": "Độ ồn (dBA)",
            "content": "25 dBA"
          }
        ]
      },
      {
        "title": "Bàn phím cơ gaming Logitech G512 GX (Linear) (920-009372)",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/fwTDZjxhc2VsgLoI-WatffSRROlDwM7nCfoeHBT8VAbfOX0x2Od-CB8jerLAv7Da_mQtK5QrYEBEZ9v4fw=w500-rw",
          "https://lh3.googleusercontent.com/tSk2XMhrbyyDVg8L6WdTidarjNh8j3zYOdbc6qUe5AwyYk9ABg-jquodfzD1uMeFXkY4Gv0eNsUAmqK1vQbv=w500-rw",
          "https://lh3.googleusercontent.com/TjgjYCWWKwInHJR9vTpGVULWEht3XcHnb7jLsHUAwzEsZO6uQ5-yCrJq_-3i9eqeoTsPjIWf0noM4FLmLCTZ=w500-rw",
          "https://lh3.googleusercontent.com/tPqXMzEcxg5NsAki8_eLyldhr1FFd77XdRZs3ndP714mrCNRfNrmfKs9k2-7SW6evmLU6yLpyIF2XcgLFo0=w500-rw"
        ],
        "salePrice": "1999000",
        "costPrice": "2999000",
        "salePercent": 33.3,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.KEYBOARD }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.KEYBOARD }).then((data) => {
          return Brands.getOneByParams({ title: "Logitech" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "LOGITECH"
          },
          {
            "title": "Bảo hành",
            "content": "24"
          },
          {
            "title": "Tên",
            "content": "Bàn phím cơ gaming Logitech G512 GX (Linear)"
          },
          {
            "title": "Màu sắc",
            "content": "Đen"
          },
          {
            "title": "Kết nối",
            "content": "Bàn phím có dây"
          },
          {
            "title": "Kết nối",
            "content": "USB 2.0"
          },
          {
            "title": "Kích thước",
            "content": "Full size"
          },
          {
            "title": "Loại bàn phím",
            "content": "Bàn phím cơ"
          },
          {
            "title": "Đèn",
            "content": "RGB"
          },
          {
            "title": "Kiểu switch",
            "content": "GX Linear"
          },
          {
            "title": "Phím chức năng",
            "content": "Có"
          }
        ]
      },
      {
        "title": "Chuột gaming Logitech G402 (Đen)",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/I6bdXxwM3NTqCFC01E5qlEv6reweFdmKi3dyC0NxRLp8kHg07rvctvXLWZcO5cKgQ2EBeOLxi8nrv-K5WbYEpLibbz4r5TYb=w500-rw",
          "https://lh3.googleusercontent.com/kavbel4yT1-pvY_klYh_rEKYprbnW2XvxwUgSO3JyVl3w_TQnYC8BRWlGRK-id8XJOmGuXjU4aq4-BWLeeWEGdAHBKseSfEZvA=w500-rw",
          "https://lh3.googleusercontent.com/YtO1cT8NPgnkSFdiy5jaBslTuaoj2hOJf3grCMQurbc8boIyKeqC0iGEWHWvqe4VQBIiYOvbSrb3sinpwgzbh5OeSG38mB0=w500-rw",
          "https://lh3.googleusercontent.com/-WTMcHOMwIccdZGS-j96UFn3t-b5fd3rKsM4TLx1K-SfM0dHIrWI2c7-_kwtWVkQdIbwQbQ7kZB5CzrYb7syqukNM5PmxBsn=w500-rw"
        ],
        "salePrice": "659000",
        "costPrice": "820000",
        "salePercent": 19.6,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MOUSE }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.MOUSE }).then((data) => {
          return Brands.getOneByParams({ title: "Logitech" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "LOGITECH"
          },
          {
            "title": "Bảo hành",
            "content": "24"
          },
          {
            "title": "Nhu cầu",
            "content": "Gaming"
          },
          {
            "title": "Kiểu kết nối",
            "content": "Chuột có dây"
          },
          {
            "title": "Đèn LED",
            "content": "Xanh"
          },
          {
            "title": "Màu sắc",
            "content": "Đen"
          },
          {
            "title": "Kết nối",
            "content": "USB 2.0"
          },
          {
            "title": "Độ phân giải (CPI/DPI)",
            "content": "4000DPI"
          },
          {
            "title": "Dạng cảm biến",
            "content": "Optical"
          },
          {
            "title": "Thời gian phản hồi",
            "content": "1 ms"
          },
          {
            "title": "Số nút bấm",
            "content": "8"
          }
        ]
      },
      {
        "title": "Tai nghe Razer BlackShark V2 X (Đen)",
        "description": [
          "Cam kết hàng chính hãng 100%",
          "Bảo hành chính hãng 12 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày."
        ],
        "images": [
          "https://lh3.googleusercontent.com/OWpSUnL3jrH2vscNVk6HKcr2R1IMSm3TvaOvgix5rQdPJbWFY8GDrXsjZHmYfjkOCVG4cByDWbPRyLIteVjNVhxUVBbg9ZpS4g=w500-rw",
          "https://lh3.googleusercontent.com/5VE7d1tE-5iHGuOPRNNKrgszvYu4Pq2n8pjr-zxnvk1QxAMJf5m4T1ATvwCLUK34Pvw6FYv8Ab0RZMv5h_yJnjdGQLmVJuL17A=w500-rw",
          "https://lh3.googleusercontent.com/_CHfrYint2lwufOjEAN1iKaihQwSgAqR1E3XY5HA6fL04H4elK5w_dJt_XlMNU1gVqofhab_ZTkV5Pn8fKZK68sRwO6rGZh8=w500-rw",
          "https://lh3.googleusercontent.com/ej2WYtrrhB3zDwi27Gl_v-2R8f50ybmtH4gqGbAehY75uXpP_w6vopmRFBURMJM3Bmj-xh2zv36IDQTUDxT4AZ03m5Fdet0=w500-rw"
        ],
        "salePrice": "1489000",
        "costPrice": "1690000",
        "salePercent": 11.9,
        "category": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.HEADPHONE }).then((data) => {
          return data._id;
        }),
        "brand": await Categories.getOneByParams({ type: Constants.CATEGORY_TYPE.HEADPHONE }).then((data) => {
          return Brands.getOneByParams({ title: "Corsair" }).then((data) => {
            return data._id;
          })
        }),
        "specifications": [
          {
            "title": "Thương hiệu",
            "content": "RAZER"
          },
          {
            "title": "Bảo hành",
            "content": "24"
          },
          {
            "title": "Tên",
            "content": "BlackShark V2 X"
          },
          {
            "title": "Mô tả bảo hành",
            "content": "Áp dụng bảo hành đối với sản phẩm còn hộp và phụ kiện"
          },
          {
            "title": "Kiểu",
            "content": "Over-ear"
          },
          {
            "title": "Kết nối",
            "content": "3.5 mm"
          },
          {
            "title": "Màu sắc",
            "content": "Đen"
          },
          {
            "title": "Kiểu kết nối",
            "content": "Tai nghe có dây"
          },
          {
            "title": "Đèn LED",
            "content": "Không đèn"
          },
          {
            "title": "Microphone",
            "content": "Có"
          },
          {
            "title": "Kích thước driver",
            "content": "50 mm"
          },
          {
            "title": "Trở kháng",
            "content": "32 ohms"
          },
          {
            "title": "Tần số phản hồi",
            "content": "12 Hz – 28 kHz"
          },
          {
            "title": "Độ nhạy",
            "content": "100 dBSPL/mW, 1 kHz"
          },
          {
            "title": "Khối lượng",
            "content": "240"
          }
        ]
      }
    ]
    
    await Products.insertMany(data);
    await Products.insertMany(data);
    await Products.insertMany(data);
  },

  async down(db, client) {   // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await Products.deleteMany({});
      })
    } finally {
      session.endSession();
    }
  }
};
