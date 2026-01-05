@echo off
REM -- 启动前准备 --
set OLLAMA_ORIGINS=*
set OLLAMA_HOST=0.0.0.0:11434

echo 正在启动 Ollama 服务 ...
start /b ollama serve

REM -- 等 3 秒让端口起来 --
timeout /t 3 /nobreak >nul

REM -- 检测端口是否监听 --
netstat -ano | findstr "11434" >nul
if %errorlevel% neq 0 (
    echo.
    echo ============================================
    echo 警告：11434 端口未监听，请求肯定进不来！
    echo 请按下列步骤把 ollama.exe 加入防火墙白名单：
    echo --------------------------------------------
    echo 1. Win+R  输入  wf.msc  回车
    echo 2. 左侧“入站规则”→右侧“新建规则”
    echo 3. 选“程序”→下一步→浏览到
    echo    %USERPROFILE%\AppData\Local\Programs\Ollama\ollama.exe
    echo 4. 选“允许连接”，下一步→下一步→名称填“Ollama”→完成
    echo ============================================
    echo 加完规则后重新运行本脚本即可。
    pause
    exit /b
)

echo 端口监听正常，服务已启动！
pause