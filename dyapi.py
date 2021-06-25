#!/usr/bin/python
# -*- coding: UTF-8 -*-
import io
import re
import time
import os
import sys

import json
import requests

# TikTok X-Gorgon, X-Khronos, X-SS-STUB, Device Register, Captcha Solver

def dy_search():
	api_url = "https://aweme-hl.snssdk.com/aweme/v1/challenge/search/?"

	ts = str(time.time()).split(".")[0]
	_rticket = str(time.time() * 1000).split(".")[0]
	headers={
		"X-Gorgon":xgorgon,
		"X-Khronos": ts,
		"sdk-version":"1",
		"Accept-Encoding": "gzip",
		"X-SS-REQ-TICKET": _rticket,
		"Host": "aweme.snssdk.com",
		"Connection": "Keep-Alive",
		'User-Agent': 'okhttp/3.10.0.1',
		"x-tt-token":xtttoken
	} 
	data = {
		'cursor': 0,	
		'keyword':'鞠婧祎',
		'count': 20,
		'hot_search': 0,
		'is_pull_refresh': 1,
		'search_source': 'challenge',
		'search_id':None,
		'query_correct_type': 1
	}


	# 发送post请求
	response = requests.post(url=api_url, json=data, headers=headers)
	print(response)
	print(response.json())

dy_search()