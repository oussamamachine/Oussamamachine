@echo off
echo.
echo 🎯 PORTFOLIO VERSION SWITCHER
echo ==============================
echo.
echo Current version: 
findstr "Revolutionary\|Professional" src\App.js >nul 2>&1
if errorlevel 1 (
    echo [CLEAN] - Professional, focused experience
) else (
    echo [CHAOS] - Revolutionary consciousness-driven
)
echo.
echo 1. Switch to CLEAN version (Professional, minimal)
echo 2. Switch to CHAOS version (Full revolutionary features)  
echo 3. Exit
echo.
set /p choice="Choose option (1-3): "

if %choice%==1 (
    copy src\App_clean.js src\App.js >nul
    echo.
    echo ✅ Switched to CLEAN version!
    echo    - Professional appearance
    echo    - Fast performance  
    echo    - Minimal effects
    echo    - Focus on content
) else if %choice%==2 (
    copy src\App_chaos.js src\App.js >nul
    echo.
    echo 🌀 Switched to CHAOS version!
    echo    - Revolutionary consciousness
    echo    - Reality-altering effects
    echo    - AI companions
    echo    - Quantum interactions
) else if %choice%==3 (
    echo Goodbye!
    exit
) else (
    echo Invalid choice!
)

echo.
echo The development server will automatically reload.
pause
