CREATE TABLE post
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    post TEXT,
    created_on TIMESTAMP
);

ALTER TABLE post
  DROP COLUMN password;

INSERT INTO post(title,post, created_on) VALUES ('Test', 'This is some sample text','2020-03-13 19:10:25-07');
