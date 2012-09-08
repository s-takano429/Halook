@echo off

rem ---------------------------------------------------------------------------
set VER=5.0.0
set BUILD=007
rem ---------------------------------------------------------------------------

set JAVA_HOME=C:\Program Files\Java\jdk1.6.0_33


:SETTING
set WORK_DIR=%~dp0deploy
set TAGS=Version_%VER%-%BUILD%_build
set PATH=%JAVA_HOME%\bin;%PATH%
set SVN_PATH=https://wisteria.proma-c.com/svn/ENdoSnipe
set SVN_TRUNK_PATH=%SVN_PATH%/branches/Ver5.0/
set SVN_TAGS_PATH=%SVN_PATH%/tags/ENdoSnipe/
set SVN_DOC_PATH=%SVN_TRUNK_PATH%/Document
set SVN_SRC_PATH=%SVN_TRUNK_PATH%/MasterSource

if exist "%WORK_DIR%" rmdir "%WORK_DIR%" /S /Q

echo �r���h���J�n���܂��B
echo ===============================
echo ��JAVA�o�[�W����
java -version
echo ���^�O
echo %TAGS%
echo ===============================

pause

echo ArrowVision��Jar����荞�݂܂��B
copy ..\ENdoSNipeArrowVision\dist\arrowvision.jar lib\dependency
copy ..\ENdoSNipeArrowVision\dist\arrowvision_pro.jar lib\dependency

echo Ant�����s���܂��B
ant dist

echo �r���h���������܂����B
pause
