Startup Benefits Platform — Full Stack Assignment
This project is a Startup Benefits and Partnerships Platform built for early-stage founders, startup teams, and indie hackers to access exclusive SaaS deals. Some deals are public, while others require user verification before claiming. The system emphasizes clean architecture, secure authentication, and a premium SaaS-style UI with high-quality animations and interactions.
🚀 Tech Stack
Frontend
Next.js (App Router)
TypeScript
Tailwind CSS
Framer Motion (animations)
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT-based authentication
🧭 End-to-End Application Flow
User registers or logs in.
User browses all available deals.
Locked deals are visually restricted for unverified users.
Eligible users can claim deals.
Claimed deals appear in the user dashboard with real-time status tracking.
🔐 Authentication & Authorization Strategy
Users authenticate using email and password.
On successful login or registration, a JWT token is issued and stored securely on the client.
Protected backend routes require a valid JWT.
Locked deals can only be claimed by verified users.
Duplicate claims are prevented through backend validation.
🔄 Internal Flow of Claiming a Deal
User clicks “Claim Deal” on the deal details page.
Frontend sends an authenticated request to the backend.
Backend validates:
User authentication
Deal existence
Claim duplication
User eligibility for locked deals
A claim record is created with status set to pending.
Frontend updates the dashboard UI to reflect the claim status.
🔗 Frontend–Backend Interaction
All interactions use REST APIs.
Frontend fetches:
/api/deals → all deals
/api/deals/:id → deal details
/api/claims/me → user dashboard data
JWT token is attached to protected requests via Authorization headers.
🎨 UI & Performance Considerations
Page transitions implemented using Framer Motion.
Skeleton loaders and animated placeholders during API calls.
Hover micro-interactions and button feedback animations.
Locked deals use visual blur overlays with clear access messaging.
Optimized component structure for fast re-renders and scalability.
⚠️ Known Limitations
No admin panel for managing deals.
User verification is simulated.
No email notifications or real-time updates.
No pagination or caching layer implemented.
🚧 Improvements for Production Readiness
Role-based access control and admin dashboard.
Email verification and password reset flows.
Redis caching and rate limiting.
Server-side pagination for large datasets.
CDN integration and image optimization.
Audit logging and monitoring.