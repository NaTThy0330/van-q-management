## Deployment Playbook (Sprint 1)

### Backend – Render / Railway
1. **Repository setup**: push this directory to a Git remote with `main` as the production branch.
2. **Render web service** (or Railway equivalent):
   - Runtime: Node 20 LTS.
   - Build Command: `npm install`.
   - Start Command: `npm run start`.
3. **Environment variables**:
   - `NODE_ENV=production`
   - `PORT=4000`
   - `MONGODB_URI` pointing to MongoDB Atlas cluster.
   - `JWT_SECRET` (unique per environment).
   - `JWT_EXPIRES_IN` (default `7d`).
   - `CLIENT_URL` (e.g. `https://vanqueue.vercel.app`).
   - `CORS_ORIGINS` (comma separated list of allowed domains).
4. **Deploy hooks**:
   - Configure auto-deploy on merge to `main`.
   - Enable health check: `GET /api/health`.
5. **Post-deploy verification**:
   - Run seed script once via Render shell: `npm run seed`.
   - Confirm `/api/health` returns `200`.
   - Smoke-test `/api/auth/login` using seeded passenger credentials.

### Frontend – Vercel
1. Import the repo and select `vanqueue-client` as the project root.
2. Framework preset: Vite.
3. Build command: `npm run build`; output directory: `dist`.
4. Environment variables:
   - `VITE_API_URL=https://vanqueue-backend.onrender.com/api`
5. Add preview/production domains to the backend `CORS_ORIGINS`.

### CI/CD Stubs
- Add GitHub Actions (or equivalent) later to run `npm run lint` and `npm test` for both workspaces.
- Document rollback procedure: redeploy previous build from Render/Vercel dashboard if smoke tests fail.
