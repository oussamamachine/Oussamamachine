@echo off
echo 🚀 Deploying OUSSAMA.MIND Portfolio...
echo.

echo 📦 Building the project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.

echo 🌐 The portfolio is ready for deployment!
echo 📁 Build files are in the 'build' folder
echo.

echo 💡 Deployment options:
echo   1. Netlify: Drag and drop the 'build' folder
echo   2. Vercel: Connect your GitHub repository
echo   3. GitHub Pages: Use gh-pages package
echo   4. Firebase: Use Firebase Hosting
echo   5. AWS S3: Upload to S3 bucket
echo.

echo 🔧 To customize your portfolio:
echo   - Edit src/config/portfolio.js
echo   - Update src/data/portfolio.json
echo   - Modify components in src/components/
echo.

echo 🎉 Your immersive portfolio is ready!
pause
