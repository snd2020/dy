#!/usr/bin/python
# -*- coding: UTF-8 -*-
import io
import sys
from pymysql import *
import os
import datetime

sys.path.append("..")
from pyutils import mylog

import warnings
warnings.filterwarnings('ignore')

from urllib.parse import urlparse

# # #test 数据库选择本地进行调试
IS_HOST = 1
host = 'localhost'

log_file = ""

# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8',line_buffering=True) #改变标准输出的默认编码

#表links
#0 未采集 
#1 已经采集
#2 未知，待处理
#3 采集中，或断掉
#4 标题重复
#5 获取不到html数据

#pages
#0 未采用
#1 已采用
#5 此条数据内容有问题，待检查处理

def setLogFile(log_file_path):
	global host
	global log_file

	log_file = log_file_path
	# print("mysqlUtils-->setLogFile:"+log_file)
 
def setHost(host_set):
	global host
	global log_file

	host = host_set

def connectMysql():
	global host
	global log_file

	conn = ""
	try:
		conn = connect(host=host,
						port=3306,
						user='dy',
						passwd='dy?!202110',
						database='dy',
						charset = 'utf8')
	except Exception as e:
		res = 'mysql连接失败：' + str(e) + '\n'
		mylog.log_save(log_file,res,1)

	return conn

def runSQL(sql,dict=0):
	global log_file
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	# 获得Cursor对象
	if dict == 0:
		Cursor = conn.cursor()
	else:
		Cursor = conn.cursor(DictCursor)
	
	dataIndb = []
	try:
		count = Cursor.execute(sql)
		if sql.find("UPDATE") !=-1 :
			conn.commit() #提交到数据库执行，一定要记提交哦

		result = Cursor.fetchall()

		i = -1;
		for data in result:
			i += 1
			dataIndb.append(data)

	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return dataIndb;

def updateHotkeyStateBy(hotkey_id,cjNum):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据

	time = datetime.datetime.now()

	sql = 'UPDATE hotkw SET cj='+ str(cjNum) +',date_update="'+ str(time) +'" WHERE id="' + str(hotkey_id) + '"'

	try:
		count = Cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦
	except Exception as e:
		conn.rollback() #发生错误时回滚
		res = '更新失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

def getHotkey(cjNum):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'select id,lanmu,hotkey,zhihu from hotkw where cj='+ str(cjNum) +' ORDER BY id Desc limit 1'

	linksIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()
		i = -1;
		for link in result:
			i += 1
			linksIndb.append(link)

	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linksIndb;


def getHotkeys():
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	#test
	sql = 'select lanmu,hotkey,zhihu from hotkw where cj=0 ORDER BY RAND()'
	# sql = 'select lanmu,hotkey,zhihu from hotkw where zhihu=1 ORDER BY RAND()'

	linksIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()
		i = -1;
		for link in result:
			i += 1
			linksIndb.append(link)

	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linksIndb;


def getDataByMulu(mulu,limit_num):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	if limit_num == 1:
		sql = 'select * from pages where lanmu=' + str(mulu) + ' ORDER BY id limit '+str(10)
	else:
		sql = 'select * from pages where lanmu=' + str(mulu) + ' ORDER BY id'

	dataIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()

		i = -1;
		for data in result:
			i += 1
			dataIndb.append(data)

	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return dataIndb;

def getNotCjLinks(limit_num):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	# sql = 'select link_source from links where used=0 limit '+str(limit_num)
	sql = 'select * from links where used=0 ORDER BY RAND() limit '+str(limit_num)

	linksIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()

		i = -1;
		for link in result:
			i += 1
			linksIndb.append(link)

	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linksIndb;

def getLinksByLanmu(lanmu):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'select link_source from pages where lanmu='+str(lanmu)

	linksIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()
		i = -1;
		for link in result:
			i += 1
			linksIndb.append(link[0])

	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linksIndb;


def insertLink(lanmu,title,link_source,domain):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	time = datetime.datetime.now()

	title = title.replace('"',"'")
	title = title.replace('“',"'")
	title = title.replace('”',"'")

	# sql =  'INSERT INTO links (lanmu,title,link_source,domain,date_in) SELECT '
	# sql += str(lanmu) + ',"' + title + '","' + link_source + '","' + domain + '","' + str(time) + '"'
	# sql += ' FROM DUAL' 
	# sql += ' WHERE NOT' 
	# sql += ' EXISTS(SELECT title FROM links WHERE title = "'+ title + '");'

	sql =  'INSERT IGNORE INTO links (lanmu,title,link_source,domain,date_in) VALUES'
	sql += '(' + str(lanmu) + ',"' + title + '","' + link_source + '","' + domain + '","' + str(time) + '")'

	cursor = conn.cursor()
	res = ''
	try:
		cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦  
		res = '入库成功~' + '\n'
	except Exception as e:
		conn.rollback() #发生错误时回滚
		res = '入库失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)
	cursor.close()

	return res

def getDomian(url):
	url_domain = urlparse(url).netloc
	return url_domain

	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	time = datetime.datetime.now()

	sql = 'INSERT IGNORE INTO links (lanmu,title,link_source,domain,date_in,hot,hotkey) VALUES'

	i = 0
	total_link = len(links)
	for link in links:
		i += 1
		title = link[0]
		title = title.replace('"',"'")
		title = title.replace('“',"'")
		title = title.replace('”',"'")
		link_source = link[1]

		domain = getDomian(link_source)
		
		if i == 1:
			sql = sql + '("'+ str(lanmu) + '","' + title + '","' + link_source + '","' + domain + '","' + str(time) + '","' + str(hot)+ '","' + str(hotkey) +'")'
		else:
			sql = sql + ',("'+ str(lanmu) + '","' + title + '","' + link_source + '","' + domain + '","' + str(time) + '","' + str(hot)+ '","' + str(hotkey) +'")'


	#反馈
	res = ''
	isOk = 0
	cursor = conn.cursor()
	try:
		cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦
		res = '入库成功~\n'
		isOk = 1
	except Exception as e:
		conn.rollback() #发生错误时回滚
		erroCode = 0
		try:
			erroCode = e.args[0]
			res = 'erroCode:'+str(erroCode)+'\n'
			mylog.log_save(log_file,res)
		except Exception as e:
			res = 'erroCode获取失败' + str(e) + '\n'
			mylog.log_save(log_file,res)

		if erroCode == 1062:
			isOk = 1062
		else:
			res = '入库失败！' + str(e) + '\n' + sql
			mylog.log_save(log_file,res,1)
			isOk = 0
	
	cursor.close()

	return res

def insertMultiLinks(tag,kwList,domain,hot=0,hotkey=""):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	time = datetime.datetime.now()
	sql =  'INSERT IGNORE INTO zmlkeys (kw_tag,kw_name,kw_title,date_in,date_update) VALUES'

	i = 0
	for kw_name in kwList:
		kw_title = kw_name + "-欢迎您"

		i += 1
		if i == 1:
			sql += '(' + str(tag) + ',"' + kw_name + '","' + kw_title + '","' + str(time)  + '","' + str(time)  + '")'
		else:
			sql += ',(' + str(tag) + ',"' + kw_name + '","' + kw_title + '","' + str(time)  + '","' + str(time)  + '")'

	#反馈
	res = ''
	isOk = 0
	cursor = conn.cursor()
	try:
		cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦
		res = '入库成功~\n'
		isOk = 1
	except Exception as e:
		conn.rollback() #发生错误时回滚
		erroCode = 0
		try:
			erroCode = e.args[0]
			res = 'erroCode:'+str(erroCode)+'\n'
			mylog.log_save(log_file,res)
		except Exception as e:
			res = 'erroCode获取失败' + str(e) + '\n'
			mylog.log_save(log_file,res)

		if erroCode == 1062:
			isOk = 1062
		else:
			res = '入库失败！' + str(e) + '\n' + sql
			mylog.log_save(log_file,res,1)
			isOk = 0
	
	cursor.close()

	return res
	
def insertMultiHotkey(lanmu,hotkeys,domain,zhihu):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res

	time = datetime.datetime.now()

	sql = 'INSERT IGNORE INTO hotkw (lanmu,hotkey,domain,date_in,zhihu) VALUES'

	i = 0
	total_hotkeys = len(hotkeys)
	for hotkey in hotkeys:
		i += 1
		if i == 1:
			sql = sql + '("'+ str(lanmu) + '","' + hotkey + '","' + domain + '","' + str(time) +'","' + str(zhihu) + '")'
		else:
			sql = sql + ',("'+ str(lanmu) + '","' + hotkey + '","' + domain + '","' + str(time) +'","' + str(zhihu) + '")'

	#test
	mylog.log_save(log_file,sql,1)

	#反馈
	res = ''
	isOk = 0
	cursor = conn.cursor()
	try:
		cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦
		res = '入库成功~\n'
		isOk = 1
	except Exception as e:
		conn.rollback() #发生错误时回滚
		erroCode = 0
		try:
			erroCode = e.args[0]
			res = 'erroCode:'+str(erroCode)+'\n'
			mylog.log_save(log_file,res)
		except Exception as e:
			res = 'erroCode获取失败' + str(e) + '\n'
			mylog.log_save(log_file,res)

		if erroCode == 1062:
			isOk = 1062
		else:
			res = '入库失败！' + str(e) + '\n' + sql
			mylog.log_save(log_file,res,1)
			isOk = 0
	
	cursor.close()

	return res

def getLanmuByName(name):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'select lanmu from lanmu where name="'+str(name)+'"'
	count = Cursor.execute(sql)

	lanmu = 0
	try:
		result = Cursor.fetchone()
		lanmu = result[0]
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return lanmu;

def getNameBy(lanmu):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'select name from lanmu where lanmu="'+str(lanmu)+'"'
	count = Cursor.execute(sql)

	name = 0
	try:
		result = Cursor.fetchone()
		name = result[0]
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return name;

def getLinksFromLinksByLanmu(lanmu):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'select link_source from links where lanmu='+str(lanmu)
	# mylog.log_save(log_file,sql+'\n')

	linksIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()

		i = -1;
		for link in result:
			i += 1
			linksIndb.append(link[0])
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linksIndb;

def getLinksNotCollect(num):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = "SELECT * FROM links WHERE used != 1 limit " + str(num)

	linksIndb = []
	try:
		count = Cursor.execute(sql)
		result = Cursor.fetchall()
		i = -1;
		for link in result:
			i += 1
			linksIndb.append(link)
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linksIndb;

def checkLinkIndb(link):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'SELECT id FROM pages WHERE link_source="' + str(link) + '"'
	count = Cursor.execute(sql)

	linkId = 0
	try:
		result = Cursor.fetchone()
		if result != None:
			linkId = result[0]
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linkId;

def checkTitleInLinksdb(title):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'SELECT id FROM zmlkeys WHERE kw_name="' + str(title) + '"'
	count = Cursor.execute(sql)

	linkId = 0
	try:
		result = Cursor.fetchone()
		if result != None:
			linkId = result[0]
		else:
			linkId = -1
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)
		linkId = 0

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linkId;

def checkHotKeyIndb(hotkey):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据

	hotkey = hotkey.replace('"',"'")
	hotkey = hotkey.replace('“',"'")
	hotkey = hotkey.replace('”',"'")

	sql = 'SELECT id FROM hotkw WHERE hotkey="' + str(hotkey) + '"'
	count = Cursor.execute(sql)

	linkId = 0
	try:
		result = Cursor.fetchone()
		if result != None:
			linkId = result[0]
		else:
			linkId = -1
	except Exception as e:
		res = '读取失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)
		linkId = 0

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

	return linkId;
	
def updateLinksById(id,state):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'UPDATE links SET used='+ str(state) +' WHERE id="' + str(id) + '"'

	try:
		count = Cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦
	except Exception as e:
		conn.rollback() #发生错误时回滚
		res = '更新失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()

def updatePageById(id,state):
	global host
	global log_file
	# 打开数据库连接
	conn = connectMysql()
	if conn == "" or conn is None:
		res = '数据库连接失败！'
		mylog.log_save(log_file,res,1)
		return res
	# 获得Cursor对象
	Cursor = conn.cursor()
	# 执行select语句，并返回受影响的行数：查询一条数据
	sql = 'UPDATE pages SET used='+ str(state) +' WHERE id="' + str(id) + '"'

	try:
		count = Cursor.execute(sql)
		conn.commit() #提交到数据库执行，一定要记提交哦
	except Exception as e:
		conn.rollback() #发生错误时回滚
		res = '更新失败！' + str(e) + '\n' + sql
		mylog.log_save(log_file,res,1)

	# 关闭Cursor对象
	Cursor.close()
	conn.close()