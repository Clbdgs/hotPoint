DROP TABLE TOPIC;;/*SkipError*/
CREATE TABLE TOPIC(
    ID VARCHAR(32) NOT NULL   COMMENT '主题ID' ,
    TOPIC_NAME VARCHAR(128)    COMMENT '主题名称' ,
    CREATED_BY VARCHAR(32)    COMMENT '创建人' ,
    CREATED_TIME DATETIME    COMMENT '创建时间' ,
    UPDATED_BY VARCHAR(32)    COMMENT '更新人' ,
    UPDATED_TIME DATETIME    COMMENT '更新时间' ,
    PRIMARY KEY (ID)
) COMMENT = '主题 ';;

ALTER TABLE TOPIC COMMENT '主题';;
DROP TABLE WEBSITE;;/*SkipError*/
CREATE TABLE WEBSITE(
    TOPIC_ID VARCHAR(32)    COMMENT '网站主题ID 外键' ,
    ID VARCHAR(32) NOT NULL   COMMENT '网站ID' ,
    NAME VARCHAR(128)    COMMENT '网站名称' ,
    ADDRESS VARCHAR(1024)    COMMENT '网站地址' ,
    ICON_ADDRESS VARCHAR(1024)    COMMENT '网站图片地址' ,
    CREATED_BY VARCHAR(32)    COMMENT '创建人' ,
    CREATED_TIME DATETIME    COMMENT '创建时间' ,
    UPDATED_BY VARCHAR(32)    COMMENT '更新人' ,
    UPDATED_TIME DATETIME    COMMENT '更新时间' ,
    PRIMARY KEY (ID)
) COMMENT = '网站 ';;

ALTER TABLE WEBSITE COMMENT '网站';;
DROP TABLE FILE;;/*SkipError*/
CREATE TABLE FILE(
    ID VARCHAR(32) NOT NULL   COMMENT 'ID' ,
    name VARCHAR(128)    COMMENT '名称' ,
    SUBJECT VARCHAR(32)    COMMENT '类型' ,
    URL VARCHAR(128)    COMMENT '路径' ,
    CREATED_BY VARCHAR(32)    COMMENT '创建人' ,
    CREATED_TIME DATETIME    COMMENT '创建时间' ,
    UPDATED_BY VARCHAR(32)    COMMENT '更新人' ,
    UPDATED_TIME DATETIME    COMMENT '更新时间' ,
    PRIMARY KEY (ID)
) COMMENT = '文件 ';;

ALTER TABLE FILE COMMENT '文件';;
