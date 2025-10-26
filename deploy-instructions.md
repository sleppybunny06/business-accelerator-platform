# Deployment Instructions

## 📋 Prerequisites Completed ✅
- ✅ Git repository initialized
- ✅ All files committed to main branch
- ✅ .gitignore configured properly
- ✅ README.md created
- ✅ Vercel.json configuration added
- ✅ Environment variables documented

## 🔗 Step 1: Push to GitHub

1. **Create new repository on GitHub:**
   - Go to: https://github.com/new
   - Repository name: `business-accelerator-platform`
   - Description: `AI-powered business accelerator platform`
   - Make it **Public**
   - **Don't** initialize with README
   - Click "Create repository"

2. **Connect and push your code:**
   ```bash
   git remote add origin https://github.com/sleppybunny06/business-accelerator-platform.git
   git push -u origin main
   ```

## 🚀 Step 2: Deploy on Vercel

### Option A: Connect GitHub Repository (Recommended)
1. **Go to**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: `sleppybunny06/business-accelerator-platform`
5. **Configure project settings:**
   - Framework Preset: **React**
   - Root Directory: `./client`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

6. **Set Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-app.vercel.app/api
   REACT_APP_SOCKET_URL=https://your-app.vercel.app
   ```

7. **Click "Deploy"**

### Option B: Vercel CLI (Alternative)
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   vercel
   ```

## 🔧 Environment Variables to Set in Vercel

In your Vercel dashboard → Project Settings → Environment Variables, add:

### Production Environment Variables:
```
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=your_mongodb_connection_string
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_API_URL=https://your-vercel-app.vercel.app/api
REACT_APP_SOCKET_URL=https://your-vercel-app.vercel.app
```

## 📝 After Deployment

1. **Test your deployed app**
2. **Update API URLs** if needed
3. **Configure custom domain** (optional)
4. **Set up monitoring** and analytics

## 🔄 Future Updates

To deploy updates:
1. **Make changes locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. **Vercel will auto-deploy** from GitHub!

## 🆘 Troubleshooting

### Common Issues:
- **Build failures**: Check build logs in Vercel dashboard
- **Environment variables**: Ensure all required vars are set
- **API connection**: Verify REACT_APP_API_URL is correct
- **CORS errors**: Update server CORS settings for production domain

### Support Resources:
- Vercel Documentation: https://vercel.com/docs
- GitHub Help: https://docs.github.com
- Project Issues: Create issue in your repository