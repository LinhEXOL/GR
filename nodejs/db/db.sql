USE restaurant;




-- Chèn dữ liệu cho PROVINCE
INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO1', 'Ha Noi', 'Hà Nội', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO2', 'Ho Chi Minh', 'Hồ Chí Minh', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO3', 'Da Nang', 'Đà Nẵng', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO4', 'Can Tho', 'Cần Thơ', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO5', 'Binh Duong', 'Bình Dương', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO6', 'Dong Nai', 'Đồng Nai', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO7', 'Quang Ninh', 'Quảng Ninh', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO8', 'Hue', 'Thừa Thiên Huế', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO9', 'Quang Binh', 'Quảng Bình', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('PROVINCE', 'PRO10', 'Khanh Hoa', 'Khánh Hòa', NOW(), NOW());





-- Chèn dữ liệu cho ROLE
INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('ROLE', 'R1', 'Admin', 'Quản trị viên', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('ROLE', 'R2', 'Manager', 'Quản lí', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('ROLE', 'R3', 'Customer', 'Khách hàng', NOW(), NOW());

-- Chèn dữ liệu cho STATUS
INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('STATUS', 'S1', 'New', 'Lịch đặt mới', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('STATUS', 'S2', 'Confirmed', 'Đã xác nhận', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('STATUS', 'S3', 'Done', 'Đã ăn xong', NOW(), NOW());

INSERT INTO ALLCODES (ALLCODES.type, ALLCODES.keyMap, ALLCODES.valueEn, ALLCODES.valueVi, ALLCODES.createdAt, ALLCODES.updatedAt) 
VALUES ('STATUS', 'S4', 'Cancel', 'Đã hủy', NOW(), NOW());