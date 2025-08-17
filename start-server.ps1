# PowerShell script to start the React development server
Set-Location "C:\Users\Shahed\OneDrive\Desktop\codes\DBMS\grameen_krishi"
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host "Starting React development server..." -ForegroundColor Yellow
npm start
