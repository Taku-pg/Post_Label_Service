insert into type(type_name, is_tax_free)
values
    ('Food', true),
    ('Alcohol', false),
    ('Cigarette', false),
    ('Book', true),
    ('Toy', true),
    ('Clothes', true),
    ('Shoes', true),
    ('Jewelly', false),
    ('Electronic device', true),
    ('Tableware', true),
    ('Furniture', true),
    ('Other', true);

insert into user_ (first_name, last_name, email, phone, company, street, city, country, zip)
values
    ('Peggi', 'Abbe', 'pabbe0@princeton.edu', '6158330665', 'Browsedrive', '741 Waywood Place', 'Fengjia', null, '12345'),
    ('Danya', 'Gotliffe', null,null, 'Linklinks', '8 Sheridan Crossing', 'Fuwah', null, '23456'),
    ('Belia', 'Bendall', 'bbendall2@marketwatch.com', '7911091645', null, '670 Meadow Vale Trail', 'Warszawa', null, '22011'),
    ('Kirsten', 'Grut', null, null, null, '97 Independence Park', 'Tingzhou', 'China', '29103');


insert into delivery (tracking_id, registered_date, delivery_option, return_method, sender_id, receiver_id)
values
    ('20260512134522111_1-ar2', '2026-05-12', 'STANDARD', 'SAME', 1, 2),
    ('20260605113453012_dG2$6', '2026-06-05', 'EXPRESS', 'CHEAP', 3, 4);

insert into domestic_delivery(id,content_type) values(1, 'Digital devices');
insert into international_delivery(id,purpose) values(2, 'GIFT');

insert into delivery_status (status, start_date, end_date, delivery_id)
values
    ('UNPAID', '2026-05-12', '2026-05-15', 1),
    ('PENDING', '2026-05-15', '2026-05-16', 1),
    ('DELIVERING', '2026-05-16', '2026-05-16', 1),
    ('DELIVERED', '2026-05-16', '2026-05-16', 1),
    ('UNPAID', '2026-06-05', '2026-06-08', 2),
    ('PENDING', '2026-06-08', null, 2);

insert into item (product_name, price, amount, weight, type_id, delivery_id)
values
('Olive Oil', 7.99, 1, 0.997, 1, 1),
('Smart Thermostat', 149.99, 1, 0.537, 9, 1),
('Compact Digital Camera', 249.99, 1, 1.05, 9, 1),
('Smart Wi-Fi Light Bulbs', 19.99, 2, 0.032, 9, 1),
('Garlic Butter Sauce', 3.59, 5, 0.140, 1, 2),
('Couscous', 2.49, 10, 0.01, 1, 2),
('Compost Bin', 29.99, 1, 0.500, 12, 2),
('Classic Watch', 99.99, 1, 0.045, 8, 2);
