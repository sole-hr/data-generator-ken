

CREATE TABLE shoe (
    sku SERIAL PRIMARY KEY,
    product_name text,
    price numeric,
    category text,
    thumbnail text
);

CREATE UNIQUE INDEX shoe_pkey ON shoe(sku int4_ops);


CREATE TABLE related_shoe (
    id SERIAL PRIMARY KEY,
    main_sku integer REFERENCES shoe(sku),
    related_shoe integer REFERENCES shoe(sku)
);

