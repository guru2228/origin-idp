# Origin AI-powered Internal Developer Platform

## Overview

Origin is a comprehensive AI-powered Internal Developer Platform (IDP) designed to streamline development workflows, enhance collaboration, and provide powerful AI-assisted development capabilities. The platform offers a multi-tenant architecture with role-based access control, workspace management, platform catalog, engineering metrics, AI Studio, Spectrum AI SDLC, release management, and knowledge base functionality.

## Features

- **Multi-tenant Authentication**: Secure authentication with role-based access control (Platform Admin, Tenant Admin, Product Owner, Engineer)
- **Workspace Management**: Create and manage workspaces, teams, and members
- **Platform Catalog**: Organize components, systems, domains, APIs, and resources
- **Engineering Metrics**: Visualize DORA metrics and team performance
- **Sage AI Studio**: Create and manage AI agents, RAG pipelines, and vector stores
- **Spectrum AI SDLC**: AI-powered assistance throughout the software development lifecycle
- **Release Management**: Plan, track, and manage software releases
- **Knowledge Base**: AI-powered documentation search with pgvector
- **User Management**: Comprehensive user and permission management
- **Tenant Administration**: Subscription and billing management
- **UI Customization**: Personalized themes, colors, and layout options
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Configurable Dashboard**: Drag-and-drop widget management

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API Routes, Drizzle ORM
- **Database**: PostgreSQL with pgvector for vector embeddings
- **Authentication**: NextAuth.js
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Docker and Docker Compose (for local development with PostgreSQL)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/origin-idp.git
   cd origin-idp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Start the development environment:
   ```bash
   docker-compose up -d
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

The platform uses PostgreSQL with pgvector for vector embeddings. Run migrations to set up the database schema:

```bash
npm run db:migrate
```

To seed the database with initial data:

```bash
npm run db:seed
```

## Architecture

### Directory Structure

```
origin-idp/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API Routes
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Dashboard pages
│   │   └── ...
│   ├── components/          # React components
│   │   ├── ui/              # UI components
│   │   ├── layout/          # Layout components
│   │   ├── dashboard/       # Dashboard components
│   │   └── ...
│   ├── lib/                 # Utility functions
│   │   ├── db/              # Database utilities
│   │   ├── auth/            # Authentication utilities
│   │   └── utils/           # General utilities
│   └── ...
├── drizzle/                 # Drizzle ORM
│   ├── schema/              # Database schema
│   ├── migrations/          # Database migrations
│   └── seed/                # Seed data
├── public/                  # Static assets
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker configuration
└── ...
```

### Database Schema

The database schema is designed to support a multi-tenant architecture with the following key tables:

- `tenants`: Tenant information and subscription details
- `users`: User accounts and profile information
- `roles`: User roles and permissions
- `workspaces`: Workspaces for organizing teams and projects
- `teams`: Teams within workspaces
- `members`: Team membership and roles
- `catalog_domains`: High-level organizational units
- `catalog_systems`: Collections of related components
- `catalog_components`: Individual services, libraries, or applications
- `catalog_apis`: Interfaces exposed by components
- `ai_agents`: AI agent configurations
- `ai_rag_pipelines`: RAG pipeline configurations
- `ai_vector_stores`: Vector store configurations
- `knowledge_bases`: Knowledge base collections
- `knowledge_documents`: Documents within knowledge bases
- `releases`: Release information and tracking

## Deployment

### Production Deployment

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Docker Deployment

Build the Docker image:

```bash
docker build -t origin-idp .
```

Run the Docker container:

```bash
docker run -p 3000:3000 origin-idp
```

## Testing

Run tests:

```bash
npm test
```

Run integration tests:

```bash
npm run test:integration
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
