#!/usr/bin/python
# -*- coding: UTF-8 -*-
import io
import urllib.request
from bs4 import BeautifulSoup
import re
import html2text
import time

from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup    #解析html的
import selenium.webdriver.support.ui as ui
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.common.by import By
from selenium import webdriver    #模仿浏览器的
from selenium.webdriver.chrome.options import Options
import signal

from urllib.parse import urlparse
from urllib.error import HTTPError
import socket

import os
import sys

#############嵌入pyqt5##########
sys.path.append("..")
from pyutils import mylog
from pyutils import mysqlUtils

log_file = 'getUids\\log.txt'

#在运行中
isWorking = 0
#############嵌入pyqt5##########

#test
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='gb18030') #改变标准输出的默认编码
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8',line_buffering=True) #改变标准输出的默认编码

def getDriver(url):
	global log_file
	log = 'getDriver~'+'\n'
	mylog.log_save(log_file,log,1)

	#无头模式
	options = Options()
	# # #test 调试时，打开浏览器
	# options.add_argument('--headless')
	# options.add_argument('--disable-gpu')

	# # 不加载图片
	# prefs = {"profile.managed_default_content_settings.images":2}
	# options.add_experimental_option("prefs",prefs)

	# 设置代理
	options.add_argument("--proxy-server=127.0.0.1:8080")
	# 一定要注意，=两边不能有空格，不能是这样--proxy-server = http://202.20.16.82:10152

	# 忽略证书
	options.add_argument('--ignore-certificate-errors')

	# 隐藏终端的 driver log
	options.add_experimental_option('excludeSwitches', ['enable-logging'])
	# options.add_argument('--incognito')#无痕隐身模式
	# options.add_argument("disable-cache")#禁用缓存
	options.add_argument('--no-sandbox')#“–no-sandbox”参数是让Chrome在root权限下跑
	options.add_argument('--disable-dev-shm-usage')
	options.add_argument('--disable-gpu')
	# options.add_argument("disable-cache")#禁用缓存
	options.add_argument('disable-infobars')
	#禁用大量日志信息滚动输出
	options.add_argument('log-level=3')#INFO = 0 WARNING = 1 LOG_ERROR = 2 LOG_FATAL = 3 default is 0

	driver = ""
	try:
		#for mac
		# driver = webdriver.Chrome(executable_path="/usr/bin/chromedriver")
		driver = webdriver.Chrome(executable_path="D:/dev/chromedriver.exe",chrome_options=options)
		# driver.delete_all_cookies()
		#driver.execute_script('Object.defineProperties(navigator, {webdriver:{get:()=>undefined}});')

	except Exception as e:
		log = 'driver获取失败:' + str(e) + "\n"
		mylog.log_save(log_file,log,1)

	if driver == "":
		return ""

	try:
		driver.get(url)
		time.sleep(5)
	except Exception as e:
		log = 'driver请求错误：'+ str(e) + "\n"
		mylog.log_save(log_file,log,1)

	return driver
	 
def getFooter(driver,footer_name):
	global log_file
	footer = ''
	try:
		wait = ui.WebDriverWait(driver,15)
		wait.until(lambda driver:driver.find_element_by_class_name(footer_name))
		footer = driver.find_element_by_class_name(footer_name)
	except Exception as e:
		log = '底部footer获取失败' + str(footer) + str(e) + "\n"
		mylog.log_save(log_file,log,1)

	return footer

def getNextBtn(driver,next_name):
	global log_file
	nextBtn = ''
	try:
		wait = ui.WebDriverWait(driver,15)
		# wait.until(lambda driver:driver.find_element_by_class_name(next_name))
		nextBtn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME,next_name)))
		# nextBtn = driver.find_element_by_class_name(next_name)
	except Exception as e:
		log = '下一页按钮还没获取到--' + str(nextBtn) + str(e) +'\n'
		mylog.log_save(log_file,log,1)

	return nextBtn

def getElementByXPath(driver,xPath):
	global log_file
	element = ""
	try:
		wait = ui.WebDriverWait(driver,15)
		element = wait.until(EC.element_to_be_clickable((By.XPATH,xPath)))
	except Exception as e:
		log = str(xPath) + '-获取失败:'  + str(e) +'\n'
		mylog.log_save(log_file,log,1)

	return element


def clickByXPath(driver,xPath):
	global log_file
	try:
		wait = ui.WebDriverWait(driver,15)
		xPathBtn = wait.until(EC.element_to_be_clickable((By.XPATH,xPath)))
		xPathBtn.click()
	except Exception as e:
		log = 'xPathBtn点击失败' + str(xPath) + str(e) +'\n'
		mylog.log_save(log_file,log,1)

def getElementByClassLinkText(driver,linkText):
	global log_file
	element = ''
	try:
		wait = ui.WebDriverWait(driver,5)
		wait.until(lambda driver:driver.find_element_by_link_text(linkText))
		element = driver.find_element_by_link_text(linkText)
	except Exception as e:
		log = 'className获取失败' + str(linkText) + str(e) + "\n"
		mylog.log_save(log_file,log,1)

	return element


def do():

	mysqlUtils.setLogFile(log_file)

	url = "https://www.douyin.com"
	# url = "https://www.douyin.com"
	#先打开网页
	driver = getDriver(url)

	time.sleep(60*2)

	# # 搜索
	# search = getElementByXPath(driver,'//*[@id="root"]/div/div[1]/div/header/div[2]/div/div[2]/div/form/input[4]')
	# search.send_keys("欧洲杯 今晚")
	# time.sleep(1)
	# search_btn = getElementByXPath(driver,'//*[@id="root"]/div/div[1]/div/header/div[2]/div/div[2]/div/button')
	# search_btn.click()
	# time.sleep(1)

	# time.sleep(10)

	# # 切换到最后一个句柄
	# windowsAll = driver.window_handles 
	# driver.switch_to.window(windowsAll[-1])  

	# time.sleep(3)


	# 记录一下当前handle(为了跳转回该页面做铺垫)
	mainWindow = driver.current_window_handle

	# 切换到最后一个句柄
	windowsAll = driver.window_handles
	# print("windowsAll"+str(windowsAll))
	driver.switch_to.window(windowsAll[-1])
	time.sleep(3)

	for i in range(100):
		i += 1 
		#逐个点击视频
		try:
			element = '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/ul/li['+str(i)+']'
			# element = '//*[@id="root"]/div/div[2]/div/div[2]/div[2]/ul/li['+str(i)+']/div'
			# element = '//*[@id="root"]/div/div[2]/div[2]/div[2]/ul/li['+str(i)+']/div/a[1]/div/div[1]/img'
			video_block = getElementByXPath(driver,element)
			video_block.click()
			time.sleep(1)

			# 切换到最后一个句柄
			windowsAll = driver.window_handles
			# print("windowsAll"+str(windowsAll))
			driver.switch_to.window(windowsAll[-1])
			time.sleep(1)

			# 滚动8次到底部
			for i in range(20):
				try:
					driver.execute_script('window.scrollTo(0,document.body.scrollHeight);')
					time.sleep(3)
				except Exception as e:
					log = 'driver执行滚动到底部失败：' + str(e) +'\n'
					mylog.log_save(log_file,log,1)


			driver.close()
			
			# 切换到最后一个句柄
			windowsAll = driver.window_handles
			# print("windowsAll"+str(windowsAll))
			driver.switch_to.window(windowsAll[-1])
			time.sleep(3)

		except Exception as e:
			print("错误"+str(e))

		#每点击2个，滚动一次屏幕
		if i%2 == 0:
			try:
				driver.execute_script('window.scrollTo(0, '+str((i/2)*1000)+';)')
			except Exception as e:
				log = 'driver执行滚动到底部失败：' + str(e) +'\n'
				mylog.log_save(log_file,log,1)



# test
# cd D:\gpro\dy
# python getDyUids.py 
do()