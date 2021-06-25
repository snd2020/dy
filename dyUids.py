#!/usr/bin/python
# -*- coding: UTF-8 -*-
import io
import re
import time
import os
import sys
import datetime

import requests
import json

#解决print gbk 报错问题
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='gb18030',line_buffering=True) #改变标准输出的默认编码

# cmd 执行
# mitmdump -p 8080 --set block_global=false
# mitmdump -p 8080 --set block_global=false  -s D:\gpro\dy\dyUids.py
# "C:\Program Files\Google\Chrome\Application\chrome.exe" --proxy-server=127.0.0.1:8080 --ignore-certificate-errors

#函数名必须这样写 这是mitmdump规则
def response(flow):
    #下面这个网址是通过fiddler获取到的 但是有些数据我们无法解密，所以需要用mitmdump捕获数据包然后做分析\

    if 'https://www.douyin.com/aweme/v1/web/comment/list/?' in flow.request.url:
        result = json.loads(flow.response.text)

        print("******************************************************************************")
        print(" ")
        print(result)
        print(" ")
        print("******************************************************************************")

        try:
          comments = result["comments"]
          for comment in comments:
              # print(comment)
              create_time = comment["create_time"]
              uid = comment["user"]["uid"]
              sec_uid = comment["user"]["sec_uid"]
              nickname = comment["user"]["nickname"]
              # can_comment = comment["aweme_control"]["can_comment"]
              # can_forward = comment["can_forward"]["can_forward"]
              # is_gov_media_vip = comment["is_gov_media_vip"]

              print(create_time)
              print(uid)
              print(nickname)

              saveUid(str(uid),str(sec_uid),str(create_time))
              time.sleep(0.1)
        except Exception as e:
          print("存入数据库失败："+str(e))

def saveUid(uid,sec_uid,create_time):
  api_url = 'http://eshen.cc/dyuid.php?uid='+uid+'&sec_uid='+sec_uid+'&ct='+create_time
  response = requests.get(url=api_url)
  # print(response)
  # print(response.text)

def saveData(fileName,data,sType):
  try:
    with open(fileName, sType) as f:
      f.write(data)
  except Exception as e:
    log = "saveData 保存失败！"
    print(log)

def readData(fileName):
  data = ""
  try:
    with open(fileName,"r+",encoding='utf-8',errors='ignore') as f:
     data = f.read()
  except Exception as e:
    log = "readData 读取失败！"
    print(log)
  return data

def getUserInfo():
    uids = readData("uidt.json")
    # print(type(uids))
    uids_json = json.loads(json.dumps(eval(uids)))
    # print(uids_json)
    # print(uids_json["comments"])
    comments = uids_json["comments"]
    # print(len(comments))

    for comment in comments:
        # print(comment)
        create_time = comment["create_time"]
        uid = comment["user"]["uid"]
        sec_uid = comment["user"]["sec_uid"]
        nickname = comment["user"]["nickname"]
        # can_comment = comment["aweme_control"]["can_comment"]
        # can_forward = comment["can_forward"]["can_forward"]
        # is_gov_media_vip = comment["is_gov_media_vip"]

        print(create_time)
        print(uid)
        print(nickname)

        saveUid(str(uid),str(sec_uid),str(create_time))
        time.sleep(0.1)

# test
# getUserInfo()
# saveUid('104038651999','MS4wLjABAAAAkrHAjA9LFdllGMy8lvAr2oa-Ke3UYDoQitFQGLygv_A','1624437045')