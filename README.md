#中科院原项目github链接：（此处仅为我自己的workspace）
https://github.com/lijutang/CA-Materials-Computing-Platform

#使用框架
	Frontend：vue3 +JavaScript+Vite；
	Backend：Flask+ SQLite + Axios； 


# 若是第一次启动（开发时笔记，可忽略）
	先开启后端服务器        
	cd ca-backend
	python -m venv venv
	安装flask并输出依赖项
	pip install flask flask-cors flask-sqlalchemy
	pip freeze > requirements.txt
	然后启动后端
	python app.py


	再切换到前端
	cd .
	cd ca-frontend
	安装
	npm install axios
	然后启动前端
	npm run dev

# 若不是首次启动
	确保当前终端位于当前项目根目录
	在当前终端，复制粘贴以下内容并输入
	cd ca-backend
	python -m venv venv
	python app.py

	然后重新开一个终端，复制粘贴一下内容并输入
	cd ca-frontend
	npm run dev


# 关于账号密码
	备注：如果想查看账号密码：信息是存储在/ca-backend/instance/site.db文件里面的
	想要查看要开启一个新的终端
	cd ca-backend
	打开Sqlite
	sqlite3 instance/site.db  
	
	想要查询有哪些表输入：
		.table
		（输入后会显示User表，里面存储了所有账号密码用于login页面登录）
	
	想要查询User的账号密码：
		SELECT * FROM User;


2025/1/8：
更多未公开功能（如相关内部接口与具体数据库）正在与项目组讨论跟进中，目前版本下暂时使用了通用基本的vue框架来模拟各个子菜单的具体部分

小声：属于是“把房子搭好了，门禁系统安装完成，并且房间之间的分类布局和功能安排也以基本分配好，满足目前项目组需要并且橡胶以前代码版本可供后续拓展，但是后面要放什么家具，如何安置的话是暂时无法公开”的这么一个状态 ;)
