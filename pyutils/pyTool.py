#!/usr/bin/python
#coding=utf-8
import os
import sys

#生成log等资源文件目录访问路径
def resource_path(relative_path):
	if getattr(sys, 'frozen', False): #是否Bundle Resource
		# base_path = sys._MEIPASS
		base_path = os.path.dirname(os.path.realpath(sys.executable))
	else:
		base_path = os.path.abspath(".")
	return os.path.join(base_path, relative_path)

