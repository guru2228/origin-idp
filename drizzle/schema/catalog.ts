import { pgTable, uuid, text, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { workspaces } from './index';

// Platform Catalog
export const domains = pgTable('domains', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const systems = pgTable('systems', {
  id: uuid('id').primaryKey().defaultRandom(),
  domainId: uuid('domain_id').notNull().references(() => domains.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  ownerTeamId: uuid('owner_team_id').references(() => teams.id),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const components = pgTable('components', {
  id: uuid('id').primaryKey().defaultRandom(),
  systemId: uuid('system_id').notNull().references(() => systems.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  githubRepoUrl: text('github_repo_url'),
  ownerTeamId: uuid('owner_team_id').references(() => teams.id),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const apis = pgTable('apis', {
  id: uuid('id').primaryKey().defaultRandom(),
  componentId: uuid('component_id').notNull().references(() => components.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  specUrl: text('spec_url'),
  specContent: jsonb('spec_content'),
  version: text('version').notNull(),
  ownerTeamId: uuid('owner_team_id').references(() => teams.id),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  componentId: uuid('component_id').notNull().references(() => components.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  config: jsonb('config'),
  ownerTeamId: uuid('owner_team_id').references(() => teams.id),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const domainsRelations = relations(domains, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [domains.workspaceId],
    references: [workspaces.id],
  }),
  systems: many(systems),
}));

export const systemsRelations = relations(systems, ({ one, many }) => ({
  domain: one(domains, {
    fields: [systems.domainId],
    references: [domains.id],
  }),
  components: many(components),
  ownerTeam: one(teams, {
    fields: [systems.ownerTeamId],
    references: [teams.id],
  }),
}));

export const componentsRelations = relations(components, ({ one, many }) => ({
  system: one(systems, {
    fields: [components.systemId],
    references: [systems.id],
  }),
  apis: many(apis),
  resources: many(resources),
  ownerTeam: one(teams, {
    fields: [components.ownerTeamId],
    references: [teams.id],
  }),
}));

export const apisRelations = relations(apis, ({ one }) => ({
  component: one(components, {
    fields: [apis.componentId],
    references: [components.id],
  }),
  ownerTeam: one(teams, {
    fields: [apis.ownerTeamId],
    references: [teams.id],
  }),
}));

export const resourcesRelations = relations(resources, ({ one }) => ({
  component: one(components, {
    fields: [resources.componentId],
    references: [components.id],
  }),
  ownerTeam: one(teams, {
    fields: [resources.ownerTeamId],
    references: [teams.id],
  }),
}));
