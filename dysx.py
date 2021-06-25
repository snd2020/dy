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

from pyutils import mysqlUtils
from pyutils import mylog

tk = '00fc43d251dfb2d0e4783309fcf96eec83035811b7f03dc80d4bae2cecde5652910900bf86738f872dac9542c337a9b6f8da22ca9e7f575da903cb54ad2f8280e54c1b5d22d2a2044ca8b95755a316f4d1e4769a7eb71b3863bd22be130096ba25ff3-1.0.1'

def dysx(uid,tk,msg):
	api_url = "http://101.200.123.24:6002"

	data = {
		'user_id': str(uid),	
		'x_tt_token':tk,
		'text': msg
	}

	# 发送post请求
	res_raw = requests.post(url=api_url, data=data)
	# print(response)
	print(response.text)
	res = res_raw[:res_raw.rfind("}{")]+"}"
	result = json.loads(res)
	msg = result["msg"]
	if msg.find("成功") != -1:
		print("私信成功")
	else:
		print("私信失败")


def test():
	res_raw = '{"status":0,"msg":"陌生人私信成功","uid":"1020764381775454","toid":"98232235766","text":"hello~"}{"status_code":7174,"tips":"","status_msg":{"msg_type":2,"msg_content":{"tips":"","template":[]}},"decision_type":"","raw_check_code":0,"extra":"","status":-3,"xtt":"00fc43d251dfb2d0e4783309fcf96eec83035811b7f03dc80d4bae2cecde5652910900bf86738f872dac9542c337a9b6f8da22ca9e7f575da903cb54ad2f8280e54c1b5d22d2a2044ca8b95755a316f4d1e4769a7eb71b3863bd22be130096ba25ff3-1.0.1"}'
	# k_loc = res_raw.find('}')
	# print(k_loc)
	# res = res_raw[0,k_loc]
	res = res_raw[:res_raw.rfind("}{")]+"}"
	# print(res)
	result = json.loads(res)
	print(result["status"])
	print(result["msg"])


def sx():
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
	res = mysqlUtils.runSQL(sql,0)
	d_id = res[0][0]
	uid = res[0][1]
	# print(d_id) 
	# print(uid)

	#私信
	sql = 'UPDATE uids SET sending = 1 WHERE id = '+str(d_id)
	res = mysqlUtils.runSQL(sql,0)

	# todo
	# msg = 
	# send_ok = dysx(uid,tk,msg)

	# test
	send_ok = 1

	if send_ok == 1:
		sql = 'UPDATE uids SET sending = 0,sx_send = 1 WHERE id = '+str(d_id)
		# print(sql)
		res = mysqlUtils.runSQL(sql,0)
		# print(res)
		print("成功私信："+str(uid))
	else:
		sql = 'UPDATE uids SET sending = 0 WHERE id = '+str(d_id)
		res = mysqlUtils.runSQL(sql,0)

	# 间隔1秒重复执行
	time.sleep(60)
	sx()



# test

# dysx()

sx()

