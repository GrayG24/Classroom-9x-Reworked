# Classroom 9x Games - Deployment Guide

This project is built with React and Vite. To deploy it to GitHub Pages, you **must** deploy the compiled files, not the source code.

## 🚀 Automated Deployment (Recommended)

I have set up a GitHub Action that automatically deploys your site whenever you push to the `main` branch.

1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Now, every time you push code to `main`, your site will update automatically at `https://your-username.github.io/your-repo-name/`.

## 🛠 Manual Deployment

If you prefer to deploy manually:

1. Run `npm run deploy` in your terminal.
2. This will build the project and push the `dist` folder to a `gh-pages` branch.
3. In **Settings** > **Pages**, ensure the source is set to **Deploy from a branch** and the branch is `gh-pages`.

## ⚠️ Common Errors

- **"Unexpected token 'export'"**: This happens if you try to host the `src` folder directly. You must host the `dist` folder created after running `npm run build`.
- **Blank Screen**: Ensure `base: './'` is set in `vite.config.ts` (I have already done this for you).
