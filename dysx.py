#!/usr/bin/python
# -*- coding: UTF-8 -*-
import io
import re
import time
import datetime
import os
import sys

import json
import requests

import random

from pyutils import mysqlUtils
from pyutils import mylog

log_file = 'dysx\\log.txt'

# 已经发送次数
SEND_NUM = 0

# 发送失败次数
SEND_FAILE_NUM = 0

# yeshen1
# tk = '00fc43d251dfb2d0e4783309fcf96eec83062f6770eb16791386e0ede786c4d8fbc3a387312907de29eb40376e7bb150293f40c56e2cfd30c52fdeee7138128c5c0fca886c40bb8ebec207dea6211b4538e1d209fb30fd5ee8039297b6e8d26b6ce22-1.0.1'
# yeshen2-死号
# tk = '00bccd1795620b932202d19d9f0aa5a49a02bf84738a98b30733c765ce6b051033255e664a8b5e6ac56002c9e82a56d95ef8699724ee938431600672044262859f5855260eb943c01a28e6ed41f84096d1e09a553870baa363d33038ab94de4ca595f-1.0.1'
# mumu
tk = '00d7d7bc82c5388b4cb9bce97295cf6f6005b554ab0bf35290c9ad09f6e831a4307eeef82fe63d493301581610bb160b546fe881461e37fc331c5db44783aead98a0af5733338a4d352b75b0ec89b884a479ee44051003c15426b6b344d0b19c8c6ea-1.0.1'

def dysx(uid,tk,msg):
	global SEND_NUM
	send_ok = 0
	try:
		# api_url = "http://101.200.123.24:6002"
		api_url = "http://223.111.150.96:5050/SX8EB1CDE23CF8F46A0C1291873CD28BA9"

		data = {
			'user_id': str(uid),	
			'x_tt_token':tk,
			'text': msg
		}

		# 发送post请求
		res_raw = requests.post(url=api_url, data=data)
		print(res_raw.text)
		res = str(res_raw.text)

		mylog.log_save(log_file,res,1)

		if res.find("发太多啦") != -1:
			SEND_NUM = 100

		res = res[:str(res).find("}{")]+"}"
		result = json.loads(res)
		msg = result["msg"]
		if msg.find("陌生人私信成功") != -1:
			send_ok = 1
			print("私信成功")
		else:
			print("私信失败")
	except Exception as e:
		print("发送错误："+str(e))

	return send_ok

def sx():
	global SEND_NUM
	global SEND_FAILE_NUM
	# 今天日期
	today = datetime.date.today()
	# 昨天时间
	yesterday = today - datetime.timedelta(days=1)
	# 明天时间
	tomorrow = today + datetime.timedelta(days=1)
	# print(yesterday)
	# 前天结束时间戳
	yesterday_time = int(time.mktime(time.strptime(str(yesterday), '%Y-%m-%d')))
	# print(yesterday_time)

	# 取进两天内的评论用户id
	sql = 'SELECT id,uid FROM uids WHERE CONVERT(comment_time,SIGNED)>'+str(yesterday_time)+' and sending = 0 and sx_send = 0 Limit 1'
	# print(sql)
	res = mysqlUtils.runSQL(sql,0)
	d_id = res[0][0]
	uid = res[0][1]
	# print(d_id) 
	print("uid:"+str(uid))

	#私信
	sql = 'UPDATE uids SET sending = 1 WHERE id = '+str(d_id)
	res = mysqlUtils.runSQL(sql,0)

	# todo
	msg = '欧洲杯看球Y -x- U -x- 九九九 -x- 点v -x- i -x- p如有打扰，请多见谅~[-x-去掉]'
	send_ok = dysx(uid,tk,msg)

	# # test
	# send_ok = 1

	if send_ok == 1:
		sql = 'UPDATE uids SET sending = 0,sx_send = 1 WHERE id = '+str(d_id)
		# print(sql)
		res = mysqlUtils.runSQL(sql,0)
		# print(res)
		print("成功私信："+str(uid))
		SEND_NUM += 1
	else:
		sql = 'UPDATE uids SET sending = 0,sx_send = 2 WHERE id = '+str(d_id)
		res = mysqlUtils.runSQL(sql,0)
		SEND_FAILE_NUM += 1

	if SEND_NUM < 100:
		# 间隔N秒重复执行
		random_t = random.randint(15,30)
		time.sleep(random_t)
		sx()
	else:
		print("执行结束。。。")

# test
# cd D:\gpro\dy
# python dysx.py

SEND_NUM = 0
SEND_FAILE_NUM = 0
sx()

# msg = '正规mai球 YU999.vip 如有打扰，请多见谅~'
# send_ok = dysx("4468027531992702",tk,msg) --mumu
# send_ok = dysx("1512522240494632",tk,msg) --yeshen2
# print("send_ok:"+str(send_ok))
