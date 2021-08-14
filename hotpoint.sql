DROP TABLE FILE;/*SkipError*/
CREATE TABLE FILE(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'ID' ,
    name VARCHAR(128)    COMMENT '名称' ,
    des VARCHAR(1024)    COMMENT '简介' ,
    type INT    COMMENT '类型' ,
    subjectId INT    COMMENT '科目' ,
    catalogueId BIGINT    COMMENT '目录' ,
    content TEXT    COMMENT '内容' ,
    render TEXT    COMMENT '渲染内容' ,
    status VARCHAR(32)    COMMENT '状态' ,
    created_time DATE    COMMENT '创建时间' ,
    PRIMARY KEY (id)
) COMMENT = '文件 ';

ALTER TABLE FILE COMMENT '文件';
DROP TABLE SUBJECT;/*SkipError*/
CREATE TABLE SUBJECT(
    id BIGINT NOT NULL   COMMENT '科目ID' ,
    name VARCHAR(32)    COMMENT '科目名称' ,
    PRIMARY KEY (id)
) COMMENT = '科目 ';

ALTER TABLE SUBJECT COMMENT '科目';
DROP TABLE USER;/*SkipError*/
CREATE TABLE USER(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '用户ID' ,
    name VARCHAR(32)    COMMENT '用户名' ,
    email VARCHAR(128)    COMMENT '邮箱' ,
    password VARCHAR(32)    COMMENT '密码' ,
    PRIMARY KEY (id)
) COMMENT = '用户 ';

ALTER TABLE USER COMMENT '用户';
DROP TABLE ANIMATION;/*SkipError*/
CREATE TABLE ANIMATION(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'ID' ,
    name VARCHAR(32)    COMMENT '名称' ,
    des VARCHAR(128)    COMMENT '描述' ,
    imgUrl VARCHAR(128)    COMMENT '图片地址' ,
    codeUrl VARCHAR(128)    COMMENT '代码地址' ,
    PRIMARY KEY (id)
) COMMENT = '动画 ';

ALTER TABLE ANIMATION COMMENT '动画';
DROP TABLE MATERIAL;/*SkipError*/
CREATE TABLE MATERIAL(
    id INT(10) NOT NULL AUTO_INCREMENT  COMMENT '材料id' ,
    fileId INT(10)    COMMENT '文件id' ,
    name VARCHAR(128)    COMMENT '材料名称' ,
    url VARCHAR(128)    COMMENT '材料地址' ,
    PRIMARY KEY (ID)
) COMMENT = '材料  ';

ALTER TABLE MATERIAL COMMENT '材料 ';
DROP TABLE CATALOGUE;/*SkipError*/
CREATE TABLE CATALOGUE(
    id BIGINT NOT NULL   COMMENT '目录ID' ,
    name VARCHAR(32)    COMMENT '目录名称' ,
    isHidden INT    COMMENT '隐藏显示' ,
    parentId BIGINT    COMMENT '父节点id' ,
    sort INT    COMMENT '排序' ,
    PRIMARY KEY (id)
) COMMENT = '目录 ';

ALTER TABLE CATALOGUE COMMENT '目录';
