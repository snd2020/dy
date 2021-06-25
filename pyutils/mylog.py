#!/usr/bin/python
#coding=utf-8
import os
import datetime
import sys

# sys.path.append("..")
# from pyutils import pyTool

if getattr(sys, 'frozen', False):
	base_path = os.path.dirname(os.path.realpath(sys.executable))
	sys.path.append(base_path)
	from pyutils import pyTool
else:
	base_path = os.path.dirname(os.path.realpath(sys.argv[0]))
	sys.path.append(base_path)
	from pyutils import pyTool

# test seft
# import pyTool

#获取文件的大小,结果保留两位小数，单位为MB
def get_FileSize(filePath):
	fsize = os.path.getsize(filePath)
	fsize = fsize/float(1024*1024)
	return round(fsize,2)

def backUpLog(missionDir,log_file_path):
	time_str = str(datetime.datetime.now().strftime('%Y%m%d-%H%M%S'))
	backUpLogPath = missionDir + "/" + 'log_'+time_str+'.txt'
	data_save = ''

	try:
		#获取已满1MB日志，并清零
		with open(log_file_path, "r+",encoding='utf-8',errors='ignore') as f:
			data_save = f.read()
			f.truncate();

		#保存已满1MB日志到新文件
		with open(backUpLogPath, "w+",encoding='utf-8',errors='ignore') as f:
			f.write("log备份："+backUpLogPath+"\n")
			f.write(data_save)
	except Exception as e:
		time = datetime.datetime.now()

def log_save(log_file,data,log=0):
	# print("log_save~"+"\n")

	# print("\n"+ "~~~~~~~~~~~~~~path~~~~~~~~~~~~~" + "\n")
	# print(sys.path[0])
	# print(sys.argv[0])
	# print(os.path.dirname(os.path.realpath(sys.executable)))
	# print(os.path.dirname(os.path.realpath(sys.argv[0])))
	# print("\n"+ "~~~~~~~~~~~~~~path~~~~~~~~~~~~~" + "\n")

	if log == 1:
		time = datetime.datetime.now()
		log_file_path = pyTool.resource_path(log_file)
		# print("log_file_path:"+log_file_path+"\n")

		if getattr(sys, 'frozen', False): #是否Bundle Resource
			# base_path = sys._MEIPASS
			base_path = os.path.dirname(os.path.realpath(sys.executable))
		else:
			base_path = os.path.abspath(".")

		mission_name = "missonUknow"
		try:
			mission_name = log_file.split("\\")[-2]
		except Exception as e:
			time = datetime.datetime.now()

		missionDir = os.path.join(base_path, mission_name)

		#log 文件夹不存在，则创建
		if not os.path.exists(missionDir):
			os.mkdir(missionDir)

		#log 文件不存在，则创建
		if not os.path.exists(log_file_path):
			open(log_file_path, 'w').close()

		try:
			ret = os.access(log_file, os.X_OK)
			if ret == 1:
				#备份超过1M的log.txt
				if(get_FileSize(log_file_path) > 1):
					backUpLog(missionDir,log_file_path)

				f = open(log_file_path, "r+",encoding='utf-8')
				if(get_FileSize(log_file) > 1):
					f.truncate();
				else:
					old = f.read()
					f.seek(0)
					f.write(str(time) + '\n')
					if isinstance(data,list):
						for item in data:
							f.write("%s\n" % item)
					else:
						f.write(data)
					f.write('\n----------------------------\n')
					f.write(old)
		except Exception as e:
			time = datetime.datetime.now()
			# print('log写入失败：'+log_file_path+"\n")

# #test 
# log_save('test\\testLog.txt',"测试tes \n",1)