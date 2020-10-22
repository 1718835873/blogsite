/*
 Navicat Premium Data Transfer
 导入文件之前先创建一个 blog数据库  然后在blog数据库中导入该文件

 Source Server         : conn
 Source Server Type    : MySQL
 Source Server Version : 50617
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50617
 File Encoding         : 65001

 Date: 17/10/2020 17:30:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `blogId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `blogName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `blogTxt` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publishTime` int(10) UNSIGNED NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`blogId`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('blogid1602568246895', '云原生 go-zero 微服务框架', '<ol><li>轻松获得支撑千万日活服务的稳定性</li><li>内建级联超时控制、限流、自适应熔断、自适应降载等微服务治理能力，无需配置和额外代码</li><li>微服务治理中间件可无缝集成到其它现有框架使用</li><li>极简的API描述，一键生成各端代码</li><li>自动校验客户端请求参数合法性</li><li>大量微服务治理和并发工具包,</li><li>我是新添加的数据,++++++</li></ol>', '吾皇', 'id1602421823515668', 1602568246, '');
INSERT INTO `article` VALUES ('blogid1602584237264', 'gafasd', '<p>adsfasdgfhgjfgsafs</p>', '多喝白开水', 'id1602422171572807', 1602584237, '');
INSERT INTO `article` VALUES ('blogid1602578924959', '今天天气很好啊', '<p>今天天气很好啊，万里无云</p>', '吾皇', 'id1602421823515668', 1602578924, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602578943635', '眼睛疼了', '<p>现在眼睛有点疼了</p>', '吾皇', 'id1602421823515668', 1602578943, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602584246931', 'dafdgreyer', '<p>sdfh单方事故规范</p>', '多喝白开水', 'id1602422171572807', 1602584246, '');
INSERT INTO `article` VALUES ('blogid1602584254583', '阿萨德大富豪', '<p>根据客户看电视广东佛山</p>', '多喝白开水', 'id1602422171572807', 1602584254, '');
INSERT INTO `article` VALUES ('blogid1602592473890', 'fgsgsfhfgjhdfgd', '<p>afdsgfjk654th</p>', '吾皇', 'id1602421823515668', 1602592473, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602592486569', 'gsdgsdg', '<p>fhgjkdfrtbvhhbgjhfghdhgjgj</p>', '吾皇', 'id1602421823515668', 1602592486, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602592509573', '432154325', '<p>464576899654</p>', '吾皇', 'id1602421823515668', 1602592509, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602580104389', '尴尬大概', '<p>规范的合法的故事</p>', '吾皇', 'id1602421823515668', 1602580104, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602580111247', '阿嘎沙发', '<p>钢钢结构和结果还是</p>', '吾皇', 'id1602421823515668', 1602580111, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602580120806', '发打发第三方和规范化的', '<p>非官方合肥国家法撒旦</p>', '吾皇', 'id1602421823515668', 1602580120, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `article` VALUES ('blogid1602580129253', '大哥好地方gas方法和答复结果符合', '<p>发广告划分的公司</p>', '吾皇', 'id1602421823515668', 1602580129, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect`  (
  `collectId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `blogId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blogName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blogTxt` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `publishTime` int(11) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`collectId`, `blogId`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('id1602421823515668', 'blogid1602578924959', '吾皇', '今天天气很好啊', '<p>今天天气很好啊，万里无云</p>', 1602578924, 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4209260353,1775817740&fm=26&gp=0.jpg');
INSERT INTO `collect` VALUES ('id1602421823515668', 'blogid1602584237264', '多喝白开水', 'gafasd', '<p>adsfasdgfhgjfgsafs</p>', 1602584237, '');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `states` tinyint(255) NOT NULL DEFAULT 2,
  `createTime` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('id043281341', '山吹同学', '123456', NULL, 2, 1602419526);
INSERT INTO `user` VALUES ('id160242169015135', '堆堆', '123', NULL, 2, 1602421690);
INSERT INTO `user` VALUES ('id1602421823515668', '巴扎黑', '121212', 'http://localhost:3000/static/b0ad9d058b84769e45540a18deb0792e.jpeg', 2, 1602421823);
INSERT INTO `user` VALUES ('id160242198963514', '伊丽莎白', '123', NULL, 2, 1602421989);
INSERT INTO `user` VALUES ('id1602422094779457', '雪莉', '123456', NULL, 2, 1602422094);
INSERT INTO `user` VALUES ('id1602422171572807', '多喝白开水', '111', NULL, 2, 1602422171);
INSERT INTO `user` VALUES ('id1602422401213597', '欣欣向荣', '123', NULL, 2, 1602422401);
INSERT INTO `user` VALUES ('id1602839912613809', 'lenov用户', '123', NULL, 2, 1602839912);
INSERT INTO `user` VALUES ('id1602456430043555', '管理员大大', '121212', NULL, 1, 1602839912);

SET FOREIGN_KEY_CHECKS = 1;
